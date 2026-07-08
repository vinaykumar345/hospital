# API Specification

REST APIs are versioned under `/api/v1`.

## Standards

- JSON request and response bodies.
- JWT bearer authentication unless explicitly public.
- Pagination uses `page`, `pageSize`, and `total`.
- Filtering uses explicit query parameters.
- All mutating requests are audit logged.
- OpenAPI documentation is exposed by the API service in non-production environments and published in CI artifacts.

## Health

`GET /api/v1/health`

Returns service status and build metadata.
