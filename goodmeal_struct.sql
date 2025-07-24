-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: my_database:3306
-- Generation Time: Jul 24, 2025 at 04:56 PM
-- Server version: 10.11.13-MariaDB-ubu2204
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `goodmeal`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eating_blog`
--

CREATE TABLE `eating_blog` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `status` enum('pending','release') DEFAULT 'pending',
  `content` longtext DEFAULT NULL,
  `excerpt_content` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `cal` decimal(8,2) NOT NULL,
  `carb` decimal(8,2) DEFAULT NULL,
  `fat` decimal(8,2) DEFAULT NULL,
  `protein` decimal(8,2) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `ingredient` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_category`
--

CREATE TABLE `food_category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_category_map`
--

CREATE TABLE `food_category_map` (
  `food_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `global_food_plan`
--

CREATE TABLE `global_food_plan` (
  `plan_id` int(11) NOT NULL,
  `plan_name` varchar(100) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` date DEFAULT curdate(),
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meal_plan_detail`
--

CREATE TABLE `meal_plan_detail` (
  `detail_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `day_number` int(11) DEFAULT 1,
  `meal_type` varchar(50) DEFAULT NULL,
  `meal_name` varchar(50) DEFAULT NULL,
  `meal_time` time DEFAULT NULL,
  `calories` decimal(8,2) DEFAULT 0.00,
  `protein` decimal(8,2) DEFAULT 0.00,
  `carb` decimal(8,2) DEFAULT 0.00,
  `fat` decimal(8,2) DEFAULT 0.00,
  `food_id` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_tag`
--

CREATE TABLE `post_tag` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  `age` int(3) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `last_updated_weight` decimal(5,2) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `body_fat` enum('high','low','normal','don’t know') DEFAULT NULL,
  `target_goal` enum('decrease','increase','healthy') DEFAULT NULL,
  `target_weight` decimal(5,2) DEFAULT NULL,
  `activity_level` enum('low','moderate','high','very high') DEFAULT NULL,
  `additional_requirements` text DEFAULT NULL,
  `dietary_restrictions` text DEFAULT NULL,
  `eating_type` enum('vegan','vegetarian','omnivore','keto','other') DEFAULT NULL,
  `account_status` enum('active','suspended','deactivated') DEFAULT NULL,
  `suspend_reason` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_password_reset` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_food`
--

CREATE TABLE `user_food` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `cal` decimal(8,2) DEFAULT NULL,
  `carb` decimal(8,2) DEFAULT NULL,
  `fat` decimal(8,2) DEFAULT NULL,
  `protein` decimal(8,2) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ingredient` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_food_plans`
--

CREATE TABLE `user_food_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`plan`)),
  `img` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_food_plan_using`
--

CREATE TABLE `user_food_plan_using` (
  `id` int(11) NOT NULL,
  `food_plan_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `is_repeat` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eating_blog`
--
ALTER TABLE `eating_blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_category`
--
ALTER TABLE `food_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `food_category_map`
--
ALTER TABLE `food_category_map`
  ADD PRIMARY KEY (`food_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `global_food_plan`
--
ALTER TABLE `global_food_plan`
  ADD PRIMARY KEY (`plan_id`);

--
-- Indexes for table `meal_plan_detail`
--
ALTER TABLE `meal_plan_detail`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `meal_plan_detail_ibfk_2` (`food_id`);

--
-- Indexes for table `post_tag`
--
ALTER TABLE `post_tag`
  ADD PRIMARY KEY (`post_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_food`
--
ALTER TABLE `user_food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_food_plans`
--
ALTER TABLE `user_food_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_food_plan_using`
--
ALTER TABLE `user_food_plan_using`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_plan_id` (`food_plan_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eating_blog`
--
ALTER TABLE `eating_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_category`
--
ALTER TABLE `food_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `global_food_plan`
--
ALTER TABLE `global_food_plan`
  MODIFY `plan_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meal_plan_detail`
--
ALTER TABLE `meal_plan_detail`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_food`
--
ALTER TABLE `user_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_food_plans`
--
ALTER TABLE `user_food_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_food_plan_using`
--
ALTER TABLE `user_food_plan_using`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `food_category_map`
--
ALTER TABLE `food_category_map`
  ADD CONSTRAINT `food_category_map_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `food_category_map_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `food_category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `meal_plan_detail`
--
ALTER TABLE `meal_plan_detail`
  ADD CONSTRAINT `meal_plan_detail_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `global_food_plan` (`plan_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `meal_plan_detail_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `post_tag`
--
ALTER TABLE `post_tag`
  ADD CONSTRAINT `post_tag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `eating_blog` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_food_plans`
--
ALTER TABLE `user_food_plans`
  ADD CONSTRAINT `user_food_plans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_food_plan_using`
--
ALTER TABLE `user_food_plan_using`
  ADD CONSTRAINT `user_food_plan_using_ibfk_1` FOREIGN KEY (`food_plan_id`) REFERENCES `user_food_plans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_food_plan_using_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;