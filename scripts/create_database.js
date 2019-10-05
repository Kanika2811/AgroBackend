/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('drop DATABASE ' + dbconfig.database);

connection.query('CREATE DATABASE ' + dbconfig.database);


connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `email_id` varchar(50) NOT NULL, \
  `name` varchar(20) NOT NULL, \
  `contact_no` int(20) NOT NULL, \
  `dob` date NOT NULL, \
  `guardian_name` varchar(20) NOT NULL, \
  `guardian_contact_no` int(20) NOT NULL, \
  `user_city` varchar(50) NOT NULL, \
  `user_state` varchar(50) NOT NULL, \
  `pincode` int(6) NOT NULL, \
  `profile_image` varchar(50) NOT NULL, \
  `school_name` varchar(30) NOT NULL, \
  `user_class` int(2) NOT NULL, \
  `board` varchar(10) NOT NULL, \
  `medium` varchar(10) NOT NULL, \
  `stream` varchar(100) NOT NULL, \
  `interesting_subject` varchar(100) NOT NULL, \
  `verified_key` tinyint(1) NOT NULL, \
  `isVideoPurchase` tinyint(1) NOT NULL, \
  `created_timestamp` date NOT NULL, \
  `updated_timestamp` date NOT NULL, \
  `delete_flag` tinyint(1) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_class + '` ( \
    `class_id` int(10) NOT NULL, \
  `class_name` varchar(100) NOT NULL, \
  `class_board` varchar(100) NOT NULL, \
  `class_stream` varchar(100) NOT NULL, \
  `created_timestamp` date NOT NULL, \
  `updated_timestamp` date NOT NULL, \
  `delete_flag` tinyint(1) NOT NULL \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_demo_videos + '` ( \
    `demo_video_id` int(10) NOT NULL, \
    `subject_id` int(10) NOT NULL, \
    `demo_video_name` varchar(100) NOT NULL, \
    `demo_video_url` varchar(200) NOT NULL, \
    `video_cheptername` varchar(100) NOT NULL, \
    `video_topicname` varchar(100) NOT NULL, \
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

console.log('Success: Database Created!')

connection.end();


