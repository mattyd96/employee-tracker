const express = require('express');
const inquirer = require('inquirer'); //inquirer package for cli interface
const handleResponse = require('./scripts/responseHandle'); //response handler
const printer = require('./scripts/print');

// App Setup
const app = express();
const port = process.env.PORT || 3001;


// Inquirer Questions
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
            "Exit"
        ],
    },
];

// Inquirer loop -> goes until 
const inquire = async () => {
    // Get action from user
    const response = await inquirer.prompt(questions);

    // If Exit Selected, Exit app
    if (response.action === 'Exit') {
        printer.printOutro();
        process.exit();
    }

    // Handle selection

    const handledResponse = await handleResponse.handle(response);

    // Loop
    inquire();
};

// INIT
const init = () => {
    printer.printIntro();
    inquire();
};

// listen
app.listen(port, () => {
    init();
});
