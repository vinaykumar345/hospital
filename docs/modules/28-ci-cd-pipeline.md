# Module 28: CI/CD Pipeline

## Understand

CI/CD validates code, documentation, Dockerfiles, Kubernetes manifests, and release image builds.

## Workflows

- `ci.yml` runs tests, build hooks, Dockerfile checks, and Kubernetes manifest checks.
- `release.yml` builds API and web images through manual dispatch.

## Security Rules

- Production registry credentials must be configured through GitHub encrypted secrets.
- Release workflow must not contain hard-coded credentials.
- Deployment promotion should require environment approvals.

## Tests

Run `npm run test` from the repository root.
