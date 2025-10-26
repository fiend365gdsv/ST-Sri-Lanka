-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2025 at 02:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sblk`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) NOT NULL,
  `boarding_point` varchar(255) DEFAULT NULL,
  `booked_at` datetime(6) DEFAULT NULL,
  `bus_number` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `from_location` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `travel_date` date DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `boarding_point`, `booked_at`, `bus_number`, `destination`, `from_location`, `status`, `travel_date`, `username`) VALUES
(4, 'Rathgama', '2025-10-25 12:09:00.000000', 'NB-7845', 'Mathara', 'Galle', 'CONFIRMED', '2025-10-24', 'saman'),
(5, 'Rathgama', '2025-10-25 12:09:00.000000', 'NB-7845', 'Mathara', 'Galle', 'CONFIRMED', '2025-10-24', 'saman'),
(6, 'Rathgama', '2025-10-26 02:28:49.000000', 'NB-7845', 'Mathara', 'Galle', 'CONFIRMED', '2025-10-24', 'dasulin');

-- --------------------------------------------------------

--
-- Table structure for table `bus_locations`
--

CREATE TABLE `bus_locations` (
  `id` bigint(20) NOT NULL,
  `bus_number` varchar(255) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `from_location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_locations`
--

INSERT INTO `bus_locations` (`id`, `bus_number`, `latitude`, `longitude`, `updated_at`, `destination`, `from_location`) VALUES
(1, '138', 51.5198, -0.1087, '2025-10-23 16:37:24.000000', NULL, NULL),
(2, '138', 51.5198, -0.1087, '2025-10-23 16:37:26.000000', NULL, NULL),
(3, '138', 51.5198, -0.1087, '2025-10-23 16:37:27.000000', NULL, NULL),
(4, '138', 51.5198, -0.1087, '2025-10-23 16:37:28.000000', NULL, NULL),
(5, '138', 51.5198, -0.1087, '2025-10-23 16:37:29.000000', NULL, NULL),
(6, '138', 51.5198, -0.1087, '2025-10-23 16:37:30.000000', NULL, NULL),
(7, '138', 51.5198, -0.1087, '2025-10-23 16:37:31.000000', NULL, NULL),
(8, '138', 51.5198, -0.1087, '2025-10-23 16:37:32.000000', NULL, NULL),
(9, '138', 51.5198, -0.1087, '2025-10-23 16:37:33.000000', NULL, NULL),
(10, '138', 51.5198, -0.1087, '2025-10-23 16:37:34.000000', NULL, NULL),
(11, '138', 51.5198, -0.1087, '2025-10-23 16:37:35.000000', NULL, NULL),
(12, '138', 51.5198, -0.1087, '2025-10-23 16:37:36.000000', NULL, NULL),
(13, '138', 51.5198, -0.1087, '2025-10-23 16:37:37.000000', NULL, NULL),
(14, '138', 51.5198, -0.1087, '2025-10-23 16:37:38.000000', NULL, NULL),
(15, '138', 51.5198, -0.1087, '2025-10-23 16:37:39.000000', NULL, NULL),
(16, '138', 51.5198, -0.1087, '2025-10-23 16:37:40.000000', NULL, NULL),
(17, '138', 51.5198, -0.1087, '2025-10-23 16:37:41.000000', NULL, NULL),
(18, '138', 51.5198, -0.1087, '2025-10-23 16:37:42.000000', NULL, NULL),
(19, '138', 51.5198, -0.1087, '2025-10-23 16:37:43.000000', NULL, NULL),
(20, '138', 51.5198, -0.1087, '2025-10-23 16:37:44.000000', NULL, NULL),
(21, '138', 51.5198, -0.1087, '2025-10-23 16:37:45.000000', NULL, NULL),
(22, '138', 51.5198, -0.1087, '2025-10-23 16:37:46.000000', NULL, NULL),
(23, '138', 51.5198, -0.1087, '2025-10-23 16:37:47.000000', NULL, NULL),
(24, '138', 51.5198, -0.1087, '2025-10-23 16:37:48.000000', NULL, NULL),
(25, '138', 51.5198, -0.1087, '2025-10-23 16:37:49.000000', NULL, NULL),
(26, '138', 51.5198, -0.1087, '2025-10-23 16:37:50.000000', NULL, NULL),
(27, '138', 51.5198, -0.1087, '2025-10-23 16:37:51.000000', NULL, NULL),
(28, '138', 51.5198, -0.1087, '2025-10-23 16:37:52.000000', NULL, NULL),
(29, '138', 51.5198, -0.1087, '2025-10-23 16:37:53.000000', NULL, NULL),
(30, '138', 51.5198, -0.1087, '2025-10-23 16:37:54.000000', NULL, NULL),
(31, '138', 51.5198, -0.1087, '2025-10-23 16:37:55.000000', NULL, NULL),
(32, '138', 51.5198, -0.1087, '2025-10-23 16:37:56.000000', NULL, NULL),
(33, '138', 51.5198, -0.1087, '2025-10-23 16:37:57.000000', NULL, NULL),
(34, '138', 51.5198, -0.1087, '2025-10-23 16:37:58.000000', NULL, NULL),
(35, '138', 51.5198, -0.1087, '2025-10-23 16:37:59.000000', NULL, NULL),
(36, '138', 51.5198, -0.1087, '2025-10-23 16:38:00.000000', NULL, NULL),
(37, '138', 51.5198, -0.1087, '2025-10-23 16:38:01.000000', NULL, NULL),
(38, '138', 51.5198, -0.1087, '2025-10-23 16:38:02.000000', NULL, NULL),
(39, '138', 51.5198, -0.1087, '2025-10-23 16:38:03.000000', NULL, NULL),
(40, '138', 51.5198, -0.1087, '2025-10-23 16:38:04.000000', NULL, NULL),
(41, '138', 51.5198, -0.1087, '2025-10-23 16:38:05.000000', NULL, NULL),
(42, '138', 51.5198, -0.1087, '2025-10-23 16:38:06.000000', NULL, NULL),
(43, '138', 51.5198, -0.1087, '2025-10-23 16:38:07.000000', NULL, NULL),
(44, '138', 51.5198, -0.1087, '2025-10-23 16:38:08.000000', NULL, NULL),
(45, '138', 51.5198, -0.1087, '2025-10-23 16:38:09.000000', NULL, NULL),
(46, '138', 51.5198, -0.1087, '2025-10-23 16:38:10.000000', NULL, NULL),
(47, '138', 51.5198, -0.1087, '2025-10-23 16:38:53.000000', NULL, NULL),
(48, '138', 51.5198, -0.1087, '2025-10-23 16:38:54.000000', NULL, NULL),
(49, '138', 51.5198, -0.1087, '2025-10-23 16:41:22.000000', NULL, NULL),
(50, '138', 51.5198, -0.1087, '2025-10-23 16:41:23.000000', NULL, NULL),
(51, '138', 51.5198, -0.1087, '2025-10-23 16:41:27.000000', NULL, NULL),
(52, '138', 51.5198, -0.1087, '2025-10-23 16:41:28.000000', NULL, NULL),
(53, '138', 51.5198, -0.1087, '2025-10-23 16:41:29.000000', NULL, NULL),
(54, '138', 51.5198, -0.1087, '2025-10-23 16:41:30.000000', NULL, NULL),
(55, '138', 51.5198, -0.1087, '2025-10-23 16:41:31.000000', NULL, NULL),
(56, '138', 51.5198, -0.1087, '2025-10-23 16:41:32.000000', NULL, NULL),
(57, '138', 51.5198, -0.1087, '2025-10-23 16:41:33.000000', NULL, NULL),
(58, '138', 51.5198, -0.1087, '2025-10-23 16:41:34.000000', NULL, NULL),
(59, '138', 51.5198, -0.1087, '2025-10-23 16:41:35.000000', NULL, NULL),
(60, '138', 51.5198, -0.1087, '2025-10-23 16:41:36.000000', NULL, NULL),
(61, '138', 51.5198, -0.1087, '2025-10-23 16:41:37.000000', NULL, NULL),
(62, '138', 51.5198, -0.1087, '2025-10-23 16:41:38.000000', NULL, NULL),
(63, '138', 51.5198, -0.1087, '2025-10-23 16:41:42.000000', NULL, NULL),
(64, '138', 51.5198, -0.1087, '2025-10-23 16:41:43.000000', NULL, NULL),
(65, '138', 51.5198, -0.1087, '2025-10-23 16:50:39.000000', NULL, NULL),
(66, '138', 51.5198, -0.1087, '2025-10-23 16:50:41.000000', NULL, NULL),
(67, '138', 51.5198, -0.1087, '2025-10-23 16:50:42.000000', NULL, NULL),
(68, '138', 51.5198, -0.1087, '2025-10-23 16:50:43.000000', NULL, NULL),
(69, '138', 51.5198, -0.1087, '2025-10-23 16:50:44.000000', NULL, NULL),
(70, '138', 51.5198, -0.1087, '2025-10-23 16:50:45.000000', NULL, NULL),
(71, '138', 51.5198, -0.1087, '2025-10-23 16:50:46.000000', NULL, NULL),
(72, '138', 51.5198, -0.1087, '2025-10-23 16:50:47.000000', NULL, NULL),
(73, '138', 51.5198, -0.1087, '2025-10-23 16:50:48.000000', NULL, NULL),
(74, '138', 51.5198, -0.1087, '2025-10-23 16:50:49.000000', NULL, NULL),
(75, '138', 51.5198, -0.1087, '2025-10-23 16:50:50.000000', NULL, NULL),
(76, '138', 51.5198, -0.1087, '2025-10-23 16:50:51.000000', NULL, NULL),
(77, '138', 51.5198, -0.1087, '2025-10-23 16:50:52.000000', NULL, NULL),
(78, '138', 51.5198, -0.1087, '2025-10-23 16:50:53.000000', NULL, NULL),
(79, '138', 51.5198, -0.1087, '2025-10-23 16:50:54.000000', NULL, NULL),
(80, '138', 51.5198, -0.1087, '2025-10-23 16:50:55.000000', NULL, NULL),
(81, '138', 51.5198, -0.1087, '2025-10-23 16:50:56.000000', NULL, NULL),
(82, '138', 51.5198, -0.1087, '2025-10-23 17:06:45.000000', NULL, NULL),
(83, '138', 51.5198, -0.1087, '2025-10-23 17:06:46.000000', NULL, NULL),
(84, '138', 51.5198, -0.1087, '2025-10-23 17:06:47.000000', NULL, NULL),
(85, '138', 51.5198, -0.1087, '2025-10-23 17:06:48.000000', NULL, NULL),
(86, '138', 51.5198, -0.1087, '2025-10-23 17:06:49.000000', NULL, NULL),
(87, '138', 51.5198, -0.1087, '2025-10-23 17:06:50.000000', NULL, NULL),
(88, '138', 51.5198, -0.1087, '2025-10-23 17:06:51.000000', NULL, NULL),
(89, '138', 51.5198, -0.1087, '2025-10-23 17:06:52.000000', NULL, NULL),
(90, '138', 51.5198, -0.1087, '2025-10-23 17:06:53.000000', NULL, NULL),
(91, '138', 51.5198, -0.1087, '2025-10-23 17:06:54.000000', NULL, NULL),
(92, '138', 51.5198, -0.1087, '2025-10-23 17:06:55.000000', NULL, NULL),
(93, '138', 51.5198, -0.1087, '2025-10-23 17:06:56.000000', NULL, NULL),
(94, '138', 51.5198, -0.1087, '2025-10-23 17:06:57.000000', NULL, NULL),
(95, '138', 51.5198, -0.1087, '2025-10-23 17:06:58.000000', NULL, NULL),
(96, '138', 51.5198, -0.1087, '2025-10-23 17:07:05.000000', NULL, NULL),
(97, '138', 51.5198, -0.1087, '2025-10-23 17:07:07.000000', NULL, NULL),
(98, '138', 51.5198, -0.1087, '2025-10-23 17:07:08.000000', NULL, NULL),
(99, '138', 51.5198, -0.1087, '2025-10-23 17:07:09.000000', NULL, NULL),
(100, '138', 51.5198, -0.1087, '2025-10-23 17:07:10.000000', NULL, NULL),
(101, '138', 51.5198, -0.1087, '2025-10-23 17:07:11.000000', NULL, NULL),
(102, '138', 51.5198, -0.1087, '2025-10-23 17:07:22.000000', NULL, NULL),
(103, '138', 51.5198, -0.1087, '2025-10-23 17:07:24.000000', NULL, NULL),
(104, '138', 51.5198, -0.1087, '2025-10-23 17:07:25.000000', NULL, NULL),
(105, '138', 51.5198, -0.1087, '2025-10-23 17:07:26.000000', NULL, NULL),
(106, '138', 51.5198, -0.1087, '2025-10-23 17:07:27.000000', NULL, NULL),
(107, '138', 51.5198, -0.1087, '2025-10-23 17:07:28.000000', NULL, NULL),
(108, '138', 51.5198, -0.1087, '2025-10-23 17:07:29.000000', NULL, NULL),
(109, '138', 51.5198, -0.1087, '2025-10-23 17:07:30.000000', NULL, NULL),
(110, '138', 51.5198, -0.1087, '2025-10-23 17:07:31.000000', NULL, NULL),
(111, '138', 51.5198, -0.1087, '2025-10-23 17:07:32.000000', NULL, NULL),
(112, '138', 51.5198, -0.1087, '2025-10-23 17:07:33.000000', NULL, NULL),
(113, '138', 51.5198, -0.1087, '2025-10-23 17:07:36.000000', NULL, NULL),
(114, '138', 51.5198, -0.1087, '2025-10-23 17:07:37.000000', NULL, NULL),
(115, '138', 51.5198, -0.1087, '2025-10-23 17:07:38.000000', NULL, NULL),
(116, '138', 51.5198, -0.1087, '2025-10-23 17:07:39.000000', NULL, NULL),
(117, '138', 51.5198, -0.1087, '2025-10-23 17:07:40.000000', NULL, NULL),
(118, '138', 51.5198, -0.1087, '2025-10-23 17:07:41.000000', NULL, NULL),
(119, '138', 51.5198, -0.1087, '2025-10-23 17:07:42.000000', NULL, NULL),
(120, '138', 51.5198, -0.1087, '2025-10-23 17:07:43.000000', NULL, NULL),
(121, '138', 51.5198, -0.1087, '2025-10-23 17:07:44.000000', NULL, NULL),
(122, '138', 51.5198, -0.1087, '2025-10-23 17:07:45.000000', NULL, NULL),
(123, '138', 51.5198, -0.1087, '2025-10-23 17:07:46.000000', NULL, NULL),
(124, '138', 51.5198, -0.1087, '2025-10-23 17:07:47.000000', NULL, NULL),
(125, '138', 51.5198, -0.1087, '2025-10-23 17:07:48.000000', NULL, NULL),
(126, '138', 51.5198, -0.1087, '2025-10-23 17:11:26.000000', NULL, NULL),
(127, '138', 51.5198, -0.1087, '2025-10-23 17:11:28.000000', NULL, NULL),
(128, '138', 51.5198, -0.1087, '2025-10-23 17:11:29.000000', NULL, NULL),
(129, '138', 51.5198, -0.1087, '2025-10-23 17:11:30.000000', NULL, NULL),
(130, '138', 51.5198, -0.1087, '2025-10-23 17:11:31.000000', NULL, NULL),
(131, '138', 51.5198, -0.1087, '2025-10-23 17:11:32.000000', NULL, NULL),
(132, '138', 51.5198, -0.1087, '2025-10-23 17:11:33.000000', NULL, NULL),
(133, '138', 51.5198, -0.1087, '2025-10-23 17:11:34.000000', NULL, NULL),
(134, '138', 51.5198, -0.1087, '2025-10-23 17:11:35.000000', NULL, NULL),
(135, '138', 51.5198, -0.1087, '2025-10-23 17:11:36.000000', NULL, NULL),
(136, '138', 51.5198, -0.1087, '2025-10-23 17:11:37.000000', NULL, NULL),
(137, '138', 51.5198, -0.1087, '2025-10-23 17:11:38.000000', NULL, NULL),
(138, '138', 51.5198, -0.1087, '2025-10-23 17:11:39.000000', NULL, NULL),
(139, '138', 51.5198, -0.1087, '2025-10-23 17:11:40.000000', NULL, NULL),
(140, '138', 51.5198, -0.1087, '2025-10-23 17:11:41.000000', NULL, NULL),
(141, '138', 51.5198, -0.1087, '2025-10-23 17:11:42.000000', NULL, NULL),
(142, '138', 51.5198, -0.1087, '2025-10-23 17:13:07.000000', NULL, NULL),
(143, '138', 51.5198, -0.1087, '2025-10-23 17:13:08.000000', NULL, NULL),
(144, '138', 51.5198, -0.1087, '2025-10-23 17:13:09.000000', NULL, NULL),
(145, '138', 51.5198, -0.1087, '2025-10-23 17:13:10.000000', NULL, NULL),
(146, '138', 51.5198, -0.1087, '2025-10-23 17:13:11.000000', NULL, NULL),
(147, '138', 51.5198, -0.1087, '2025-10-23 17:13:12.000000', NULL, NULL),
(148, '138', 51.5198, -0.1087, '2025-10-23 17:13:13.000000', NULL, NULL),
(149, '138', 51.5198, -0.1087, '2025-10-23 17:13:13.000000', NULL, NULL),
(150, '138', 51.5198, -0.1087, '2025-10-23 17:13:14.000000', NULL, NULL),
(151, '138', 51.5198, -0.1087, '2025-10-23 17:13:14.000000', NULL, NULL),
(152, '138', 51.5198, -0.1087, '2025-10-23 17:13:15.000000', NULL, NULL),
(153, '138', 51.5198, -0.1087, '2025-10-23 17:13:15.000000', NULL, NULL),
(154, '138', 51.5198, -0.1087, '2025-10-23 17:13:16.000000', NULL, NULL),
(155, '138', 51.5198, -0.1087, '2025-10-23 17:13:16.000000', NULL, NULL),
(156, '138', 51.5198, -0.1087, '2025-10-23 17:13:17.000000', NULL, NULL),
(157, '138', 51.5198, -0.1087, '2025-10-23 17:13:18.000000', NULL, NULL),
(158, '138', 51.5198, -0.1087, '2025-10-23 17:13:19.000000', NULL, NULL),
(159, '138', 51.5198, -0.1087, '2025-10-23 17:13:20.000000', NULL, NULL),
(160, '138', 51.5198, -0.1087, '2025-10-23 17:13:21.000000', NULL, NULL),
(161, '138', 51.5198, -0.1087, '2025-10-23 17:13:22.000000', NULL, NULL),
(162, '138', 51.5198, -0.1087, '2025-10-23 17:13:23.000000', NULL, NULL),
(163, '138', 51.5198, -0.1087, '2025-10-23 17:13:23.000000', NULL, NULL),
(164, '138', 1.2798, 103.8487, '2025-10-24 04:35:00.000000', NULL, NULL),
(165, '138', 1.2798, 103.8487, '2025-10-24 04:35:02.000000', NULL, NULL),
(166, '138', 1.2798, 103.8487, '2025-10-24 04:35:03.000000', NULL, NULL),
(167, '138', 1.2798, 103.8487, '2025-10-24 04:35:04.000000', NULL, NULL),
(168, '138', 1.2798, 103.8487, '2025-10-24 04:35:05.000000', NULL, NULL),
(169, '138', 1.2798, 103.8487, '2025-10-24 04:35:06.000000', NULL, NULL),
(170, '138', 1.2798, 103.8487, '2025-10-24 04:35:07.000000', NULL, NULL),
(171, '138', 1.2798, 103.8487, '2025-10-24 04:35:09.000000', NULL, NULL),
(172, '138', 1.2798, 103.8487, '2025-10-24 04:35:10.000000', NULL, NULL),
(173, '138', 1.2798, 103.8487, '2025-10-24 04:35:11.000000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `depots`
--

CREATE TABLE `depots` (
  `id` bigint(20) NOT NULL,
  `bus_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `depot_name` varchar(255) NOT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `from_location` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `depots`
