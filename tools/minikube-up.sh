#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1"
    exit 1
  fi
}

require_cmd minikube
require_cmd kubectl
require_cmd docker

if command -v colima >/dev/null 2>&1; then
  if ! docker info >/dev/null 2>&1; then
    echo "Starting colima for local Docker daemon..."
    colima start
  fi
fi

echo "Starting minikube cluster (qemu + containerd)..."
minikube start --driver=qemu --container-runtime=containerd --cpus=2 --memory=4096

echo "Building container images..."
docker build -f apps/api/Dockerfile -t ai-hospital-assistant/api:latest .
docker build -f apps/web/Dockerfile -t ai-hospital-assistant/web:latest .

echo "Loading images into minikube..."
minikube image load ai-hospital-assistant/api:latest
minikube image load ai-hospital-assistant/web:latest

echo "Applying Kubernetes manifests..."
kubectl apply -f infra/k8s/base/namespace.yaml
kubectl apply -f infra/k8s/base/api-configmap.yaml
kubectl apply -f infra/k8s/base/api-secret.local.yaml
kubectl apply -f infra/k8s/base/api-deployment.yaml
kubectl apply -f infra/k8s/base/api-service.yaml
kubectl apply -f infra/k8s/base/web-deployment.yaml
kubectl apply -f infra/k8s/base/web-service.yaml

echo "Waiting for rollouts..."
kubectl -n ai-hospital-assistant rollout status deployment/api --timeout=240s
kubectl -n ai-hospital-assistant rollout status deployment/web --timeout=240s

echo "Refreshing local port-forwards..."
if [[ -f /tmp/kpf-api.pid ]]; then
  kill "$(cat /tmp/kpf-api.pid)" 2>/dev/null || true
fi
if [[ -f /tmp/kpf-web.pid ]]; then
  kill "$(cat /tmp/kpf-web.pid)" 2>/dev/null || true
fi

kubectl -n ai-hospital-assistant port-forward svc/api 3000:80 >/tmp/kpf-api.log 2>&1 &
echo $! >/tmp/kpf-api.pid
kubectl -n ai-hospital-assistant port-forward svc/web 8080:80 >/tmp/kpf-web.log 2>&1 &
echo $! >/tmp/kpf-web.pid

echo "Done."
echo "API: http://127.0.0.1:3000/api/v1/health"
echo "Web: http://127.0.0.1:8080/"
