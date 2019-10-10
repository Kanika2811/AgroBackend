/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('DROP DATABASE ' + dbconfig.database, function (err, result) {
    if (err)
        console.log("Database error");
    else 
        console.log("Database success");
    
    
  });

connection.query('CREATE DATABASE ' + dbconfig.database, function (err, result) {
    if (err)
        console.log("Database error");
    else 
        console.log("Database success");
    
    
  });

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)',function (err, result) {
    if (err)
        console.log("Table error");
    else 
        console.log("Table success");
  });


//   var sql = "alter table my_schema.users add column email_id_new_1 varchar(20)";
//  connection.query(sql, function (err, result) {
//     if (err)
//     console.log("Alter error");
//     else 
//     console.log("Alter success");
//   });


var alterUserName ="ALTER TABLE my_schema.users MODIFY username VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
connection.query(alterUserName, function (err, result) {
    if (err)
    console.log("Alter error");
    else 
    console.log("Alter success");
  });


 

connection.end();
