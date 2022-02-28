// Employee queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const cTable = require('console.table'); // package for diaplaying database tables in console

const sql = require('./sql'); // SQL query helper

// View Employee list -> takes user input on filter options
const viewEmployees = async () => {

    // get filter option
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: `How would you like them filtered? `,
            name: 'action',
            choices: ['All', 'By Manager', 'By Department', 'Go Back To Menu']
        }
    ]);
    
    // handle user input and call function with correct filter
    let resolved;
    switch (response.action) {
        case 'All':
                resolved = await sql.getAllEmployees();
                printEmployees(resolved);
                return;
        case 'By Manager':
                resolved = await viewEmployeeManager();
                return;
        case 'By Department':
                resolved = await viewEmployeeDepartment();
            break;
    
        default:
            break;
    }

}

// View employees filtered by manager
const viewEmployeeManager = async() => {
    //get managers from db -> create a selections array for inquirer
    const managers = await sql.getManagers();
    const selections = managers.map(manager => `${manager.name}`);

    //inquire which manager to filter by
    const response = await inquirer.prompt({
        type: "list",
        message: `Filter by which Manager? `,
        name: "manager",
        choices: selections,
    });

    //get the manager selected
    const manager = managers.filter(
        (manager) =>
            manager.name === response.manager
    );

    //filter employees by manager and print to console
    const employees = await sql.getManagerFilteredEmployees(manager[0].id);
    printEmployees(employees);
}

// View employees filtered by department
const viewEmployeeDepartment = async () => {
    //get departments
    const departments = await sql.getDepartments();
    const selections = departments.map(dep => dep.name);

    //inquire which department to filter by
    const response = await inquirer.prompt({
        type: "list",
        message: `Filter by which Department? `,
        name: "department",
        choices: selections,
    });

    //select employees by that department
    const employees = await sql.getDepartmentFilteredEmployees(response.department);
    printEmployees(employees);
}

// Print employee list helper
const printEmployees = employees => {
    console.log('\n');
    console.table(employees);
};

// Manage employees -> get user input and delegates action
const manageEmployee = async () => {
    const response = await inquirer.prompt({
        type: "list",
        message: `Select Employee Action `,
        name: "action",
        choices: [
            "Add Employee",
            "Delete Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Go Back To Menu",
        ],
    });

    if (response.action === "Add Employee") {
        const resolved = await addEmployee();
    } else if (response.action === "Delete Employee") {
        const resolved = await deleteEmployee();
    } else if (response.action === "Update Employee Role") {
        const resolved = await updateRole();
    } else if (response.action === "Update Employee Manager") {
        const resolved = await updateManager();
    }
};

// Add an employee
const addEmployee = async () => {
    // Get managers
    const managers = await sql.getAllEmployeesBasic();
    const managerSelect = managers.map(manager => `${manager.name}`);

    // Get roles
    const roles = await sql.getRoles();
    const roleSelect = await roles.map(role => role.title);

    // Get user input for new employee
    const response = await inquirer.prompt([
        {
            type: "input",
            message: `What is the Employee's first name? `,
            name: "first_name",
        },
        {
            type: "input",
            message: `What is the Employee's last name? `,
            name: "last_name",
        },
        {
            type: "list",
            message: `What is their role? `,
            name: "role",
            choices: roleSelect,
        },
        {
            type: "list",
            message: `Who is their manager? `,
            name: "manager",
            choices: ['None', ...managerSelect],
        }
    ]);

    // Assign manager if one was selected, otherwise set to null
    const hasManager = response.manager !== 'None';
    const manager = hasManager ? managers.filter(manager => manager.name === response.manager) : null;
    // Assign role
    const role = roles.filter(role => role.title === response.role);
    
    // Create new employee object
    const employee = {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: role[0].id,
        manager_id: hasManager ? manager[0].id : null
    };

    // Add employee
    sql.addEmployee(employee);
    console.log(`  Added ${employee.first_name} ${employee.last_name} to employees\n`);
};

// Delete employee
const deleteEmployee = async () => {
    // Get employee list
    const employees = await sql.getAllEmployeesBasic();
    const selections = employees.map(employee => `${employee.id}. ${employee.name}`);

    // Get user to select employee
    const response = await inquirer.prompt({
        type: "list",
        message: `Which employee would you like to delete? `,
        name: "delete",
        choices: selections
    });

    // Delete employee
    const [target, name] = response.delete.split('.');
    sql.deleteRow('employees', target);
    console.log(`  Deleted${name} from employees\n`);
};

// Update Employeee Role
const updateRole = async () => {
    // Get employees
    const employees = await sql.getAllEmployeesBasic();
    const selectionsEmployee = employees.map(employee => `${employee.id}. ${employee.name}`);

    // Get roles
    const roles = await sql.getRoles();
    const selectionsRole = roles.map(role => `${role.id}. ${role.title}`);

    // Get user selection for employee and role
    const response = await inquirer.prompt([
        {
            type: "list",
            message: `Which employee would you like to update? `,
            name: "employee",
            choices: selectionsEmployee
        },
        {
            type: "list",
            message: `Which role would you like to change to? `,
            name: "role",
            choices: selectionsRole
        }
    ]);

    // Update that employees role
    const [employeeTarget, employeeName] = response.employee.split('.');
    const [roleTarget, roleName] = response.role.split('.');

    sql.updateEmployee('role_id', roleTarget, employeeTarget);

    console.log(`  Updated${employeeName}'s role to${roleName}\n`);
}

// Update employee manager
const updateManager = async () => {
    // Get employees
    const employees = await sql.getAllEmployeesBasic();
    const selectionsEmployee = employees.map(employee => `${employee.id}. ${employee.name}`);

    // Get user input
    const response = await inquirer.prompt([
        {
            type: "list",
            message: `Which employee would you like to update? `,
            name: "employee",
            choices: selectionsEmployee
        },
        {
            type: "list",
            message: `Which manager would you like to change to? `,
            name: "manager",
            choices: selectionsEmployee
        }
    ]);

    // Update employees manager
    const [employeeTarget, employeeName] = response.employee.split('.');
    const [managerTarget, managerName] = response.manager.split('.');

    sql.updateEmployee('manager_id', managerTarget, employeeTarget);

    console.log(`  Updated${employeeName}'s Manager to${managerName}\n`);
}

module.exports.view = viewEmployees;
module.exports.manage = manageEmployee;