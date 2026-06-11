variable "kubeconfig_path" {
  description = "Path to the kubeconfig for the target k3s cluster."
  type        = string
  default     = null
}

variable "kube_context" {
  description = "Optional kubeconfig context to use."
  type        = string
  default     = null
}

variable "namespace" {
  description = "Kubernetes namespace for Rocket Sense."
  type        = string
  default     = "rocket-sense"
}

variable "image" {
  description = "Rocket Sense server image to deploy."
  type        = string
  default     = "localhost:5279/rocket-sense-server:dev"
}

variable "storage_class_name" {
  description = "StorageClass for local single-node PVCs."
  type        = string
  default     = "local-path"
}

# NOTE: the local-path provisioner ignores PVC capacity requests entirely — a
# PVC is a plain hostPath directory with no quota, bounded only by the node
# disk (a 10Gi claim held 231G when the node filled on 2026-06-11). These
# sizes are documentation, not enforcement. They also cannot be changed on a
# bound PVC: local-path does not support volume expansion, so the API server
# rejects the update and forcing replacement would delete the data. Real
# protection comes from the disk-usage-watchdog CronJob and the kubelet
# eviction thresholds configured on the host.
variable "postgres_storage_size" {
  description = "Postgres PVC size (advisory only; not enforced by local-path)."
  type        = string
  default     = "10Gi"
}

variable "replay_storage_size" {
  description = "Rocket Sense replay/artifact PVC size (advisory only; not enforced by local-path)."
  type        = string
  default     = "50Gi"
}

variable "disk_usage_watchdog_schedule" {
  description = "Cron schedule for the node disk / Postgres bloat watchdog."
  type        = string
  # Daily at 09:23 UTC (01:23 PT).
  default = "23 9 * * *"
}

variable "disk_usage_alert_percent" {
  description = "Node disk usage percentage at which the watchdog alerts (kubelet eviction starts around 95%+)."
  type        = number
  default     = 80
}

variable "server_node_port" {
  description = "NodePort exposed on railbird-sf for the host nginx reverse proxy."
  type        = number
  default     = 30080
}

variable "worker_replicas" {
  description = "Number of replay processing worker pods."
  type        = number
  default     = 1
}

variable "worker_processing_concurrency" {
  description = "Number of replay processing jobs each worker pod can run concurrently."
  type        = number
  default     = 1
}

variable "public_base_url" {
  description = "Public HTTPS origin used for OAuth redirect URI construction."
  type        = string
  default     = "https://rocket-sense.duckdns.org"
}
