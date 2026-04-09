create table location_type (
  id serial primary key,
  name varchar(100) not null
);

alter table location 
drop column type;

alter table location
add column type int references location_type(id) not null;