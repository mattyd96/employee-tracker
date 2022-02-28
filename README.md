# Employee Tracker [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A simple Cli interface for querying and modifying a local employee database. It was created using node.js with enquirer and mysql2 packages to meet the following criteria below.


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installation

```md
npm install
```

## Usage

Before using this application you will need  to initialize and set up a connection to your own database. The database can be created using the schema file in db. A seeds file is also provided for testing.
Connecting the database can be done in scripts/sql.js.

<br>

Once Set up, just start with either

```md
npm start
```

or 

```md
node index.js
```

### Diagram of Database

![Database image](./assets/readme_assets/database_diagram.png)

<br>

### video example



https://user-images.githubusercontent.com/26681440/155933660-21a42b5a-ed1c-40fb-9651-fe19a970d783.mp4



## License

MIT

## Links

[My Github Account](https://github.com/mattyd96)

[Email: matthewdcodes@gmail.com](mailto:matthewdcodes@gmail.com)
