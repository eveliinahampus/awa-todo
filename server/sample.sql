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

INSERT INTO task (description) VALUES ('My task for todo');
INSERT INTO task (description) VALUES ('Another task for todo');

INSERT INTO account (email, password) VALUES ('eve@gmail.com', 'todo123');

psql -h localhost -U postgres -d todo
psql -h localhost -U postgres -d test_todo

DELETE FROM account WHERE id='{insert row}';

CREATE database todo;

CREATE database test_todo;

