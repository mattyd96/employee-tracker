USE employee_tracker_db;

INSERT INTO departments (name)
VALUES ('House of the Wolf'),
       ('Aretuza'),
       ('House Stark'),
       ('Section 9');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lord', 50000, 3),
       ('Commander', 10000, 3),
       ('Witcher', 100000, 1),
       ('Magician', 3000000,2),
       ('Agent', 85000, 4),
       ('spy', 50000, 4),
       ('Musician', 500, 1),
       ('Assassin', 1, 3);


INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Yennefer', 'of Vengerberg', 4, NULL),
       ('Geralt', 'of Rivia', 3, 1),
       ('Cirilla', 'Riannon', 3, 1),
       ('Julian', 'Pankratz', 7, 2),
       ('Triss', 'Merigold', 4, NULL),
       ('Eddard', 'Stark', 1, 1),
       ('John', 'Snow', 2, NULL),
       ('Arya', 'Stark', 8, 7),
       ('Elden', 'One', 1, NULL),
       ('Motoko', 'Kusanagi', 5, NULL),
       ('Batou', 'Buttetsu', 6, 10);