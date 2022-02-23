USE employee_tracker_db;

INSERT INTO departments (id, name)
VALUES (1, 'first'),
       (2, 'second'),
       (3, 'third'),
       (4, 'fourth');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'intern', 50.5, 1),
       (2, 'manager', 100.3, 2),
       (3, 'engineer', 85.3, 3);


INSERT INTO employees(id, first_name, last_name, role_id, manager_id)
VALUES (1, 'matt', 'a', 1, 1),
       (2, 'matt', 'b', 2, 1),
       (3, 'matt', 'b', 3, 1),
       (4, 'matt', 'b', 1, 1);