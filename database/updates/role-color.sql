alter table role
add column color varchar(7)
not null
default '#000000'
check (
  color ~ '(?i)^#([0-9a-f]{3}|[0-9a-f]{6})$'
);