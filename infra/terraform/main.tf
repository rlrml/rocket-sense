locals {
  app_name = "rocket-sense"

  app_labels = {
    "app.kubernetes.io/name"      = local.app_name
    "app.kubernetes.io/component" = "server"
  }

  worker_labels = {
    "app.kubernetes.io/name"      = local.app_name
    "app.kubernetes.io/component" = "worker"
  }

  postgres_labels = {
    "app.kubernetes.io/name"      = local.app_name
    "app.kubernetes.io/component" = "postgres"
  }

  watchdog_labels = {
    "app.kubernetes.io/name"      = local.app_name
    "app.kubernetes.io/component" = "disk-usage-watchdog"
  }
}

resource "kubernetes_namespace_v1" "rocket_sense" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_persistent_volume_claim_v1" "postgres" {
  wait_until_bound = false

  metadata {
    name      = "rocket-sense-postgres"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
  }

  spec {
    access_modes       = ["ReadWriteOnce"]
    storage_class_name = var.storage_class_name

    resources {
      requests = {
        storage = var.postgres_storage_size
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim_v1" "replay_storage" {
  wait_until_bound = false

  metadata {
    name      = "rocket-sense-storage"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
  }

  spec {
    access_modes       = ["ReadWriteOnce"]
    storage_class_name = var.storage_class_name

    resources {
      requests = {
        storage = var.replay_storage_size
      }
    }
  }
}

# The local-path provisioner enforces no quota on these PVCs (a 10Gi claim
# held 231G when the node filled on 2026-06-11), so the watchdog CronJob below
# is the line of defense before kubelet DiskPressure evictions.
resource "kubernetes_config_map_v1" "disk_usage_watchdog" {
  metadata {
    name      = "rocket-sense-disk-usage-watchdog"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
    labels    = local.watchdog_labels
  }

  data = {
    "disk-usage-watchdog.sh" = file("${path.module}/files/disk-usage-watchdog.sh")
  }
}

resource "kubernetes_cron_job_v1" "disk_usage_watchdog" {
  metadata {
    name      = "rocket-sense-disk-usage-watchdog"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
    labels    = local.watchdog_labels
  }

  spec {
    schedule                      = var.disk_usage_watchdog_schedule
    concurrency_policy            = "Forbid"
    successful_jobs_history_limit = 3
    failed_jobs_history_limit     = 5

    job_template {
      metadata {
        labels = local.watchdog_labels
      }

      spec {
        backoff_limit = 0

        template {
          metadata {
            labels = local.watchdog_labels
          }

          spec {
            restart_policy = "Never"

            container {
              name = "watchdog"
              # Reuse the postgres image: it ships psql and the pgstattuple
              # contrib extension the script relies on.
              image   = "postgres:16-alpine"
              command = ["/bin/sh", "/opt/rocket-sense/disk-usage-watchdog.sh"]

              env {
                name  = "PGHOST"
                value = kubernetes_service_v1.postgres.metadata[0].name
              }

              env {
                name  = "PGUSER"
                value = "rocket_sense"
              }

              env {
                name  = "PGDATABASE"
                value = "rocket_sense"
              }

              env {
                name = "PGPASSWORD"
                value_from {
                  secret_key_ref {
                    name = "rocket-sense-secrets"
                    key  = "POSTGRES_PASSWORD"
                  }
                }
              }

              env {
                name  = "DISK_USAGE_ALERT_PERCENT"
                value = tostring(var.disk_usage_alert_percent)
              }

              # Optional: POSTed the alert summary when set (e.g. an ntfy or
              # Discord webhook URL).
              env {
                name = "ALERT_WEBHOOK_URL"
                value_from {
                  secret_key_ref {
                    name     = "rocket-sense-secrets"
                    key      = "ALERT_WEBHOOK_URL"
                    optional = true
                  }
                }
              }

              volume_mount {
                name       = "rocket-sense-storage"
                mount_path = "/var/lib/rocket-sense/storage"
                read_only  = true
              }

              volume_mount {
                name       = "watchdog-script"
                mount_path = "/opt/rocket-sense"
                read_only  = true
              }
            }

            volume {
              name = "rocket-sense-storage"
              persistent_volume_claim {
                claim_name = kubernetes_persistent_volume_claim_v1.replay_storage.metadata[0].name
              }
            }

            volume {
              name = "watchdog-script"
              config_map {
                name = kubernetes_config_map_v1.disk_usage_watchdog.metadata[0].name
              }
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "postgres" {
  metadata {
    name      = "rocket-sense-postgres"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
  }

  spec {
    selector = local.postgres_labels

    port {
      name        = "postgres"
      port        = 5432
      target_port = 5432
    }
  }
}

resource "kubernetes_deployment_v1" "postgres" {
  metadata {
    name      = "rocket-sense-postgres"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
    labels    = local.postgres_labels
  }

  spec {
    replicas = 1

    selector {
      match_labels = local.postgres_labels
    }

    template {
      metadata {
        labels = local.postgres_labels
      }

      spec {
        container {
          name  = "postgres"
          image = "postgres:16-alpine"

          port {
            name           = "postgres"
            container_port = 5432
          }

          env {
            name  = "POSTGRES_DB"
            value = "rocket_sense"
          }

          env {
            name  = "POSTGRES_USER"
            value = "rocket_sense"
          }

          env {
            name = "POSTGRES_PASSWORD"
            value_from {
              secret_key_ref {
                name = "rocket-sense-secrets"
                key  = "POSTGRES_PASSWORD"
              }
            }
          }

          env {
            name  = "PGDATA"
            value = "/var/lib/postgresql/data/pgdata"
          }

          volume_mount {
            name       = "postgres-data"
            mount_path = "/var/lib/postgresql/data"
          }
        }

        volume {
          name = "postgres-data"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.postgres.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "server" {
  metadata {
    name      = "rocket-sense"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
  }

  spec {
    type     = "NodePort"
    selector = local.app_labels

    port {
      name        = "http"
      port        = 80
      target_port = 8080
      node_port   = var.server_node_port
    }
  }
}

resource "kubernetes_deployment_v1" "server" {
  metadata {
    name      = "rocket-sense"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
    labels    = local.app_labels
  }

  spec {
    replicas = 1

    selector {
      match_labels = local.app_labels
    }

    template {
      metadata {
        labels = local.app_labels
      }

      spec {
        container {
          name              = "server"
          image             = var.image
          image_pull_policy = "Always"

          port {
            name           = "http"
            container_port = 8080
          }

          env {
            name  = "ROCKET_SENSE_BIND_ADDR"
            value = "0.0.0.0:8080"
          }

          env {
            name  = "ROCKET_SENSE_SERVICE_MODE"
            value = "server"
          }

          env {
            name  = "ROCKET_SENSE_RUN_REPLAY_PROCESSING_WORKERS"
            value = "false"
          }

          env {
            name  = "ROCKET_SENSE_STORAGE_ROOT"
            value = "/var/lib/rocket-sense/storage"
          }

          env {
            name  = "ROCKET_SENSE_PUBLIC_BASE_URL"
            value = var.public_base_url
          }

          env {
            name = "ROCKET_SENSE_AUTH_MODE"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "ROCKET_SENSE_AUTH_MODE"
                optional = true
              }
            }
          }

          env {
            name = "ROCKET_SENSE_APP_JWT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "ROCKET_SENSE_APP_JWT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "GOOGLE_OAUTH_CLIENT_ID"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GOOGLE_OAUTH_CLIENT_ID"
                optional = true
              }
            }
          }

          env {
            name = "GOOGLE_OAUTH_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GOOGLE_OAUTH_CLIENT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "GITHUB_OAUTH_CLIENT_ID"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GITHUB_OAUTH_CLIENT_ID"
                optional = true
              }
            }
          }

          env {
            name = "GITHUB_OAUTH_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GITHUB_OAUTH_CLIENT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "DISCORD_OAUTH_CLIENT_ID"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "DISCORD_OAUTH_CLIENT_ID"
                optional = true
              }
            }
          }

          env {
            name = "DISCORD_OAUTH_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "DISCORD_OAUTH_CLIENT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "DATABASE_URL"
            value_from {
              secret_key_ref {
                name = "rocket-sense-secrets"
                key  = "DATABASE_URL"
              }
            }
          }

          readiness_probe {
            http_get {
              path = "/api/v1/health"
              port = "http"
            }
          }

          startup_probe {
            failure_threshold = 120
            period_seconds    = 5

            http_get {
              path = "/api/v1/health"
              port = "http"
            }
          }

          liveness_probe {
            http_get {
              path = "/api/v1/health"
              port = "http"
            }
          }

          volume_mount {
            name       = "rocket-sense-storage"
            mount_path = "/var/lib/rocket-sense/storage"
          }
        }

        volume {
          name = "rocket-sense-storage"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.replay_storage.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment_v1" "worker" {
  metadata {
    name      = "rocket-sense-worker"
    namespace = kubernetes_namespace_v1.rocket_sense.metadata[0].name
    labels    = local.worker_labels
  }

  spec {
    replicas = var.worker_replicas

    selector {
      match_labels = local.worker_labels
    }

    template {
      metadata {
        labels = local.worker_labels
      }

      spec {
        container {
          name              = "worker"
          image             = var.image
          image_pull_policy = "Always"

          env {
            name  = "ROCKET_SENSE_SERVICE_MODE"
            value = "worker"
          }

          env {
            name  = "ROCKET_SENSE_STORAGE_ROOT"
            value = "/var/lib/rocket-sense/storage"
          }

          env {
            name  = "ROCKET_SENSE_BACKGROUND_PROCESSING_CONCURRENCY"
            value = tostring(var.worker_processing_concurrency)
          }

          env {
            name  = "ROCKET_SENSE_PUBLIC_BASE_URL"
            value = var.public_base_url
          }

          env {
            name = "ROCKET_SENSE_AUTH_MODE"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "ROCKET_SENSE_AUTH_MODE"
                optional = true
              }
            }
          }

          env {
            name = "ROCKET_SENSE_APP_JWT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "ROCKET_SENSE_APP_JWT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "GOOGLE_OAUTH_CLIENT_ID"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GOOGLE_OAUTH_CLIENT_ID"
                optional = true
              }
            }
          }

          env {
            name = "GOOGLE_OAUTH_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GOOGLE_OAUTH_CLIENT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "GITHUB_OAUTH_CLIENT_ID"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GITHUB_OAUTH_CLIENT_ID"
                optional = true
              }
            }
          }

          env {
            name = "GITHUB_OAUTH_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "GITHUB_OAUTH_CLIENT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "DISCORD_OAUTH_CLIENT_ID"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "DISCORD_OAUTH_CLIENT_ID"
                optional = true
              }
            }
          }

          env {
            name = "DISCORD_OAUTH_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name     = "rocket-sense-secrets"
                key      = "DISCORD_OAUTH_CLIENT_SECRET"
                optional = true
              }
            }
          }

          env {
            name = "DATABASE_URL"
            value_from {
              secret_key_ref {
                name = "rocket-sense-secrets"
                key  = "DATABASE_URL"
              }
            }
          }

          volume_mount {
            name       = "rocket-sense-storage"
            mount_path = "/var/lib/rocket-sense/storage"
          }
        }

        volume {
          name = "rocket-sense-storage"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.replay_storage.metadata[0].name
          }
        }
      }
    }
  }
}
