create table discipline_teacher (
  discipline integer not null references discipline(id) on delete cascade,
  teacher UUID not null references teacher(id) on delete cascade,
  primary key (discipline, teacher)
);

alter table discipline drop column if exists teacher;