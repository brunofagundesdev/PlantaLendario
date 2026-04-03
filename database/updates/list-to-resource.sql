alter table list rename to resource;
alter table resource
add column type text check(type in ('list', 'material')) not null;