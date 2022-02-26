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

// view department budget
const viewBudget = async () => {
    const departments = await sql.getDepartments();
    const selections = departments.map(dep => `${dep.id}. ${dep.name}`);

    const response = await inquirer.prompt({
        type: "list",
        message: `which department's budget do you want to view? `,
        name: "dep",
        choices: selections
    });

    const [target] = response.dep.split('.');
    const result = await sql.viewDepBudget(target);
    console.log('\n');
    console.table(result);
};

const manageDepartments = async () => {
    const response = await inquirer.prompt({
        type: "list",
        message: `What would you like to do? `,
        name: "action",
        choices: ['Add Department', 'Delete Department','View Department Budget', 'Go Back To Menu'],
    });

    if (response.action === 'Add Department') {
        const resolved = await addDepartment();
    } else if (response.action === 'Delete Department') {
        const resolved = await deleteDepartment();
    } else if (response.action === 'View Department Budget') {
        const resolved = await viewBudget();
    }
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

    const [target] = response.delete.split('.');
    sql.deleteRow('departments', target);
};

module.exports.viewDepartments = viewDepartments;
module.exports.manageDepartments = manageDepartments;