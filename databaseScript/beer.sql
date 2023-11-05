-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2023 at 06:49 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beer`
--

-- --------------------------------------------------------

--
-- Table structure for table `breweries`
--

CREATE TABLE `breweries` (
  `brewery_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `breweries`
--

INSERT INTO `breweries` (`brewery_id`, `name`, `location`) VALUES
(1, 'Carlifornia Breweries Karas', 'Street 45 Avante Huston'),
(2, 'Enugutt Breweryy', 'Viking mountains RR.8888'),
(3, 'Ibadan Brewery Mairagor', 'Ibadan Oyo express Ogbomosho'),
(16, '77 squad', 'FF.14 YAKOWA EXPRESS WAY KD'),
(21, 'Chicgo 19', '8800. Chicago Ill'),
(22, 'Semi conductor', '4455. Oshodi Bustop Iyanapaja.LG'),
(25, 'Moquitoe', '354. China Town NYC'),
(26, 'Brewery45 Carlifornia', 'Hustont.TXS'),
(27, 'Cool J', 'Atlanta');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `type`) VALUES
(1, 'IPA', 'Rare Beer'),
(2, 'Stout', 'Sour'),
(3, 'Pilsner', 'Super');

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `delivery_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`delivery_id`, `order_id`, `user_id`, `delivery_date`) VALUES
(1, 2, 2, '2023-09-17'),
(2, 3, 3, '2023-09-18'),
(3, 1, 2, '2023-09-19');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `upload_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `tap_number` int(11) DEFAULT NULL,
  `quantity_in_stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kegsizes`
--

