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
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `assessment`
--

LOCK TABLES `assessment` WRITE;
/*!40000 ALTER TABLE `assessment` DISABLE KEYS */;
INSERT INTO `assessment` VALUES (1,'MRA001','MRV001','Is x²+6x-4= 0 a quadratic equation?','yes','no','','','','option_2',2,'1575358473','1575358473',0),(2,'MRA002','MRV001','The product  of two consecutive positive integers is 306. From the quadratic equation to find the integers, if x denotes the smaller integer.','x²+x-306=0','x²-45x+324=0','x²+11x-1452=0','x²+5x-1800=0','','option_4',4,'1575361420','1575370139',0),(3,'MRA003','MRV003','The height of a right triangle is 7cm less than its base. If the hypotenuse is 13 cm, form the quadratic equation to find the base of the triangle.','x²+11x-1452=0','x²-7x-60=0','x²+5x-1800=0','x²-45x+324=0','','option_4',4,'1575361447','1575361447',0),(4,'MRA004','MRV001','What was Valliamai\'s favourite pastime?','Cooking','Standing at the doorway','Only b','Looking at the kids playing & bus','Both b and d','option_5',5,'1575370139','1575370139',0),(5,'MRA005','MRV001','What did the conductor called Valli','Valli','Madam','Little Girl ','','','option_3',3,'1575370253','1575370139',0),(6,'MRA006','MRV001','What was Valli\'s strongest desire?','To speak in English ','To buy new dresses','To ride on the bus ','','','option_3',3,'1575370346','1575370139',0),(7,'MRA007','MRV001','How did Valli gather information about the bus?','Through neighbours','Through Conductor','','','','option_1',2,'1575370446','1575370446',0);
/*!40000 ALTER TABLE `assessment` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES ('MRC001','MRS001','Quadratic Equations','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575376789','1575361447',0),('MRC002','MRS003','Life Processes','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575370446','1575376789',0),('MRC003','MRS003','Control and Coordination','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575370724','1575370724',0),('MRC004','MRS002','Madam Rides the Bus','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575370807','1575370807',0),('MRC005','MRS004','The Tale of Custard the Dragon','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575370872','1575370807',0),('MRC006','MRS004','For Anne Gregory','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575371114','1575371114',0),('MRC007','MRS005','Reproduction in Organism','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575371197','1575371114',0),('MRC008','MRS005','Sexual Reproduction in Flowring Plants','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575371232','1575371232',0),('MRC009','MRS006','Aldehydes,Ketons and Carboxylic Acids','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575371290','1575371232',0),('MRC010','MRS006','Amines','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/list_video_thumbnail.png','demo description data','1575371328','1575371328',0);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'10th','rbsc','all','1575371925','1575371925',0),(2,'11th','rbsc','arts','1575371993','1575371925',0),(3,'12th','rbsc','arts','1575372123','1575371993',0),(4,'12','rbsc','arts','1575372175','1575371993',0);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'MRV007',8,'hsdgfsdgfds','1575372175','1575372175',0);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `demo_videos`
--

LOCK TABLES `demo_videos` WRITE;
/*!40000 ALTER TABLE `demo_videos` DISABLE KEYS */;
INSERT INTO `demo_videos` VALUES ('MRD001','1','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_video_notes/1+Quadratic+Equations+(Introduction).pdf','Quadratic Equations (Introduction)','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/1+Quadratic+Equations+Introduction.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/list_video_thumbnail.png','demo description for demo video',50,'2019-11-12 04:35:27',0),('MRD002','1','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_video_notes/2+Quadratic+Equations+(Numericals-+Part+1).pdf','Quadratic Equations (Numericals-Part1)','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/2+Quadratic+Equations+Numericals-+Part+1.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/list_video_thumbnail.png','demo description for demo video',50,'2019-11-12 04:37:21',0),('MRD003','1','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_video_notes/3+Quadratic+Equations+(Numericals-+Part+2).pdf','Quadratic Equations (Numericals-Part2)','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/3+Quadratic+Equations+Numericals-+Part+2.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/list_video_thumbnail.png','demo description for demo video',50,'2019-11-12 04:39:59',0),('MRD004','1','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_video_notes/1+Solution+of+Quadratic+Equations+by+Factorisation+Numericals+Part+1.pdf','Solution Of Quadratic Equations by Factorisation Numericals Part1','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/2+Solution+Of+Quadratic+Equations+By+Factorisation+Numericals+Part+2.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/list_video_thumbnail.png','demo description for demo video',50,'2019-11-11 12:19:32',0),('MRD005','1','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_video_notes/2+Solution+of+Quadratic+Equations+by+Factorisation+Numericals+Part+2.pdf','Solution Of Quadratic Equations by Factorisation Numericals Part2','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/2+Solution+Of+Quadratic+Equations+By+Factorisation+Numericals+Part+2.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/demo_videos/list_video_thumbnail.png','demo description for demo video',50,'2019-11-12 04:41:27',0);
/*!40000 ALTER TABLE `demo_videos` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `earn_history`
--

LOCK TABLES `earn_history` WRITE;
/*!40000 ALTER TABLE `earn_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `earn_history` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `favourite_videos`
--

LOCK TABLES `favourite_videos` WRITE;
/*!40000 ALTER TABLE `favourite_videos` DISABLE KEYS */;
INSERT INTO `favourite_videos` VALUES ('trxlxw',25,'MRV012',8,'1575372785','1575372785',0),('n02j8z',26,'MRV001',8,'1575372833','1575372833',0),('at1pph',27,'MRV006',8,'1575372885','1575372833',0),('xzz3sn',28,'MRV011',8,'1575372921','1575372921',0),('0v8htf',31,'MRV001',11,'1575373188','1575373188',0),('me99b7',32,'MRV011',16,'1575373262','1575373188',0),('k4pe9c',34,'MRV005',2,'1575373314','1575373314',0);
/*!40000 ALTER TABLE `favourite_videos` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `like_videos`
--

LOCK TABLES `like_videos` WRITE;
/*!40000 ALTER TABLE `like_videos` DISABLE KEYS */;
INSERT INTO `like_videos` VALUES (1,'j1ytg7','MRV001',8,'1575373768','1575373768',0),(2,'pjzwed','MRV002',8,'1575374328','1575374328',0),(3,'b307qx','MRV011',8,'1575374374','1575374374',0),(4,'o9ffb5','MRV001',8,'1575374469','1575374469',0),(5,'y7usnn','MRV001',8,'1575374512','1575374469',0),(6,'i97qgi','MRV001',8,'1575374525','1575374469',0),(7,'0qxmh9','MRV003',8,'1575374608','1575374469',0),(8,'hks20n','MRV001',8,'1575374641','1575374608',0),(9,'7hqgbo','MRV001',8,'1575374679','1575374679',0),(10,'g1ld4g','MRV001',8,'1575374722','1575374722',0),(11,'fxip5i','MRV017',8,'1575374759','1575374722',0),(12,'ahfqp5','MRV024',8,'1575374788','1575374722',0),(13,'6ajbks','MRV014',11,'1575374829','1575374829',0),(14,'k5p86g','MRV007',23,'1575374868','1575374829',0),(15,'6s4d8d','MRV006',23,'1575374899','1575374899',0),(16,'936294','MRV001',2,'1575374942','1575374899',0),(17,'xok6g5','MRV002',2,'1575374971','1575374899',0),(18,'nc28s6','MRV005',2,'1575374981','1575374981',0),(19,'nje5d3','MRV013',2,'1575375140','1575375140',0);
/*!40000 ALTER TABLE `like_videos` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `purchased_details`
--

LOCK TABLES `purchased_details` WRITE;
/*!40000 ALTER TABLE `purchased_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchased_details` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `redeem_history`
--

LOCK TABLES `redeem_history` WRITE;
/*!40000 ALTER TABLE `redeem_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `redeem_history` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('MRS001','1','Mathematics','Hindi','#00A1FF','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/maths.png','1575375559','1575375559',0),('MRS002','1','English-First Flight-Prose','English','#D4145A','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/english.png','1575375603','1575375603',0),('MRS003','1','Science','Hindi','#00774A','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/science.png','1575375681','1575375681',0),('MRS004','1','English-First Flight-poems','Hindi','#D4145A','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/english.png','1575375763','1575375763',0),('MRS005','3','Biology','Hindi','#88C12F','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/biology.png','1575375809','1575375809',0),('MRS006','3','Chemistry','Hindi','#FF5D99','https://mrb-data.s3.ap-south-1.amazonaws.com/subject_icons/chemistry.png','1575375854','1575375854',0);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES ('MRS001','1',700,'1585567982','https://mrb-data.s3.ap-south-1.amazonaws.com/subscription_image/premium_pack.png','valid for 31/11/2019','1575376043','1575376043',0),('MRS002','2',750,'1585567982','https://mrb-data.s3.ap-south-1.amazonaws.com/subscription_image/premium_pack.png','valid for 31/11/2019','1575376085','1575376085',0),('MRS003','3',725,'1585567982','https://mrb-data.s3.ap-south-1.amazonaws.com/subscription_image/premium_pack.png','valid for 31/11/2019','1575376118','1575376118',0);
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('MRT001','Chhavi Gupta','MRS005','Biology','https://mrb-data.s3.ap-south-1.amazonaws.com/teacher_images/1572588980092','Gold Medallist, PHD','1575376215','1575376215',0),('MRT002','Monika Kumawat','MRS006','Chemistry','https://mrb-data.s3.ap-south-1.amazonaws.com/teacher_images/1572589343981','Gold Medallist, PHD','1575376271','1575376271',0),('MRT003','Anil Menaria','MRS001','Mathematics','https://mrb-data.s3.ap-south-1.amazonaws.com/teacher_images/1572589457972','Gold Medallist, PHD','1575376301','1575376301',0),('MRT004','Kajal Joshi','MRS002','English-First Flight-Poems','https://mrb-data.s3.ap-south-1.amazonaws.com/teacher_images/1572589624084','Gold Medallist, PHD','1575376332','1575376332',0),('MRT005','Disha Madrecha','MRS003','Science','https://mrb-data.s3.ap-south-1.amazonaws.com/teacher_images/1572589690154','Gold Medallist, PHD','1575376371','1575376371',0);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `user_result`
--

LOCK TABLES `user_result` WRITE;
/*!40000 ALTER TABLE `user_result` DISABLE KEYS */;
INSERT INTO `user_result` VALUES (1,'MRV001','20%',8,'1575376599','1575376599',0),(2,'MRV001','20%',8,'1575376662','1575376662',0),(3,'MRV001','20%',8,'1575376721','1575376721',0),(4,'MRV001','33',8,'1575376752','1575376752',0),(5,'MRV001','0',8,'1575376826','1575376752',0),(6,'MRV001','16',8,'1575376866','1575376866',0),(7,'MRV001','33',8,'1575376899','1575376899',0),(8,'MRV001','0',8,'1575376929','1575376929',0),(9,'MRV001','0',8,'1575376972','1575376972',0),(10,'MRV001','33',8,'1575377006','1575377006',0),(11,'MRV001','16',8,'1575377044','1575377044',0),(12,'MRV001','0',8,'1575377089','1575377044',0),(13,'MRV001','0',8,'1575377127','1575377127',0),(14,'MRV001','33',8,'1575377158','1575377158',0),(15,'MRV001','50',8,'1575377193','1575377193',0),(16,'MRV001','16',8,'1575377227','1575377227',0),(17,'MRV001','16',8,'1575377266','1575377266',0),(18,'MRV001','0',8,'1575377295','1575377295',0),(19,'MRV001','0',8,'1575377330','1575377330',0),(20,'MRV001','0',8,'1575377364','1575377364',0),(21,'MRV001','0',8,'1575377394','1575377394',0),(22,'MRV001','16',8,'1575377422','1575377422',0),(23,'MRV001','0',8,'1575377449','1575377449',0),(24,'MRV001','0',8,'1575377481','1575377481',0),(25,'MRV001','0',8,'1575377520','1575377520',0),(26,'MRV001','50',8,'1575377549','1575377520',0),(27,'MRV001','16',8,'1575377586','1575377586',0),(28,'MRV001','0',8,'1575377614','1575377614',0),(29,'MRV001','0',8,'1575377648','1575377648',0),(30,'MRV001','0',11,'1575377693','1575377693',0),(31,'MRV001','33',11,'1575377721','1575377721',0),(32,'MRV001','33',16,'1575377750','1575377750',0),(33,'MRV001','0',16,'1575377785','1575377750',0),(34,'MRV001','0',16,'1575377814','1575377814',0),(35,'MRV001','16',8,'1575377843','1575377814',0),(36,'MRV001','66',8,'1575377865','1575377865',0),(37,'MRV001','0',8,'1575377888','1575377865',0),(38,'MRV001','0',8,'1575377912','1575377865',0),(39,'MRV001','0',8,'1575377937','1575377865',0),(40,'MRV001','0',8,'1575377959','1575377959',0),(41,'MRV001','0',22,'1575377984','1575377959',0),(42,'MRV001','16',23,'1575378020','1575378020',0),(43,'MRV001','33',2,'1575378060','1575378020',0),(44,'MRV001','0',2,'1575378084','1575378084',0);
/*!40000 ALTER TABLE `user_result` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'anil','$2b$10$snxSB4Kk3fq4CxohXQABM.pTU60/6n8P0M9CAhmsY3.lKotCSEeMG','anilkumarpahadiya@gmail.com','8209214670','1993-07-22','10','Madhya Pradesh','Nimach',1,'0',3343,'male','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiI4MjA5MjE0Njc5IiwiZW1haWxfaWQiOiJhbmlsa3VtYXJwYWhhZGl5YUBnbWFpbC5jb20ifSwiaWF0IjoxNTc1MTAwMDc0LCJleHAiOjE1NzUxMDAxMzR9.e7hhu3p58HN5CajAFjg1rm_zc4QsiWGznkimeyhCAhg',50,'oWOSkJ','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','vdsfhsdhfsdhj','','jfgjddhjfgdhjfgdjhdfgjh',0,0,'1575378303','1575378303'),(2,'hbb','$2b$10$dXdqRmUuPF.FZrK1QvcLteuA2yvGQoaSezfy.qUtyrYadenAn4x.G','gg@yopmail.com','9632580741','2019-11-30','10th','Udaipur','Rajasthan',1,'0',2595,'Female','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiI5NjMyNTgwNzQxIiwiZW1haWxfaWQiOiJnZ0B5b3BtYWlsLmNvbSJ9LCJpYXQiOjE1NzUxMTEyNTgsImV4cCI6MTU3NTExMTMxOH0.gXHwQTVcq-CbC4zZNyUGo4OIYCTRYmVP95eX-vXQHoU',50,'X0nC5g','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','aecf25fcdac6417a','','eJ_fzmh6J90:APA91bFT7_jZs73BBmNY7hDJ4jMq5iT3eZvCshI9mk75na2KSZa2kd7RYIHa5LY4e8WoOj02qd1sSqB6Lkq_DBs7Kc8nWoeuFrP0sJR0SsCjqOuP7IT-Ur_foSCC-qP1atPt4ogoM7bX',0,0,'1575378344','1575378344'),(3,'varsha','$2b$10$18Hj5q1RhzP6v4IBQxo6.ez0RlKcNv3ekVwqL/en3hB/Iuh/24BjG','rohit@yopmail.com','1234567890','1993-07-22','11th','Madhya Pradesh','Nimach',0,'0',8988,'male','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiIxMjM0NTY3ODkwIiwiZW1haWxfaWQiOiJyb2hpdEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE1NzUxNzkzMjYsImV4cCI6MTU3NTE3OTM4Nn0.zHb7Q3r0NjYSA3Dc8ZUvP6VpoXrzs6_CmVPs7BZjc0Q',50,'Bc5WXA','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','1@!eefr456d:efeffdfdf!!!223ew333r','','12345tyhfefrtgrf#@!:rgrge',0,0,'1575378377','1575378377'),(4,'rohit','$2b$10$2KTDukgEqAZ5wxF8v1stoewAhMVCWnZRV95/F6bFhvwy1B4KQEEDi','rohit@yopmail.com','1111111111','1993-07-22','10th','Madhya Pradesh','Nimach',1,'0',3724,'male','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiIxMTExMTExMTExIiwiZW1haWxfaWQiOiJyb2hpdEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE1NzUxODAyNzIsImV4cCI6MTU3NTE4MDMzMn0.gbrXno9aSJeTbcPZY6EgFsP_jz90CFgZv9L5Rt3lmjQ',50,'1G8tQB','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','vdsfhsdhfsdhj','','jfgjddhjfgdhjfgdjhdfgjh',0,0,'1575378407','1575378407'),(5,'varsha','$2b$10$DM3D1ApRcU3TZhbit6XX0.zGFw4.cRUVwK0Hki8g3uPWpRW1J1nqa','varsha.yadav530@gmail.com','8209214671','1993-07-22','10','Madhya Pradesh','Nimach',0,'0',9278,'female','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiI4MjA5MjE0Njc5IiwiZW1haWxfaWQiOiJ2YXJzaGEueWFkYXY1MzBAZ21haWwuY29tIn0sImlhdCI6MTU3NTE4MjI4OCwiZXhwIjoxNTc1MTgyMzQ4fQ.WSM2rIVN2tl4xvxBslwrCdjqz9FC4GYcsN4WX3Zg3IA',50,'qcZnWQ','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','vdsfhsdhfsdhj','','jfgjddhjfgdhjfgdjhdfgjh',0,0,'1575378439','1575378407'),(6,'varsha','$2b$10$aacxwVc8I.l4BDIVzjoP3ulblKp6XuiMvpEskcYeJszhGK.osmOhO','varsha.yadav530@gmail.com','8209214679','1993-07-22','10','Madhya Pradesh','Nimach',NULL,'0',5598,'female','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiIyMjIyMjIyMjIyIiwiZW1haWxfaWQiOiJ2YXJzaGEueWFkYXY1MzBAZ21haWwuY29tIn0sImlhdCI6MTU3NTE4MjM0MywiZXhwIjoxNTc1MTgyNDAzfQ.ivCSJKvjzTwNfx9raPVvFNoLXPoa7d_jcALvMwnEboc',50,'Ck6CWM','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','dsfdsxcvxvfdddsssd123','','cvxcvxc',0,0,'1575378460','1575378407'),(7,'varsha','$2b$10$4mbEYTF1PYiY6vTQF3.CNutnyI4pIOcRzovzxJumRj1KAUrem8fVm','varsha.yadav530@gmail.com','8209214675','1993-07-22','10','Madhya Pradesh','Nimach',1,'0',7152,'female','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiIxMTIxMjEyMTIxIiwiZW1haWxfaWQiOiJ2YXJzaGEueWFkYXY1MzBAZ21haWwuY29tIn0sImlhdCI6MTU3NTE4Nzk2MCwiZXhwIjoxNTc1MTg4MDIwfQ.wAjA6Ywe_XrCFde7smFvJi5meQ6hOTs1McA6eqASdt8',50,'JwWmbI','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/1575523650','vdsfhsdhfsdhj','','jfgjddhjfgdhjfgdjhdfgjh',0,0,'1575378484','1575524031'),(8,'varsha','$2b$10$QscSqh0xbQPiw3.8jzn2KOZNuqJm1d.XD.5sOASUmyrkClNdnj3Oy','a1@yopmail.com','1121212222','1993-07-22','10','Madhya Pradesh','Nimach',NULL,'0',2470,'female','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiIxMTIxMjEyMTIxIiwiZW1haWxfaWQiOiJhMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE1NzUxOTI5NzQsImV4cCI6MTU3NTE5MzAzNH0.zF8GvzLtmnrkri9iWxfFaHmvgxABFzPpYr9HLWjsq2U',50,'IyhWMF','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','vdsfhsdhfsdhj','','jfgjddhjfgdhjfgdjhdfgjh',0,0,'1575378507','1575378507'),(9,'varsha','$2b$10$8OK6uhaO4Z3H8ytiotufaOXoesrzUrAJJC4gUPeR1ymdQ8LMuBhk2','a1@yopmail.com','1121212121','1993-07-22','10','Madhya Pradesh','Nimach',0,'0',6786,'female','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiIxMTIxMjEyMTIxIiwiZW1haWxfaWQiOiJhMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE1NzUxOTQwNTUsImV4cCI6MTU3NTE5NDExNX0.GTxDxdAbe-kzQvjWEHXYgJeVv0L6KtyHy9BA2VJg50U',50,'q9ivgq','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','vdsfhsdhfsdhj','','jfgjddhjfgdhjfgdjhdfgjh',0,0,'1575378540','1575378540'),(13,'Anil','$2b$10$K0GI7jgRMQ/lVEmfPZKXkOA3.e..y9rPcW.E4QyDf5ofzovdLkAPa','anilkumarpahadiya+5@gmail.com','8890999221','1992-04-15','10','Udaipur','Rajasthan',1,'0',8176,'male','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiI4ODkwOTk5MjIxIiwiZW1haWxfaWQiOiJhbmlsa3VtYXJwYWhhZGl5YSs1QGdtYWlsLmNvbSJ9LCJpYXQiOjE1NzU0ODQ4OTIsImV4cCI6MTU3NTQ4NDk1Mn0.MHYdniwwg4LPmgK2ezbJAtJunya-b8reHsuw2rlqlnM',50,'Aw7jnA','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','vdsfhsdhfsdhj','','jfgjddhjfgdhjfgdjhdfgjh',0,0,'1575484892','1575484964'),(14,'Rohit Kumar','$2b$10$9hbtrTFMATz0fwPnMxuUgel60GSYW5O.nAgrSowHcurSxvK8fB1bS','tohit@yopmail.com','8284946265','1991-08-07','10th','Chandigarh','Chandigarh',1,'0',6981,'Male','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3Rfbm8iOiI4Mjg0OTQ2MjY1IiwiZW1haWxfaWQiOiJ0b2hpdEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE1NzU3MDY0NzMsImV4cCI6MTU3NTcwNjUzM30.i3rQYpzlekUKn9twp6Wx2dSae_uX6rYdEyg3cvVX-NY',50,'2WKMec','https://mrb-data.s3.ap-south-1.amazonaws.com/profile_image/side_drawer_menu_profile_icon.png','ddwrt1','','ddwrt1',0,0,'1575706474','1575707432');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES ('MRV001','MRC001','Quadratic Equations(Introduction)','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1+Quadratic+Equations+Introduction.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1+Quadratic+Equations+(Introduction).pdf',20,'https://mrb-data.s3.ap-south-1.amazonaws.com/video_thumbnail/ezgif-4-6001e08ecd3b.jpg',1,'demo description Quadratic Equations(Introduction)','1575435367','1575435367',0),('MRV002','MRC001','Quadratic Equations(Numericals-Part 1)','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/2+Quadratic+Equations+Numericals-+Part+1.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/2+Quadratic+Equations+(Numericals-+Part+1).pdf',102,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description Quadratic Equations(Numericals-Part 1)','1575435431','1575435431',0),('MRV003','MRC001','Quadratic Equations(Numericals-Part 2)','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/3+Quadratic+Equations+Numericals-+Part+2.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/2+Solution+of+Quadratic+Equations+by+Factorisation+Numericals+Part+2.pdf',107,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435459','1575435459',0),('MRV004','MRC001','Solution of Quadratic Equations by factorisation Numericals Part 1','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1+Solution+Of+Quadratic+Equations+By+Factorisation+Numericals+Part+1.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1+Solution+of+Quadratic+Equations+by+Factorisation+Numericals+Part+1.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435490','1575435490',0),('MRV005','MRC001','Solution of Quadratic Equations by Factorisation Numericals Part 2','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/2+Solution+Of+Quadratic+Equations+By+Factorisation+Numericals+Part+2.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/2+Solution+of+Quadratic+Equations+by+Factorisation+Numericals+Part+2.pdf',102,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435530','1575435530',0),('MRV006','MRC002','Introduction','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1.Introduction.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1.Introduction.pdf',101,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',1,'demo description','1575435564','1575435564',0),('MRV007','MRC002','Nutrition in Green Plant','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/2.Nutrition+In+Green+Plant.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/2.Nutrition+in+Green+Plant.pdf',101,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',1,'demo description','1575435588','1575435588',0),('MRV008','MRC002','Components Of Photosysnthisis','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/3.Components+Of+Photosysnthisis.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/3.Components+Of+Photosysnthisis.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435615','1575435615',0),('MRV009','MRC003','Introduction Of Control And Coordination','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1.Introduction+Of+Control+And+Coordination.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1.Introduction+Of+Control+And+Coordination.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435650','1575435650',0),('MRV010','MRC003','Transmission Of Impulses','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/2.Transmission+Of+Impulses.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/2.Transmission+Of+Impulses.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435679','1575435679',0),('MRV011','MRC004','1 Madam Rides the bus','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/01+Madam+Rides+The+Bus.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/01+madam+rides+the+bus.pdf',201,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435707','1575435707',0),('MRV012','MRC004','2 Madam Rides the bus','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/02+Madam+Rides+The+Bus.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/02+madam+rides+the+bus.pdf',200,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575435707','1575435707',0),('MRV013','MRC004','3 Madam Rides the bus','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/03+Madam+Rides+The+Bus.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/03+madam+rides+the+bus.pdf',102,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575436093','1575436093',0),('MRV014','MRC005','The tale of curstard the dragon','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/The+Tale+Of+Custard+The+Dragon.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/the+tale+of+custard+the+dragon.pdf',101,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437677','1575437677',0),('MRV015','MRC006','For Anne Gregory','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/For+Anne+Gregory.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/For+Anne+Gregory.pdf',150,'https://mrb-data.s3.ap-south-1.amazonaws.com/video_thumbnail/thumbnail1.jpg',0,'demo description','1575437702','1575437677',0),('MRV016','MRC007','Introduction Of Reproduction','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1.+Introduction+Of+Reproduction.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1.+Introduction+of+Reproduction.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437725','1575437725',0),('MRV017','MRC007','Types Of A sexual Reproduction Part-1','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1.1+Types+Of+Asesxual+Reproduction+Part-1.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1.1+Types+of+asesxual+reproduction+part-1.pdf',101,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',1,'demo description','1575437768','1575437768',0),('MRV018','MRC007','Types Of A sexual Reproduction Spore Formation Part-2','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/3.+Types+Of+Asexual+Reproduction+Spore+Formation-+Part-2.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/3.+Types+of+asexual+reproduction+Spore+formation-+part-2.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/video_thumbnail/thumbnail2.jpg',0,'demo description','1575437799','1575437799',0),('MRV019','MRC008','Pollination Introduction','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/10.+Pollination-Introduction.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/10.+Pollination-Introduction.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437829','1575437799',0),('MRV020','MRC008','Ways of pollination self','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/11.+Ways+Of+Pollination-Self.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/11.+Ways+of+pollination-Self.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437857','1575437857',0),('MRV021','MRC009','Introduction And Nomenclature','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1.Introduction+And+Nomenclature.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1.Introduction+and+Nomenclature.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437887','1575437887',0),('MRV022','MRC009','Structure Of Carbonyl Group','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/2.Structure+Of+Carbonyl+Group.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/2.Structure+of+Carbonyl+Group.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437914','1575437914',0),('MRV023','MRC009','Preparation Of Aldehydes And Ketones','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/3.Preparation+Of+Aldehydes+And+Ketones.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/3.Preparation+of+Aldehydes+and+Ketones.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437942','1575437942',0),('MRV024','MRC010','General Introduction And Electronic structure','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/1.+General+Introduction+And+Electronic+Structure.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/1.+General+introduction+and+electronic+structure.pdf',101,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',1,'demo description','1575437968','1575437968',0),('MRV025','MRC010','Classification','https://mrb-data.s3.ap-south-1.amazonaws.com/videos/2.+Classification.mp4','https://mrb-data.s3.ap-south-1.amazonaws.com/notes/2.+Classification.pdf',100,'https://mrb-data.s3.ap-south-1.amazonaws.com/videos/list_video_thumbnail.png',0,'demo description','1575437993','1575437993',0);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-09 11:14:49
