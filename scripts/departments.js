// Departments queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const cTable = require('console.table'); // package for diaplaying database tables in console

const sql = require('./sql'); //sql query file

// view all departments
const viewDepartments = async () => {
    const departments = await sql.getDepartments();
    console.log('\n');
    console.table(departments);
};

// add a department
const addDepartment = async () => {
    const response = await inquirer.prompt({
        type: "input",
        message: `What is the department's name? `,
        name: "department",
    });

    sql.addDepartment(response.department);
};

// delete a department
const deleteDepartment = async () => {
    const departments = await sql.getDepartments();
    const selections = departments.map(dep => `${dep.id}. ${dep.name}`);

    const response = await inquirer.prompt({
        type: "list",
        message: `which department do you want to delete? `,
        name: "delete",
        choices: selections
    });

    sql.deleteDepartment(response.delete[0]);
};

module.exports.viewDepartments = viewDepartments;
module.exports.addDepartment = addDepartment;
module.exports.deleteDepartment = deleteDepartment;