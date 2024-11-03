CREATE table task (
    id serial primary key,
    description varchar(255) not null
);

INSERT INTO task (description) VALUES ('My task');
INSERT INTO task (description) VALUES ('Another task');