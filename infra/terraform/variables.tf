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

variable "postgres_storage_size" {
  description = "Postgres PVC size."
  type        = string
  default     = "10Gi"
}

variable "replay_storage_size" {
  description = "Rocket Sense replay/artifact PVC size."
  type        = string
  default     = "50Gi"
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