CREATE TABLE `kegsizes` (
  `keg_size_id` int(11) NOT NULL,
  `size` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kegsizes`
--

INSERT INTO `kegsizes` (`keg_size_id`, `size`) VALUES
(1, '15.50'),
(2, '10.05'),
(3, '5.00'),
(6, '45.53');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `quantity`, `order_date`, `status`, `user_id`) VALUES
(1, 1, 10, '2023-09-15', 'Ordered', 2),
(2, 2, 5, '2023-09-16', 'Delivered', 2),
(3, 3, 8, '2023-09-17', 'Ordered', 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `brewery_id` int(11) DEFAULT NULL,
  `keg_size_id` int(11) DEFAULT NULL,
  `description` text,
  `flavor_details` text,
  `price_per_keg` int(50) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `arrival_date` date DEFAULT NULL,
  `serving_sizes` varchar(255) DEFAULT NULL,
  `price_per_serving_size` decimal(6,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `tap_number` int(11) DEFAULT NULL,
  `tap_id` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `type`, `brewery_id`, `keg_size_id`, `description`, `flavor_details`, `price_per_keg`, `supplier_id`, `arrival_date`, `serving_sizes`, `price_per_serving_size`, `category_id`, `tap_number`, `tap_id`, `status`) VALUES
(1, 'Beer 1', 'Type 1', 1, 1, 'Description 1', 'Flavor Details 1', 6, 1, '2023-10-01', '16oz, 10oz', '2.99', 1, 3, NULL, 'on-tap'),
(2, 'Beer 2', 'Type 2', 2, 2, 'Description 2', 'Flavor Details 2', 7, 2, '2023-10-02', '16oz, 12oz', '3.49', 2, 20, NULL, 'upcoming'),
(3, 'Beer 3', 'Type 3', 3, 3, 'Description 3', 'Flavor Details 3', 5, 3, '2023-10-03', '16oz, 8oz', '2.79', 3, 1, NULL, 'empty'),
(19, 'Normal beer', 'street', 16, NULL, 'Another beer', 'Another one from front', 345, 5, '2023-10-04', '10oz', NULL, NULL, 31, NULL, 'on-tap'),
(20, 'Another Normal Beer', 'Whisky', 26, NULL, 'This is another one coming from the front end', 'super spicy', 560, 1, '2023-10-17', '16oz', NULL, NULL, NULL, NULL, 'empty'),
(21, 'pitopito', 'rugged', 25, NULL, 'rugged', 'rugged sweet', 450, 5, '2023-10-04', '6oz', NULL, NULL, NULL, NULL, 'empty'),
(22, 'Milio Kittos', 'Beverage', 2, NULL, 'Super cool ', 'Awsome sweet', 320, 2, '2023-10-17', '16oz', '0.00', NULL, NULL, NULL, 'empty'),
(23, 'Lady Out', 'gin', 21, NULL, 'another', 'swettttt', 600, 5, '2023-10-04', '10oz', '23.00', NULL, 14, NULL, 'empty'),
(24, 'Aston ville', 'stout', 1, NULL, 'Another new beer', 'super tasty', 134, 2, '2023-10-06', '6oz', '23.00', NULL, NULL, NULL, 'upcoming'),
(25, 'Atheletico Beeringo', 'whisky', 22, NULL, 'This is yet another new beer', 'sour and sexy', 450, 2, '2023-10-13', '16oz', '23.00', NULL, NULL, NULL, 'upcoming'),
(26, 'Ladies and gents', 'priestlyyy', 3, NULL, 'World of beer', 'fair', 600, 5, '2023-10-12', '10oz', '2.50', NULL, NULL, NULL, 'on-tap'),
(27, 'Atlanta Spikey', 'icy', 25, NULL, 'From them', 'sweet', 765, 5, '2023-10-11', '10oz', '8.00', NULL, 4, NULL, 'delivered'),
(28, 'Atlanta Eg', 'double', 21, NULL, 'Crabby', 'soda', 321, 2, '2023-10-09', '16oz', '32.00', NULL, NULL, NULL, 'delivered'),
(29, 'Another testy', 'tasty', 1, NULL, 'sweet', 'wettr', 34, 1, '2023-10-24', '6oz', '2.00', NULL, 13, NULL, 'on-tap'),
(30, 'Hit the wheel', 'beer', 2, NULL, 'order', 'like', 235, 2, '2023-10-10', '16oz', '23.00', NULL, NULL, NULL, 'ordered'),
(31, 'Another beer 2', 'didi', 16, NULL, 'This is another order', 'sweet', 460, 3, '2023-10-05', '16oz', '23.00', NULL, NULL, NULL, 'ordered'),
(32, 'Yet another', 'speech', 22, NULL, 'New order alert', 'swamp', 456, 3, '2023-10-06', '6oz', '23.00', NULL, NULL, NULL, 'on-tap'),
(33, 'Bobby Valdez', 'hot', 26, NULL, 'another for mail test', 'sweet', 890, 1, '2023-10-18', '16oz', '23.00', NULL, 23, NULL, 'ordered'),
(34, 'Keep going', 'tasty', 1, NULL, 'lets go again', 'shot', 345, 2, '2023-10-16', '16oz', '23.00', NULL, NULL, NULL, 'ordered'),
(35, 'Anthony', 'ant', 2, NULL, 'imoran', 'imo', 456, 1, '2023-10-05', '16oz', '2.00', NULL, NULL, NULL, 'upcoming'),
(36, 'Hoty Nutty', 'frsh', 3, NULL, 'check', 'red', 345, 1, '2023-10-18', '16oz', '21.00', NULL, NULL, NULL, 'on-tap'),
(37, 'Hot noon', 'nun', 1, NULL, 'description', 'wet', 1234, 1, '2023-10-05', '16oz', '23.00', NULL, NULL, NULL, 'ordered'),
(38, 'A new beer', 'afin', 1, NULL, 'aremoooo', 'sweer', 456, 2, '2023-10-17', '10oz', '11.00', NULL, NULL, NULL, 'ordered'),
(39, 'A new beer', 'afin', 1, NULL, 'aremoooo', 'sweer', 456, 2, '2023-10-17', '10oz', '11.00', NULL, NULL, NULL, 'ordered'),
(40, 'A new beer', 'afin', 1, NULL, 'aremoooo', 'sweer', 456, 2, '2023-10-17', '10oz', '11.00', NULL, NULL, NULL, 'ordered'),
(41, 'Keep up', 'dred', 21, NULL, 'freed', 'ok', 580, 5, '2023-10-05', '10oz', '32.00', NULL, NULL, NULL, 'ordered'),
(42, 'Keep up', 'dred', 21, NULL, 'freed', 'ok', 580, 5, '2023-10-05', '10oz', '32.00', NULL, NULL, NULL, 'ordered'),
(43, 'Keep up', 'dred', 21, NULL, 'freed', 'ok', 580, 5, '2023-10-05', '10oz', '32.00', NULL, NULL, NULL, 'ordered'),
(44, 'Epaa', 'cse', 2, NULL, 'okokok', 'okk', 890, 2, '2023-10-12', '10oz', '23.00', NULL, NULL, NULL, 'ordered'),
(45, 'gbooooo', 'jebe', 16, NULL, 'ddeerr', 'eeerds', 345, 3, '2023-10-16', '10oz', '2.00', NULL, NULL, NULL, 'upcoming'),
(46, 'Lenovo special', 'stout', 2, NULL, 'ok now it is inew', 'new', 6700, 3, '2023-10-25', '16oz', '34.00', NULL, NULL, NULL, 'ordered'),
(47, 'Zebra Zerox', 'stout', 16, NULL, 'a new beer', 'flavored', 213, 1, '2023-10-09', '10oz', '23.00', NULL, NULL, NULL, 'ordered'),
(48, 'Eureka Platos', 'whisky', 3, NULL, 'For Eureka', 'cheezy', 456, 3, '2023-10-10', '10oz', '5.00', NULL, 45, NULL, 'delivered'),
(49, 'Cat Whiskers', 'Soft', 3, NULL, 'For cat whiskers special', 'smooth', 567, 1, '2023-10-10', '6oz', '23.00', NULL, NULL, NULL, 'upcoming'),
(50, 'Over here', 'zoom', 21, NULL, 'Overly rated xx', 'sour', 590, 1, '2023-10-10', '10oz', '23.00', NULL, NULL, NULL, 'delivered'),
(51, 'Odekuu', 'strong', 22, NULL, 'For odekun purpose', 'dent', 4234, 3, '2023-10-10', '6oz', '32.00', NULL, 7, NULL, 'on-tap'),
(52, 'Kitty Kat Kento', 'smooth', 3, NULL, 'for kitty', 'treaty', 345, 2, '2023-10-09', '10oz', '23.00', NULL, 33, NULL, 'empty'),
(53, 'Super Man', 'kryptomite', 22, NULL, 'for superman kryptonite', 'crystal', 550, 3, '2023-10-12', '6oz', '23.00', NULL, NULL, NULL, 'on-tap'),
(54, 'Fire Ice Water', 'smooth', 21, NULL, 'description for this urpose', 'errrtde', 345, 3, '2023-10-13', '10oz', '23.00', NULL, 66, NULL, 'on-tap'),
(55, 'magnitos', 'mg', 16, NULL, 'mg', 'mgc', 332, 3, '2023-10-11', '16oz', '23.00', NULL, NULL, NULL, 'ordered'),
(56, 'on the beach', 'red', 21, NULL, 'be', 'bed', 3345, 3, '2023-10-12', '10oz', '21.00', NULL, NULL, NULL, 'upcoming'),
(57, 'Mog Tail', 'shy', 22, NULL, 'Forget the beer', 'wonderful', 45, 1, '2023-10-10', '6oz', '21.00', NULL, 43, NULL, 'on-tap'),
(58, 'Dejav\'u Cospire', 'stout', 26, NULL, 'normal beer', 'sweet', 567, 5, '2023-10-11', '10oz', '23.00', NULL, 101, NULL, 'upcoming'),
(61, 'Adolphos Rufus', 'Light', 26, NULL, 'Light beer', 'Tastes like light grains', 567, 3, '2023-10-19', '10oz', '23.00', NULL, 10, NULL, 'ordered'),
(68, 'gitto', 'git', 1, NULL, 'new beer', 'derk', 345, 6, '2023-10-17', '6oz', '21.00', NULL, 0, NULL, 'ordered'),
(81, 'Aston Villa OZ', 'Villa', 2, NULL, 'Another', 'Perfect', 3345, 5, '2023-10-17', '6oz', '32.00', NULL, 32, NULL, 'upcoming'),
(82, 'On the Beach', 'Smooth Small', 25, NULL, 'This is a new beer', 'Old', 3321, 6, '2023-10-19', '10oz', '21.00', NULL, NULL, NULL, 'upcoming'),
(83, 'Farmer\'s Light', 'Light Lager', 21, NULL, 'A sushi rice lager made from organic sushi rice', 'Light, crisp, refreshing', 210, 3, '2023-10-25', '16oz', '8.50', NULL, 57, NULL, 'on-tap'),
(85, 'tobikuuut', 'fsdf', 2, NULL, 'sdfdsfd', 'cdfd', 2344, 1, '2023-10-26', '10oz', '23.00', NULL, 6, NULL, 'ordered'),
(86, 'Anthony freeze', 'farmer choice', 16, NULL, 'another beer', 'beer flavor', 3346, 2, '2023-10-31', '6oz', '23.00', NULL, NULL, NULL, 'ordered'),
(87, 'Another beer from front', 'In demand', 2, NULL, 'Order for the new list', 'dry ice', 213, 6, '2023-11-09', '16oz', '12.00', NULL, NULL, NULL, 'ordered'),
(88, 'Anthony freeze', 'farmer choice', 16, NULL, 'another beer', 'beer flavor', 3346, 2, '2023-10-31', '6oz', '23.00', NULL, NULL, NULL, 'ordered'),
(89, 'Another beer from front', 'In demand', 2, NULL, 'Order for the new list', 'dry ice', 213, 6, '2023-11-09', '16oz', '12.00', NULL, NULL, NULL, 'ordered'),
(90, 'Anthony freeze', 'farmer choice', 16, NULL, 'another beer', 'beer flavor', 3346, 2, '2023-10-31', '6oz', '23.00', NULL, NULL, NULL, 'ordered'),
(91, 'Another beer from front', 'In demand', 2, NULL, 'Order for the new list', 'dry ice', 213, 6, '2023-11-09', '16oz', '12.00', NULL, NULL, NULL, 'ordered'),
(92, 'Anthony freeze', 'farmer choice', 16, NULL, 'another beer', 'beer flavor', 3346, 2, '2023-10-31', '6oz', '23.00', NULL, NULL, NULL, 'ordered'),
(93, 'Another beer from front', 'In demand', 2, NULL, 'Order for the new list', 'dry ice', 213, 6, '2023-11-09', '16oz', '12.00', NULL, NULL, NULL, 'ordered'),
(94, 'Anthony freeze', 'farmer choice', 16, NULL, 'another beer', 'beer flavor', 3346, 2, '2023-10-31', '6oz', '23.00', NULL, NULL, NULL, 'ordered'),
(95, 'Another beer from front', 'In demand', 2, NULL, 'Order for the new list', 'dry ice', 213, 6, '2023-11-09', '16oz', '12.00', NULL, NULL, NULL, 'ordered'),
(102, 'Water pass am', 'stout', 3, NULL, 'another new beer', 'smoth icey', 2234, 1, '2023-10-31', '16oz', '43.00', NULL, NULL, NULL, 'ordered'),
(103, 'Angus discuss', 'whisky', 21, NULL, 'tester', 'tasty', 2213, 2, '2023-10-31', '10oz', '23.00', NULL, NULL, NULL, 'ordered'),
(104, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(105, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, 56, NULL, 'ordered'),
(106, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(107, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(108, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(109, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(110, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(111, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(112, 'CoooCoo', 'Denist smoother', 3, 2, 'Another awesome beer', 'awsome sharp', 557, 5, '2023-11-02', '10oz', '43.00', NULL, NULL, NULL, 'ordered'),
(113, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(114, 'CoooCoo', 'Denist smoother', 3, 2, 'Another awesome beer', 'awsome sharp', 557, 5, '2023-11-02', '10oz', '43.00', NULL, NULL, NULL, 'ordered'),
(115, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(116, 'CoooCoo', 'Denist smoother', 3, 2, 'Another awesome beer', 'awsome sharp', 557, 5, '2023-11-02', '10oz', '43.00', NULL, NULL, NULL, 'ordered'),
(117, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(118, 'CoooCoo', 'Denist smoother', 3, 2, 'Another awesome beer', 'awsome sharp', 557, 5, '2023-11-02', '10oz', '43.00', NULL, NULL, NULL, 'ordered'),
(119, 'Mohito Lee', 'whisk', 25, 3, 'Moshhhh', 'sweaty', 5000, 6, '2023-10-31', '6oz', '34.00', NULL, NULL, NULL, 'ordered'),
(120, 'CoooCoo', 'Denist smoother', 3, 2, 'Another awesome beer', 'awsome sharp', 557, 5, '2023-11-02', '10oz', '43.00', NULL, 22, NULL, 'on-tap'),
(123, 'Iranu Abasha', 'see me', 2, 2, 'see me again', 'see', 2211, 1, '2023-11-03', '6oz', '32.00', NULL, NULL, NULL, 'ordered'),
(124, 'Elon Musky', 'Electric', 1, 2, 'Super spicy', 'spicy', 3400, 5, '2023-11-03', '10oz', '32.00', NULL, NULL, NULL, 'ordered'),
(125, 'Chicken Nuggetty', 'stout', 21, 3, 'reddd', 'ready', 234, 5, '2023-11-09', '16oz', '22.00', NULL, NULL, NULL, 'ordered'),
(126, 'Pepsi Hot', 'dark', 25, 3, 'Dark again', 'Dark hot', 223, 6, '2023-11-07', '6oz', '81.00', NULL, NULL, NULL, 'ordered'),
(127, 'Atike tun De', 'Autumn', 22, 3, 'Location', 'Sour Sweet', 432, 3, '2023-11-03', '6oz', '23.00', NULL, NULL, NULL, 'ordered'),
(128, 'Misippi', 'Framer Pride', 26, 1, 'From them', 'pinky', 345, 5, '2023-11-03', '10oz', '23.00', NULL, NULL, NULL, 'ordered'),
(129, 'Ledger', 'smooth', 16, 3, 'merry', 'maxi', 3456, 5, '2023-11-10', '16oz', '23.00', NULL, NULL, NULL, 'ordered'),
(130, 'Super Holiday', 'Holiday', 3, 2, 'Holiday Special', 'Snowy', 2300, 5, '2023-11-08', '6oz', '13.00', NULL, 21, NULL, 'upcoming'),
(131, 'For me and You', 'whisky', 27, 1, 'from rider', 'riddeon', 2211, 7, '2023-11-03', '6oz', '26.00', NULL, 41, NULL, 'on-tap'),
(132, 'Afer school', 'sweet', 21, 3, 'Best choice', 'Non alcholic', 654, 7, '2023-11-09', '10oz', '9.00', NULL, NULL, NULL, 'ordered');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `name`) VALUES
(1, 'Supplier 371'),
(2, 'Supplier 2234'),
(3, 'Supplier 309'),
(5, 'Goldberg Manson'),
(6, 'Maria'),
(7, 'Rider');

-- --------------------------------------------------------

--
-- Table structure for table `tap`
--

CREATE TABLE `tap` (
  `tap_id` int(11) NOT NULL,
  `empty` tinyint(1) NOT NULL,
  `upcoming` tinyint(1) NOT NULL,
  `on_tap` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `transaction_type` varchar(255) DEFAULT NULL,
  `transaction_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `product_id`, `quantity`, `transaction_type`, `transaction_date`) VALUES
