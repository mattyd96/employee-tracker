const inquirer = require('inquirer'); //inquirer package for cli interface
const handleResponse = require('./scripts/responseHandle'); //response handler

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