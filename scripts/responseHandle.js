const inquirer = require('inquirer'); //inquirer package for cli interface

// Employees
// viewing Employees
const viewEmployees = () => {
    inquirer.prompt([
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


const handleResponse = (response) => {
    switch (response.action) {
        case 'View Employees':
            viewEmployees();
            break;
    
        default:
            break;
    }
}