-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: bwsld430qgkjtiood3hl-mysql.services.clever-cloud.com    Database: bwsld430qgkjtiood3hl
-- ------------------------------------------------------
-- Server version	8.0.15-5

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-138167718';

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(1000) NOT NULL,
  `Precio` float NOT NULL,
  `Genero` varchar(45) DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  `S` varchar(5) DEFAULT NULL,
  `M` varchar(5) DEFAULT NULL,
  `L` varchar(5) DEFAULT NULL,
  `XL` varchar(5) DEFAULT NULL,
  `XXL` varchar(5) DEFAULT NULL,
  `Descripcion` varchar(1000) DEFAULT NULL,
  `Puntuacion` int(11) DEFAULT NULL,
  `Cometarios` int(11) DEFAULT NULL,
  `Portada` varchar(255) DEFAULT NULL,
  `Foto1` varchar(255) DEFAULT NULL,
  `Foto2` varchar(255) DEFAULT NULL,
  `Foto3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (1,'Pantalones vaqueros ajustados azules para hombre Pantalones vaqueros ajustados rasgados y desgastados elásticos Pantalones de mezclilla a rayas laterales',20.05,'masculino','Fiesta','True','False','True','True','False','La opción perfecta para aquellos que buscan combinar comodidad y estilo en un solo conjunto. Confeccionados con denim de alta calidad y un ajuste ceñido que abraza tu figura, estos pantalones son una adición versátil y moderna a tu guardarropa casual.',4,1500,'assets/img_articulos/Pantalones vaqueros ajustados azules 1.jpg','assets/img_articulos/Pantalones vaqueros ajustados azules 2.jpg','assets/img_articulos/Pantalones vaqueros ajustados azules 3.jpg','assets/img_articulos/Pantalones vaqueros ajustados azules 2.jpg'),(2,'Traje de 3 piezas para hombre, vestido de boda de negocios con dos botones, conjunto de traje de esmoquin, chaqueta, chaleco, pantalones con corbata',78.55,'masculino','Elegante','True','True','True','True','True','Haz una declaración de sofisticación atemporal con nuestro impecable traje de tres piezas para hombre, diseñado para aquellos que aprecian la elegancia y la calidad sin compromisos.',5,5267,'assets/img_articulos/Traje de 3 piezas para hombre 1.jpg','assets/img_articulos/Traje de 3 piezas para hombre 2.jpg','assets/img_articulos/Traje de 3 piezas para hombre 3.jpg','assets/img_articulos/Traje de 3 piezas para hombre 4.jpg'),(3,'Pantalones deportivos para hombre con bolsillos con cremallera, pantalones deportivos cónicos para hombre, pantalones deportivos para entrenamiento, correr',21.59,'masculino','Deportiva','True','False','False','False','True','Diseñados para ofrecerte la máxima comodidad y estilo mientras te mantienes activo. Ya sea que estés entrenando en el gimnasio, corriendo al aire libre o simplemente relajándote en casa, estos pantalones son la elección perfecta para tu estilo de vida activo.',5,5068,'assets/img_articulos/Pantalones deportivos para hombre 1.jpg','assets/img_articulos/Pantalones deportivos para hombre 2.jpg	','assets/img_articulos/Pantalones deportivos para hombre 3.jpg','assets/img_articulos/Pantalones deportivos para hombre 4.jpg'),(4,'Traje de baño de una pieza para mujer con control de barriga y cintura alta, traje de baño con lazo en la espalda, traje de baño de 1 pieza',36.56,'femenino','Sexy','True','True','True','False','Flase','Sumérgete en el verano con estilo y confianza con nuestro Traje de Baño de Una Pieza para Mujer. Diseñado para ofrecer una combinación perfecta de elegancia y comodidad, este traje de baño es la opción ideal para lucir radiante y segura en cualquier entorno acuático.',4,10562,'assets/img_articulos/Traje de baño de una pieza para mujer 1.jpg','assets/img_articulos/Traje de baño de una pieza para mujer 2.jpg','assets/img_articulos/Traje de baño de una pieza para mujer 3.jpg','assets/img_articulos/Traje de baño de una pieza para mujer 2.jpg'),(5,'T-shirt amarillo con estampado Be Kind ',9.99,'femenino','Fiesta','True','False','True','False','False','Ilumina tu día y el de quienes te rodean con nuestra playera amarilla \"Be Kind\". Con su vibrante color y el inspirador estampado \"Be Kind\" en el centro, esta playera es mucho más que una simple prenda de vestir: es un recordatorio constante de la importancia de la amabilidad en nuestro mundo.',4,758,'assets/img_articulos/T-shirt amarillo con estampado Be Kind 1.jpg','assets/img_articulos/T-shirt amarillo con estampado Be Kind 2.jpg','assets/img_articulos/T-shirt amarillo con estampado Be Kind 3.jpg','assets/img_articulos/T-shirt amarillo con estampado Be Kind 4.jpg'),(6,'Sudadera de lana',10.4,'femenino','Elegante','True','True','False','False','False','Entra en la temporada de invierno con confianza y estilo con nuestro abrigo. Diseñado para ofrecerte la máxima protección contra el frío extremo sin comprometer tu estilo, este abrigo es la elección perfecta para enfrentar los elementos con elegancia.',3,4000,'assets/img_articulos/abrigo_1.jpg','assets/img_articulos/abrigo_1.jpg','assets/img_articulos/abrigo_3.jpg','assets/img_articulos/abrigo_4.jpg'),(7,'Minifalda de trabajo para mujer, de verano, con dobladillo dividido y cremallera en la espalda',25.6,'femenino','Elegante','True','True','False','False','False','Diseñada para destacar tu estilo y comodidad durante los cálidos días de verano. Con un toque de sofisticación y practicidad, esta minifalda es la opción ideal para mantenerte fresca y con estilo en el entorno laboral.',4,4557,'assets/img_articulos/Falda_1.jpg','assets/img_articulos/Falda_2.jpg','assets/img_articulos/Falda_3.jpg','assets/img_articulos/Falda_4.jpg'),(8,'Bañador para hombre de secado rápido con forro de malla, trajes de baño divertidos',10.54,'masculino','Sexy','False','True','True','True','False','La opción perfecta para aquellos que buscan combinar estilo y funcionalidad en sus actividades acuáticas. Diseñado con atención al detalle y confeccionado con materiales de alta calidad, este bañador te proporcionará la comodidad y el rendimiento que necesitas en la playa, la piscina o cualquier destino acuático.',3,4992,'assets/img_articulos/Bañador para Hombre 1.jpg','assets/img_articulos/Bañador para Hombre 2.jpg','assets/img_articulos/Bañador para Hombre 3.jpg','assets/img_articulos/Bañador para Hombre 4.jpg'),(9,'Conjunto de 4 piezas para mujer, acanalado, cuello redondo, sujetador deportivo, tops con un hombro, pantalones cortos de cintura alta, polainas activas',52.65,'femenino','Deportiva','True','True','True','True','True','Haz una declaración de moda y comodidad con nuestro Conjunto de 4 Piezas para Mujer, diseñado para satisfacer todas tus necesidades activas con estilo. Este conjunto versátil y moderno incluye todo lo que necesitas para lucir y sentirte genial durante tus entrenamientos, actividades al aire libre o simplemente para relajarte en casa con estilo.',4,5823,'assets/img_articulos/Conjunto de 4 Piezas para Mujer 1.jpg','assets/img_articulos/Conjunto de 4 Piezas para Mujer 2.jpg','assets/img_articulos/Conjunto de 4 Piezas para Mujer 3.jpg','assets/img_articulos/Conjunto de 4 Piezas para Mujer 4.jpg'),(10,'3 piezas de mono de mujer para yoga, entrenamiento, mameluco de una pieza, trajes acanalados, sin mangas, para salir, mono ajustado, pantalones cortos',35.86,'femenino','Sexy','True','True','True','True','False','Prepárate para una práctica de yoga cómoda y elegante con nuestro Mameluco para Yoga, diseñado para ofrecerte la máxima libertad de movimiento y estilo zen en cada postura. Confeccionado con tejidos suaves y elásticos que se adaptan a tu cuerpo, este mameluco es la elección perfecta para llevar tu práctica de yoga al siguiente nivel.',3,500,'assets/img_articulos/Mameluco para yoga 1.jpg','assets/img_articulos/Mameluco para yoga 2.jpg','assets/img_articulos/Mameluco para yoga 3.jpg','assets/img_articulos/Mameluco para yoga 4.jpg'),(11,'Leggings de piel sintética para mujer, pantalones de PU elásticos que moldean la cadera, negro, Sexy, elásticos, medias de cintura alta',18.65,'femenino','Sexy','True','True','False','True','False','Descubre la fusión perfecta entre estilo urbano y sofisticación con nuestros Leggings de Piel Sintética para Mujer. Diseñados para destacar en cualquier ocasión, desde una salida nocturna hasta un día casual en la ciudad, estos leggings añaden un toque de glamour a tu guardarropa.',4,5892,'assets/img_articulos/leggins 1.jpg','assets/img_articulos/leggins 2.jpg','assets/img_articulos/leggins 3.jpg','assets/img_articulos/leggins 4.jpg'),(12,'Vestidos cortos ajustados básicos informales de Color sólido con manga larga ceñidos elegantes fruncidos a la moda para mujer',15.68,'femenino','Fiesta','False','True','True','True','True','Este vestido versátil es una pieza imprescindible en cualquier guardarropa, ofreciendo una apariencia casual y elegante que te llevará sin esfuerzo desde el día hasta la noche.',3,5268,'assets/img_articulos/vestido ajustable 1.jpg','assets/img_articulos/vestido ajustable 2.jpg','assets/img_articulos/vestido ajustable 3.jpg','assets/img_articulos/vestido ajustable 2.jpg'),(13,'Trajes para hombre Conjunto de traje ajustado de 3 piezas,Esmoquin de negocios de dos botones para boda, chaqueta, chaleco, pantalones con corbata',50,'masculino','Elegante','False','False','True','True','False','Una expresión perfecta de sofisticación y refinamiento para cualquier ocasión. Este conjunto esencial en el guardarropa masculino combina elegancia atemporal con un ajuste moderno y favorecedor, asegurando que luzcas impecable en todo momento.',5,12365,'assets/img_articulos/Traje azul 1.jpg','assets/img_articulos/Traje azul 2.jpg','assets/img_articulos/Traje azul 3.jpg','assets/img_articulos/Traje azul 4.jpg'),(14,'Camisas de vestir con botones de manga corta ajustadas con estampado de rosas doradas hipster para hombre',21.56,'masculino','Fiesta','False','True','True','True','False','Diseñadas para hombres que aprecian la combinación perfecta de estilo clásico y comodidad moderna. Nuestras camisas están confeccionadas con los más finos materiales y acabados meticulosos para garantizar un ajuste impecable y una apariencia sofisticada en cualquier ocasión.',2,526,'assets/img_articulos/Camisa con flores 1.jpg','assets/img_articulos/Camisa con flores 2.jpg','assets/img_articulos/Camisa con flores 3.jpg','assets/img_articulos/Camisa con flores 4.jpg'),(15,'T-shirt Adiddas para entrenamiento ',15.65,'masculino','Deportiva','True','True','True','True','True','Prepárate para superar tus límites con nuestra Playera Adidas para Entrenamiento, diseñada para ofrecerte el máximo rendimiento y comodidad mientras te ejercitas. Fabricada con los materiales más avanzados y la tecnología de tejido transpirable de Adidas, esta playera te mantendrá fresco y seco incluso en los entrenamientos más intensos.',5,2568,'assets/img_articulos/T-shirt Adiddas 1.jpg','assets/img_articulos/T-shirt Adiddas 2.jpg','assets/img_articulos/T-shirt Adiddas 3.jpg','assets/img_articulos/T-shirt Adiddas 3.jpg'),(16,'Sujetador deportivo para mujer, sujetador con curvas, sujetador de soporte moderado, sujetador deportivo de corte bajo para mujer',16.59,'femenino','Deportiva','True','False','True','True','True','Nuestro Sujetador Deportivo para Mujer es la elección perfecta para brindarte la comodidad y el soporte que necesitas durante tus entrenamientos más intensos. Diseñado pensando en la mujer activa y moderna, este sujetador ofrece una combinación de funcionalidad, estilo y confort para acompañarte en todas tus actividades físicas.',4,2634,'assets/img_articulos/Sujetador deportivo 1.jpg','assets/img_articulos/Sujetador deportivo 2.jpg','assets/img_articulos/Sujetador deportivo 3.jpg','assets/img_articulos/Sujetador deportivo 4.jpg'),(17,'Traje de baño de una pieza cruzado elegante para mujer con falda floral',22.69,'femenino','Sexy','True','True','False','True','True','Déjate envolver por la elegancia y el encanto de nuestro Traje de Baño de Una Pieza Cruzado con Falda Floral para mujer, una combinación perfecta de sofisticación y feminidad para tus días en la playa o junto a la piscina. Este traje de baño combina un diseño clásico con detalles modernos para realzar tu figura y resaltar tu estilo único.',5,7896,'assets/img_articulos/Traje de baño 1.jpg','assets/img_articulos/Traje de baño 2.jpg','assets/img_articulos/Traje de baño 3.jpg','assets/img_articulos/Traje de baño 4.jpg'),(18,'Pantalones cortos fluidos, pantalones cortos de mariposa 2 en 1, pantalones cortos deportivos de cintura alta para mujeres, entrenamiento, motociclista, correr, yoga',9.99,'femenino','Deportiva','True','True','True','True','True','Nuestros Pantalones Cortos Fluidos son la opción perfecta para disfrutar de la frescura y la libertad durante los días cálidos de verano. Diseñados para ofrecerte comodidad y estilo en cada paso, estos pantalones cortos son una adición imprescindible a tu guardarropa de temporada.',2,963,'assets/img_articulos/Pantalones cortos 1.jpg','assets/img_articulos/Pantalones cortos 2.jpg','assets/img_articulos/Pantalones cortos 3.jpg','assets/img_articulos/Pantalones cortos 4.jpg'),(19,'Pantalones palazzo de pierna ancha elásticos para mujer, pantalones palazzo casuales y cómodos de cintura alta',23.66,'femenino','Elegante','True','True','True','True','True','Descubre la máxima expresión de elegancia y comodidad con nuestros Pantalones Palazzo, una pieza imprescindible en cualquier guardarropa moderno. Estos pantalones, con su silueta fluida y sofisticada, están diseñados para destacar tu estilo único y brindarte un confort inigualable en cada paso.',5,793,'assets/img_articulos/Pantalones palazzo 1.jpg','assets/img_articulos/Pantalones palazzo 2.jpg','assets/img_articulos/Pantalones palazzo 3.jpg','assets/img_articulos/Pantalones palazzo 4.jpg'),(20,'Blusas de satén para mujer Blusa de manga larga con hombros descubiertos Tops elegantes para fiesta de noche',43.58,'femenino','Elegante','True','True','True','False','False','Sumérgete en el lujo y la elegancia con nuestras exquisitas Blusas de Satén, diseñadas para realzar tu estilo y hacer una declaración de moda dondequiera que vayas. Confeccionadas con el suave y sedoso tejido de satén, estas blusas son la opción perfecta para aquellos momentos en los que deseas añadir un toque de glamour a tu look.',3,489,'assets/img_articulos/Blusas de satén 1.jpg','assets/img_articulos/Blusas de satén 2.jpg','assets/img_articulos/Blusas de satén 3.jpg','assets/img_articulos/Blusas de satén 4.jpg'),(21,'Traje de baño de una pieza para mujer con control de barriga, vestidos de baño con falda',32.66,'femenino','Sexy','True','True','True','True','True','Nuestro Traje de Baño de Una Pieza con Control de Barriga para Mujer es la elección perfecta para aquellas que desean sentirse seguras y elegantes mientras disfrutan del sol y el mar. Diseñado para realzar tu figura y brindarte una sensación de confianza, este traje de baño ofrece tanto estilo como funcionalidad.',4,7893,'assets/img_articulos/Traje de baño de una pieza para mujer con control de barriga 1.jpg','assets/img_articulos/Traje de baño de una pieza para mujer con control de barriga 2.jpg','assets/img_articulos/Traje de baño de una pieza para mujer con control de barriga 3.jpg','assets/img_articulos/Traje de baño de una pieza para mujer con control de barriga 4.jpg'),(22,'Polo de manga larga para hombre, estilo casual, ajustado, con cremallera, a cuadros',26.78,'masculino','Elegante','True','True','True','True','False','Nuestro Polo de Manga Larga es la opción perfecta para aquellos que buscan una combinación de comodidad y estilo durante todo el año. Confeccionado con tejidos suaves y de alta calidad, este polo ofrece una sensación de lujo y sofisticación que te hará destacar en cualquier ocasión.',4,369,'assets/img_articulos/Polo de manga larga 1.jpg','assets/img_articulos/Polo de manga larga 2.jpg','assets/img_articulos/Polo de manga larga 3.jpg','assets/img_articulos/Polo de manga larga 4.jpg'),(23,'Camisetas sin mangas de verano para mujer, camisola plisada con tirantes finos, ajuste holgado, informal, sin mangas',19.99,'femenino','Fiesta','True','True','True','False','True','Nuestras camisetas sin mangas de verano son la opción perfecta para mantenerte fresco y lucir con estilo durante los cálidos días de la temporada. Confeccionadas con telas livianas y transpirables, estas camisetas son una adición esencial a tu guardarropa de verano, brindándote comodidad y un aspecto moderno en cualquier momento.',3,324,'assets/img_articulos/Camisetas sin mangas de verano 1.jpg','assets/img_articulos/Camisetas sin mangas de verano 2.jpg','assets/img_articulos/Camisetas sin mangas de verano 3.jpg','assets/img_articulos/Camisetas sin mangas de verano 4.jpg'),(24,'Camisas de vestir ajustadas al músculo, camisa elástica de Guayabera cubana, camisa informal con botones, Tops elásticos sin arrugas',22.44,'masculino','Fiesta','True','True','True','False','False','Nuestras camisas de vestir ajustadas son la elección perfecta para hombres que buscan un look impecable y contemporáneo. Confeccionadas con los mejores materiales y diseñadas para un ajuste ceñido pero cómodo, estas camisas combinan la elegancia clásica con un toque de modernidad.',4,7263,'assets/img_articulos/Camisas de vestir ajustadas 1.jpg','assets/img_articulos/Camisas de vestir ajustadas 2.jpg','assets/img_articulos/Camisas de vestir ajustadas 3.jpg','assets/img_articulos/Camisas de vestir ajustada 4.jpg'),(25,'Conjunto de bikini de cintura alta con cordón y traje de baño teñido anudado para mujer',23.86,'femenino','Sexy','True','True','True','True','True','Nuestro conjunto de bikini de cintura alta es la combinación perfecta de glamour retro y estilo contemporáneo para tus días de playa o piscina. Diseñado para realzar tu figura y brindarte confianza, este conjunto te hará sentir fabulosa mientras disfrutas del sol y las olas.',5,2569,'assets/img_articulos/Conjunto de bikini de cintura alta 1.jpg','assets/img_articulos/Conjunto de bikini de cintura alta 2.jpg','assets/img_articulos/Conjunto de bikini de cintura alta 3.jpg','assets/img_articulos/Conjunto de bikini de cintura alta 4.jpg'),(26,'Camisa de guayabera cubana para hombre Camisas casuales con botones Camisas de lino de playa de manga larga',33.67,'masculino','Fiesta','True','True','True','True','True','La camisa de guayabera, con su distintivo diseño y su aire de elegancia tropical, es la elección perfecta para aquellos que buscan un estilo único y cómodo. Con sus características bolsillos frontales y pliegues decorativos, esta prenda combina la tradición con la modernidad en una expresión de moda atemporal.',4,7893,'assets/img_articulos/Camisa de guayabera 1.jpg','assets/img_articulos/Camisa de guayabera 2.jpg','assets/img_articulos/Camisa de guayabera 3.jpg','assets/img_articulos/Camisa de guayabera 4.jpg'),(27,'Trajes de corte entallado para hombre, traje de 3 piezas con doble botonadura, chaleco y pantalones con corbata para boda, fiesta de graduación, negocios',66.47,'masculino','Elegante','True','True','False','True','True','Nuestros trajes de corte entallado para hombre son la definición misma de elegancia contemporánea. Diseñados para adaptarse a la figura masculina de manera favorecedora, estos trajes ofrecen una silueta estilizada y moderna que te hará destacar en cualquier ocasión.',5,3698,'assets/img_articulos/Trajes de corte entallado para hombre 1.jpg','assets/img_articulos/Trajes de corte entallado para hombre 2.jpg','assets/img_articulos/Trajes de corte entallado para hombre 3.jpg','assets/img_articulos/Trajes de corte entallado para hombre 4.jpg'),(28,'Trajes de baño con control de barriga para mujer, traje de baño de una pieza, estilo retro, fruncido, push up, vintage, acolchado',21.69,'femenino','Sexy','True','False','True','False','True','Nuestros trajes de baño con control de barriga son la elección perfecta para aquellas personas que desean sentirse seguras y elegantes mientras disfrutan del sol y el agua. Diseñados pensando en la comodidad y el estilo, estos trajes de baño ofrecen una solución efectiva para esculpir y suavizar la zona abdominal, brindándote una apariencia más estilizada y segura.',4,624,'assets/img_articulos/Trajes de baño con control de barriga 1.jpg','assets/img_articulos/Trajes de baño con control de barriga 2.jpg','assets/img_articulos/Trajes de baño con control de barriga 3.jpg','assets/img_articulos/Trajes de baño con control de barriga 4.jpg'),(29,'Camisa de pana para hombre Chaqueta ligera con botones de manga larga informal',18.36,'masculino','Fiesta','True','False','True','True','True','Nuestra camisa de pana ofrece una combinación perfecta de estilo clásico y textura distintiva que agrega un toque de sofisticación a cualquier atuendo. Confeccionada con tejido de pana de alta calidad, esta camisa proporciona un aspecto elegante y una sensación de lujo que no pasa desapercibida.',5,4268,'assets/img_articulos/Camisa de pana 1.jpg','assets/img_articulos/Camisa de pana 2.jpg','assets/img_articulos/Camisa de pana 3.jpg','assets/img_articulos/Camisa de pana 4.jpg'),(30,'Sujetador deportivo sin costuras para mujer',23.96,'femenino','Deportiva','True','True','True','True','True','Nuestro sujetador deportivo está diseñado para brindarte la combinación perfecta de comodidad, estilo y soporte durante tus entrenamientos y actividades físicas. Confeccionado con tejidos transpirables y elásticos, este sujetador se adapta a tu cuerpo y te ofrece una sensación de sujeción y libertad de movimiento sin igual.',5,836,'assets/img_articulos/Sujetador deportivo d 1.jpg','assets/img_articulos/Sujetador deportivo d 2.jpg','assets/img_articulos/Sujetador deportivo d 3.jpg','assets/img_articulos/Sujetador deportivo d 4.jpg');
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Talla` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (134,25,2,1,'S');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Talla` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (68,25,2,2,'M'),(69,25,3,1,'S'),(70,25,4,1,'L'),(71,25,2,1,'M'),(72,25,3,1,'S'),(73,25,2,2,'M'),(74,25,1,1,'S'),(75,27,2,4,'M'),(76,27,1,1,'S'),(77,27,3,1,'S'),(78,27,4,1,'L'),(79,27,1,1,'L'),(80,27,1,1,'XL'),(81,27,3,1,'XXL');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `Email` varchar(1000) NOT NULL,
  `Contraseña` varchar(1000) NOT NULL,
  `Direccion_envio` varchar(500) NOT NULL,
  `Metodo_pago` varchar(45) NOT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (25,'Deyvid','Marmolejo','cunglaoboot@gmail.com','Europa20','Calle Santa Maria #2, Los Mina, Barrio Puerto Rico, Santo Domingo Este, Santo Domingo','7777-7777-7777-7777','809-002-5005'),(26,'Anny','Rodriguez','rodriguezanny@gmail.com','America10','27 de febrero','2052-5150-5050-5050','809-080-9080'),(27,'Deurys','Marmolejo','marmolejodeurys@gmail.com','America10','( BM-308213) 8400 NW 25 ST SUITE 100','1111-1111-1111-1111','809-555-0389'),(28,'Lorenzo','Marmolejo','marmolejolorenzo@gmail.com','America10','( BM-308213) 8400 NW 25 ST SUITE 100','5555-5555-5555-5555','809-442-0389');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-11 21:31:15
