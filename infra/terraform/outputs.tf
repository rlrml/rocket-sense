output "namespace" {
  value = kubernetes_namespace_v1.rocket_sense.metadata[0].name
}

output "server_service_name" {
  value = kubernetes_service_v1.server.metadata[0].name
}

output "postgres_service_name" {
  value = kubernetes_service_v1.postgres.metadata[0].name
}
