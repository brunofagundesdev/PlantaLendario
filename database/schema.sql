create table user (
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

create table user_role (
	user UUID references user(id) not null on delete cascade,
	role UUID references role(id) not null on delete cascade,
	primary key (user, role)
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
	start time not null,
	end time null,
    check(end > start or end is null)
);

create table event_type (
	id SERIAL primary key,
	name varchar(100) unique
);

create table event_specification (
	id SERIAL primary key,
	event_type integer references event_type(id) not null,
	name varchar(100) unique not null
);

create table event_option (
	id SERIAL primary key,
	event_specification integer references event_specification(id) on delete cascade,
	name varchar(100)
);

create table event (
	id UUID primary key default gen_random_uuid(),
	title varchar(100),
	description text,
	event_type integer references event_type(id) not null,
	created_at timestamp default now() not null,
	created_by UUID references user(id) not null,
	updated_by UUID references user(id) null,
	updated_at timestamp null
);

create table event_revision (
    id UUID primary key default gen_random_uuid(),
    event UUID references event(id) on delete cascade not null,
    requested_by UUID references user(id) not null,
    message text not null,
	status varchar(20) check (status in ('pending', 'approved', 'rejected')) default 'pending' not null,
    created_at timestamp default now() not null,
    reviewed_by UUID references user(id),
    reviewed_at timestamp
);

create table discipline (
	id SERIAL primary key,
	name varchar(100) not null unique,
	teacher UUID references teacher(id) not null
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
	event UUID references event(id) not null,
	date date not null,
	timetable references timetable(id) not null,
	location references location(id)
);

create table lesson (
	id SERIAL primary key,
	discipline integer references discipline(id) on delete cascade,
	timetable integer references timetable(id) unique
);

create table assessment (
    event UUID primary key references event(id) on delete cascade,
	discipline integer references discipline(id) not null,
	weight float check (weight between 0 and 10),
	trimester integer check(trimester between 1 and 3) not null,
	lesson integer references lesson(id) null,
	recovery boolean default false not null
);

create table file (
	id UUID primary key gen_random_uuid(),
	title varchar(200) not null,
	url text not null unique
);

create table event_file (
	event UUID references event(id) not null on delete cascade,
	file UUID references file(id) not null on delete cascade,
	primary key (event, file)
);

create table discipline_file (
	discipline integer references discipline(id) on delete cascade,
	file UUID references file(id) unique on delete cascade,
	primary key (discipline, file)
);

create table support (
	id UUID primary key,
	timetable integer references timetable(id) not null,
	location integer references location(id) not null,
	discipline integer references discipline(id) not null on delete cascade
);

create table register (
	id UUID primary key,
	resume text not null,
	date date not null,
	location integer references location(id) not null,
	lesson integer references lesson(id) not null,
	timetable integer references timetable(id) not null,
	created_at timestamp default now() not null, 
	created_by UUID references user(id) not null,
	updated_by UUID references user(id) null,
	updated_at timestamp null
);

create table announcement (
	id UUID primary key,
	title varchar(200) not null,
	message text null,
	created_at timestamp default now() not null,
	created_by UUID references user(id) not null,
	updated_by UUID references user(id) null,
	updated_at timestamp null
);

create table announcement_file (
	announcement UUID references announcement(id) not null on delete cascade,
	file UUID references file(id) not null on delete cascade,
	primary key (announcement, file)
);

create table list (
	id UUID primary key,
	title varchar(150),
	description text null,
	file UUID references file(id) null,
	discipline integer references discipline(id) not null,
	created_at timestamp default now() not null,
	created_by UUID references user(id) not null,
	updated_by UUID references user(id) null,
	updated_at timestamp null
);