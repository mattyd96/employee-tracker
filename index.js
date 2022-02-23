const inquirer = require('inquirer'); //inquirer package for cli interface
const mysql = require('mysql2'); //sql package for making sql queries
const cTable = require('console.table'); // package for diaplaying database tables in console

// Global Variables
// Inquirer variables
const questions = [
    {
        type: 'list',
        message: `What would you like to do? `,
        name: 'action',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    },
];

// Inquirer Function
const inquire = () => {
    inquirer.prompt(questions).then((response) => {
        //do something
    });
};