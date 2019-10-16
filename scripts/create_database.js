/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);


connection.query('CREATE DATABASE ' + dbconfig.database, function (err, result) {
    if (err)
        console.log("Database error");
    else 
        console.log("Database success");
    
  });

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `name` varchar(30) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `email_id` varchar(50) NOT NULL, \
    `contact_no` BIGINT(20) NOT NULL, \
    `dob` date NOT NULL, \
    `user_class` varchar(7) NOT NULL, \
    `user_city` varchar(20) NOT NULL, \
    `user_state` varchar(20) NOT NULL, \
    `is_verified` tinyint(1) DEFAULT 0 , \
    `is_video_purchased` VARCHAR(7) DEFAULT 0, \
    `token` varchar(255) NOT NULL, \
    `created_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
    `updated_timestamp` timestamp NOT NULL DEFAULT current_timestamp() , \
     PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });


connection.end();


