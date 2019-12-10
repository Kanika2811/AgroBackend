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
    `contact_no` VARCHAR(10) NOT NULL, \
    `dob` date NOT NULL, \
    `user_class` VARCHAR(10) NOT NULL, \
    `user_city` varchar(20) NOT NULL, \
    `user_state` varchar(30) NOT NULL, \
    `is_verified` tinyint(1) DEFAULT 0 , \
    `is_video_purchased` VARCHAR(7) DEFAULT 0, \
    `otp` int(4), \
    `gender` VARCHAR(6) NOT NULL, \
    `token` varchar(255) NOT NULL, \
    `refer_amount` int(11) NOT NULL DEFAULT 0, \
    `earn_and_refer_code` varchar(10) NOT NULL DEFAULT " ",\
    `profile_image` varchar(200) NOT NULL DEFAULT "https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png",\
    `uuid` varchar(200) NOT NULL, \
    `apply_referral` varchar(6) NOT NULL DEFAULT "0", \
    `fcm` varchar(200) NOT NULL, \
    `wallet` int(11) NOT NULL DEFAULT "0", \
    `delete_flag` tinyint(1) DEFAULT "0",\
    `created_timestamp` varchar(100) DEFAULT NULL,\
    `updated_timestamp` varchar(100) DEFAULT NULL,\
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
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_videos + '` ( \
    `video_id` varchar(10) NOT NULL,\
  `chapter_id` varchar(10) NOT NULL,\
  `video_name` varchar(200) DEFAULT NULL,\
  `Video_url` varchar(300) NOT NULL,\
  `video_notes_url` varchar(300) NOT NULL,\
  `video_like` int(11) NOT NULL,\
  `thumbnail` varchar(200) NOT NULL,\
  `isdemovideo` tinyint(1) NOT NULL DEFAULT 0,\
  `description` varchar(200) NOT NULL,\
  `created_timestamp` varchar(100) DEFAULT NULL,\
  `updated_timestamp` varchar(100) DEFAULT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`video_id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });

  connection.query('\
  CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_assessment + '` ( \
    `id` int(11) NOT NULL AUTO_INCREMENT,\
  `assessment_id` varchar(10) NOT NULL,\
  `video_id` varchar(10) NOT NULL,\
  `question` varchar(200) NOT NULL,\
  `option_1` varchar(100) NOT NULL DEFAULT " ",\
  `option_2` varchar(100) NOT NULL DEFAULT " ",\
  `option_3` varchar(100) NOT NULL DEFAULT  " ",\
  `option_4` varchar(100) NOT NULL DEFAULT  " ",\
  `option_5` varchar(100) NOT NULL DEFAULT  " ",\
  `correct_answer` varchar(200) NOT NULL,\
  `total_option` int(11) NOT NULL,\
  `created_timestamp` varchar(100) DEFAULT NULL,\
  `updated_timestamp` varchar(100) DEFAULT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`id`)\
)',function (err, result) {
        if (err)
            console.log("Table already exist");
        else 
            console.log("Table created");
      });


connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_subject + '`(\
    `subject_id` varchar(10) NOT NULL,\
  `class_id` varchar(10) NOT NULL,\
  `subject_name` varchar(60) DEFAULT NULL,\
  `medium` varchar(10) NOT NULL,\
  `color_code` varchar(7) NOT NULL,\
  `icons` varchar(200) NOT NULL,\
  `created_timestamp` varchar(100) DEFAULT NULL,\
  `updated_timestamp` varchar(100) DEFAULT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`subject_id`),\
  UNIQUE KEY `id_UNIQUE` (`subject_id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_chapters + '`(\
    `chapter_id` varchar(10) NOT NULL,\
  `subject_id` varchar(10) NOT NULL,\
  `chapter_name` varchar(50) NOT NULL,\
  `thumbnail` varchar(200) NOT NULL,\
  `chapter_description` varchar(200) DEFAULT NULL,\
  `created_timestamp` varchar(100) DEFAULT NULL,\
  `updated_timestamp` varchar(100) DEFAULT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`chapter_id`),\
  UNIQUE KEY `id_UNIQUE` (`chapter_id`)\
  )',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });


  connection.query('\
  CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_classes + '`(\
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
    `class_name` varchar(7) NOT NULL,\
    `board` varchar(10) NOT NULL,\
    `stream` varchar(20) NOT NULL,\
    `created_timestamp` varchar(100) DEFAULT NULL,\
    `updated_timestamp` varchar(100) DEFAULT NULL,\
    `delete_flag` tinyint(1) DEFAULT 0,\
    PRIMARY KEY (`id`),\
    UNIQUE KEY `id_UNIQUE` (`id`)\
)',function (err, result) {
      if (err)
          console.log("Table already exist");
      else 
          console.log("Table created");
    });

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_comments + '`(\
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
    `video_id` varchar(10) NOT NULL,\
    `user_id` int(11) NOT NULL,\
    `comment` varchar(200) NOT NULL,\
    `created_timestamp` varchar(100) DEFAULT NULL,\
    `updated_timestamp` varchar(100) DEFAULT NULL,\
    `delete_flag` tinyint(1) DEFAULT 0,\
    PRIMARY KEY (`id`)\
)',function (err, result) {
        if (err)
            console.log("Table already exist");
        else 
            console.log("Table created");
      });

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
    `demo_video_id` varchar(10) NOT NULL,\
    `class_id` varchar(10) NOT NULL,\
    `demo_video_notes_url` varchar(300) NOT NULL,\
    `demo_video_name` varchar(200) NOT NULL,\
    `demo_video_url` varchar(200) NOT NULL,\
    `thumbnail` varchar(100) NOT NULL,\
    `description` varchar(500) NOT NULL,\
    `likes` int(50) NOT NULL,\
    `created_timestamp` varchar(100) DEFAULT NULL,\
    `delete_flag` tinyint(1) DEFAULT 0 \
)',function (err, result) {
        if (err)
            console.log("Table already exist");
        else 
            console.log("Table created");
      });

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_admin + '` ( \
    `admin_id` int(10) NOT NULL,\
  `username` varchar(100) NOT NULL,\
  `password` varchar(100) NOT NULL,\
  `email_id` varchar(100) NOT NULL,\
  `admin_role` varchar(100) NOT NULL,\
  `created_timestamp` date NOT NULL,\
  `updated_timestamp` date NOT NULL,\
  `delete_flag` tinyint(1) NOT NULL\
  )',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });

  connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_earn_history + '` ( \
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `earn_id` varchar(10) NOT NULL,\
  `user_id` int(11) NOT NULL,\
  `apply_referral_user_id` int(11) NOT NULL,\
  `amount` int(11) NOT NULL,\
  `created_timestamp` varchar(20) NOT NULL,\
  `updated_timestamp` varchar(20) NOT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });

  connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_favourite_videos + '` ( \
    `favourite_video_id` varchar(10) NOT NULL,\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `video_id` varchar(10) NOT NULL,\
    `user_id` int(11) NOT NULL,\
    `created_timestamp` varchar(100) DEFAULT NULL,\
    `updated_timestamp` varchar(100) DEFAULT NULL,\
    `delete_flag` tinyint(1) DEFAULT 0,\
    PRIMARY KEY (`id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });

  connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_like_videos + '` ( \
    `id` int(11) NOT NULL AUTO_INCREMENT,\
  `like_video_id` varchar(10) NOT NULL,\
  `video_id` varchar(10) NOT NULL,\
  `user_id` int(11) NOT NULL,\
  `created_timestamp` varchar(100) DEFAULT NULL,\
  `updated_timestamp` varchar(100) DEFAULT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });


  connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_purchased_details + '` ( \
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
    `purchased_id` varchar(10) NOT NULL,\
    `user_id` int(11) NOT NULL,\
    `subscription_id` varchar(10) NOT NULL,\
    `transaction_id` varchar(50) NOT NULL,\
    `amount` int(11) NOT NULL,\
    `invoice_id` varchar(20) NOT NULL,\
    `created_timestamp` varchar(20) NOT NULL,\
    `updated_timestamp` varchar(20) NOT NULL,\
    `delete_flag` tinyint(1) DEFAULT 0,\
    PRIMARY KEY (`id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });

  connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_redeem_history + '` ( \
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `redeem_id` varchar(10) NOT NULL,\
  `user_id` int(11) NOT NULL,\
  `redeem_amount` int(11) NOT NULL,\
  `from_company` varchar(100) NOT NULL,\
  `transaction_id` varchar(50) NOT NULL,\
  `created_timestamp` varchar(20) NOT NULL,\
  `updated_timestamp` varchar(20) NOT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });

  connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_subscription + '` ( \
    `subscription_id` varchar(10) NOT NULL,\
  `class_id` varchar(10) NOT NULL,\
  `amount` int(11) NOT NULL,\
  `expiry_date` varchar(20) NOT NULL,\
  `banner_image` varchar(200) NOT NULL,\
  `description` varchar(200) DEFAULT NULL,\
  `created_timestamp` varchar(100) DEFAULT NULL,\
  `updated_timestamp` varchar(100) DEFAULT NULL,\
  `delete_flag` tinyint(1) DEFAULT 0,\
  PRIMARY KEY (`subscription_id`)\
)',function (err, result) {
    if (err)
        console.log("Table already exist");
    else 
        console.log("Table created");
  });


  connection.query('\
  CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_teacher + '` ( \
    `teacher_id` varchar(10) NOT NULL,\
    `teacher_name` varchar(20) NOT NULL,\
    `subject_id` varchar(10) NOT NULL,\
    `teacher_subject` varchar(50) NOT NULL,\
    `teacher_image` varchar(200) NOT NULL,\
    `description` varchar(200) NOT NULL,\
    `created_timestamp` varchar(100) DEFAULT NULL,\
    `updated_timestamp` varchar(100) DEFAULT NULL,\
    `delete_flag` tinyint(1) DEFAULT 0,\
    PRIMARY KEY (`teacher_id`),\
    UNIQUE KEY `id_unique` (`teacher_id`)\
  )',function (err, result) {
      if (err)
          console.log("Table already exist");
      else 
          console.log("Table created");
    });

    connection.query('\
    CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_topic + '` ( \
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
        `chapter_id` int(11) NOT NULL,\
        `topic_name` varchar(30) NOT NULL,\
        `description` varchar(300) NOT NULL,\
        `created_timestamp` varchar(100) DEFAULT NULL,\
        `updated_timestamp` varchar(100) DEFAULT NULL,\
        `delete_flag` tinyint(1) DEFAULT 0,\
        PRIMARY KEY (`id`),\
        UNIQUE KEY `id_UNIQUE` (`id`)\
    )',function (err, result) {
        if (err)
            console.log("Table already exist");
        else 
            console.log("Table created");
      });


      connection.query('\
      CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.table_user_result + '` ( \
        `id` int(11) NOT NULL AUTO_INCREMENT,\
        `video_id` varchar(10) NOT NULL,\
        `result` varchar(5) NOT NULL,\
        `user_id` int(11) NOT NULL,\
        `created_timestamp` varchar(100) DEFAULT NULL,\
        `updated_timestamp` varchar(100) DEFAULT NULL,\
        `delete_flag` tinyint(1) DEFAULT 0,\
        PRIMARY KEY (`id`)\
      )',function (err, result) {
          if (err)
              console.log("Table already exist");
          else 
              console.log("Table created");
        });
connection.end();


