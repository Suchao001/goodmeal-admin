-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: my_database:3306
-- Generation Time: Jun 16, 2025 at 07:10 AM
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

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`, `created_date`) VALUES
(1, 'suchao', '$2b$10$AbMdjlYeK.KZw3H13Jpsee6B09cYrrjpDiXMndG1RHeR8981hF1Ja', '2025-06-09 09:29:12');

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

--
-- Dumping data for table `eating_blog`
--

INSERT INTO `eating_blog` (`id`, `title`, `img`, `publish_date`, `status`, `content`, `excerpt_content`, `created_at`, `updated_at`) VALUES
(3, 'บทความ example ', '/blog/1750055918858-ugovp039f.jpg', '2025-06-10 00:00:00', 'release', '<p>Welcome to TinyMCE!</p>', 'เนื้อหาแน่นๆ ', '2025-06-12 14:58:04', '2025-06-16 13:38:38');

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

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `name`, `cal`, `carb`, `fat`, `protein`, `img`, `ingredient`) VALUES
(1, 'ข้าวผัดหมู', 550.00, 65.00, 20.00, 15.00, '/foods/1750055661288-zabvsd0du.jpg', ''),
(2, 'ข้าวมันไก่', 600.00, 55.00, 25.00, 30.00, NULL, NULL),
(3, 'ผัดไทยกุ้งสด', 480.00, 50.00, 15.00, 20.00, NULL, NULL),
(4, 'ส้มตำไทย', 120.00, 20.00, 3.00, 2.00, NULL, NULL),
(5, 'ข้าวไข่เจียว', 420.00, 35.00, 25.00, 12.00, NULL, NULL),
(6, 'ต้มยำกุ้ง', 150.00, 8.00, 5.00, 12.00, NULL, NULL),
(7, 'ผัดกะเพราไก่ไข่ดาว', 650.00, 60.00, 30.00, 25.00, NULL, NULL),
(8, 'แกงเขียวหวานไก่', 350.00, 18.00, 25.00, 20.00, NULL, NULL),
(9, 'ขนมจีนแกงเผ็ด', 500.00, 60.00, 15.00, 18.00, NULL, NULL),
(10, 'ก๋วยเตี๋ยวเรือ', 400.00, 45.00, 10.00, 20.00, NULL, NULL),
(11, 'ข้าวหน้าเป็ด', 520.00, 55.00, 20.00, 22.00, NULL, NULL),
(12, 'บะหมี่แห้งหมูแดง', 470.00, 50.00, 15.00, 18.00, NULL, NULL),
(13, 'ซุปข้าวโพด', 180.00, 22.00, 8.00, 5.00, NULL, NULL),
(14, 'ไก่ทอด', 300.00, 10.00, 20.00, 18.00, NULL, NULL),
(15, 'หมูปิ้งข้าวเหนียว', 450.00, 40.00, 15.00, 20.00, NULL, NULL),
(16, 'ข้าวต้มหมู', 280.00, 35.00, 5.00, 12.00, NULL, NULL),
(17, 'เกี๊ยวน้ำ', 320.00, 38.00, 8.00, 15.00, NULL, NULL),
(18, 'แซนด์วิชทูน่า', 350.00, 30.00, 18.00, 20.00, NULL, NULL),
(19, 'โจ๊กหมูไข่ลวก', 320.00, 28.00, 7.00, 14.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `food_category`
--

CREATE TABLE `food_category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_category`
--

INSERT INTO `food_category` (`id`, `name`) VALUES
(7, 'อาหารคลีน'),
(17, 'อาหารคีโต'),
(9, 'อาหารจานเดียว'),
(4, 'อาหารจีน'),
(3, 'อาหารญี่ปุ่น'),
(2, 'อาหารตะวันตก'),
(11, 'อาหารทะเล'),
(23, 'อาหารนานาชาติ'),
(24, 'อาหารพื้นบ้านไทย'),
(15, 'อาหารพื้นเมืองหรืออาหารท้องถิ่น'),
(20, 'อาหารฟาสต์ฟู้ด'),
(12, 'อาหารฟิวชัน'),
(6, 'อาหารมังสวิรัติ'),
(18, 'อาหารวีแกน'),
(10, 'อาหารว่างและของหวาน'),
(22, 'อาหารสำหรับผู้ป่วยหรืออาหารทางการแพทย์'),
(14, 'อาหารสำหรับเด็ก'),
(19, 'อาหารออร์แกนิก'),
(13, 'อาหารฮาลาล'),
(5, 'อาหารเกาหลี'),
(8, 'อาหารเพื่อสุขภาพ'),
(25, 'อาหารเสริมหรืออาหารเสริมพลังงาน'),
(16, 'อาหารแคลอรี่ต่ำ'),
(21, 'อาหารแช่แข็งหรืออาหารพร้อมทาน'),
(1, 'อาหารไทย');

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
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `global_food_plan`
--

INSERT INTO `global_food_plan` (`plan_id`, `plan_name`, `duration`, `description`, `created_at`, `image`) VALUES
(1, 'plan 1', 14, 'meal plan 1 descriptions', '2025-06-15', '/mealplan/1750056478454-7a25kwnko.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `meal_plan_detail`
--

CREATE TABLE `meal_plan_detail` (
  `detail_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `meal_name` varchar(50) DEFAULT NULL,
  `meal_time` time DEFAULT NULL,
  `food_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_tag`
--

CREATE TABLE `post_tag` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_tag`
--

INSERT INTO `post_tag` (`post_id`, `tag_id`) VALUES
(3, 5),
(3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(2, '1'),
(4, '2'),
(1, '3'),
(3, '4'),
(6, 'สุขภาพ'),
(5, 'อาหาร');

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
  `suspend_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_date`, `age`, `weight`, `last_updated_weight`, `height`, `gender`, `body_fat`, `target_goal`, `target_weight`, `activity_level`, `additional_requirements`, `dietary_restrictions`, `eating_type`, `account_status`, `suspend_reason`) VALUES
(1, 'suchao', 'suchao0101@gmail.com', '$2b$10$gn2HsGXIxHK2jrNaw755D.vKTBYE4v6B8d8XIlZ.KTwGMOl3m1UJC', '2025-06-11 13:43:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', NULL);

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
  ADD KEY `food_id` (`food_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `eating_blog`
--
ALTER TABLE `eating_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `food_category`
--
ALTER TABLE `food_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `global_food_plan`
--
ALTER TABLE `global_food_plan`
  MODIFY `plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meal_plan_detail`
--
ALTER TABLE `meal_plan_detail`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `meal_plan_detail_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_tag`
--
ALTER TABLE `post_tag`
  ADD CONSTRAINT `post_tag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `eating_blog` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;