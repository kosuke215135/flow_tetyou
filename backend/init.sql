CREATE DATABASE flow_tetyou
CREATE TABLE flow_tetyou.notes (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT (CURRENT_DATE),
    text LONGTEXT NOT NULL,
    PRIMARY KEY (id)
);