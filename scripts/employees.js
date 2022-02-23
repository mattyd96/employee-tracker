// Employee queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const mysql = require('mysql2'); //sql package for making sql queries
const cTable = require('console.table'); // package for diaplaying database tables in console

const viewEmployees = async () => {
    const wait = await inquirer.prompt([
        {
            type: 'list',
            message: `How would you like them filtered? `,
            name: 'action',
            choices: ['All', 'By Manager', 'By Department']
        }
    ]).then((response) => {
        switch (response.action) {
            case 'All':
                    //select * from Employees
                break;
            case 'By Manager':
                    //get input for manager
                break;
            case 'By Department':
                    //get input for department
                break;
        
            default:
                break;
        }
    });

    return;
}

const viewEmployeeManager = () => {
    //make a request for managers
    //display those managers as options
    //select employees by that manager
}

const viewEmployeeDepartment = () => {
    //get departments
    //display department options
    //select employees by that department
}

const manageEmployee = () => {
    //get employees from db
    //create a list
    //use that list to prompt selection

}

module.exports.view = viewEmployees;
module.exports.manage = manageEmployee;