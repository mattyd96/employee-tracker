// Employee queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const cTable = require('console.table'); // package for diaplaying database tables in console

const sql = require('./sql');

const viewEmployees = async () => {
    const wait = await inquirer.prompt([
        {
            type: 'list',
            message: `How would you like them filtered? `,
            name: 'action',
            choices: ['All', 'By Manager', 'By Department']
        }
    ]).then(async (response) => {
        switch (response.action) {
            case 'All':
                    //select * from Employees
                break;
            case 'By Manager':
                    const wait = await viewEmployeeManager();
                    return;
            case 'By Department':
                    //get input for department
                break;
        
            default:
                break;
        }
    });
}

const viewEmployeeManager = async() => {
    //make a request for managers
    //display those managers as options
    //select employees by that manage
    const managers = await sql.getManagers();
    console.log(managers);
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