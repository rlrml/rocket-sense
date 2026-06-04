locals {
  app_name = "rocket-sense"

  app_labels = {
    "app.kubernetes.io/name"      = local.app_name
    "app.kubernetes.io/component" = "server"
  }

  postgres_labels = {
    "app.kubernetes.io/name"      = local.app_name
    "app.kubernetes.io/component" = "postgres"
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
