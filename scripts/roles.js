// Roles queries
const inquirer = require('inquirer'); //inquirer package for cli interface
const cTable = require('console.table'); // package for diaplaying database tables in console

const sql = require('./sql');

const viewRoles = async () => {
    const roles = await sql.getRoles();
    console.log('\n');
    console.table(roles);
};

const addRole = async () => {

};

module.exports.viewRoles = viewRoles;