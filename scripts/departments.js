// Departments queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const cTable = require('console.table'); // package for diaplaying database tables in console

const sql = require('./sql');

const viewDepartments = async () => {
    const departments = await sql.getDepartments();
    console.log('\n');
    console.table(departments);
};

module.exports.viewDepartments = viewDepartments;