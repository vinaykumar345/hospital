# Module 27: Monitoring and Logging

## Understand

Monitoring and logging provide Prometheus metrics, Grafana dashboards, Loki logs, Promtail collection, and OpenTelemetry trace/metric collection.

## Infrastructure

- Prometheus scrape config
- Grafana dashboard seed
- Loki config
- Promtail config
- OpenTelemetry Collector config
- Kubernetes observability ConfigMap

## Security Rules

- Logs must not include secrets.
- PHI must be minimized in application logs.
- Audit IDs and request IDs should be used for correlation.

## Tests

Run `npm run test` from the repository root.
