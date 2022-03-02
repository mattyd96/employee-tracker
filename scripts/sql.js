const mysql = require("mysql2"); //sql package for making sql queries
require('dotenv').config();


//-------------------------------------------- Connection --------------------------------------------------//
const info = {
    host: 'localhost',
    user: process.env.USER_NAME,
    password: process.env.PSWRD_NAME,
    database: process.env.DB_NAME
}

const pool = mysql.createPool(info); //create pool for sql database connections
const promisePool = pool.promise(); //promise form of mysql pool



//--------------------------------------------- Employee Queries --------------------------------------------//

// Get all employees (verbose) -> gets all data needed for display
const getAllEmployees = async () => {
    const [rows] = await promisePool.query(
        `
        SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
        CONCAT(B.first_name,' ', B.last_name) as manager
        FROM employees A
        LEFT JOIN employees B ON B.id = A.manager_id
        JOIN roles ON A.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        ORDER BY A.id;
        `
    );
    return rows;
};

// Get all employees (minimal) -> list of employees for creating selection lists with enquirer
const getAllEmployeesBasic = async () => {
    const [rows] = await promisePool.query(
        `SELECT id, concat(first_name, ' ', last_name) as name FROM employees`
    );
    return rows;
};

// Get all Managers -> an employee that is designated as the manager of another
const getManagers = async () => {
    const [rows] = await promisePool.query(
        `
        SELECT A.id, concat(A.first_name,' ', A.last_name) as name FROM employees A, employees B 
        WHERE A.id = B.manager_id
        GROUP BY A.id
        `
    );
    return rows;
};

// Get all employees under a specified manager -> takes employee.id
const getManagerFilteredEmployees = async (parameter) => {
    const [rows] = await promisePool.query(
        `
        SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
        concat(B.first_name,' ', B.last_name) as manager
        FROM employees A, employees B, roles, departments
        WHERE A.manager_id=B.id
        AND A.manager_id=?
        AND A.role_id=roles.id
        AND roles.department_id=departments.id
        `
    , parameter);
    return rows;
};

// Get employees filtered by department -> takes in department id
const getDepartmentFilteredEmployees = async (parameter) => {
    let rows = await getAllEmployees();
    rows = rows.filter(employee => employee.department === parameter);
    return rows;
};

// Add employee -> takes in employee object
const addEmployee = async (employee) => {
    const resolve = await promisePool.query(
        `
        INSERT INTO employees(first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
        `
    ,[employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
};

// Update employee -> takes in the field to be updated, the new data, and employee id
const updateEmployee = async (field, data, id) => {
    const resolove = await promisePool.query(
        `
        UPDATE employees 
        SET ${field}=?
        WHERE id=?
        `
    ,[data, id]);
}



//--------------------------------------------- Department Queries --------------------------------------------//

// Get all Departments
const getDepartments = async () => {
    const [rows] = await promisePool.query(
        `SELECT * FROM departments`
    );
    return rows;
};

// Add Department -> takes in a name string
const addDepartment = async (depName) => {
    const [rows] = await promisePool.query(
        `
        INSERT INTO departments(name)
        VALUES (?)
        `
    , depName);
};

// View sum of salaries for all employees in a department -> takes in department id
const viewDepBudget = async (id) => {
    const [rows] = await promisePool.query(
        `
        SELECT departments.name AS department, SUM(roles.salary) AS budget FROM employees, roles, departments
        WHERE employees.role_id = roles.id
        AND departments.id = ?
        AND roles.department_id = ?;
        `
    ,[id, id]);
    return rows;
};



//--------------------------------------------- Role Queries --------------------------------------------//

// Get all Roles for Display
const getRoles = async () => {
    const [rows] = await promisePool.query(
        `
        SELECT roles.id, roles.title, departments.name as department, roles.salary  FROM roles, departments
        WHERE roles.department_id=departments.id
        ORDER BY id;
        `
    );
    return rows;
};

// Add Role
const addRole = async (role) => {
    const [rows] = await promisePool.query(
        `
        INSERT INTO roles(title, salary, department_id)
        VALUES (?, ?, ?)
        `
    ,[role.title, role.salary, role.department_id]);
};



//--------------------------------------------- General Queries --------------------------------------------//

// Delete a Row in any table -> takes in table name and id of row
const deleteRow = async (table, id) => {
    const resolve = await promisePool.query(
        `
        DELETE FROM ${table} WHERE id= ?
        `
    ,id);
};

module.exports.getAllEmployees = getAllEmployees;
module.exports.getAllEmployeesBasic = getAllEmployeesBasic;
module.exports.getManagers = getManagers;
module.exports.getManagerFilteredEmployees = getManagerFilteredEmployees;
module.exports.getDepartmentFilteredEmployees = getDepartmentFilteredEmployees;
module.exports.addEmployee = addEmployee;
module.exports.updateEmployee = updateEmployee;

module.exports.getDepartments = getDepartments;
module.exports.addDepartment = addDepartment;
module.exports.viewDepBudget = viewDepBudget;


module.exports.getRoles = getRoles;
module.exports.addRole = addRole;

module.exports.deleteRow = deleteRow;