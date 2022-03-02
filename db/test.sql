-- SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
-- concat(B.first_name,' ', B.last_name) as manager
-- FROM employees A, employees B, roles, departments
-- WHERE A.manager_id=B.id
-- AND A.role_id=roles.id
-- AND roles.department_id=departments.id
-- UNION
-- SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
-- A.manager_id as manager
-- FROM employees A, roles, departments
-- WHERE A.manager_id IS NULL
-- AND A.role_id=roles.id
-- AND roles.department_id=departments.id
-- ORDER BY id;

-- THIS ONE IS USED FOR EMPLOYEE VIEW------------------------------------------------------------------

-- SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
--        CONCAT(B.first_name,' ', B.last_name) as manager
-- FROM employees A
-- LEFT JOIN employees B ON B.id = A.manager_id
-- JOIN roles ON A.role_id = roles.id
-- JOIN departments ON roles.department_id = departments.id
-- ORDER BY A.id;

---------------------------------------------------------------------------------------------------------

-- Department salary sum test

-- SELECT departments.name, SUM(roles.salary) AS Budget FROM employees, roles, departments
-- WHERE employees.role_id = roles.id
-- AND departments.id = 4
-- AND roles.department_id = 4;