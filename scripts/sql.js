const mysql = require('mysql2'); //sql package for making sql queries

const info = require("../credentials/credential");
const pool = mysql.createPool(info.info);
const promisePool = pool.promise();


const getManagers = async () => {
    const [rows] = await promisePool.query('SELECT * FROM employees WHERE manager_id = id');
    console.log(rows);
    return rows;
};

module.exports.getManagers = getManagers;
