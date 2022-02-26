// Roles queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const cTable = require('console.table'); // package for diaplaying database tables in console

const sql = require('./sql'); // sql query file

// view all roles
const viewRoles = async () => {
    const roles = await sql.getRoles();
    console.log('\n');
    console.table(roles);
};

// manage roles
const manageRoles = async () => {
    const response = await inquirer.prompt({
        type: "list",
        message: `What would you like to do? `,
        name: "action",
        choices: ['Add Role', 'Delete Role', 'Go Back To Menu'],
    });

    if (response.action === 'Add Role') {
        const resolved = await addRole();
    } else if (response.action === 'Delete Role') {
        const resolved = await deleteRole();
    }
};

// add a role
const addRole = async () => {
    const departments = await sql.getDepartments();
    const selections = departments.map(dep => `${dep.id}. ${dep.name}`);

    const response = await inquirer.prompt([
        {
            type: "input",
            message: `What is the roles title? `,
            name: 'title'
        },
        {
            type: "number",
            message: `What is the roles salary? `,
            name: 'salary'
        },
        {
        type: "list",
        message: `Which department does it belong to? `,
        name: "department",
        choices: selections
        }
    ]);

    const role = {
        title: response.title,
        salary: response.salary,
        department_id: response.department[0]
    };

    const resolved = await sql.addRole(role);
};

//delete a role
const deleteRole = async () => {
    const roles = await sql.getRoles();
    const selections = roles.map(role => `${role.id}. ${role.title}`);

    const response = await inquirer.prompt({
        type: "list",
        message: `Which role would you like to delete? `,
        name: "delete",
        choices: selections
    });

    const [target] = response.delete.split('.');
    sql.deleteRow('roles', target);
};

module.exports.viewRoles = viewRoles;
module.exports.manageRoles = manageRoles;
module.exports.addRole = addRole;
module.exports.deleteRole = deleteRole;