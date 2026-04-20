alter table announcement alter column id set default gen_random_uuid();
alter table support alter column id set default gen_random_uuid();
alter table register alter column id set default gen_random_uuid();