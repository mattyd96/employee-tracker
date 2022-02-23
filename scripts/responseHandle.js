const employee = require('./employees');

const handleResponse = async (response) => {
    let wait
    switch (response.action) {
        case 'View Employees':
            wait = await employee.view();
            break;
    
        case 'Manage Employee':
            wait = await employee.manage();
            break;
    
        default:
            break;
    }
    return;
}

module.exports.handle = handleResponse;