--

INSERT INTO `depots` (`id`, `bus_number`, `created_at`, `depot_name`, `destination`, `from_location`, `route`) VALUES
(1, 'NB-1245', '2025-10-20 02:49:34.000000', 'Horana', 'Mathugama', 'Horana', '285'),
(4, 'NB-3145', '2025-10-23 06:57:53.000000', 'Colombo', 'Kandy', 'Colombo', '001'),
(5, 'NB-7845', '2025-10-23 07:03:37.000000', 'Galle', 'Mathara', 'Galle', '002'),
(6, 'NB-4578', '2025-10-24 04:17:44.000000', 'Mathara', 'Polhena', 'Wadhuraba', '171');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `submitted_at` datetime(6) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `description`, `subject`, `submitted_at`, `username`) VALUES
(1, 'Bus 125 was 40 minutes late this morning.', 'Bus delay complaint', '2025-10-23 05:54:01.000000', 'senu'),
(2, 'gfdhfjfjf', 'gfdgfdh', '2025-10-26 03:08:18.000000', 'dasulin');

-- --------------------------------------------------------

--
-- Table structure for table `passengers`
--

CREATE TABLE `passengers` (
  `id` bigint(20) NOT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `passengers`
--

INSERT INTO `passengers` (`id`, `address_line1`, `address_line2`, `city`, `date_of_birth`, `district`, `email`, `first_name`, `gender`, `last_name`, `mobile_number`, `password`, `username`) VALUES
(1, '123 Main St', 'Apt 4B', 'Colombo', '1990-01-01', 'Colombo', 'john@example.com', 'John', 'Male', 'Doe', '0712345678', '$2a$10$OXhnXqqWFszoBvyF9IkZuOMVtNzcxa/Zy10FPqflH7BrhSMslYU3W', 'johndoe'),
(2, '123 Main St', 'Apt 4B', 'Colombo', '1990-01-01', 'Colombo', 'senuravinodya2002@gmail.com', 'Senura', 'Male', 'Vinodya', '0760684234', '$2a$10$hnhGbLmmHXG7FM.1mb3VKeH0nnBYIaLAiDVpRYLE08h1qClVcYVi6', 'senu'),
(3, 'rfgfdhdghgh', 'gfdghdhghg', 'Kadawatha', '2025-10-09', 'Colombo', 'dafed@gmail.com', 'Banula', 'Male', 'Muthukuda', '0774569234', '$2a$10$XTdMPKj98f9eBP3PcdKC2OdlzqA6vQzrLtP4GdxuUs.CsYMNfYozG', 'banula0'),
(4, '', '', '', '', '', '', '', '', '', '', '$2a$10$GwOnX2wFYd3QPt4LVLVZx.JZ09p3odLXScifvvgsgJUDzIQ5m0wcS', ''),
(6, '812/A, Pahala Naragala', 'Govinna', 'Horana', '2006-11-04', 'Kaluthara', 'dasulinavodya@gmail.com', 'Dasuli', 'Female', 'Navodya', '0778516296', '$2a$10$DuciASOGU9EYXPdmyewJIu1kp5xqCE2wu8Wvf3x0gPk.La4/t92Cu', 'dasulin');

-- --------------------------------------------------------

--
-- Table structure for table `passenger_device_tokens`
--

CREATE TABLE `passenger_device_tokens` (
  `id` bigint(20) NOT NULL,
  `device_token` varchar(255) NOT NULL,
  `passenger_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profit_entries`
--

CREATE TABLE `profit_entries` (
  `id` bigint(20) NOT NULL,
  `bus_number` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `depot_name` varchar(255) DEFAULT NULL,
  `fuel_expenses` double NOT NULL,
  `other_expenses` double NOT NULL,
  `profit` double NOT NULL,
  `total_collection` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profit_entries`
--

INSERT INTO `profit_entries` (`id`, `bus_number`, `date`, `depot_name`, `fuel_expenses`, `other_expenses`, `profit`, `total_collection`) VALUES
(1, 'NB-3145', '2025-10-24', 'Colombo', 3000, 0, 7000, 10000),
(2, 'NB-7845', '2025-10-24', 'Galle', 2500, 0, 4500, 7000),
(3, 'NB-4578', '2025-10-24', 'Mathara', 3000, 0, 5000, 8000),
(4, 'NB-1245', '2025-10-24', 'Horana', 4500, 800, 6700, 12000);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` bigint(20) NOT NULL,
  `bus_number` varchar(255) DEFAULT NULL,
  `conductor_name` varchar(255) DEFAULT NULL,
  `depot_name` varchar(255) DEFAULT NULL,
  `driver_name` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `shift_time` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `bus_number`, `conductor_name`, `depot_name`, `driver_name`, `route`, `shift_time`, `start_date`) VALUES
(4, 'NB-7845', 'Venurs Silva', 'Galle', 'Ramesh Silva', '002', '1-2p.m', '2025-10-24');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) NOT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `driver_license_expiry_date` varchar(255) DEFAULT NULL,
  `driver_license_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `previous_employment_details` varchar(2000) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `address_line1`, `address_line2`, `city`, `created_at`, `date_of_birth`, `district`, `driver_license_expiry_date`, `driver_license_number`, `email`, `experience_years`, `first_name`, `gender`, `last_name`, `mobile_number`, `nic`, `password`, `previous_employment_details`, `role`, `username`) VALUES
(1, '812/A, Pahala Naragala', 'Govinna', 'Horana', '2025-10-26 06:35:25.000000', '10-17-2002', 'Kaluthara', '12-10-2030', '234345656', 'senuravinodya2002@gmail.com', 5, 'Senura', 'Male', 'Vinodya', '0760684234', '200229101185', '$2a$10$zB705PdmdWhNBYGinQ5bUusjtDcv2ICjmu32MV1EQnlTeik/gOWWq', 'gsfdgdtgfdgfdg', 'DRIVER', 'svinodya788'),
(3, 'grggfdgdhfgh', 'dghdhtdh', 'Colombo', '2025-10-26 06:39:52.000000', '10-12-2002', 'Colombo', NULL, NULL, 'dasulinavodya@gmail.com', 4, 'Senura', 'Male', 'Vinodya', '23245545', '4345454356', '$2a$10$WtnACQCWWEvEoU/f37K9TuOxMvcqyd2axjYjertJoFphKQ5MfvPx2', 'fdsffdrtghytht', 'ADMIN', 'svinodya262');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bus_locations`
--
ALTER TABLE `bus_locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `depots`
--
ALTER TABLE `depots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKnplwv2tutkduhyiu0sf5w8ktk` (`username`);

--
-- Indexes for table `passenger_device_tokens`
--
ALTER TABLE `passenger_device_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK51yhgh09nmtcaeuvndn8mwkvv` (`device_token`);

--
-- Indexes for table `profit_entries`
--
ALTER TABLE `profit_entries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bus_locations`
--
ALTER TABLE `bus_locations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT for table `depots`
--
ALTER TABLE `depots`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `passengers`
--
ALTER TABLE `passengers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `passenger_device_tokens`
--
ALTER TABLE `passenger_device_tokens`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profit_entries`
--
ALTER TABLE `profit_entries`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
