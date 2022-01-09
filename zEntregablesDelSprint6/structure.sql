-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: belivewild_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

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
-- Table structure for table `carts`
--

CREATE DATABASE belivewild_db;
USE belivewild_db;

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `total_saved` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0f050dfd-62d1-47ce-a4c9-68f67523277c` (`user_id`),
  CONSTRAINT `FK_0f050dfd-62d1-47ce-a4c9-68f67523277c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts_products`
--

DROP TABLE IF EXISTS `carts_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bd8dbb01-23bd-49d0-912f-53cdba5e222d` (`cart_id`),
  KEY `FK_faa822bc-1df4-4f64-9075-1374588e7d51` (`product_id`),
  CONSTRAINT `FK_bd8dbb01-23bd-49d0-912f-53cdba5e222d` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FK_faa822bc-1df4-4f64-9075-1374588e7d51` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts_products`
--

LOCK TABLES `carts_products` WRITE;
/*!40000 ALTER TABLE `carts_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tablas de Skate'),(2,'Tabla de Snow'),(3,'Tablas de Surf'),(4,'Gafas de Snow'),(5,'Pantalones'),(6,'Zapatillas'),(7,'Short de baño'),(8,'Camperas'),(9,'Remeras'),(10,'Gorros');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Amarillo'),(2,'Azul'),(3,'Blanco'),(4,'Gris'),(5,'Naranja'),(6,'Negro'),(7,'Rojo'),(8,'Verde');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functions`
--

DROP TABLE IF EXISTS `functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `functions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_or_user` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functions`
--

LOCK TABLES `functions` WRITE;
/*!40000 ALTER TABLE `functions` DISABLE KEYS */;
INSERT INTO `functions` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `functions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `season_id` int(11) NOT NULL,
  `title` varchar(70) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `discount` tinyint(4) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_456edaf2-8f6c-4f3d-b6c6-d80bf0395be8` (`category_id`),
  KEY `FK_92b17e50-a889-4bb7-bfad-22fdef389b06` (`season_id`),
  CONSTRAINT `FK_456edaf2-8f6c-4f3d-b6c6-d80bf0395be8` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FK_92b17e50-a889-4bb7-bfad-22fdef389b06` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,9,4,'Remera Wall Tee','Wall tee es una remera con estampa clásica, su tipografia es sutil pero original. Ideal para acompañarte tanto de dia, como de noche. ',5500,15,'Masculino','product_1641673708728.jpg',0),(4,7,2,'Malla con triangulo ','Corpiño malla con triangulo fijo. Los breteles son fijos a la espalda y regulables.',3500,0,'Femenino','product_1641673817617.jpg',0),(5,7,4,'Malla Rip Curl','Malla Rip Curl Special Size. Triangulo fijo. Tiras crizadas en esplada. Tasa desmontable. Dije logo rc',7000,5,'Femenino','product_1641683626843.jpg',0),(8,5,3,'Pantalon Rip Curl','Pantalon Rip Curl Blossom. Exclusiva estampa por metro reactivo. Palazzo cintura elastizada. Pierna super ancha.',9530,5,'Femenino','product_1641675418523.jpg',0),(9,10,2,'Gorro Beanie','Beanie Rip Curl Ribb',4000,3,'Masculino','product_1641674688891.jpg',0),(10,9,4,'Remera Empty Wave','Nuestra remera Empty Wave es una remera con logoinstitucional, marcando un estilo clasico pero perfecto',6500,15,'Masculino','product_1641673907492.jpg',0),(11,6,3,'Zapatillas Rip Curl','Zapatillas Rip Curl, capellada de canvas. Suela de goma. ',9800,3,'Femenino','product_1641674630561.jpg',0),(12,9,4,'Remera manga','Remera manga corta Tela: Jersey vigore Fit: Regular Back de talle estampado Tela:100% Algodón',6122,0,'Masculino','product_1641675690003.jpg',0),(13,10,4,'Gorra trucker','Gorra trucker con visera curva y frente con bordado de marca. La parte trasera es de red, lo que hace una gorra fresca',3700,0,'Masculino','product_1641674003873.jpg',0),(14,9,4,'Remera manga corta','Remera manga corta de algodón y algodón melange según variantes, con estampa al frente.',4800,5,'Masculino','product_1641674219875.jpg',0),(15,10,2,'Gorro Beanie Curl Ribb','Beanie Rip Curl Ribb.',5040,0,'Masculino','product_1641674950529.jpg',0),(16,6,2,':Zapatillas Rip Curl','Zapatillas Rip Curl capellada de gamuza con canvas. Suela de goma. ',14050,2,'Masculino','product_1641675237598.jpg',0),(17,9,4,'Remera New Spinner','Nuestro modelo New Spinner renovado temporada tras temporada da un aire de verano con sus lineas de colores en diferentes tonos. ',5300,0,'Masculino','product_1641674156293.jpg',0),(18,7,3,'Short de tela','TELA: 100% algodón  Boardshort  Tela: Algodón Outseam: 18” arriba de la rodilla Bolsillos: Bolsillo trasero aplicado',4600,1,'Masculino','product_1641675770133.jpg',0),(19,8,1,'Rip Curl Surf Revival','Rompeviento Rip Curl Surf Revival. Campera rompevientos. Anorak fit. Recortes en delantero. Parchebordado. 100% poliester.',12500,5,'Femenino','product_1641674762297.jpg',0),(20,7,4,'Malla con triangulo','Corpiño malla con triangulo fijo. Los breteles son fijos a la espalda y regulables.',5300,10,'Femenino','product_1641674064748.jpeg',0),(21,6,2,'Zapatilla de Canvas','Zapatilla de Canvas de Algodón. Suela de goma vulcanizada con bumper de refuerzo. Ojalillos metálicos y cordón redondo.',7000,0,'Masculino','product_1641675834129.jpg',0),(22,9,3,'Remera de tela','Remera manga corta Tela: Jersey snow Fit: Regular Back de talle estampado Tela: 50% Algodón, 25% Poliéster, 25% Viscosa',4580,0,'Masculino','product_1641675887328.jpeg',0),(23,9,4,'Remera de tela','Remera manga corta Tela: Jersey 30.1 Fit: Regular Back de talle estampado 100% Algodón',5000,0,'Masculino','product_1641675937633.jpg',0),(24,1,4,'Remera Palm tee','Divide Palm tee es una remera con estampa clásica, adaptándose a tu estilo con sus dos variantes de color.',5000,3,'Masculino','product_1641674274008.jpg',0),(25,9,3,'Musculosa Rip Curl Dreamers','Musculosa Rip Curl Dreamers. Jersey melange. Full print. Standar fit. Estampado Full. Multietiquetas bordadas.',5243,2,'Masculino','product_1641674994545.jpg',0),(26,10,4,'Gorra trucker','Gorra trucker con visera curva y frente con bordado de marca. La parte trasera es de red, lo que hace una gorra fresca',4800,5,'Femenino','product_1641674473421.jpg',0),(27,8,3,'Campera de Algodon','TELA: 57% Algodón, 43% Poliéster - Campera Harrington resistente al agua .Dos bolsillos laterales con solapa - Cierre frontal - Rib en puños y bajo - Bordado en el pecho',8457,5,'Masculino','product_1641676111277.jpg',0),(28,5,2,'Pantalon de tela','TELA: 100% Algodón Jogger Pant Tela: Gabardina. 6 oz. Fit: Jogger pant',6876,0,'Masculino','product_1641676041128.jpg',0),(29,10,3,'Gorro Cap trucker5','Cap trucker5 paneles con visera curva Cierre plástico',7079,10,'Masculino','product_1641676154549.jpg',0),(30,10,4,'Gorra Heritage Trucker','Colorida y veraniega, Nuestra Gorra Heritage Mashup Trucker con visera curva, estampada y fresca ya que tiene tejido malla en la parte de atrás.',5617,12,'Masculino','product_1641674349371.jpg',0),(36,9,4,'Remera Rip Curl','Remera Rip Curl Golden State. Standard fit. Remera manga corta. Estampa en delantero. Multietiquetas bordadas. 100% algodo. ',5564,0,'Femenino','product_1641674864457.jpg',0),(37,7,4,'Short Layback ','All day layback el short que te ofrece comodidad y estilo para tu día a día . La cintura elastizada, aumenta tu confort, tanto para el surf como para la calle. ',4600,15,'Masculino','product_1641674415798.jpg',0),(40,6,4,'Sandalias Rip Curl Stella',' Sandalias Rip Curl Stella. Correa - Correa de gamuza tejida. Plantilla: microfibra suave en la plantilla contorneada.',8700,0,'Femenino','product_1641675282793.jpg',0),(46,8,2,'Campera de tela','TELA: 57% Algodón, 43% Poliéster - Campera Harrington resistente al agua. Dos bolsillos laterales con solapa - Cierre frontal - Rib en puños y bajo - Bordado en el pecho',9000,0,'Masculino','product_1641676250031.jpg',0),(48,10,1,'Gorro Beanie','Beanie, 100% acrílico. Talle único.',5681,0,'Masculino','product_1641675076774.jpg',0),(49,5,2,'Pantalon Rip Curl','Pantalon Rip Curl Lino Beached. 80% lino 20% viscosa. Slouch fit. Lavado suavizado + siliconado. Multietiquetas.',8700,0,'Masculino','product_1641675367169.jpg',0),(55,8,1,'Campera puffer','Campera puffer Poliamide, padding de 75g',9470,0,'Femenino','product_1641675127782.jpg',0),(58,5,2,'Pantalón Rip Curl','Pantalón Rip Curl Cargo Micro 100% Poliester. Calce straight. Bolsillos cargo. Cierre desmontable en bermuda. Multietiquetas. ',7000,0,'Masculino','product_1641674809757.jpg',0),(60,3,4,'Tabla de Surf','Medidas: 182 cm X 51 cm X 7 cm (largo X ancho X espesor) Peso: 3.3 Kg Contiene 3 almas de madera. Contiene 1 pita 6mm Contiene juego de quillas Contiene grip.',54000,5,'Masculino','product_1641676626074.jpg',0),(62,7,4,' Malla Rip Curl Golden','Malla Rip Curl Golden. malla tiro alto. Calce colaless. Dije logo rc. 88% poliester 12% elastano.',7000,0,'Femenino','product_1641675503852.jpg',0),(64,8,1,'Campera con capucha','Campera con capucha Rip Curl Anti Series Elite. Poliéster elástico con tratamiento DWR. Cremalleras ocultas en las manos y protector de barbilla',8950,0,'Masculino','product_1641675181453.jpg',0),(66,5,2,'Pantalon de Poliéster','Pantalón de Tela: Algodón cordero y con elastano Cintura con cierre y botón metálico Prenda teñida con pigmento para lograr look vintage. Estampado en el bolsillo interior izquierdo\r\n',7656,10,'Masculino','product_1641676322838.jpg',0),(67,7,4,'Short de tela','TELA: 93% Poliester. 7% Elastano',6500,0,'Masculino','product_1641676494876.jpg',0),(68,10,3,'Sombrero australiano','Sombrero australiano Tela: Gabardina 100% Algodón',9200,15,'Masculino','product_1641676197482.jpg',0),(69,2,4,'Malla Rip Curl Golden','Malla Rip Curl Golden. malla tiro alto. Calce colaless. Dije logo rc. 88% poliester 12% elastano.',8300,2,'Femenino','product_1641675547641.jpg',0),(70,9,2,'Musculosa Rip Curl','Musculosa Rip Curl Wipeout. Fashion fit. Musculosa sisa baja. Lavado batik multicolor. Estampa logo. Multietiquetas bordadas. 100% algodon.',4870,0,'Masculino','product_1641674902696.jpg',0),(71,7,4,'Short de tela','TELA: 93% Poliester. 7% Elastano',7400,0,'Masculino','product_1641676451334.jpg',0),(74,3,4,'Tabla de Surf','Medidas: 214 cm X 55 cm X 7 cm (largo X ancho X espesor) Peso: 4.6 Kg Contiene 3 almas de madera Contiene 1 pita 6mm Contiene juego de quillas Contiene grip.',60000,0,'Masculino','product_1641676662981.jpg',0),(77,1,1,'Tabla de Snow','Los canales en la base desde la punta hasta la cola, y las 6 quillas de 0.7 hacen que esta tabla sea ideal para dos cosas: ir rápido y alto. ',75000,0,'Masculino','product_1641676744620.jpg',0),(80,8,2,'Campera de tela','TELA: 100% Algodón - Campera - Tejido: Forro del cuerpo de algodón y poliéster - Bolsillos ojal - Estampa en pecho - Cierre en el frente - Etiqueta en el lateral',10500,0,'Masculino','product_1641676375668.jpg',0),(82,5,3,'Pantalon de tela','TELA: 98,75% Algodón, 1,25% Elastano - Pantalón 5 bolsillos - Tela: Algodón con elastano. Fondo de bolsillo crudo con serigrafía - Badana de cuero',6890,0,'Masculino','product_1641676552106.jpg',0),(89,3,4,'Tabla de Surf','Medidas: 275 cm X 60 cm X 9 cm (largo X ancho X espesor) Peso: 7.6 Kg Contiene 2 almas de madera Contiene 1 pita 6mm Contiene juego de quillas Contiene grip ',48000,0,'Masculino','product_1641676692630.jpg',0),(102,2,1,'Tabla de Snow','El corte lateral multisector ofrece un rendimiento predecible para cada tipo de tabla encuentra aterrizajes más suaves.',80000,5,'Masculino','product_1641676795097.jpg',0),(103,2,1,'Tabla de Snow','Excelente tabla para el cable. Si disfrutas de deslizarte sobre obstáculos y saltar rampas, entonces esta es la tabla que tanto estabas buscando.',7400,0,'Masculino','product_1641676829227.jpg',0),(104,1,3,'Tabla de Skate','Construcción EPOBLOCK en 7 CAPAS DE MAPLE CANADIENSE + pegamento EPOXI. La tabla más robusta y con mejor relación calidad/precio del mercado ',35000,0,'Masculino','product_1641676889374.jpg',0),(105,1,3,'Tabla de Skate','Hace ya 25 años que Woodoo Skateboards apila 7 capas de Maple canadiense y con espíritu marplatense ejecuta las tablas más resistentes del mercado.',30000,0,'Masculino','product_1641676915627.jpg',0),(106,1,3,'Tabla de Skate','La nueva edición limitada de Woodoo Skateboards celebra Halloween con una nueva tabla estampada. ',40000,10,'Masculino','product_1641676953005.jpeg',0),(109,9,4,' Remera New Rockaway','Remera manga corta de jersey 24/1 con estámpa al frente.',7200,15,'Masculino','product_1641735457984.jpg',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_colors`
--

DROP TABLE IF EXISTS `products_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d1a37a85-c489-40cd-8a61-f0221774f3b8` (`product_id`),
  KEY `FK_97161377-e12c-4338-ab7f-cade3393d12d` (`color_id`),
  CONSTRAINT `FK_97161377-e12c-4338-ab7f-cade3393d12d` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  CONSTRAINT `FK_d1a37a85-c489-40cd-8a61-f0221774f3b8` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_colors`
--

LOCK TABLES `products_colors` WRITE;
/*!40000 ALTER TABLE `products_colors` DISABLE KEYS */;
INSERT INTO `products_colors` VALUES (101,80,4),(102,80,6),(103,71,3),(104,71,6),(105,77,4),(106,77,7),(107,104,3),(108,104,6),(109,105,3),(110,105,6),(111,106,6),(112,106,7),(113,106,8);
/*!40000 ALTER TABLE `products_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_sizes`
--

DROP TABLE IF EXISTS `products_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_83a7ce1c-22d1-4da1-b99a-8d44bf19ce11` (`product_id`),
  KEY `FK_52c1a5fa-6340-41ad-82ae-f9c076b1fbd9` (`size_id`),
  CONSTRAINT `FK_52c1a5fa-6340-41ad-82ae-f9c076b1fbd9` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`),
  CONSTRAINT `FK_83a7ce1c-22d1-4da1-b99a-8d44bf19ce11` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_sizes`
--

LOCK TABLES `products_sizes` WRITE;
/*!40000 ALTER TABLE `products_sizes` DISABLE KEYS */;
INSERT INTO `products_sizes` VALUES (101,80,1),(102,80,3),(103,80,2),(104,71,1),(105,71,2),(106,71,3),(107,77,1),(108,77,2),(109,77,3),(110,104,1),(111,104,2),(112,104,3),(113,106,1),(114,106,2),(115,106,3);
/*!40000 ALTER TABLE `products_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `season` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES (1,'Invierno'),(2,'Otoño'),(3,'Primavera'),(4,'Verano');
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `size` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'S'),(2,'M'),(3,'L');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `function_id` int(11) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fb6f686f-8f1c-47db-91b9-18aea6d4658b` (`function_id`),
  CONSTRAINT `FK_fb6f686f-8f1c-47db-91b9-18aea6d4658b` FOREIGN KEY (`function_id`) REFERENCES `functions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Juan','Martínez','admin@gmail.com','$2a$10$wDrZIR0hWLLmGl4W616gyudWBQaZeDr3Csl0SP56jYDbIRjcjyWDa',1,'1641736042638.png',0),(2,'Juana','Martínez','Jmartinez@gmail.com','$2a$10$ui4L7O8vFnVsVMZj.DwesuewIdV3u9jQqfLgyrPZgzhOHhz4A7DzW',2,'1641736334462.png',0),(3,'Martin','López','Mlopez@gmail.com','$2a$10$XIjY3pExyhjhHwADAfWJ0uQeUY14xEV8KTaqoYYOT9X51Uip1JY76',2,'1641736404412.png',0),(4,'Milagros','Rodríguez','Mrodriguez@gmail.com','$2a$10$ecVbum6CyA3xcHGv8XB42.lXn6lN5ii.MuvKpVW4zzmG5Ox.tx7Ga',2,'1641736454006.png',0),(5,'Jose','Hernández','Jhernandez@gmail.com','$2a$10$NPEdUpTWJqM4PTAYuotKhuk8xxAMThGWmnZ13.jxz1/Fc45zLzl2u',2,'1641736505224.png',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'belivewild_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-09 11:06:30