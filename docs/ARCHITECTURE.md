# Architecture

## System Context

```mermaid
flowchart LR
  Staff[Hospital Staff Web Users] --> Web[React Web App]
  Patient[Patients] --> Mobile[Flutter Mobile App]
  Web --> API[NestJS REST API]
  Mobile --> API
  API --> Postgres[(PostgreSQL)]
  API --> Redis[(Redis)]
  API --> Search[(Elasticsearch)]
  API --> S3[(AWS S3)]
  API --> AI[AI Provider Gateway]
  API --> Notify[Email/SMS/Push/WhatsApp Providers]
```

## Backend Layout

```mermaid
flowchart TB
  API[NestJS API] --> Auth[Authentication]
  API --> Tenancy[Tenancy]
  API --> RBAC[RBAC]
  API --> Hospital[Hospital Management]
  API --> Clinical[Clinical Modules]
  API --> Finance[Billing and Insurance]
  API --> Agents[AI Agent Runtime]
  API --> Audit[Audit Logging]
```

## Tenancy Model

All tenant-owned records include `tenant_id`. API requests resolve tenant context from authenticated claims and verified domain mappings. Database policies and service-layer guards enforce isolation.
