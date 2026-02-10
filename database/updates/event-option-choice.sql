create table event_option_choice (
    event UUID not null references event(id) on delete cascade,
    option integer not null references event_option(id) on delete cascade,
    primary key (event, option)
);