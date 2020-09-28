CREATE DATABASE db_contacts;

USE db_contacts;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR (60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

-- contacts table

drop table if exists contacts;

CREATE TABLE contacts(
    id INT(11) NOT NULL,
    name VARCHAR(150) NOT NULL,
    url VARCHAR (255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    phone VARCHAR(30), 
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE contacts   
    ADD PRIMARY KEY (id);

ALTER TABLE contacts
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE contacts;