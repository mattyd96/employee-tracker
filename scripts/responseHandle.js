const employee = require('./employees'); //employee functions
const role = require('./roles'); // role functions
const dep = require('./departments'); //department functions

// Handle user response and delegate
const handleResponse = async (response) => {
    let wait;
    switch (response.action) {
        case 'View Employees':
            wait = await employee.view();
            return wait;
    
        case 'Manage Employee':
            wait = await employee.manage();
            break;
    
        case 'View All Roles':
            wait = await role.viewRoles();
            break;
    
        case 'Manage Roles':
            wait = await role.manageRoles();
            break;
    
        case 'View All Departments':
            wait = await dep.viewDepartments();
            break;
    
        case 'Manage Departments':
            wait = await dep.manageDepartments();
            break;
    
        default:
            break;
    }
}

module.exports.handle = handleResponse;