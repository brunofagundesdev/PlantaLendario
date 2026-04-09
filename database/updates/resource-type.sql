create table resource_type (
  id serial primary key,
  name varchar(100) not null
);

alter table resource 
drop column type;

alter table resource
add column type int references resource_type(id) not null;