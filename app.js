const pretty = require("pretty");
const express = require('express')
const app = express()
const port = 3004
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'rikard',
    password: 'arsenalfc',
    port: '3306',
    database: 'batti'
})

app.get('/', async (req, res) => {
    const vouchers = await sqlQuery('SELECT * FROM vouchers');
    res.status(200).send({
        vouchers
    }) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function sqlQuery(sql, args) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          return reject(err);
        }
        connection.query(sql, args, function(err, result) {
          connection.release();
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    });
  }




