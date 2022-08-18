-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: lattice_assignment
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitals`
--

LOCK TABLES `hospitals` WRITE;
/*!40000 ALTER TABLE `hospitals` DISABLE KEYS */;
INSERT INTO `hospitals` VALUES (1,'Apollo Hospitals'),(2,'Jawaharlal Nehru Medical College and Hospital'),(3,'Indira Gandhi Institute of Medical Sciences (IGIMS)'),(4,'AIIMS - All India Institute Of Medical Science');
/*!40000 ALTER TABLE `hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(15) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `psychiatrist_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `psychiatrist_id` (`psychiatrist_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`psychiatrist_id`) REFERENCES `psychiatrists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'pankaj kumar','xyz street mohali punjab','918596645296','pankaj@xyz.com','Pankaj@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660825326355user.png',1),(2,'Pranjal kumar','xyz street mohali punjab','918563645296','pranjal@xyz.com','Pranjal@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660825407096user.png',1),(3,'Umesh bansal','xyz street mohali punjab','918563645254','umesh@xyz.com','Umesh@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826749875user.png',1),(4,'Tarun bansal','xyz street mohali punjab','918563645214','tarun@xyz.com','Tarun@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826794249user.png',3),(5,'Varun bansal','xyz street mohali punjab','918563645169','varun@xyz.com','Varun@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826825586user.png',4),(6,'Karn bansal','xyz street mohali punjab','918563645763','karan@xyz.com','Karan@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826856910user.png',5),(7,'Krish','xyz street mohali punjab','918563645426','krish@xyz.com','Krish@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826882964user.png',6),(8,'Kartik','xyz street mohali punjab','918563645485','kartik@xyz.com','Kartik@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826918943user.png',6),(9,'Kunal','xyz street mohali punjab','918568515485','kunal@xyz.com','Kunal@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826947056user.png',7),(10,'Yogesh','xyz street mohali punjab','918568515490','yogesh@xyz.com','Yogesh@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660826991481user.png',8),(11,'Pintu','xyz street mohali punjab','918568515830','pintu@xyz.com','Pintu@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827021886user.png',8),(12,'Omkar','xyz street mohali punjab','null','omkar@xyz.com','Omkar@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827223026user.png',9),(13,'Gujar Sing','xyz street mohali punjab','+916582479658','gujar@xyz.com','Gujar@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827286713user.png',21),(14,'Labh Singh','xyz street mohali punjab','+916582479843','labh@xyz.com','Labh@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827315284user.png',19),(15,'Partap Singh','xyz street mohali punjab','null','partap@xyz.com','Partap@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827380681user.png',17),(16,'Jasan','xyz street mohali punjab','null','jasan@xyz.com','Jasan@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827404327user.png',15),(17,'Raju','xyz street mohali punjab','null','raju@xyz.com','Raju@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827424487user.png',13),(18,'Ramesh','xyz street mohali punjab','null','ramesh@xyz.com','Ramesh@123','https://lattice-assignment-sunil.s3.ap-south-1.amazonaws.com/patientPhoto/1660827441046user.png',11);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psychiatrists`
--

DROP TABLE IF EXISTS `psychiatrists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychiatrists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(15) NOT NULL,
  `hospital_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `psychiatrists_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychiatrists`
--

LOCK TABLES `psychiatrists` WRITE;
/*!40000 ALTER TABLE `psychiatrists` DISABLE KEYS */;
INSERT INTO `psychiatrists` VALUES (1,'Jitesh kumar','+18547825875','jitesh@xyz.com','Jitesh@123',3),(2,'Hitesh kumar','+18547825872','hitesh@xyz.com','Hitesh@123',1),(3,'Ritesh kumar','+918547825872','ritesh@xyz.com','Ritesh@123',2),(4,'Lokesh Garg','+918547825836','lokesh@xyz.com','Lokesh@123',4),(5,'Himansu Bansal','+918547825256','himansu@xyz.com','Himanshu@123',3),(6,'Harsh Bansal','+918546985256','harsh@xyz.com','Harsh@123',3),(7,'Anuj Gupta','+918545985256','anuj@xyz.com','Anuj@123',1),(8,'Kapil Gagr','+918635985256','kapil@xyz.com','Kapil@123',1),(9,'Neha Rani','+918635985269','neha@xyz.com','Neha@123',1),(10,'Nikita bansal','+918645985269','nikita@xyz.com','Nikita@123',1),(11,'Kalesh Kumar','+918642155269','Kalesh@xyz.com','Kalesh@123',1),(12,'Bharat gupta','+916942155269','bharat@xyz.com','Bharat@123',1),(13,'Tarun Singla','+916942155236','tarun@xyz.com','Tarun@123',2),(14,'Pintu singla','+916942136236','Pintu@xyz.com','Pintu@123',2),(15,'Lokesh Bansal','+916942136156','lokesh2@xyz.com','Lokesh@123',2),(16,'Gita Rani','+916853136156','gita@xyz.com','Gita@123',2),(17,'Honey','+9168531361163','honey@xyz.com','Honey@123',2),(18,'Binny','+9168531361528','binny@xyz.com','Binny@123',3),(19,'Vinod','+9168486361528','vinod@xyz.com','Vinod@123',3),(20,'Munish Jindal','+9168486361149','munish@xyz.com','Munish@123',4),(21,'Prakash Singla','+916848661149','prakash@xyz.com','Prakash@123',4),(22,'Vaibh','+916848661150','vaibh@xyz.com','Vaibh@123',4),(23,'Ram Mohan','+916848661180','ram@xyz.com','Ram@1238',4);
/*!40000 ALTER TABLE `psychiatrists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 18:33:27
