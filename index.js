const express = require('express');
const inquirer = require('inquirer'); //inquirer package for cli interface
const handleResponse = require('./scripts/responseHandle'); //response handler

// app setup
const app = express();
const port = process.env.PORT || 3001;


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
            "Manage Roles",
            "View All Departments",
            "Manage Departments",
        ],
    },
];

// Inquirer loop
const inquire = async () => {
    const response = await inquirer.prompt(questions);
    const handledResponse = await handleResponse.handle(response);
    inquire();
};

// INIT
const init = () => {
    inquire();
};

// listen
app.listen(port, () => {
    init();
});
