-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: my_schema
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `admin_role` varchar(100) NOT NULL,
  `created_timestamp` date NOT NULL,
  `updated_timestamp` date NOT NULL,
  `delete_flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assessment`
--

DROP TABLE IF EXISTS `assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assessment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assessment_id` varchar(10) NOT NULL,
  `video_id` varchar(10) NOT NULL,
  `question` varchar(200) NOT NULL,
  `option_1` varchar(100) NOT NULL DEFAULT '',
  `option_2` varchar(100) NOT NULL DEFAULT '',
  `option_3` varchar(100) NOT NULL DEFAULT '',
  `option_4` varchar(100) NOT NULL DEFAULT '',
  `option_5` varchar(100) NOT NULL DEFAULT '',
  `correct_answer` varchar(200) NOT NULL,
  `total_option` int(11) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapters` (
  `chapter_id` varchar(10) NOT NULL,
  `subject_id` varchar(10) NOT NULL,
  `chapter_name` varchar(50) NOT NULL,
  `thumbnail` varchar(200) NOT NULL,
  `chapter_description` varchar(200) DEFAULT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`chapter_id`),
  UNIQUE KEY `id_UNIQUE` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class_name` varchar(7) NOT NULL,
  `board` varchar(10) NOT NULL,
  `stream` varchar(20) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `demo_videos`
--

DROP TABLE IF EXISTS `demo_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `demo_videos` (
  `demo_video_id` varchar(10) NOT NULL,
  `class_id` varchar(10) NOT NULL,
  `demo_video_notes_url` varchar(300) NOT NULL,
  `demo_video_name` varchar(200) NOT NULL,
  `demo_video_url` varchar(200) NOT NULL,
  `thumbnail` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `likes` int(50) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `earn_history`
--

DROP TABLE IF EXISTS `earn_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `earn_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `earn_id` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `apply_referral_user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_timestamp` varchar(20) NOT NULL,
  `updated_timestamp` varchar(20) NOT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favourite_videos`
--

DROP TABLE IF EXISTS `favourite_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favourite_videos` (
  `favourite_video_id` varchar(10) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `like_videos`
--

DROP TABLE IF EXISTS `like_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like_videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `like_video_id` varchar(10) NOT NULL,
  `video_id` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchased_details`
--

DROP TABLE IF EXISTS `purchased_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchased_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `purchased_id` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subscription_id` varchar(10) NOT NULL,
  `transaction_id` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `invoice_id` varchar(20) NOT NULL,
  `created_timestamp` varchar(20) NOT NULL,
  `updated_timestamp` varchar(20) NOT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `redeem_history`
--

DROP TABLE IF EXISTS `redeem_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redeem_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `redeem_id` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `redeem_amount` int(11) NOT NULL,
  `from_company` varchar(100) NOT NULL,
  `transaction_id` varchar(50) NOT NULL,
  `created_timestamp` varchar(20) NOT NULL,
  `updated_timestamp` varchar(20) NOT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `subject_id` varchar(10) NOT NULL,
  `class_id` varchar(10) NOT NULL,
  `subject_name` varchar(60) DEFAULT NULL,
  `medium` varchar(10) NOT NULL,
  `color_code` varchar(7) NOT NULL,
  `icons` varchar(200) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `id_UNIQUE` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscription` (
  `subscription_id` varchar(10) NOT NULL,
  `class_id` varchar(10) NOT NULL,
  `amount` int(11) NOT NULL,
  `expiry_date` varchar(20) NOT NULL,
  `banner_image` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `teacher_id` varchar(10) NOT NULL,
  `teacher_name` varchar(20) NOT NULL,
  `subject_id` varchar(10) NOT NULL,
  `teacher_subject` varchar(50) NOT NULL,
  `teacher_image` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`teacher_id`),
  UNIQUE KEY `id_unique` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `chapter_id` int(11) NOT NULL,
  `topic_name` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_result`
--

DROP TABLE IF EXISTS `user_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` varchar(10) NOT NULL,
  `result` varchar(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` char(60) NOT NULL,
  `email_id` varchar(50) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  `user_class` varchar(10) NOT NULL,
  `user_city` varchar(20) NOT NULL,
  `user_state` varchar(30) NOT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `is_video_purchased` varchar(7) DEFAULT '0',
  `otp` int(4) DEFAULT NULL,
  `gender` varchar(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `refer_amount` int(11) NOT NULL DEFAULT '0',
  `earn_and_refer_code` varchar(10) NOT NULL DEFAULT ' ',
  `profile_image` varchar(200) NOT NULL DEFAULT 'https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png',
  `uuid` varchar(200) NOT NULL,
  `apply_referral` varchar(6) NOT NULL DEFAULT '0',
  `fcm` varchar(200) NOT NULL,
  `wallet` int(11) NOT NULL DEFAULT '0',
  `delete_flag` tinyint(1) DEFAULT '0',
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `video_id` varchar(10) NOT NULL,
  `chapter_id` varchar(10) NOT NULL,
  `video_name` varchar(200) DEFAULT NULL,
  `Video_url` varchar(300) NOT NULL,
  `video_notes_url` varchar(300) NOT NULL,
  `video_like` int(11) NOT NULL,
  `thumbnail` varchar(200) NOT NULL,
  `isdemovideo` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(200) NOT NULL,
  `created_timestamp` varchar(100) DEFAULT NULL,
  `updated_timestamp` varchar(100) DEFAULT NULL,
  `delete_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-07 10:43:48
