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
  description = <<-EOT
    Max replay processing jobs a worker pod parses concurrently. Each parse holds
    the decoded replay + its event set in memory (~1-2 GiB), so this trades
    throughput against the worker pod memory limit; the code hard-caps it at 4
    (MAX_REPLAY_PROCESSING_CONCURRENCY) regardless of this value.
  EOT
  type        = number
  default     = 2
}

# Memory limits exist to contain a runaway replay-processing job to its own pod
# cgroup. On 2026-06-25 a single job's in-heap event materialization grew to
# ~31G on a 31Gi host (no limits set), exhausting host RAM and hard-rebooting
# railbird-sf in a loop. With a limit the kernel OOM-kills just the pod, the
# host stays up, and apalis marks the job failed instead of taking the node
# down. Keep the worker limit comfortably below host RAM minus Postgres.
variable "worker_memory_limit" {
  description = "Memory limit for each replay processing worker pod (cgroup OOM cap)."
  type        = string
  default     = "8Gi"
}

variable "worker_memory_request" {
  description = "Memory request for each replay processing worker pod."
  type        = string
  default     = "512Mi"
}

variable "server_memory_limit" {
  description = "Memory limit for the API server pod (does not process replays; bounds stat-query memory)."
  type        = string
  default     = "4Gi"
}

variable "server_memory_request" {
  description = "Memory request for the API server pod."
  type        = string
  default     = "256Mi"
}

variable "public_base_url" {
  description = "Public HTTPS origin used for OAuth redirect URI construction."
  type        = string
  default     = "https://rocket-sense.duckdns.org"
}
