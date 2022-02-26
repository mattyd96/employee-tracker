// Employee queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const cTable = require('console.table'); // package for diaplaying database tables in console

const sql = require('./sql');

const viewEmployees = async () => {
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: `How would you like them filtered? `,
            name: 'action',
            choices: ['All', 'By Manager', 'By Department', 'Go Back To Menu']
        }
    ]);
    
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

const printEmployees = employees => {
    console.log('\n');
    console.table(employees);
};

const manageEmployee = async () => {
    const response = await inquirer.prompt({
        type: "list",
        message: `What would you like to do? `,
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

const addEmployee = async () => {
    const managers = await sql.getAllEmployeesBasic();
    const managerSelect = managers.map(manager => `${manager.name}`);

    const roles = await sql.getRoles();
    const roleSelect = await roles.map(role => role.title);

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

    const hasManager = response.manager !== 'None';
    const manager = hasManager ? managers.filter(manager => manager.name === response.manager) : null;
    const role = roles.filter(role => role.title === response.role);
    
    const employee = {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: role[0].id,
        manager_id: hasManager ? manager[0].id : null
    };
    let resolve = await sql.addEmployee(employee);
};

const deleteEmployee = async () => {
    const employees = await sql.getAllEmployeesBasic();
    const selections = employees.map(employee => `${employee.id}. ${employee.name}`);

    const response = await inquirer.prompt({
        type: "list",
        message: `Which employee would you like to delete? `,
        name: "employee",
        choices: selections
    });

    const [target] = response.delete.split('.');
    sql.deleteRow('employees', target);
};

const updateRole = async () => {
    const employees = await sql.getAllEmployeesBasic();
    const selectionsEmployee = employees.map(employee => `${employee.id}. ${employee.name}`);

    const roles = await sql.getRoles();
    const selectionsRole = roles.map(role => `${role.id}. ${role.title}`);

    const response = await inquirer.prompt({
        type: "list",
        message: `Which employee would you like to update? `,
        name: "employee",
        choices: selectionsEmployee
    });

    const response2 = await inquirer.prompt({
        type: "list",
        message: `Which role would you like to change to? `,
        name: "role",
        choices: selectionsRole
    });

    sql.updateEmployee('role_id', response2.role[0], response.employee[0]);
}

const updateManager = async () => {
    const employees = await sql.getAllEmployeesBasic();
    const selectionsEmployee = employees.map(employee => `${employee.id}. ${employee.name}`);

    const response = await inquirer.prompt({
        type: "list",
        message: `Which employee would you like to update? `,
        name: "employee",
        choices: selectionsEmployee
    });

    const response2 = await inquirer.prompt({
        type: "list",
        message: `Which manager would you like to change to? `,
        name: "manager",
        choices: selectionsEmployee
    });

    sql.updateEmployee('manager_id', response2.manager[0], response.employee[0]);
}

module.exports.view = viewEmployees;
module.exports.manage = manageEmployee;