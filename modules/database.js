'use strict';
const mysql = require('mysql2');

const connect = () => {
  // create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT * FROM bc_media',
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results, res);
      },
  );
};

const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO bc_media (category, title, details, thumbnail, image, original, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const update = (data, connection) => {
  console.log('updating...');
  console.log(data);
  // simple query
  connection.execute(
      'UPDATE bc_media SET category = ?, title = ?, details = ? WHERE idM = ?;',[data.cat, data.tit, data.det, data.id],
      (err, results, fields) => {
        console.log(err);
      },
  );
};

const deleteData = (data, connection) =>{
  console.log(data);
  connection.execute(
    'DELETE FROM bc_media WHERE idM = ?;',[data.id],
    (err, results, fields) => {
      console.log(err);
    },
  );
};

const search = (data, connection) =>{
  console.log(data);
  connection.execute(
    'SELECT image FROM bc_media WHERE category = ?;', [data.cat],
    (err, results, fields) => {
      console.log(err);
    },
  );
};

module.exports = {
  connect: connect,
  select: select,
  insert: insert,
  update: update,
  deleteData: deleteData,
  search: search,
};
