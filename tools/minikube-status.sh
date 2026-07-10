#!/usr/bin/env bash
set -euo pipefail

if ! command -v minikube >/dev/null 2>&1; then
  echo "minikube not installed"
  exit 1
fi

minikube status || true
kubectl get ns ai-hospital-assistant >/dev/null 2>&1 || {
  echo "namespace ai-hospital-assistant not found"
  exit 0
}

kubectl -n ai-hospital-assistant get deploy,svc,pods

echo "API health: http://127.0.0.1:3000/api/v1/health"
echo "Web: http://127.0.0.1:8080/"
