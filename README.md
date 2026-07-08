# AI Hospital Assistant

Production-oriented monorepo for a multi-tenant healthcare SaaS platform serving hospitals, clinics, diagnostic centers, and telemedicine providers.

AI Hospital Assistant helps healthcare teams with administration, documentation, patient communication, and operational insights. AI-generated content is always treated as assistive and must be reviewed by qualified healthcare professionals before use.

## Workspace

- `apps/api` - NestJS REST API.
- `apps/web` - React web application.
- `apps/mobile` - Flutter mobile application.
- `packages/shared` - Shared TypeScript contracts and constants.
- `infra` - Docker, Kubernetes, and observability configuration.
- `docs` - Product, architecture, database, API, deployment, and user documentation.
- `tools` - Local verification utilities.

## Quick Start

```bash
npm install
npm run verify
npm run test
```

Copy `.env.example` to `.env` and configure secrets before running services.

## Module Status

1. Project setup - complete
2. Authentication - complete
3. Multi-tenant hospital setup - complete
4. Role-based access control - complete
5. Hospital management - complete
6. Staff management - complete
7. Patient management - complete
8. Appointment system - complete
9. Reception dashboard - complete
10. Doctor dashboard - complete
11. Nurse dashboard - complete
12. Laboratory module - complete
13. Pharmacy module - complete

The build proceeds in the requested module order. Each module must pass verification, documentation, and security review before the next module begins.

## Safety Notice

AI-generated content. Please review before use.

AI output in this product is a support tool only. It must not be presented as a final diagnosis, treatment decision, or replacement for licensed medical judgment.
