-- MySQL dump 10.16  Distrib 10.1.36-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: datc
-- ------------------------------------------------------
-- Server version	10.1.36-MariaDB

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
-- Table structure for table `parkingspaces`
--

DROP TABLE IF EXISTS `parkingspaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkingspaces` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Lat` float DEFAULT NULL,
  `Lng` float DEFAULT NULL,
  `Status` varchar(32) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkingspaces`
--

LOCK TABLES `parkingspaces` WRITE;
/*!40000 ALTER TABLE `parkingspaces` DISABLE KEYS */;
INSERT INTO `parkingspaces` VALUES (1,45.7538,21.2272,'OCUPAT',18);
/*!40000 ALTER TABLE `parkingspaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (18,'bogdan','bogdan','test@test.com','e2bc8f8dadfa4bb902a6d63ec308cf46$0ee6c0cf7f815db82ca56eed03d3221b79ace2a090d43cb73b858ab0ff10f18c'),(19,'Popescu','Gigel','popescu.gigel@gmail.com','ea7f80985a35bdfddb29e4d26c419c97$7728c3dfb832b720ebf62e5c427f394ed3ccbba4700221d38c613ad74c1172c7');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersessions`
--

DROP TABLE IF EXISTS `usersessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersessions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `AuthorizationToken` varchar(1024) DEFAULT NULL,
  `IssuedAt` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersessions`
--

LOCK TABLES `usersessions` WRITE;
/*!40000 ALTER TABLE `usersessions` DISABLE KEYS */;
INSERT INTO `usersessions` VALUES (34,18,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTgsImlhdCI6MTU0MzU4NjI5MiwiZXhwIjoxNTQ2MTc4MjkyfQ.APR3u8WPVXn2zn-2ETwBTFRB__m8WsMwD2rGqsTNYG7ZxSler6pBG2Pz86Nr6l7A1y-Rc7SiUlBri8sBY9lRjlTlOXD5ui3tIZYVLt3DZY6dAdSIFQ-XftjgTDBEGeDaiA7Amu-9ugV3-oUiXBWFfye5GRzc3BkwAb9DBU5YS9YQMOB2Cv3M-uDm4vDDRovBLmkVpqF1wXbCAeTsffOqRpPw6cUVkcS9Vw4N6SjpvJFSu5KB-6r6lNXo8dVEEGCICntTLvus-BdzcyCMCoxAJaD1SccHJoWgYDQ-ByIx-aeYkwjBeeSF0xyXkk32TvymRP5jZtQoTRIX0PVkJgBnmQ','0000-00-00 00:00:00'),(35,18,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTgsImlhdCI6MTU0MzU4OTk5OCwiZXhwIjoxNTQ2MTgxOTk4fQ.gR75VAaMyNjuK0UcKJE5sioP6xm5fVF51Rvm4VsaNewnP6Rlwvjzpuoz2F6oGfVeN1XCt3j7HVQqgapFd85q4HLJakqUP2iWyDk_Xt9jNCmQw2g_0Pg0MSHUobY_ymBu4CjdqsTjcKndEdeQ-_vNslhn9NPkifspkd_-JiC_0I7FyUhu9TGHIlH9FHr-NC60eOqP2GBcpq031Jr4pC98uelwoM7D44zNXpT7zJkQfTPjUEESJGSSTucrBX5I-AFtP353sHzwOsLoqqKqbQF1-Mf7dJKAdHHlJJgEnYpJ7ynoJ31FnQ_QYk5Gpn-qErVDLuDydB4uQFshIDf4UpSAcA','0000-00-00 00:00:00'),(36,18,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTgsImlhdCI6MTU0MzU5MDM1NiwiZXhwIjoxNTQ2MTgyMzU2fQ.uuYuzYgu9halD5oV1p6PClJ649PpL-HU5SiJbPZQThrnFfhCXZNCf4zmGKtpdfzVnlmny8nrWVpPV6UcEcrehL97dO573fTkgpxEFvAvBvecF6YY4Np-KfmS8_rLpp0GlZJ3j5tk66KjY2fvNtVKBVTvvnBCkTZ01lW9o1NWnEfekedGpULDWPuZTQkttUK0w-giAfQsf6FWTl2Rus3V9Zoe1eqEaYR1caBQeW05rGIFE17BWHlbkTmtvbieUxPCfvznwLgIwkFZAYM7x_qEKDWgwLMV-Dkl_btdaptjfzlBGuk-e7k7sd6eMyByow1ZlOr8Z035aPEqEpplCzl6Sg','0000-00-00 00:00:00'),(37,18,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTgsImlhdCI6MTU0MzU5MDQzOSwiZXhwIjoxNTQ2MTgyNDM5fQ.E7q9B7AEAYUZ_FglZXqdWo8CztNQ6st6b84PlrJPhiJMgPUk1ZIbptXXUVOlD-2aZfLx1UUXPVGXN2d6Ay8HVBIGJ5Dpi9jc2aQeOVrNnqlw4IRq9DdCi_7JnE7X4q6hmxZdTT0UdVG1Zo01sXI1aBUT8-P9GZr1geYJ9EsilEJAn1k_0WthYKkjLyzeZif8UBlS3YPICFIAignmyJgES0nFDdMuakcIKS-YAKrgS-tWxQ66JcsmiVE2h5KITq495AweFBUEFJyH_WLXj4AcsOfkC2vT1sl_cHCjQ1CQUB64LDIfdSGnx9Suz78m3zxtR5k4yEAAP2A2HKumfzDscw','0000-00-00 00:00:00'),(38,18,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTgsImlhdCI6MTU0MzU5MDQ5OCwiZXhwIjoxNTQ2MTgyNDk4fQ.pr4OIFk1weONmZE9rrgnnOe8rnmv9oD_PFUL84lZQMzSHQ2KowyM-uYHkHSYJIhWJd8iUE5MauhkZGfPZDhg4zdOEa2_7HUmU2DLeGTidmEHHL3-3nqqKXxCjBfGTVrCrap9ckMiWCKkF9_KJp8iRcb8Z0nhlBBEZQBCe_wOErOlo5hzGLhIk9jHJKm-9YASI4MLLEJbXCNF2Wy1l0dZXqWZWiMGqIh1slXtUrkPa4quQ38-6SdWdZk0pYX5sTvkI-y03pob2gWAMqUom6pMgkJU0TEZjISl7w6ONQI1PMbtqs6EXyjqhRZMebd-ucYgdRJRKmoM3x14iMj37eAOAg','0000-00-00 00:00:00'),(49,19,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTksImlhdCI6MTU0MzU5MTg0MSwiZXhwIjoxNTQ2MTgzODQxfQ.VqDSB7FMdiN0VDocO6BcJE1kr8lLDNOokEnpAI8ALRkVkB64dOt0_L8ttFHXyUbEYOWDh_CKWEMoZykIit8IovfstV-8sDrExRdlRb_--SGz81TmF4a37Y8ZhNB4apqL_FNIvOkij0je7lFHvDIGSGF0Ag8zV40ZCThcGOTsPfK-vdFyECPydUQNR6Asd6IbiFe6W-0_gdXxh4dHZYWtlB1lNRYolAVGqX1ZFVu9UUVrzVMpxM4ufQOPdmyP8CFBIDXPPngS9NjSEogO_z0N6x40i19EUc3oXnGK72pN_0Cec3udnyp7hEEhUeGQp_WYAxo_trh1JiCvaq2Gc5ZKWg','0000-00-00 00:00:00'),(50,18,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTgsImlhdCI6MTU0NDU1NzAxNCwiZXhwIjoxNTQ3MTQ5MDE0fQ.uOGbQy-P1I86gstyzhn_MdHdsnlwqzWbqTIsQi97LNqi8hrwYr5Dy9wHaOpfGBghTUe3u-dpqvdIwlIzBmCIDqQuNtSK_RRwML9Jr8dEe7aRWnZTv_6Inib-s-bhbeErUxnWxHsYvBaoPkj0_4O6oxhMZhGnimJr9X4lo1CagyycbBgKgnOoZIkuWRDwuSRlGootCxixUFrsHHP4ppUfsP2mw5epRSl8kV2kBsEf5zv46YvF5C2gd1iRAipBb9Kcrzp707jz5W6DwEXck01trehN4SNSeV28isTmVsjSbXxlyXGUw5_CRxX6kmjeq6Bi5C-dBB6Z6Juuz0UmgecJFQ','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `usersessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-13 21:40:51

insert into ParkingSpaces values (1, 45.75380776330037, 21.22719311935225, "red", 0);
insert into ParkingSpaces values (2, 45.753804698218545, 21.227149593851664, "green", 0);
insert into ParkingSpaces values (3, 45.7538150954001, 21.227095204611032, "green", 0);
insert into ParkingSpaces values (4, 45.75382133369664, 21.22704826595327, "red", 0);
insert into ParkingSpaces values (5, 45.75382866586218, 21.226999587268438, "red", 0);
insert into ParkingSpaces values (6, 45.753833214766416, 21.226959075043396, "red", 0);
insert into ParkingSpaces values (7, 45.75384035855563, 21.226915218354634, "red", 0);
insert into ParkingSpaces values (8, 45.75384834439878, 21.226872149159703, "red", 0);
insert into ParkingSpaces values (9, 45.75385562241893, 21.22682446544161, "red", 0);
insert into ParkingSpaces values (10, 45.7538587415686, 21.226778271839066, "red", 0);
insert into ParkingSpaces values (11, 45.75385226481221, 21.22673775169767, "red", 0);
insert into ParkingSpaces values (12, 45.753860062684744, 21.22669379327101, "red", 0);
insert into ParkingSpaces values (13, 45.75387045985595, 21.22665132496502, "red", 0);
insert into ParkingSpaces values (14, 45.753875121939096, 21.226601651338, "red", 0);
insert into ParkingSpaces values (15, 45.753875121939096, 21.226550987388805, "green", 0);
insert into ParkingSpaces values (16, 45.75388343968252, 21.226501813560276, "red", 0);
insert into ParkingSpaces values (17, 45.75388967797145, 21.226454129839567, "red", 0);