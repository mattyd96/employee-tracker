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


-- SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
-- A.manager_id as manager
-- FROM employees A, employees B, roles, departments
-- WHERE (A.manager_id=B.id OR A.manager_id=NULL)
-- AND A.role_id=roles.id
-- AND roles.department_id=departments.id
-- ORDER BY id;

SELECT departments.name, SUM(roles.salary) AS Budget FROM employees, roles, departments
WHERE employees.role_id = roles.id
AND departments.id = 4
AND roles.department_id = 4;