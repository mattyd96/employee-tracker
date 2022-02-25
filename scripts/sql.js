const mysql = require("mysql2"); //sql package for making sql queries

const info = require("../credentials/credential");
const pool = mysql.createPool(info.info);
const promisePool = pool.promise();

const getAllEmployees = async () => {
    const [rows] = await promisePool.query(
        `
        SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
        concat(B.first_name,' ', B.last_name) as manager
        FROM employees A, employees B, roles, departments
        WHERE A.manager_id=B.id
        AND A.role_id=roles.id
        AND roles.department_id=departments.id
        UNION
        SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
        A.manager_id as manager
        FROM employees A, roles, departments
        WHERE A.manager_id IS NULL
        AND A.role_id=roles.id
        AND roles.department_id=departments.id
        ORDER BY id;
        `
    );
    return rows;
};

const getAllEmployeesBasic = async () => {
    const [rows] = await promisePool.query(
        `SELECT id, concat(first_name, ' ', last_name) as name FROM employees`
    );
    return rows;
};

const getManagers = async () => {
    const [rows] = await promisePool.query(
        `
        SELECT A.id, concat(A.first_name,' ', A.last_name) as name FROM employees A, employees B 
        WHERE A.id = B.manager_id
        `
    );
    return rows;
};

const getManagerFilteredEmployees = async (parameter) => {
    const [rows] = await promisePool.query(
        `
        SELECT A.id, A.first_name, A.last_name, roles.title, departments.name as department, roles.salary, 
        concat(B.first_name,' ', B.last_name) as manager
        FROM employees A, employees B, roles, departments
        WHERE A.manager_id=B.id
        AND A.manager_id=${parameter}
        AND A.role_id=roles.id
        AND roles.department_id=departments.id
        `
    );
    return rows;
};

const getDepartmentFilteredEmployees = async (parameter) => {
    let rows = await getAllEmployees();
    rows = rows.filter(employee => employee.department === parameter);
    return rows;
};

// add employee
const addEmployee = async (employee) => {
    const resolve = await promisePool.query(
        `
        INSERT INTO employees(first_name, last_name, role_id, manager_id)
        VALUES ('${employee.first_name}', '${employee.last_name}', 
                ${employee.role_id}, ${employee.manager_id})
        `
    );
};

//update employee
const updateEmployee = async (field, data, id) => {
    const resolove = await promisePool.query(
        `
        UPDATE employees 
        SET ${field}=${data}
        WHERE id=${id}
        `
    )
}

// departments

const getDepartments = async () => {
    const [rows] = await promisePool.query(
        `SELECT * FROM departments`
    );
    return rows;
};

const addDepartment = async (depName) => {
    const [rows] = await promisePool.query(
        `
        INSERT INTO departments(name)
        VALUES ('${depName}')
        `
    );
};

//roles
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

const addRole = async (role) => {
    const [rows] = await promisePool.query(
        `
        INSERT INTO roles(title, salary, department_id)
        VALUES ('${role.title}', '${role.salary}', ${role.department_id})
        `
    );
};

// general delete function
const deleteRow = async (table, id) => {
    const resolve = await promisePool.query(
        `
        DELETE FROM ${table} WHERE id=${id}
        `
    );
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


module.exports.getRoles = getRoles;
module.exports.addRole = addRole;

module.exports.deleteRow = deleteRow;