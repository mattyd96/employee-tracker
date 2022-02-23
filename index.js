const inquirer = require('inquirer'); //inquirer package for cli interface
const mysql = require('mysql2'); //sql package for making sql queries
const cTable = require('console.table'); // package for diaplaying database tables in console

const handleResponse = require('./scripts/responseHandle');

// Global Variables
// Inquirer variables
const questions = [
    {
        type: "list",
        message: `What would you like to do? `,
        name: "action",
        choices: [
            "View Employees",
            "Manage Employee",
            "View All Roles",
            "Add Role",
            "Delete Role",
            "View All Departments",
            "Add Department",
            "Delete Department",
        ],
    },
];

// Inquirer Function
const inquire = () => {
    inquirer.prompt(questions).then((response) => {
        return handleResponse.handle(response);
    }).then(() => {inquire()});
};

const init = () => {
    inquire();
};

init();