alter table audit_events add column if not exists request_id text null;
alter table audit_events add column if not exists entity_type text null;
alter table audit_events add column if not exists entity_id uuid null;
alter table audit_events add column if not exists ip_address inet null;
alter table audit_events add column if not exists user_agent text null;

create index if not exists audit_events_actor_idx on audit_events (tenant_id, actor_user_id, created_at desc);
create index if not exists audit_events_entity_idx on audit_events (tenant_id, entity_type, entity_id, created_at desc);
create index if not exists audit_events_event_type_idx on audit_events (tenant_id, event_type, created_at desc);
