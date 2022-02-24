USE employee_tracker_db;

INSERT INTO departments (name)
VALUES ('management'),
       ('IT'),
       ('Sales'),
       ('espionage'),
       ('security'),
       ('buying'),
       ('sabotage');

INSERT INTO roles (title, salary, department_id)
VALUES ('intern', 50000, 4),
       ('manager', 100000, 1),
       ('engineer', 85000, 7),
       ('buyer', 85000, 6),
       ('spy', 85000, 4);


INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('matt', 'a', 1, NULL),
       ('matt', 'b', 2, NULL),
       ('matt', 'c', 3, 1),
       ('matt', 'd', 1, 2);