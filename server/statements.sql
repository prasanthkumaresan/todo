UPDATE users
SET password = "prasanth01"

SELECT *
FROM users

CREATE TABLE todolist(
    todoid TEXT NOT NULL PRIMARY KEY,
    todo VARCHAR(400),
    status VARCHAR(300),
    userid TEXT,
    CONSTRAINT fk_users
    FOREIGN KEY(userid)
    REFERENCES users(id)
    )

INSERT INTO todolist(todoid, todo, status , userid)
VALUES ("todo1", "jogging", "in progress" , "1")

UPDATE users
SET id = "1"

SELECT *
FROM todolist
