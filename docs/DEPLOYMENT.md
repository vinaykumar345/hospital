# Deployment Guide

## Local Services

Use Docker Compose for local PostgreSQL, Redis, Elasticsearch, Loki, Prometheus, and Grafana.

```bash
docker compose -f infra/docker/docker-compose.yml up
```

## Render Dev Environment

The repository includes `render.yaml` for a development Blueprint. It creates:

- `ai-hospital-assistant-api-dev` from `apps/api/Dockerfile`
- `ai-hospital-assistant-web-dev` from `apps/web/Dockerfile`
- Render Postgres for `DATABASE_URL`
- Render Key Value for `REDIS_URL`

Deploy from the Render dashboard:

1. Connect the GitHub repository to Render.
2. Choose **New > Blueprint** and select this repository.
3. Confirm the services from `render.yaml`.
4. Enter prompted secret values:
   - `CORS_ORIGIN`: set this to the exact Render web URL (or comma-separated allowlist), for example `https://ai-hospital-assistant-web-dev.onrender.com`.
   - `S3_BUCKET`: use a dev bucket name, or a placeholder until uploads are wired.
   - `ELASTICSEARCH_URL`: use a managed Elasticsearch/OpenSearch endpoint, or a placeholder until search is tested.
5. Deploy the Blueprint.
6. Confirm API startup succeeds with the configured `CORS_ORIGIN`; production startup now rejects wildcard origins.

The API health check is:

```text
/api/v1/health
```

The current SQL migrations live in `apps/api/migrations`. Until a migration runner is added, apply these migrations to the Render Postgres database before testing workflows that write or read tenant data.

## Kubernetes

Base manifests live in `infra/k8s/base`. Environment overlays will be added as deployment hardening progresses.

## Secrets

Never commit production secrets. Configure secrets through the target cloud secret manager and mount them into Kubernetes workloads.

## Observability

Local observability uses Prometheus, Grafana, Loki, Promtail, and OpenTelemetry Collector through `infra/docker/docker-compose.yml`.

The API should emit request IDs, metrics, logs, and traces so audit events can be correlated with application telemetry.

## CI/CD

GitHub Actions workflows:

- `.github/workflows/ci.yml` runs workspace verification, build hooks, Dockerfile checks, and Kubernetes manifest checks.
- `.github/workflows/release.yml` builds API and web container images from a manually supplied image tag.

## Kubernetes Manifests

Base manifests in `infra/k8s/base` include namespace, API deployment/service, web deployment/service, ingress, HPAs, API config, secret example, and observability config.

Apply secrets from a secure secret manager before deploying production workloads.

## Production Gate

Before production release, complete `docs/PRODUCTION_HARDENING.md` and run:

```bash
npm run test
```
