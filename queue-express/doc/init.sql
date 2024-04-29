--
-- Database user
--
CREATE USER 'u299246104_qe'@'localhost' IDENTIFIED VIA mysql_native_password USING 'pu299246104_qe';GRANT ALL PRIVILEGES ON *.* TO 'u299246104_qe'@'localhost' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;CREATE DATABASE IF NOT EXISTS `u299246104_qe`;GRANT ALL PRIVILEGES ON `u299246104\_qe`.* TO 'u299246104_qe'@'localhost';


- database name: u299246104_qe

--
-- Table structure for table `partners`
--
DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partners` (
  `name` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='business partners';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `queues`
--
DROP TABLE IF EXISTS `queues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `queues` (
  `partnerName` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`partnerName`),
  CONSTRAINT `partnerNameForeignKey` FOREIGN KEY (`partnerName`) REFERENCES `partners` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='queues owned by users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clientsWaiting`
--
DROP TABLE IF EXISTS `clientsWaiting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientsWaiting` (
  `partnerName` varchar(100) NOT NULL,
  `code` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(100),
  `enteringTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY `code` (`code`),
  CONSTRAINT `queuePartnerNameForeignKey` FOREIGN KEY (`partnerName`) REFERENCES `queues` (`partnerName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='clients waiting in queues';
/*!40101 SET character_set_client = @saved_cs_client */;
