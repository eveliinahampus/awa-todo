DROP table if exists task;
DROP table if exists account;

CREATE table account (
    id serial primary key,
    email varchar(50) not null,
    password varchar(255) not null
);

CREATE table task (
    id serial primary key,
    description varchar(255) not null
);

INSERT INTO task (description) VALUES ('My task for todo, local file');
INSERT INTO task (description) VALUES ('Another task for todo, local file');