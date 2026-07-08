# Deployment Guide

## Local Services

Use Docker Compose for local PostgreSQL, Redis, Elasticsearch, Loki, Prometheus, and Grafana.

```bash
docker compose -f infra/docker/docker-compose.yml up
```

## Kubernetes

Base manifests live in `infra/k8s/base`. Environment overlays will be added as deployment hardening progresses.

## Secrets

Never commit production secrets. Configure secrets through the target cloud secret manager and mount them into Kubernetes workloads.

## Observability

Local observability uses Prometheus, Grafana, Loki, Promtail, and OpenTelemetry Collector through `infra/docker/docker-compose.yml`.

The API should emit request IDs, metrics, logs, and traces so audit events can be correlated with application telemetry.
