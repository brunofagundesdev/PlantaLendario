create table account (
	id UUID primary key default gen_random_uuid(),
	name varchar(100) not null,
	email varchar(254) unique not null,
	password varchar(255) not null,
	created_at timestamp default now() not null
);

create table role (
	id UUID primary key default gen_random_uuid(),
	name varchar(100) not null
);

create table account_role (
	account UUID not null references account(id) on delete cascade,
	role UUID not null references role(id) on delete cascade,
	primary key (account, role)
);

create table teacher (
	id UUID primary key default gen_random_uuid(),
	name varchar(100) not null,
	email varchar(254) unique,
	telephone varchar(11) unique
);

create table timetable (
	id SERIAL primary key,
	dow integer check(dow between 0 and 6) null,
	start_time time not null,
	end_time time null,
    check(end_time > start_time or end_time is null)
);

create table event_type (
	id SERIAL primary key,
	name varchar(100) unique
);

create table event_specification (
	id SERIAL primary key,
	event_type integer not null references event_type(id),
	name varchar(100) unique not null
);

create table event_option (
	id SERIAL primary key,
	event_specification integer not null references event_specification(id) on delete cascade,
	name varchar(100)
);

create table event (
	id UUID primary key default gen_random_uuid(),
	title varchar(100),
	description text,
	event_type integer not null references event_type(id),
	created_at timestamp default now() not null,
	created_by UUID not null references account(id),
	updated_by UUID references account(id) null,
	updated_at timestamp null
);

create table event_revision (
    id UUID primary key default gen_random_uuid(),
    event UUID not null references event(id) on delete cascade,
    requested_by UUID not null references account(id),
    message text not null,
	status varchar(20) check (status in ('pending', 'approved', 'rejected')) default 'pending' not null,
    created_at timestamp default now() not null,
    reviewed_by UUID references account(id),
    reviewed_at timestamp
);

create table discipline (
	id SERIAL primary key,
	name varchar(100) not null unique,
	teacher UUID not null references teacher(id)
);

create table location (
    id serial primary key,
    name varchar(200) not null,
    type varchar(50) check (type in ('room', 'pavilion', 'sub', 'special', 'outside')) not null,
    parent_id integer references location(id) on delete cascade,
    normalized_name varchar(200) not null
);

create table schedule (
	id SERIAL primary key,
	event UUID not null references event(id),
	date date not null,
	timetable integer not null references timetable(id),
	location integer references location(id)
);

create table lesson (
	id SERIAL primary key,
	discipline integer references discipline(id) on delete cascade,
	timetable integer not null unique references timetable(id)
);

create table assessment (
    event UUID primary key references event(id) on delete cascade,
	discipline integer not null references discipline(id),
	weight float check (weight between 0 and 10),
	trimester integer check(trimester between 1 and 3) not null,
	lesson integer references lesson(id) null,
	recovery boolean default false not null
);

create table file (
	id UUID primary key default gen_random_uuid(),
	title varchar(200) not null,
	url text not null unique
);

create table event_file (
	event UUID not null references event(id) on delete cascade,
	file UUID not null references file(id) on delete cascade,
	primary key (event, file)
);

create table discipline_file (
	discipline integer not null references discipline(id) on delete cascade,
	file UUID not null unique references file(id) on delete cascade,
	primary key (discipline, file)
);

create table support (
	id UUID primary key,
	timetable integer not null references timetable(id),
	location integer not null references location(id),
	discipline integer not null references discipline(id) on delete cascade
);

create table register (
	id UUID primary key,
	resume text not null,
	date date not null,
	location integer not null references location(id),
	lesson integer not null references lesson(id),
	timetable integer not null references timetable(id),
	created_at timestamp default now() not null, 
	created_by UUID not null references account(id),
	updated_by UUID references account(id) null,
	updated_at timestamp null
);

create table announcement (
	id UUID primary key,
	title varchar(200) not null,
	message text null,
	created_at timestamp default now() not null,
	created_by UUID not null references account(id),
	updated_by UUID references account(id) null,
	updated_at timestamp null
);

create table announcement_file (
	announcement UUID not null references announcement(id) on delete cascade,
	file UUID not null references file(id) on delete cascade,
	primary key (announcement, file)
);

create table list (
	id UUID primary key,
	title varchar(150),
	description text null,
	file UUID references file(id) null,
	discipline integer not null references discipline(id),
	created_at timestamp default now() not null,
	created_by UUID not null references account(id),
	updated_by UUID references account(id) null,
	updated_at timestamp null
);