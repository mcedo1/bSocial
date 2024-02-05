CREATE DATABASE  IF NOT EXISTS `bdata` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bdata`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bdata
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `commentId` int unsigned NOT NULL AUTO_INCREMENT,
  `postId` int unsigned NOT NULL,
  `userId` int unsigned NOT NULL,
  `content` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`),
  KEY `fk_post` (`postId`),
  KEY `fk_user` (`userId`),
  CONSTRAINT `fk_post` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`),
  CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,123456793,9,'Prvi od mojih komentara ikada napravljen.','2024-01-28 22:22:13'),(2,123456793,8,'Za razliku od prethodnog posta ovaj mi se dopada','2024-01-29 18:32:44'),(3,123456793,9,'Krajnja promjena','2024-01-29 22:59:56'),(4,123456793,9,'Mihajlovic u sredinu','2024-01-29 23:03:29'),(5,123456793,9,'Da li je takva ekspropriacija dobra nisam siguran','2024-01-30 09:13:36'),(12,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:26:07'),(13,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:27:18'),(14,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:27:59'),(15,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:28:49'),(16,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:32:34'),(17,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:37:16'),(18,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:48:08'),(19,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-30 23:52:53'),(20,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-31 00:03:46'),(21,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-31 00:12:00'),(22,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-31 00:13:21'),(23,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-31 00:14:36'),(24,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-31 00:16:12'),(25,123456793,9,'ekspropriacija dobara nisam siguran','2024-01-31 00:21:56'),(26,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 09:51:58'),(27,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 09:56:38'),(28,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:00:51'),(29,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:04:32'),(30,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:05:15'),(31,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:15:58'),(32,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:17:33'),(33,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:18:33'),(34,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:26:19'),(35,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:27:12'),(36,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:29:21'),(37,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:48:04'),(38,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 10:55:15'),(39,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 11:06:28'),(40,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 11:11:57'),(41,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 14:39:54'),(42,123456793,9,'Evaluacija nije  dobara nisam siguran','2024-01-31 15:36:41'),(43,123456793,9,'Razmisljao sam bilo mi je mnogo jako','2024-01-31 15:38:05'),(44,123456793,9,'Uspjevao  sam bilo mi je mnogo jako','2024-01-31 16:09:58'),(45,123456793,9,'Realizacija kao uza specijalnost','2024-01-31 16:12:27'),(46,123456793,9,'Realizacija kao uza specijalnost','2024-01-31 16:14:40'),(47,123456793,9,'Realizacija kao uza specijalnost','2024-01-31 16:26:25'),(48,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 16:32:44'),(49,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 16:35:07'),(50,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 16:40:05'),(51,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 16:41:27'),(52,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 16:42:39'),(53,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 16:43:20'),(54,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 17:24:23'),(55,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 17:26:18'),(56,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 17:35:32'),(57,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 18:48:13'),(58,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:22:48'),(59,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:46:53'),(60,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:48:09'),(61,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:49:30'),(62,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:52:48'),(63,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:54:46'),(64,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:55:46'),(65,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:56:44'),(66,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:58:32'),(67,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 19:59:14'),(68,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 20:00:47'),(69,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 20:03:25'),(70,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 20:23:05'),(71,123456793,9,'Determinisanost kao uza specijalnost','2024-01-31 20:26:41'),(72,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:27:22'),(73,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:27:42'),(74,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:27:46'),(75,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:27:49'),(76,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:36:04'),(77,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:37:24'),(78,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:37:27'),(79,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:37:30'),(80,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:43:46'),(81,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:44:22'),(82,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:44:32'),(83,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:44:35'),(84,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:45:18'),(85,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:45:38'),(86,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:46:08'),(87,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:46:18'),(88,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:47:25'),(89,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:48:30'),(90,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:48:33'),(91,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:48:36'),(92,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:51:37'),(93,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:51:41'),(94,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:52:19'),(95,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:53:03'),(96,123456793,9,'Ono kao uza specijalnost','2024-01-31 20:53:24'),(97,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:00:27'),(98,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:00:30'),(99,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:07:47'),(100,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:11:29'),(101,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:11:36'),(102,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:14:25'),(103,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:15:35'),(104,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:15:55'),(105,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:16:44'),(106,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:18:56'),(107,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:22:20'),(108,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:23:14'),(109,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:23:59'),(110,123456793,9,'Ono kao uza specijalnost','2024-01-31 21:40:50'),(111,123456793,9,'Ono kao uza specijalnost','2024-02-01 15:13:32'),(112,123456793,10,'Ono kao uza specijalnost','2024-02-01 16:54:48'),(113,123456793,10,'Ono kao uza specijalnost','2024-02-01 16:54:54'),(114,123456793,10,'Stize proljece ','2024-02-01 16:55:11'),(115,123456810,10,'Stize proljece  stizu uspjesi','2024-02-01 16:56:46'),(116,123456810,10,'Bravo majstore','2024-02-01 16:57:17'),(117,123456810,10,'Uspjeli ste, cestitam','2024-02-01 16:57:32'),(118,123456811,10,'Apsolutno se slazem sa tobom','2024-02-01 16:59:23'),(119,123456811,10,'Ja bas volim Frojda i Junga','2024-02-01 17:00:31'),(120,123456811,10,'Meni se sama ideja proucavanja kod psihologa ne dopada','2024-02-01 17:00:59'),(121,123456812,10,'Ja se ne bih bas slozio','2024-02-01 17:02:03'),(122,123456812,10,'Ja se absolutno slazem','2024-02-01 17:02:26'),(123,123456813,10,'Ja se absolutno slazem','2024-02-01 17:03:16'),(124,123456813,10,'da da','2024-02-01 17:03:37'),(125,123456814,10,'Ljudi jesu osnova svega','2024-02-01 17:04:15'),(126,123456814,10,'Ljudi da budemo','2024-02-01 17:04:54'),(127,123456815,10,'Radule zavisi sa  kim se druzis ','2024-02-01 17:05:48'),(128,123456815,10,'Radule zavisi sa  kim se druzis ','2024-02-01 17:05:54'),(129,123456816,10,'Nikada iskreno ','2024-02-01 17:06:34'),(130,123456816,10,'Nikada iskreno ','2024-02-01 17:08:32'),(131,123456816,10,'Jako bitno je ','2024-02-01 17:08:55'),(132,123456817,10,'Jako bitno je ','2024-02-01 17:09:18'),(133,123456818,10,'Uzmi me  ','2024-02-01 17:09:47'),(134,123456818,10,'Uzmi me  ','2024-02-01 17:09:53'),(135,123456819,10,'Prelepa pesma  ','2024-02-01 17:10:28'),(136,123456820,10,'Miha je jedini neponovljivi ','2024-02-01 17:12:18'),(137,123456820,10,'Miha je  car ','2024-02-01 17:12:27'),(138,123456821,10,'Gradja','2024-02-01 17:13:17'),(139,123456815,10,'Sjajan komentar','2024-02-04 14:39:36'),(140,123456810,10,'Victory has hundred fathers loss is orphan','2024-02-04 14:40:58'),(141,123456793,10,'Idem mirno krivim putem.\n','2024-02-04 14:53:50'),(142,123456814,10,'Kao sto su bili nasi preci','2024-02-04 14:54:40'),(143,123456828,10,'Svi ti dani lepi, ja zivim svaki dan!','2024-02-04 15:10:55'),(144,123456828,10,'Hvala Bogu!','2024-02-04 15:11:04');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `followerId` int unsigned NOT NULL,
  `followeeId` int unsigned NOT NULL,
  PRIMARY KEY (`followerId`,`followeeId`),
  KEY `followeeId` (`followeeId`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`followerId`) REFERENCES `user` (`userId`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followeeId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (9,1),(1,5),(10,5),(1,6),(10,6),(9,7),(10,9),(9,10);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `content` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`postId`),
  KEY `post_ibfk_1` (`userId`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=123456829 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (123456792,9,'Ovo je sadržaj mog novog posta.','2024-01-28 18:36:09'),(123456793,9,'Ovo je sadržaj mog novog posta.','2024-01-28 18:38:07'),(123456796,10,'Razmisljanje kao i realizacija u zivotu','2024-01-29 17:19:32'),(123456797,7,'Restauracija starih spomenika','2024-01-29 17:20:55'),(123456798,9,'Efikasno i dobro ','2024-01-29 18:45:49'),(123456799,9,'Na bliskom istoku doslo do smanjenja zaliha nafte ','2024-01-29 20:24:05'),(123456800,9,'Na bliskom istoku doslo do smanjenja zaliha nafte ','2024-01-29 20:34:21'),(123456801,9,'Na bliskom istoku doslo do smanjenja zaliha nafte ','2024-01-29 21:03:54'),(123456802,9,'Dobro je ovo.','2024-01-29 21:06:25'),(123456803,9,'Dobro je ovo za svaki slucaj.','2024-01-29 21:19:07'),(123456804,9,'Dodatna provjera','2024-01-29 21:22:02'),(123456805,9,'Krajnja promjena','2024-01-29 21:22:49'),(123456806,9,'Krajnja promjena','2024-01-29 22:21:19'),(123456807,9,'Vodjenje statistike rada posta','2024-02-01 15:59:28'),(123456808,9,'Vodjenje statistike rada posta','2024-02-01 16:00:42'),(123456809,9,'Vodjenje statistike rada posta','2024-02-01 16:02:57'),(123456810,10,'Pobjeda kao moj moto zivota ','2024-02-01 16:55:51'),(123456811,10,'Psihologija je nesto vise od nauke ','2024-02-01 16:58:35'),(123456812,10,'Vremenska prognoza je lazna  ','2024-02-01 17:01:41'),(123456813,10,'Ljudi su obicno divni samo kada ih upoznate  ','2024-02-01 17:02:49'),(123456814,10,'Ljudi kao osnovna celija drustva','2024-02-01 17:03:58'),(123456815,10,'Iskrenost se danas cesto nipodastava','2024-02-01 17:05:10'),(123456816,10,'Preobukiranost?','2024-02-01 17:06:08'),(123456817,10,'Ljudi moraju biti produktivni','2024-02-01 17:08:45'),(123456818,10,'Letiti i biti slobodan','2024-02-01 17:09:10'),(123456819,10,'Ako trazis nekoga ','2024-02-01 17:10:05'),(123456820,10,'Kao Mihilovic iz sredine u vecnost ','2024-02-01 17:11:04'),(123456821,10,'Vrednost ','2024-02-01 17:12:56'),(123456822,10,'Procjena vrijednosti','2024-02-01 19:07:38'),(123456823,10,'Procjena vrijednosti','2024-02-01 19:10:19'),(123456824,10,'Procjena vrijednosti','2024-02-01 19:12:12'),(123456825,10,'Procjena imovine','2024-02-01 19:14:00'),(123456826,10,'Procjena imovine','2024-02-01 19:15:53'),(123456827,10,'Procjena imovine','2024-02-01 19:17:04'),(123456828,10,'Neki novi i ljepsi dani!\n','2024-02-04 14:38:16');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `dateRegistred` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John','Doe','johndoe','johndoe@example.com','mypassword','2024-01-27 16:32:38'),(5,'Jovan','Draskovic','johndoe','joova2n@example.com','$2b$10$bJ.78B1OOalDAtdzlHldXOncq1N47WkXmCNLebwm6jWqP18MqLHWO','2024-01-27 17:44:23'),(6,'Marko','Kraljevic','markos','marko@example.com','$2b$10$werWZQWWzWplwRw3C1Ek5uEoSZ3LSvKvSS4L15grVwDNmg3aW7AxC','2024-01-27 19:26:09'),(7,'Vesna','Markovic','mvesna','mvresna@example.com','$2b$10$rXZ3JrKwMDAWLLPbMkOp.uZw3yZJlUiD21B0Qtyz7ppbj8Qo3h9/W','2024-01-28 13:42:23'),(8,'Stefan','Mitrovic','mstefo','mstefa@example.com','$2b$10$nn3/mjkygoMYgY9TW6I/QeGuEoI93rlqT3iMvDHWrdIkVkWEL3fdW','2024-01-28 14:29:10'),(9,'Stefan','Lazarevic','stefo','stefko@example.com','$2b$10$QJdFdd/MiylYUNosCosQYOmtpzmNtPnbIs5iQjjcf.gvtay0xz03K','2024-01-28 16:54:42'),(10,'Radovan','Mrnjacevic','radule','radule@example.com','$2b$10$3ak7Xn2sj/A8yPshsAYxkOBiRYTVLyA8K2kGOtrjblrk0Qd7apsQO','2024-01-28 18:48:22');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdata'
--

--
-- Dumping routines for database 'bdata'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-04 18:34:15