(1, 1, 5, 'Purchase', '2023-09-15'),
(2, 2, 2, 'Sale', '2023-09-16'),
(3, 3, 3, 'Purchase', '2023-09-17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` enum('Super Admin','Admin','Basic User') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `full_name`, `email`, `role`, `created_at`, `updated_at`) VALUES
(2, 'admin1 Updated', '$2b$12$mg8OAb.yNCLo74mJSwNLpup8k4r01Y04eFq2FDpKF3G3QZ4dVMSjO', 'Admin User Again', 'admin1@example.com', 'Admin', '2023-09-22 18:21:41', '2023-10-14 21:22:15'),
(3, 'user1', '$2b$12$cfXuAfok7hh27m2fLVDO4u7jXWkjd.yug477ijhgOehrBt.A5aN5.', 'Mostaph Jackq', 'user1@example.com', 'Basic User', '2023-09-22 18:21:41', '2023-10-12 18:56:21'),
(6, 'toyosee', '$2b$12$W.CFMNugAgKLF1UGgmp/DerSBqTVyGQyeEK50XXHeK9eBgLjC/.qe', 'Elijah Bloomsy', 'antt@test.com', 'Basic User', '2023-09-24 19:58:32', '2023-10-12 18:59:54'),
(8, 'toyo', '$2b$12$dAiFMNHoq4LpdjW/KwTNiu713Mlc7nIXDLcwVJChra3p3V.5xr9SC', 'Elijah Abolaji', 'tyabolaji@gmail.com', 'Super Admin', '2023-09-24 22:10:07', '2023-10-12 21:38:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `breweries`
--
ALTER TABLE `breweries`
  ADD PRIMARY KEY (`brewery_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`delivery_id`),
  ADD KEY `idx_order_id` (`order_id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `idx_uploaded_by` (`uploaded_by`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tap_number` (`tap_number`);

--
-- Indexes for table `kegsizes`
--
ALTER TABLE `kegsizes`
  ADD PRIMARY KEY (`keg_size_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `idx_product_id` (`product_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `tap_number` (`tap_number`),
  ADD KEY `keg_size_id` (`keg_size_id`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_brewery_id` (`brewery_id`),
  ADD KEY `idx_supplier_id` (`supplier_id`),
  ADD KEY `idx_arrival_date` (`arrival_date`),
  ADD KEY `tap_id` (`tap_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `tap`
--
ALTER TABLE `tap`
  ADD PRIMARY KEY (`tap_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `idx_product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `breweries`
--
ALTER TABLE `breweries`
  MODIFY `brewery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `delivery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kegsizes`
--
ALTER TABLE `kegsizes`
  MODIFY `keg_size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tap`
--
ALTER TABLE `tap`
  MODIFY `tap_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `deliveries_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`tap_number`) REFERENCES `products` (`tap_number`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brewery_id`) REFERENCES `breweries` (`brewery_id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`keg_size_id`) REFERENCES `kegsizes` (`keg_size_id`),
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`tap_id`) REFERENCES `tap` (`tap_id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
