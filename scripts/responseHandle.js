const employee = require('./employees');
const role = require('./roles');
const dep = require('./departments');

const handleResponse = async (response) => {
    let wait
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
    
        case 'View All Departments':
            wait = await dep.viewDepartments();
            break;
    
        default:
            break;
    }
    return;
}

module.exports.handle = handleResponse;