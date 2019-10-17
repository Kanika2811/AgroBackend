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
    `otp` int(4), \
    `delete_flag` tinyint(1) DEFAULT 0, \
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

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_class + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
  `class_name` varchar(7) NOT NULL, \
  `board` varchar(10) NOT NULL, \
  `stream` varchar(20) NOT NULL, \
  `created_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
  `updated_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
  `delete_flag` tinyint(1) DEFAULT 0, \
   PRIMARY KEY (`id`), \
   UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_subject + '`(\
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `class_id` INT NOT NULL, \
    `subject_name` varchar(20) NOT NULL, \
    `medium` varchar(10) NOT NULL, \
    `created_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
    `updated_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),\
    `delete_flag` tinyint(1) DEFAULT 0, \
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_chapter + '`(\
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    `subject_id` INT NOT NULL, \
    `chapter_name` varchar(50) NOT NULL, \
    `chapter_description` varchar(200), \
    `created_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
    `updated_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
    `delete_flag` tinyint(1) DEFAULT 0, \
    PRIMARY KEY(`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_topic + '`(\
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `chapter_id` INT NOT NULL, \
    `topic_name` varchar(30) NOT NULL, \
    `description` varchar(300) NOT NULL, \
    `created_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
    `updated_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), \
    `delete_flag` tinyint(1) DEFAULT 0, \
    PRIMARY KEY(`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_demo_videos + '` ( \
    `demo_video_id` int(10) NOT NULL, \
    `subject_id` int(10) NOT NULL, \
    `demo_video_name` varchar(100) NOT NULL, \
    `demo_video_url` varchar(200) NOT NULL, \
    `video_chapter_name` varchar(100) NOT NULL, \
    `video_topic_name` varchar(100) NOT NULL, \
    `description` varchar(500) NOT NULL, \
    `likes` int(50) NOT NULL, \
    `created_timestamp` date NOT NULL, \
    `updated_timestamp` date NOT NULL, \
    `delete_flag` tinyint(1) NOT NULL \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_admin + '` ( \
    `admin_id` int(10) NOT NULL, \
    `username` varchar(100) NOT NULL, \
    `password` varchar(100) NOT NULL, \
    `email_id` varchar(100) NOT NULL, \
    `admin_role` varchar(100) NOT NULL, \
    `created_timestamp` date NOT NULL, \
    `updated_timestamp` date NOT NULL, \
    `delete_flag` tinyint(1) NOT NULL \
)');


connection.end();


