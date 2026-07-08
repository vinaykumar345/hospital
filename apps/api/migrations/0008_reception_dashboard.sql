create or replace view reception_dashboard_queue_summary as
select
  a.tenant_id,
  a.starts_at::date as service_date,
  count(*) filter (where a.source = 'WALK_IN') as walk_ins,
  count(*) filter (where aq.queue_status = 'WAITING') as waiting,
  count(*) filter (where aq.queue_status = 'CALLED') as called,
  count(*) filter (where a.status = 'CHECKED_IN') as checked_in
from appointments a
left join appointment_queue aq on aq.appointment_id = a.id
group by a.tenant_id, a.starts_at::date;
