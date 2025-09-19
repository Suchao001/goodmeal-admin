-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 19, 2025 at 08:49 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

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
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`, `created_date`) VALUES
(1, 'suchao', '$2b$10$G123dEwAmnPgVmI3DRdNLOwXOKtWiB8OJag6q.NehnuOkdwW2c4t.', '2025-06-09 09:29:12');

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `role` enum('user','assistant','system') COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_message`
--

INSERT INTO `chat_message` (`id`, `user_id`, `role`, `message`, `created_at`) VALUES
(28, 3, 'assistant', 'สวัสดีครับ! ผมเป็น AI ที่จะช่วยแนะนำการกินเพื่อสุขภาพและเมนูอาหารให้คุณ มีอะไรให้ช่วยไหมครับ?', '2025-08-14 08:16:23'),
(29, 3, 'user', 'เฮ้รู้ขอมูลของฉันไหม', '2025-08-14 08:16:39'),
(30, 3, 'assistant', 'สวัสดีครับ! ขอโทษที่ไม่ได้ตอบตรงคำถามของคุณไปก่อนหน้านี้ ตอนนี้ข้อมูลของคุณคือ:\n- อายุ: 22 ปี\n- น้ำหนัก: 52.00 กิโลกรัม\n- ส่วนสูง: 163.00 เซนติเมตร\n- เพศ: ชาย\n- อัตราไขมันในร่างกาย: ปกติ\n- น้ำหนักเป้าหมาย: 53.00 กิโลกรัม\n- ประเภทการกิน: ออมนิวอร์\n- ระดับกิจกรรม: ปานกลาง\n\nมีอะไรที่ GoodMeal AI สามารถช่วยเหลือคุณได้ไหมครับ? ถ้ามีคำถามหรือขอคำแนะนำเกี่ยวกับโภชนาการหรือสุขภาพ ไม่ลังเลที่จะถามมานะครับ!', '2025-08-14 08:16:44'),
(31, 3, 'user', 'วางแผนการเพิ่มน้ำหนักให้ฉันหน่อย', '2025-08-14 08:17:21'),
(32, 3, 'assistant', 'เพื่อเพิ่มน้ำหนักอย่างดีและปลอดภัย คุณควรปฏิบัติตามขั้นตอนดังนี้:\n\n1. รับประทานอาหารที่มีประโยชน์: เลือกอาหารที่เสริมโปรตีน คาร์โบไฮเดรต และไขมันดี เช่น เนื้อปลา ไก่ ไข่ ถั่ว นมและผลไม้ พืชผัก ฯลฯ\n\n2. เพิ่มปริมาณอาหาร: รับประทานมื้อหลัก 3 มื้อ และมื้อว่าง 2-3 มื้อต่อวัน โดยเพิ่มปริมาณในแต่ละมื้อ\n\n3. รับประทานอาหารเสริม: ถ้าคุณไม่สามารถได้รับพลังงานและโปรตีนเพียงพอจากอาหารปกติ คุณสามารถรับประทานอาหารเสริมได้\n\n4. ออกกำลังกาย: ปฏิบัติการออกกำลังกายเพื่อสร้างกล้ามเนื้อและเสริมสุขภาพโดยรวม\n\n5. รักษาสุขภาพจิต: สุขภาพจิตเป็นส่', '2025-08-14 08:17:27'),
(33, 3, 'user', 'กินอย่างไรถึงนอนหลับดี', '2025-08-14 08:22:35'),
(34, 3, 'assistant', 'เพื่อช่วยให้คุณนอนหลับได้ดี นอกจากการรับประทานอาหารที่เหมาะสมและออกกำลังกายอย่างเพียงพอ คุณสามารถปฏิบัติตามขั้นตอนเหล่านี้เพื่อช่วยส่งเสริมการนอนหลับ:\n\n1. หลีกเลี่ยงการรับประทานอาหารหนักหลังเวลาเย็น: พยายามลดปริมาณอาหารและความหนาแน่นของอาหารในมื้อเย็น เพราะอาหารหนักอาจทำให้การย่อยสลายอาหารล่าช้าและทำให้ร่างกายไม่พร้อมสำหรับการพักผ่อน\n\n2. รับประทานอาหารที่เสริมสารอาหารที่สร้างสรรค์เซโรโทนิน: อาหารที่ร่วมมีกรดอะมิโนที่ช่วยสร้างสารเซโรโทนิน เช่น ไข่ ถั่ว นม และเนื้อสัตว์\n\n3. ลดการรับประทานสารอาหารที่มีกาวน้ำตาลและคาเฟอีน: หลีกเลี่ยงการรับประทานเครื่องดื่มท', '2025-08-14 08:22:40'),
(35, 3, 'user', 'ก่อนหน้านี้เราคุยอะไรกัน', '2025-08-14 08:23:26'),
(36, 3, 'assistant', 'ขอโทษที่ไม่สามารถเรียกคืนข้อมูลการสนทนาก่อนหน้านี้ได้ เนื่องจากความปลอดภัยของข้อมูล แต่ถ้าคุณมีคำถามหรือต้องการคำแนะนำใดๆ ไม่ลังเลที่จะถามมานะครับ! มีอะไรที่ GoodMeal AI สามารถช่วยเหลือคุณได้บ้างครับ?', '2025-08-14 08:23:29'),
(37, 3, 'user', 'เราคุยไรกันอยู่นะ', '2025-08-14 08:26:44'),
(38, 3, 'assistant', 'ขอโทษที่ไม่สามารถเรียกคืนข้อมูลการสนทนาก่อนหน้านี้ได้ เนื่องจากความปลอดภัยของข้อมูล แต่ถ้าคุณมีคำถามหรือต้องการคำแนะนำใดๆ ไม่ลังเลที่จะถามมานะครับ! มีอะไรที่ GoodMeal AI สามารถช่วยเหลือคุณได้บ้างครับ?', '2025-08-14 08:26:46'),
(39, 3, 'user', 'Context ปัจจุบันจาก summary คือ', '2025-08-14 08:27:15'),
(40, 3, 'assistant', 'ขออภัยในความสับสนครับ จากข้อมูลสรุปที่มีในระบบ คุณมีข้อมูลเกี่ยวกับการเพิ่มน้ำหนัก การนอนหลับ และคำแนะนำทางโภชนาการทั่วไป ถ้าคุณต้องการสนทนาเกี่ยวกับเรื่องอื่น ๆ หรือมีคำถามเพิ่มเติม กรุณาระบุให้ชัดเจนครับ ฉันยินดีช่วยเหลือในเรื่องที่คุณสนใจได้เสมอครับ', '2025-08-14 08:27:18'),
(41, 3, 'user', 'ฉันควรเพิ่มน้ำหนักไหม', '2025-08-27 12:53:30'),
(42, 3, 'assistant', 'จากข้อมูลที่คุณให้มา อายุ 22 ปี น้ำหนัก 52.20 กิโลกรัม ส่วนสูง 163.00 เซนติเมตร เพศชาย อัตราไขมันในร่างกายเป็นระดับปกติ และน้ำหนักเป้าหมายคือ 52.00 กิโลกรัม จากข้อมูลนี้ ดูเหมือนว่าน้ำหนักของคุณอยู่ในเกณฑ์ที่ดีแล้ว ไม่จำเป็นต้องเพิ่มน้ำหนักอีก คุณสามารถรักษาน้ำหนักปัจจุบันได้ด้วยการรักษาพฤติกรรมการทานอาหารที่ดี ออกกำลังกายอย่างสม่ำเสมอ และดูแลสุขภาพโดยรวมตามปกติครับ ถ้าคุณมีความกังวลหรือข้อสงสัยเพิ่มเติม คุณสามารถปรึกษาแพทย์หรือนักโภชนาการได้ครับ', '2025-08-27 12:53:35'),
(43, 3, 'user', 'ถ้าฉันอยากสร้างกล้ามเนื้อล่ะ', '2025-08-27 12:54:09'),
(44, 3, 'assistant', 'หากคุณต้องการสร้างกล้ามเนื้อ นอกจากการออกกำลังกายอย่างเหมาะสมและตรงประเภทของการออกกำลังกาย คุณยังต้องคำนึงถึงการบริหารอาหารให้เหมาะสมเพื่อสนับสนุนการสร้างกล้ามเนือด้วยครับ. นี่คือบางข้อแนะนำเกี่ยวกับโภชนาการเพื่อสร้างกล้ามเนือที่ดี:\n\n1. บริหารประจำอาหาร: การบริหารประจำอาหารคือการรับประทานอาหารที่มีโปรตีนเพียงพอเพื่อสนับสนุนการสร้างกล้ามเนื้อ โปรตีนสามารถช่วยในการซ่อมแซมและสร้างกล้ามเนื้อใหม่\n\n2. ควบคุมปริมาณแคลอรี่: ควรรับประทานแคลอรี่ในปริมาณที่เพียงพอเพื่อสนับสนุนการสร้างกล้ามเนื้อ แต่อย่างไรก็ตาม อย่างสำคัญที่จะไม่บริโภคมากเกินไปเพราะอาจทำให้คุณเกินพุง\n\n3.', '2025-08-27 12:54:16'),
(45, 3, 'user', 'ฉันรักคุณนะ', '2025-08-27 12:58:14'),
(46, 3, 'assistant', 'ขอบคุณมากๆ ครับ หากมีอะไรที่ต้องการสอบถามหรือความช่วยเหลือเกี่ยวกับสุขภาพ โภชนาการ หรือการออกกำลังกาย อย่าลังเลที่จะถามเลยนะครับ! ฉันพร้อมช่วยเสมอครับ 🌟❤️', '2025-08-27 12:58:16'),
(47, 3, 'user', 'ทำไมล่ะ', '2025-08-27 12:58:36'),
(48, 3, 'assistant', 'ขอโทษที่ทำให้คุณสับสนครับ มีอะไรที่ GoodMeal AI สามารถช่วยเหลือคุณได้มั้ยครับ? ไม่ลังเลที่จะช่วยเสมอครับ 🌟❤️', '2025-08-27 12:58:38'),
(49, 10, 'assistant', 'สวัสดีครับ! ผมเป็น AI ที่จะช่วยแนะนำการกินเพื่อสุขภาพและเมนูอาหารให้คุณ มีอะไรให้ช่วยไหมครับ?', '2025-09-02 08:07:33'),
(50, 10, 'user', 'Hello what food suggest today for me', '2025-09-02 08:08:14'),
(51, 10, 'assistant', 'สวัสดีครับ! วันนี้ผมมีเมนูแนะนำสำหรับคุณครับ อาจารย์แนะนำว่าคุณลองทาน \"กระเพราไก่ผัดพริกเผา\" ครับ มีส่วนผสมที่อร่อยและสดชื่น และเป็นอาหารที่มีประโยชน์ต่อสุขภาพด้วยครับ ลองทำเมนูนี้ดูนะครับ แล้วบอกผมว่ารสชาติเป็นอย่างไรได้นะครับ 😉🍳🌿', '2025-09-02 08:08:18'),
(52, 10, 'user', 'Suggest vietnam food for me', '2025-09-02 08:08:39'),
(53, 10, 'assistant', 'สวัสดีครับ! ถ้าคุณชอบอาหารเวียดนาม ผมแนะนำให้ลองทำ \"Pho\" ครับ น้ำซุปรสชาติเยี่ยม และมีเส้นเส้นบะหมี่นุ่มๆ พร้อมเนื้อสไลด์บางๆ หอมๆ และเครื่องเครื่องเพียงพอ อาหารนี้เป็นที่รู้จักดีในเวียดนาม ลองทำแล้วบอกผมว่ารสชาติเป็นอย่างไรนะครับ 🍲🌿🇻🇳', '2025-09-02 08:08:43'),
(54, 10, 'user', 'แหนมเหนือมมีวัตถุดิบประกอบไปด้วยอะไรบ้าง แคลเท่าไหร่', '2025-09-02 08:10:13'),
(55, 10, 'assistant', 'แหนมเหนือมประกอบไปด้วยน้ำตาล นมถั่วเหลือง และน้ำ โดยทั่วไปแหนมเหนือมมีปริมาณแคลอรีประมาณ 100-150 แคลอรีต่อหนึ่งช้อนโต๊ะ (15 กรัม) ขึ้นอยู่กับสูตรที่ใช้และปริมาณน้ำตาลที่เพิ่มเข้าไปด้วยครับ', '2025-09-02 08:10:17'),
(56, 14, 'assistant', 'สวัสดีครับ! ผมเป็น AI ที่จะช่วยแนะนำการกินเพื่อสุขภาพและเมนูอาหารให้คุณ มีอะไรให้ช่วยไหมครับ?', '2025-09-04 10:05:54'),
(57, 14, 'user', 'Hello', '2025-09-04 10:06:48'),
(58, 14, 'assistant', 'สวัสดีครับ! มีอะไรให้ผมช่วยเหลือครับ? ถามหรือสอบถามเกี่ยวกับโภชนาการหรือสุขภาพได้เลยครับ! 😊🍏🥦', '2025-09-04 10:06:50'),
(59, 3, 'user', 'Hello', '2025-09-09 08:10:33'),
(60, 3, 'assistant', 'สวัสดีครับ! มีอะไรให้ฉันช่วยเหลือคุณบ้างครับ? 😊', '2025-09-09 08:10:36'),
(61, 3, 'user', 'Test response in mark down in dev', '2025-09-09 08:11:13'),
(62, 3, 'assistant', 'It looks like you\'re testing the response in Markdown format. That\'s great! Markdown is a simple and easy way to format text. If you have any specific Markdown formatting you\'d like to test or need help with, feel free to let me know! I\'m here to assist you.', '2025-09-09 08:11:15'),
(63, 3, 'user', 'I want bmr table', '2025-09-09 08:11:55'),
(64, 3, 'assistant', 'Sure! Here is a Basal Metabolic Rate (BMR) table based on your age, weight, height, and gender:\n\n| Gender | Age | Weight (kg) | Height (cm) | BMR (kcal/day) |\n|--------|-----|-------------|-------------|----------------|\n| Male   | 22  | 52.00       | 163.00      | 1480           |\n\nPlease note that BMR is an estimate of how many calories you would burn at rest. Your actual calorie needs may vary based on activity level and other factors. Let me know if you need any more information!', '2025-09-09 08:11:58'),
(65, 3, 'user', 'Tdee table', '2025-09-09 08:12:54'),
(66, 3, 'assistant', 'Here is a table showing Total Daily Energy Expenditure (TDEE) based on your activity level:\n\n| Activity Level | Description               | TDEE (kcal/day) |\n|----------------|---------------------------|-----------------|\n| Sedentary      | Little to no exercise     | 1776            |\n| Lightly Active | Light exercise/sports 1-3 days/week | 2018 |\n| Moderately Active | Moderate exercise/sports 3-5 days/week | 2260 |\n| Very Active    | Hard exercise/sports 6-7 days a week | 2503 |\n| Super Active   | Very hard exercise & physical job or 2x training | 2745 |\n\nRemember, TDEE is an estimate of how many calories you burn in a day based on your activity level. Adjust your calorie intake accordingly to reach your health goals. Let me know if you need more information or assistance!', '2025-09-09 08:12:57'),
(67, 3, 'user', 'Test', '2025-09-09 08:42:01'),
(68, 3, 'user', 'test', '2025-09-09 08:47:22'),
(69, 3, 'assistant', 'It looks like you\'re testing the response. Everything seems to be working correctly! If you have any other questions or need assistance, feel free to let me know. I\'m here to help!', '2025-09-09 08:47:23'),
(70, 3, 'user', 'How my eating', '2025-09-09 08:55:12'),
(71, 3, 'assistant', 'Based on your recent eating habits, here is a summary of your nutrition for the past 7 days:\n\n- **Average Calories:** 1540 kcal/day\n- **Average Protein:** 70 grams/day\n- **Days with Data:** 6/7 days\n- **Days Reached Calorie Goal:** 3/7 days\n\nIt\'s great that you are tracking your nutrition! To improve your eating habits for your health goals, consider the following tips:\n- Ensure you are getting a balanced intake of protein, carbohydrates, and healthy fats.\n- Include plenty of fruits and vegetables in your meals for essential vitamins and minerals.\n- Stay hydrated by drinking an adequate amount of water throughout the day.\n- Consider meal prepping to have healthy options readily available.\n- If you have specific goals like weight loss or muscle gain, adjust your calorie intake and macronutrient distribution accordingly.\n\nLet me know if you need any specific advice or guidance on your eating habits!', '2025-09-09 08:55:14'),
(72, 3, 'user', 'How can improve', '2025-09-09 08:57:04'),
(73, 3, 'assistant', 'To improve your nutrition and eating habits, here are some personalized tips based on your current eating patterns and health goals:\n\n1. **Increase Protein Intake**: Since your average protein intake is around 70 grams per day, consider incorporating more protein-rich foods such as lean meats, poultry, fish, eggs, dairy, legumes, nuts, and seeds into your meals. Protein is essential for muscle repair and growth.\n\n2. **Balance Your Macronutrients**: Aim for a balanced intake of carbohydrates, protein, and healthy fats in each meal. Include whole grains, fruits, vegetables, lean proteins, and sources of healthy fats like avocados, nuts, and olive oil.\n\n3. **Stay Hydrated**: Make sure to drink an adequate amount of water throughout the day to stay hydrated. Water is essential for various bodily functions and can also help with weight management.\n\n4. **Meal Planning and Preparation**: Consider meal prepping for the week to have healthy and balanced meals readily available. This can help you make better food choices and avoid unhealthy options when you\'re busy or on-the-go.\n\n5. **Monitor Portion Sizes**: Pay attention to portion sizes to ensure you are not overeating. Use measuring cups, a food scale, or visual cues to estimate appropriate portion sizes for different food groups.\n\n6. **Physical Activity**: Incorporate regular physical activity into your routine to support your overall health and fitness goals. Exercise can help you maintain a healthy weight, improve muscle tone, and boost your metabolism.\n\n7. **Consult with a Nutrition Professional**: If you have specific health goals or dietary requirements, consider consulting with a registered dietitian or nutritionist. They can provide personalized guidance and meal plans tailored to your individual needs.\n\nBy making small, sustainable changes to your eating habits and lifestyle, you can work towards achieving your health and wellness goals. Let me know if you need more specific tips or guidance on any aspect of your nutrition journey!', '2025-09-09 08:57:08'),
(74, 17, 'assistant', 'สวัสดีครับ! ผมเป็น AI ที่จะช่วยแนะนำการกินเพื่อสุขภาพและเมนูอาหารให้คุณ มีอะไรให้ช่วยไหมครับ?', '2025-09-18 09:29:47'),
(75, 17, 'user', 'วันนี้ฉันกินอะไรไปบ้าง', '2025-09-18 09:34:48'),
(76, 17, 'assistant', 'ขอโทษที่เคยสงสัยครับ ฉันไม่สามารถดูข้อมูลการกินของคุณในวันนี้ได้ แต่ถ้าคุณต้องการคำแนะนำในการกินเพื่อสุขภาพหรือเมนูอาหารที่เหมาะสม กรุณาบอกมา เราสามารถเริ่มด้วยการบอกข้อมูลพื้นฐานเกี่ยวกับคุณ เช่น น้ำหนัก, ส่วนสูง, อายุ, กิจกรรมทางกาย ฯลฯ จะช่วยให้เราสามารถให้คำแนะนำที่เหมาะสมมากยิ่งขึ้นครับ', '2025-09-18 09:34:51'),
(77, 17, 'user', 'วันนี้ฉันกินอะไรไปบ้าง', '2025-09-18 09:35:44'),
(78, 17, 'assistant', 'ขอโทษที่เคยสงสัยครับ ฉันไม่สามารถดูข้อมูลการกินของคุณในวันนี้ได้ แต่ถ้าคุณต้องการคำแนะนำในการกินเพื่อสุขภาพหรือเมนูอาหารที่เหมาะสม กรุณาบอกมา เราสามารถเริ่มด้วยการบอกข้อมูลพื้นฐานเกี่ยวกับคุณ เช่น น้ำหนัก, ส่วนสูง, อายุ, กิจกรรมทางกาย ฯลฯ จะช่วยให้เราสามารถให้คำแนะนำที่เหมาะสมมากยิ่งขึ้นครับ', '2025-09-18 09:35:47'),
(79, 17, 'user', 'วันนี้ฉันกินไปกี่แคล', '2025-09-18 09:36:42'),
(80, 17, 'assistant', 'ขอโทษที่เคยสงสัยครับ ฉันไม่สามารถดูข้อมูลการกินของคุณในวันนี้ได้ แต่ถ้าคุณต้องการคำแนะนำในการกินเพื่อสุขภาพหรือเมนูอาหารที่เหมาะสม กรุณาบอกมา เราสามารถเริ่มด้วยการบอกข้อมูลพื้นฐานเกี่ยวกับคุณ เช่น น้ำหนัก, ส่วนสูง, อายุ, กิจกรรมทางกาย ฯลฯ จะช่วยให้เราสามารถให้คำแนะนำที่เหมาะสมมากยิ่งขึ้นครับ', '2025-09-18 09:36:46'),
(81, 3, 'user', 'What did i eat?', '2025-09-18 17:49:02'),
(82, 3, 'assistant', 'I\'m sorry, but I don\'t have access to your specific food intake details unless you provide me with the information. If you can share details of your recent meals or a food diary, I can help analyze your eating patterns and provide recommendations based on that information. Feel free to share any specific meals or snacks you have questions about, and I\'ll be happy to assist you further.', '2025-09-18 17:49:04'),
(83, 3, 'user', 'How am eating today', '2025-09-18 17:49:27'),
(84, 3, 'assistant', 'It seems like you\'re asking about your current eating habits for today. Since I don\'t have real-time access to your daily food intake, I recommend keeping track of what you eat and drink throughout the day. You can use a food diary or a nutrition tracking app to monitor your meals, snacks, and beverages.\n\nTo get an idea of how you\'re eating today, you can start by jotting down everything you consume, including portion sizes and any beverages. Once you have a record of your meals, I can help you analyze your eating habits and provide suggestions for improvement.\n\nIf you have any specific questions about certain foods or meals you\'ve had today, feel free to share those details, and I can offer guidance based on the information provided. Let me know how I can assist you further with your nutrition and eating habits!', '2025-09-18 17:49:30'),
(85, 3, 'user', 'Do you know my eating data', '2025-09-18 17:51:54'),
(86, 3, 'assistant', 'Yes, I have access to the summary of your eating data for the past 7 days that you provided earlier. Based on that information, I can offer recommendations and advice to help you improve your nutrition and reach your health goals. If you have any specific questions or would like further assistance with your eating habits, feel free to share more details or ask for personalized guidance. I\'m here to help!', '2025-09-18 17:51:56'),
(87, 3, 'user', 'My average eating', '2025-09-18 17:53:03'),
(88, 3, 'assistant', 'Based on the eating data you shared for the past 7 days, here is an overview of your average daily intake:\n\n- **Calories**: 1994 calories per day\n- **Protein**: 81 grams per day\n- **Summary**: Your average calorie intake is around 1994 calories per day, with an average protein intake of 81 grams daily. It\'s important to ensure you\'re getting a balance of macronutrients (carbohydrates, protein, and fats) to support your overall health and fitness goals.\n\nIf you have any specific questions or would like more detailed analysis of your eating patterns, feel free to provide additional information or ask for personalized recommendations. I\'m here to help you optimize your nutrition and achieve your wellness objectives!', '2025-09-18 17:53:09'),
(89, 3, 'user', 'ฉันควรปรับปรุงการกินอย่างไร', '2025-09-19 18:37:06'),
(90, 3, 'assistant', 'ได้เลยครับ! จากข้อมูลเฉลี่ยการกินของคุณที่มีแคลอรี่ประมาณ 1994 แคล และโปรตีน 81 กรัมต่อวัน พร้อมกับข้อมูลเป้าหมายและระดับกิจกรรม moderate ผมขอแนะนำแนวทางการปรับปรุงการกินเพื่อสุขภาพและรักษาน้ำหนักในระดับที่เหมาะสม ดังนี้ครับ\n\n---\n\n## คำแนะนำการปรับปรุงการกิน\n\n### 1. ปรับสมดุลพลังงาน\n- ปริมาณแคลอรี่เฉลี่ย 1994 แคลอรี่/วัน ถือว่าค่อนข้างเหมาะสมสำหรับชายอายุ 22 ปี สูง 163 ซม. น้ำหนัก 52 กก. ที่มีกิจกรรมระดับ moderate เพื่อรักษาน้ำหนักปัจจุบัน\n- หากเป้าหมายคือรักษาน้ำหนักนี้ ควรรักษาปริมาณแคลอรี่ในช่วงนี้ แต่ถ้าต้องการเพิ่มกล้ามเนื้อ อาจเพิ่มแคลอรี่ประมาณ 200-300 แคลต่อวัน\n\n### 2. โปรตีน\n- โปรตีน 81 กรัม/วัน ถือว่าเพียงพอสำหรับการรักษามวลกล้ามเนื้อ (ประมาณ 1.5-1.6 กรัมต่อน้ำหนักตัว 1 กก.)\n- ควรเลือกแหล่งโปรตีนคุณภาพสูง เช่น ไก่, ปลา, ไข่, เนื้อไม่ติดมัน, นม, ผลิตภัณฑ์นมที่ไม่มีถั่วเหลืองและถั่ว (เนื่องจากคุณแพ้ถั่วและถั่วเหลือง)\n\n### 3. คาร์โบไฮเดรตและไขมัน\n- ควรบริโภคคาร์โบไฮเดรตเชิงซ้อน เช่น ข้าวกล้อง, ข้าวโอ๊ต, มันเทศ, ผักและผลไม้หลากสี\n- ไขมันดีจากแหล่งธรรมชาติ เช่น น้ำมันมะกอก, อะโวคาโด, ปลาแซลมอน และเมล็ดพืชที่ไม่ใช่ถั่ว (เช่น เมล็ดเจีย, เมล็ดแฟลกซ์)\n\n### 4. หลีกเลี่ยงอาหารแปรรูปและน้ำตาลสูง\n- ลดการบริโภคน้ำตาลและอาหารแปรรูปที่มีไขมันทรานส์และโซเดียมสูง เพื่อสุขภาพหัวใจและควบคุมน้ำหนักได้ดีขึ้น\n\n### 5. ดื่มน้ำให้เพียงพอ\n- ดื่มน้ำอย่างน้อย 1.5-2 ลิตรต่อวัน เพื่อช่วยระบบย่อยอาหารและการเผาผลาญ\n\n### 6. การเตรียมอาหารล่วงหน้า\n- เตรียมอาหารล่วงหน้า (meal prep) เพื่อควบคุมปริมาณและคุณภาพอาหาร ลดโอกาสกินอาหารขยะ\n\n---\n\n## ตัวอย่างเมนูอาหารสุขภาพสำหรับ 1 วัน\n\n| มื้ออาหาร | ตัวอย่างเมนู |\n|---|---|\n| เช้า | ข้าวโอ๊ตผสมกล้วยหอมและเมล็ดเจีย + ไข่ต้ม 2 ฟอง |\n| ว่างเช้า | โยเกิร์ตไขมันต่ำ (ไม่ผสมถั่วเหลือง) + ผลไม้สด |\n| กลางวัน | ข้าวกล้อง + อกไก่ย่าง + ผักต้มรวม |\n| ว่างบ่าย | แอปเปิ้ล 1 ลูก + นมสดพร่องมันเนย |\n| เย็น | ปลาแซลมอนย่าง + มันเทศอบ + สลัดผักสดราดน้ำมันมะกอก |\n\n---\n\nถ้าคุณต้องการคำแนะนำเฉพาะเจาะจง เช่น เมนูอาหารลดน้ำหนัก หรือเพิ่มกล้ามเนื้อเพิ่มเติม แจ้งผมได้เลยนะครับ!', '2025-09-19 18:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `chat_session`
--

CREATE TABLE `chat_session` (
  `user_id` int NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `summary` text COLLATE utf8mb4_general_ci,
  `style` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_session`
--

INSERT INTO `chat_session` (`user_id`, `started_at`, `updated_at`, `summary`, `style`) VALUES
(3, '2025-08-14 15:16:23', '2025-09-19 18:37:28', 'คำแนะนำการปรับปรุงการกินสำหรับคุณ:\n- ควรรักษาปริมาณแคลอรี่ประมาณ 1994 แคลอรี่/วัน และโปรตีน 81 กรัม/วัน\n- คำแนะนำเกี่ยวกับการปรับปรุงโภชนาการ:\n  - ปรับสมดุลพลังงานและโปรตีนตามเป้าหมายของคุณ\n  - เลือกแหล่งโปรตีนคุณภาพสูง เช่น ไก่, ปลา, ไข่\n  - บริโภคคาร์โบไฮเดรตเชิงซ้อนและไขมันดีจากแหล่งธรรมชาติ\n  - หลีกเลี่ยงอาหารแปรรูปและน้ำตาลสูง\n  - ดื่มน้ำเพียงพอและเตรียมอาหารล่วงหน้า\n- ตัวอย่างเมนูอาหารสุขภาพสำหรับ 1 วัน:\n  - เช้า: ข้าวโอ๊ตผสมกล้วยหอมและเมล็ดเจีย + ไข่ต้ม 2 ฟอง\n  - ว่างเช้า: โยเกิร์ตไขมันต่ำ + ผลไม้สด\n  - กลางวัน: ข้าวกล้อง + อกไก่ย่าง + ผักต้มรวม\n  - ว่างบ่าย: แอปเปิ้ล 1 ลูก + นมสดพร่องมันเนย\n  - เย็น: ปลาแซลมอนย่าง + มันเทศอบ + สลัดผักสดราดน้ำมันมะกอก\n\nหากต้องการคำแนะนำเพิ่มเติมหรือเมนูเฉพาะ โปรดแจ้งให้ทราบเพื่อข้อมูลที่เป็นประโยชน์และเหมาะสมกับความต้องการของคุณครับ!', 'style2'),
(10, '2025-09-02 15:07:33', '2025-09-02 15:10:20', 'ผู้ใช้ถาม AI เกี่ยวกับการแนะนำอาหารสุขภาพ และ AI แนะนำเมนู \"กระเพราไก่ผัดพริกเผา\" เพื่อสุขภาพดี และเชิญลองทำเมนูนี้และแบ่งปันความรสชาติกลับมาให้ AI ทราบ ผู้ใช้ต่อว่าต้องการเมนูอาหารจากเวียดนาม และ AI แนะนำให้ลองทำ \"Pho\" ซึ่งเป็นอาหารที่มีน้ำซุปรสชาติเยี่ยมและเส้นบะหมี่นุ่มๆ', 'style1'),
(14, '2025-09-04 17:05:54', '2025-09-04 17:06:52', 'ผู้ใช้ต้องการคำแนะนำเกี่ยวกับโภชนาการและเมนูอาหารที่ดีต่อสุขภาพจาก AI ที่เป็นผู้ช่วย โดย AI ต้องการช่วยเหลือในด้านโภชนาการและสุขภาพได้ครับ', 'style1'),
(17, '2025-09-18 09:29:47', '2025-09-18 09:36:50', 'ผู้ใช้สอบถามเกี่ยวกับการกินในวันนี้และแคลอรี่ที่บริโภค ฉันไม่สามารถดูข้อมูลการกินของคุณได้ แต่ถ้าคุณต้องการคำแนะนำในการกินเพื่อสุขภาพหรือเมนูอาหารที่เหมาะสม กรุณาให้ข้อมูลพื้นฐานเกี่ยวกับตนเอง เช่น น้ำหนัก, ส่วนสูง, อายุ, กิจกรรมทางกาย เพื่อให้ได้คำแนะนำที่เหมาะสมมากยิ่งขึ้น กรุณาให้ข้อมูลเพิ่มเติมเพื่อเริ่มต้นคำแนะนำครับ', 'style2');

-- --------------------------------------------------------

--
-- Table structure for table `daily_nutrition_summary`
--

CREATE TABLE `daily_nutrition_summary` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `summary_date` date NOT NULL,
  `total_calories` int DEFAULT NULL,
  `total_fat` int DEFAULT NULL,
  `total_protein` int DEFAULT NULL,
  `target_cal` int DEFAULT NULL,
  `target_fat` int DEFAULT NULL,
  `target_carb` int DEFAULT NULL,
  `target_protein` int DEFAULT NULL,
  `recommendation` text COLLATE utf8mb4_general_ci,
  `weight` decimal(5,2) DEFAULT NULL,
  `total_carbs` int NOT NULL,
  `recommended_cal` int DEFAULT NULL,
  `recommended_carb` int DEFAULT NULL,
  `recommended_protein` int DEFAULT NULL,
  `recommended_fat` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daily_nutrition_summary`
--

INSERT INTO `daily_nutrition_summary` (`id`, `user_id`, `summary_date`, `total_calories`, `total_fat`, `total_protein`, `target_cal`, `target_fat`, `target_carb`, `target_protein`, `recommendation`, `weight`, `total_carbs`, `recommended_cal`, `recommended_carb`, `recommended_protein`, `recommended_fat`) VALUES
(1, 3, '2025-08-20', 2873, 97, 172, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL),
(2, 3, '2025-08-23', 1050, 30, 45, NULL, NULL, NULL, NULL, NULL, NULL, 135, NULL, NULL, NULL, NULL),
(3, 3, '2025-08-24', 1567, 71, 98, 2223, 57, 181, 117, NULL, NULL, 132, 2223, 278, 111, 74),
(7, 3, '2025-08-26', 2223, 57, 117, 2223, 57, 181, 117, NULL, 52.20, 181, 2226, 290, 73, 86),
(13, 3, '2025-08-22', 620, 60, 100, NULL, NULL, NULL, NULL, NULL, NULL, 60, NULL, NULL, NULL, NULL),
(14, 3, '2025-08-19', 1556, 38, 71, NULL, NULL, NULL, NULL, NULL, NULL, 137, NULL, NULL, NULL, NULL),
(15, 3, '2025-08-18', 300, 30, 40, NULL, NULL, NULL, NULL, NULL, NULL, 20, NULL, NULL, NULL, NULL),
(16, 3, '2025-08-17', 300, 30, 40, NULL, NULL, NULL, NULL, NULL, NULL, 20, NULL, NULL, NULL, NULL),
(17, 3, '2025-08-25', 2223, 55, 125, 2223, 57, 181, 117, NULL, 52.20, 178, 2226, 290, 73, 86),
(18, 3, '2025-08-21', 1130, 55, 75, NULL, NULL, NULL, NULL, NULL, NULL, 120, NULL, NULL, NULL, NULL),
(19, 3, '2025-08-27', 2223, 57, 117, 2223, 57, 181, 117, NULL, 52.20, 181, 2226, 290, 73, 86),
(20, 3, '2025-08-28', 2223, 57, 117, 2223, 57, 181, 117, NULL, 52.20, 181, 2226, 290, 73, 86),
(21, 3, '2025-08-29', 667, 16, 28, 2223, 57, 181, 117, NULL, 52.20, 57, 2226, 290, 73, 86),
(22, 3, '2025-08-30', 2223, 57, 117, 2223, 57, 181, 117, NULL, 52.30, 181, 2227, 290, 73, 86),
(23, 3, '2025-08-31', 2084, 43, 96, 2223, 57, 181, 117, NULL, 52.30, 134, 2227, 290, 73, 86),
(24, 5, '2025-08-31', 1850, 84, 82, NULL, NULL, NULL, NULL, NULL, NULL, 165, NULL, NULL, NULL, NULL),
(25, 3, '2025-09-01', 607, 12, 25, NULL, NULL, NULL, NULL, NULL, NULL, 45, NULL, NULL, NULL, NULL),
(26, 3, '2025-09-02', 1417, 24, 50, NULL, NULL, NULL, NULL, NULL, NULL, 90, NULL, NULL, NULL, NULL),
(27, 5, '2025-09-02', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1930, 182, 118, 81),
(28, 5, '2025-09-01', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1930, 182, 118, 81),
(29, 5, '2025-07-31', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1930, 182, 118, 81),
(30, 10, '2025-09-01', 600, 25, 30, NULL, NULL, NULL, NULL, NULL, NULL, 55, NULL, NULL, NULL, NULL),
(31, 10, '2025-09-02', 1100, 40, 30, NULL, NULL, NULL, NULL, NULL, NULL, 130, NULL, NULL, NULL, NULL),
(43, 5, '2025-09-04', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1930, 182, 118, 81),
(44, 10, '2025-09-04', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 2824, 339, 185, 81),
(46, 3, '2025-09-05', 2226, 48, 100, 2226, 48, 180, 100, NULL, 52.30, 180, 2223, 290, 73, 86),
(47, 5, '2025-09-05', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1930, 182, 118, 81),
(48, 10, '2025-09-05', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 2824, 339, 185, 81),
(50, 3, '2025-09-09', 2226, 48, 100, NULL, NULL, NULL, NULL, NULL, NULL, 180, NULL, NULL, NULL, NULL),
(51, 3, '2025-09-15', 2226, 48, 100, NULL, NULL, NULL, NULL, NULL, NULL, 180, NULL, NULL, NULL, NULL),
(52, 3, '2025-09-16', 2224, 60, 80, NULL, NULL, NULL, NULL, NULL, 52.20, 280, 1923, 179, 82, 97),
(53, 5, '2025-09-16', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 2130, 197, 94, 107),
(54, 10, '2025-09-16', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 2674, 266, 185, 97),
(56, 3, '2025-09-17', 2223, 67, 85, NULL, NULL, NULL, NULL, NULL, NULL, 280, NULL, NULL, NULL, NULL),
(57, 3, '2025-09-18', 2225, 50, 75, NULL, NULL, NULL, NULL, NULL, 52.20, 310, 2226, 272, 62, 99),
(58, 5, '2025-09-18', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 2130, 197, 94, 107),
(59, 10, '2025-09-18', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, 2674, 266, 185, 97),
(61, 17, '2025-09-18', 1640, 60, 75, 2223, 70, 275, 85, NULL, NULL, 180, 2223, 272, 62, 99),
(62, 3, '2025-09-19', 2225, 77, 62, NULL, NULL, NULL, NULL, NULL, NULL, 322, NULL, NULL, NULL, NULL),
(63, 3, '2025-09-20', 1416, 53, 42, NULL, NULL, NULL, NULL, NULL, NULL, 190, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `eating_blog`
--

CREATE TABLE `eating_blog` (
  `id` int NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `status` enum('pending','release','draft') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `content` longtext COLLATE utf8mb4_general_ci,
  `excerpt_content` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eating_blog`
--

INSERT INTO `eating_blog` (`id`, `title`, `img`, `publish_date`, `status`, `content`, `excerpt_content`, `created_at`, `updated_at`) VALUES
(3, 'บทความ example ', '/blog/1758199559484-ofn7s16f8.jpg', '2025-05-31 00:00:00', 'release', '<div class=\"container\">\n<h1>🍜 อาหารไทยโบราณ: มรดกทางวัฒนธรรมบนจานอาหาร</h1>\n<div class=\"highlight\">\"การทำอาหารไทยไม่ใช่เพียงแค่การปรุงรส แต่เป็นการสืบทอดวัฒนธรรมและภูมิปัญญาของบรรพบุรุษ\"</div>\n<h2>🏛️ ประวัติความเป็นมาของอาหารไทย</h2>\n<p>อาหารไทยมีประวัติศาสตร์ยาวนานกว่า <strong>700 ปี</strong> โดยได้รับอิทธิพลจากหลายวัฒนธรรม ทั้งจีน อินเดีย มอญ และเขมร การผสมผสานของเครื่องเทศและวิธีการปรุงอาหารจากแต่ละวัฒนธรรมทำให้อาหารไทยมีเอกลักษณ์เฉพาะตัว</p>\n<p>ในสมัยสุโขทัย พ่อขุนรามคำแหงได้บันทึกไว้ว่า <em>\"ในน้ำมีปลา ในนามีข้าว\"</em> แสดงให้เห็นถึงความอุดมสมบูรณ์ของวัตถุดิบในการทำอาหาร</p>\n<h2>🌶️ หลักการสำคัญของอาหารไทย</h2>\n<p>อาหารไทยมีหลักการสำคัญคือการสร้างสมดุลของรส 5 รส ได้แก่:</p>\n<ol>\n<li><strong>เปรียว</strong> - จากน้ำมะขามเปียก น้ำส้มสายชู</li>\n<li><strong>หวาน</strong> - จากน้ำปีบ น้ำตาลโตนด</li>\n<li><strong>เค็ม</strong> - จากน้ำปลา เกลือ</li>\n<li><strong>เผ็ด</strong> - จากพริก กะปิ</li>\n<li><strong>เข้ม</strong> - จากกระเทียม หอมแดง</li>\n</ol>\n<div class=\"tip\"><strong>💡 เคล็ดลับ:</strong> การปรุงรสอาหารไทยต้องชิมระหว่างทำเสมอ เพื่อปรับสมดุลของรสให้เหมาะสม</div>\n<h2>🍽️ เมนูอาหารไทยโบราณยอดนิยม</h2>\n<div class=\"recipe-box\">\n<h3>🥗 ส้มตำไทย</h3>\n<p>อาหารไทยที่มีต้นกำเนิดจากภาคอีสาน แต่ได้รับความนิยมทั่วประเทศ</p>\n<div class=\"ingredients\">\n<h4>🛒 วัตถุดิบ:</h4>\n<ul>\n<li>มะละกอดิบ 2 ถ้วย (ซอยเป็นเส้น)</li>\n<li>มะเขือเทศ 3-4 ลูก</li>\n<li>ถั่วฝักยาว 5-6 เส้น</li>\n<li>กุ้งแห้ง 2 ช้อนโต๊ะ</li>\n<li>ถั่วลิสงคั่ว 2 ช้อนโต๊ะ</li>\n<li>พริกขี้หนูแห้ง 3-5 เม็ด</li>\n<li>กระเทียม 3 กลีบ</li>\n<li>น้ำปลา 2 ช้อนโต๊ะ</li>\n<li>น้ำมะขามเปียก 3 ช้อนโต๊ะ</li>\n<li>น้ำตาลปีบ 2 ช้อนโต๊ะ</li>\n</ul>\n</div>\n<h4>👩&zwj;🍳 วิธีทำ:</h4>\n<ol>\n<li>โขลกพริก กระเทียม และกุ้งแห้งในครกให้แหลก</li>\n<li>ใส่ถั่วฝักยาว มะเขือเทศ โขลกพอแตก</li>\n<li>ใส่มะละกอ โขลกเบาๆ ให้เข้ากัน</li>\n<li>ปรุงรสด้วยน้ำปลา น้ำมะขาม น้ำตาลปีบ</li>\n<li>ใส่ถั่วลิสง คลุกเคล้าให้เข้ากัน</li>\n<li>ตักใส่จาน เสิร์ฟพร้อมผักสด</li>\n</ol>\n</div>\n<div class=\"warning\"><strong>⚠️ ข้อควรระวัง:</strong> ควรใช้ครกดินเผาแท้ จะทำให้รสชาติของส้มตำหอมและอร่อยมากขึ้น</div>\n<h2>📊 ตารางเปรียบเทียบอาหารไทย 4 ภาค</h2>\n<table>\n<thead>\n<tr>\n<th>ภาค</th>\n<th>เมนูเด่น</th>\n<th>เครื่องปรุงหลัก</th>\n<th>ลักษณะรส</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>ภาคเหนือ</strong></td>\n<td>แกงฮังเล, ขาวซอย</td>\n<td>งาดำ, ขิง</td>\n<td>รสชาติเข้มข้น เผ็ดน้อย</td>\n</tr>\n<tr>\n<td><strong>ภาคกลาง</strong></td>\n<td>แกงเขียวหวาน, ผัดไทย</td>\n<td>กะทิ, น้ำตาลปีบ</td>\n<td>หวาน เค็ม ครบรส</td>\n</tr>\n<tr>\n<td><strong>ภาคอีสาน</strong></td>\n<td>ส้มตำ, ลาบ</td>\n<td>ปลาร้า, มะขามเปียก</td>\n<td>เปรียว เผ็ด เค็ม</td>\n</tr>\n<tr>\n<td><strong>ภาคใต้</strong></td>\n<td>แกงส้ม, ข้าวยำ</td>\n<td>กะปิ, ขมิ้น</td>\n<td>เผ็ดจัด เปรียวจี๊ด</td>\n</tr>\n</tbody>\n</table>\n<h2>🌿 ประโยชน์ของเครื่องเทศไทย</h2>\n<p>เครื่องเทศในอาหารไทยไม่เพียงช่วยเพิ่มรสชาติ แต่ยังมีคุณประโยชน์ต่อสุขภาพ:</p>\n<ul>\n<li><strong>ขิง</strong> - ช่วยย่อยอาหาร บรรเทาอาการคลื่นไส้</li>\n<li><strong>กะเทียม</strong> - ต้านเชื้อแบคทีเรีย ลดคอเลสเตอรอล</li>\n<li><strong>ขมิ้น</strong> - ต้านอักเสบ ช่วยบำรุงตับ</li>\n<li><strong>ใบโหระพา</strong> - ช่วยขับลม บรรเทาอาการท้องอืด</li>\n<li><strong>พริกไทย</strong> - กระตุ้นการไหลเวียนโลหิต</li>\n</ul>\n<blockquote>\"อาหารคือยา ยาคืออาหาร\" - ภูมิปัญญาไทยโบราณ</blockquote>\n<h2>🎯 การอนุรักษ์อาหารไทยในยุคปัจจุบัน</h2>\n<p>ในยุคที่อาหารตะวันตกเข้ามามีบทบาทมากขึ้น การอนุรักษ์อาหารไทยโบราณจึงเป็นสิ่งสำคัญ:</p>\n<div class=\"tip\"><strong>วิธีอนุรักษ์อาหารไทย:</strong> <br>&bull; สอนลูกหลานทำอาหารไทย <br>&bull; บันทึกสูตรอาหารของคุณยาย คุณแม่ <br>&bull; ใช้วัตถุดิบไทยแท้ ไม่ใช้ของทดแทน <br>&bull; สนับสนุนร้านอาหารไทยต้นตำรับ</div>\n<h2>📚 บทสรุป</h2>\n<p>อาหารไทยเป็นมากกว่าแค่การรับประทาน แต่เป็นการสะท้อนวิถีชีวิต วัฒนธรรม และภูมิปัญญาของคนไทย การรักษาและสืบทอดสูตรอาหารไทยโบราณเป็นหน้าที่ของเราทุกคนที่จะช่วยกันอนุรักษ์เอาไว้ให้คนรุ่นหลังได้สัมผัสถึงรสชาติแท้ของอาหารไทย</p>\n</div>', 'เนื้อหาแน่นๆ ', '2025-06-12 14:58:04', '2025-09-18 12:46:00'),
(4, 'บทความ example 2', '/blog/1751350651810-velv607eb.jpg', '2025-07-01 00:00:00', 'release', '<div class=\"article-container\">\n<h1>🥗 อาหารเพื่อสุขภาพ</h1>\n<div class=\"subtitle\">คู่มือการกินเพื่อชีวิตที่ดีกว่า</div>\n<div class=\"intro-box\">\n<p><strong>การกินอาหารเพื่อสุขภาพ</strong> ไม่ใช่เรื่องยาก แต่ต้องเริ่มต้นด้วยความเข้าใจที่ถูกต้อง อาหารคือเชื้อเพลิงของร่างกาย การเลือกกินอาหารที่มีคุณภาพจะช่วยให้เรามีพลังงาน ความแข็งแรง และอายุยืนยาว</p>\n</div>\n<h2>🍎 หลักการพื้นฐานของการกินเพื่อสุขภาพ</h2>\n<p>การกินเพื่อสุขภาพมี <span class=\"highlight-text\">5 หลักการสำคัญ</span> ที่ควรปฏิบัติทุกวัน:</p>\n<ul class=\"checklist\">\n<li>กินให้ครบ 5 หมู่ในทุกมื้อ</li>\n<li>เลือกอาหารที่ผ่านการแปรรูปน้อยที่สุด</li>\n<li>ดื่มน้ำให้เพียงพอ อย่างน้อย 8-10 แก้วต่อวัน</li>\n<li>หลีกเลี่ยงน้ำตาล เกลือ และไฟ่มากเกินไป</li>\n<li>กินอย่างมีสติ เคี้ยวช้า ๆ และรู้จักพอดี</li>\n</ul>\n<h2>🌈 อาหาร 5 หมู่เพื่อสุขภาพ</h2>\n<div class=\"food-grid\">\n<div class=\"food-card\"><span class=\"food-emoji\">🍚</span>\n<h3>หมู่ 1: แป้งและน้ำตาล</h3>\n<p>ข้าวกล้อง ข้าวโอ๊ต ขนมปังโฮลวีท</p>\n</div>\n<div class=\"food-card\"><span class=\"food-emoji\">🥩</span>\n<h3>หมู่ 2: เนื้อสัตว์</h3>\n<p>ปลา ไก่ เนื้อวัว เต้าหู้ ถั่ว</p>\n</div>\n<div class=\"food-card\"><span class=\"food-emoji\">🥛</span>\n<h3>หมู่ 3: นม</h3>\n<p>นมสด โยเกิร์ต ชีส นมถั่วเหลือง</p>\n</div>\n<div class=\"food-card\"><span class=\"food-emoji\">🥬</span>\n<h3>หมู่ 4: ผักและผลไม้</h3>\n<p>ผักใบเขียว ผลไม้สีสันสดใส</p>\n</div>\n<div class=\"food-card\"><span class=\"food-emoji\">🥑</span>\n<h3>หมู่ 5: ไขมัน</h3>\n<p>อาโวคาโด นอต เมล็ดแมงลัก</p>\n</div>\n</div>\n<h2>📊 ตารางคุณค่าทางโภชนาการ</h2>\n<table class=\"nutrition-table\">\n<thead>\n<tr>\n<th>อาหาร</th>\n<th>แคลอรี่ (ต่อ 100g)</th>\n<th>โปรตีน (g)</th>\n<th>คาร์โบไฮเดรต (g)</th>\n<th>ไขมัน (g)</th>\n<th>ไฟเบอร์ (g)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>ข้าวกล้อง</strong></td>\n<td>111</td>\n<td>2.6</td>\n<td>22</td>\n<td>0.9</td>\n<td>1.8</td>\n</tr>\n<tr>\n<td><strong>ปลาแซลมอน</strong></td>\n<td>208</td>\n<td>25.4</td>\n<td>0</td>\n<td>12.4</td>\n<td>0</td>\n</tr>\n<tr>\n<td><strong>บล็อกโคลี่</strong></td>\n<td>34</td>\n<td>2.8</td>\n<td>7</td>\n<td>0.4</td>\n<td>2.6</td>\n</tr>\n<tr>\n<td><strong>อาโวคาโด</strong></td>\n<td>160</td>\n<td>2</td>\n<td>9</td>\n<td>15</td>\n<td>7</td>\n</tr>\n<tr>\n<td><strong>โยเกิร์ตกรีก</strong></td>\n<td>59</td>\n<td>10</td>\n<td>3.6</td>\n<td>0.4</td>\n<td>0</td>\n</tr>\n</tbody>\n</table>\n<h2>💚 ประโยชน์ของอาหารเพื่อสุขภาพ</h2>\n<div class=\"benefit-list\">\n<h4>🏃&zwj;♂️ ด้านร่างกาย</h4>\n<ul>\n<li>เพิ่มพลังงานและความแข็งแรง</li>\n<li>ควบคุมน้ำหนักได้ดีขึ้น</li>\n<li>ลดความเสี่ยงโรคเรื้อรัง</li>\n<li>เสริมสร้างระบบภูมิคุ้มกัน</li>\n<li>ทำให้ผิวพรรณสดใส</li>\n</ul>\n</div>\n<div class=\"benefit-list\" style=\"background: #E3F2FD; border-color: #2196F3;\">\n<h4 style=\"color: #1976d2;\">🧠 ด้านจิตใจ</h4>\n<ul>\n<li>เพิ่มสมาธิและความจำ</li>\n<li>ลดความเครียดและวิตกกังวล</li>\n<li>ปรับปรุงอารมณ์ให้ดีขึ้น</li>\n<li>เพิ่มความมั่นใจในตัวเอง</li>\n<li>นอนหลับดีขึ้น</li>\n</ul>\n</div>\n<h2>🍽️ เมนูตัวอย่าง: สลัดโบว์ล เพื่อสุขภาพ</h2>\n<div class=\"recipe-section\">\n<h3>🥗 Rainbow Buddha Bowl</h3>\n<p>เมนูอาหารเพื่อสุขภาพที่มีสีสันสวยงาม เต็มไปด้วยวิตามินและแร่ธาตุ</p>\n<h4>🛒 ส่วนผสม:</h4>\n<div class=\"ingredient-tags\"><span class=\"ingredient-tag\">ข้าวกล้อง 1 ถ้วย</span> <span class=\"ingredient-tag\">อาโวคาโด 1/2 ลูก</span> <span class=\"ingredient-tag\">แครอทขูด 1/2 ถ้วย</span> <span class=\"ingredient-tag\">บล็อกโคลี่ 1 ถ้วย</span> <span class=\"ingredient-tag\">ปลาแซลมอนย่าง 100g</span> <span class=\"ingredient-tag\">เมล็ดแมงลัก 1 ช้อนโต๊ะ</span> <span class=\"ingredient-tag\">น้ำสลัดโยเกิร์ต</span></div>\n<h4>👨&zwj;🍳 วิธีทำ:</h4>\n<ol>\n<li><span class=\"step-counter\">1</span>ต้มข้าวกล้องให้สุก พักให้เย็น</li>\n<li><span class=\"step-counter\">2</span>นึ่งบล็อกโคลี่ให้สุก ประมาณ 5 นาที</li>\n<li><span class=\"step-counter\">3</span>ย่างปลาแซลมอนให้สุก หั่นเป็นชิ้น</li>\n<li><span class=\"step-counter\">4</span>หั่นอาโวคาโดเป็นแว่น</li>\n<li><span class=\"step-counter\">5</span>จัดวางส่วนผสมทั้งหมดในชาม</li>\n<li><span class=\"step-counter\">6</span>โรยเมล็ดแมงลัก เสิร์ฟพร้อมน้ำสลัด</li>\n</ol>\n</div>\n<div class=\"alert-success\"><strong>💡 เคล็ดลับ:</strong> เตรียมส่วนผสมล่วงหน้าในวันหยุด จะช่วยประหยัดเวลาในการทำอาหารในวันทำงาน</div>\n<div class=\"alert-info\"><strong>ℹ️ ข้อมูลเพิ่มเติม:</strong> Buddha Bowl นี้ให้พลังงานประมาณ 450 แคลอรี่ เหมาะสำหรับมื้อเที่ยงหรือมื้อเย็น</div>\n<div class=\"alert-warning\"><strong>⚠️ ข้อควรระวัง:</strong> หากแพ้อาหารทะเล สามารถเปลี่ยนปลาแซลมอนเป็นเต้าหู้หรือไก่ย่างได้</div>\n<h2>📝 เคล็ดลับการเริ่มต้นกินเพื่อสุขภาพ</h2>\n<div class=\"quote-box\">การเปลี่ยนแปลงเล็ก ๆ ที่ทำอย่างสม่ำเสมอ จะให้ผลลัพธ์ที่ยิ่งใหญ่กว่าการเปลี่ยนแปลงใหญ่ ๆ ที่ทำได้เพียงชั่วคราว</div>\n<p>การเริ่มต้นกินเพื่อสุขภาพไม่ต้องเปลี่ยนแปลงทุกอย่างในครั้งเดียว ให้เริ่มจาก:</p>\n<div style=\"columns: 2; column-gap: 30px; margin: 20px 0;\">\n<h3 style=\"color: #4caf50;\">สัปดาห์ที่ 1-2:</h3>\n<ul>\n<li>เพิ่มผักในทุกมื้อ</li>\n<li>ดื่มน้ำเปล่าแทนเครื่องดื่มหวาน</li>\n<li>กินข้าวกล้องแทนข้าวขาว</li>\n</ul>\n<h3 style=\"color: #ff9800;\">สัปดาห์ที่ 3-4:</h3>\n<ul>\n<li>ลดอาหารทอดและอาหารแปรรูป</li>\n<li>เพิ่มผลไม้เป็นของหวาน</li>\n<li>กินปลาอย่างน้อย 2 ครั้งต่อสัปดาห์</li>\n</ul>\n</div>\n<h2>🎯 เป้าหมายระยะยาว</h2>\n<p>เมื่อเริ่มต้นได้แล้ว ให้ตั้งเป้าหมายระยะยาวดังนี้:</p>\n<table style=\"width: 100%; border-collapse: collapse; margin: 20px 0;\">\n<tbody>\n<tr style=\"background: #4CAF50; color: white;\">\n<th style=\"padding: 12px; text-align: left;\">ระยะเวลา</th>\n<th style=\"padding: 12px; text-align: left;\">เป้าหมาย</th>\n<th style=\"padding: 12px; text-align: left;\">ผลที่คาดหวัง</th>\n</tr>\n<tr>\n<td style=\"padding: 10px; border: 1px solid #ddd;\"><strong>1 เดือน</strong></td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">ปรับนิสัยการกินพื้นฐาน</td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">รู้สึกกระปรี้กระเปร่ามากขึ้น</td>\n</tr>\n<tr style=\"background: #f9f9f9;\">\n<td style=\"padding: 10px; border: 1px solid #ddd;\"><strong>3 เดือน</strong></td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">ควบคุมน้ำหนักได้</td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">รูปร่างเปลี่ยนแปลงเห็นได้ชัด</td>\n</tr>\n<tr>\n<td style=\"padding: 10px; border: 1px solid #ddd;\"><strong>6 เดือน</strong></td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">สุขภาพแข็งแรงขึ้น</td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">ผลตรวจเลือดดีขึ้น</td>\n</tr>\n<tr style=\"background: #f9f9f9;\">\n<td style=\"padding: 10px; border: 1px solid #ddd;\"><strong>1 ปี</strong></td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">วิถีชีวิตเพื่อสุขภาพ</td>\n<td style=\"padding: 10px; border: 1px solid #ddd;\">สุขภาพดีอย่างยั่งยืน</td>\n</tr>\n</tbody>\n</table>\n<div class=\"footer-info\">\n<h3>🌟 สรุป</h3>\n<p>การกินเพื่อสุขภาพคือการลงทุนที่ดีที่สุดสำหรับอนาคต เริ่มต้นวันนี้ เปลี่ยนแปลงทีละเล็กทีละน้อย แล้วคุณจะเห็นผลลัพธ์ที่น่าประทับใจ</p>\n<p><em>จำไว้ว่า: คุณคือสิ่งที่คุณกิน</em></p>\n</div>\n</div>', 'อาหารเพื่อสุขภาพ\nคู่มือการกินเพื่อชีวิตที่ดีกว่า\nการกินอาหารเพื่อสุขภาพ ไม่ใช่เรื่องยาก แต่ต้องเริ่มต้นด้วยความเข้าใจที่ถูกต้อง อาหารคือเชื้อเพลิงของร่างกาย การเลือกกินอาหารที่มีคุณภาพจะช่วยให้เรามีพลังงาน ความแข็งแรง และอายุยืนยาว', '2025-07-01 13:17:31', '2025-07-01 13:17:31'),
(5, 'example ', '/blog/1753776887832-1f0ntsi82.jpg', '2025-07-29 00:00:00', 'pending', '<p>Welcome to TinyMCE!&nbsp;<br>บทความการกินอาหาร</p>', 'example description', '2025-07-29 15:14:47', '2025-09-15 13:50:18'),
(6, 'บทความ 555', '/blog/1754279752246-1zwwahsy5.jpg', '2025-08-03 00:00:00', 'pending', '<p>555</p>', 'descriptions', '2025-08-04 10:55:06', '2025-08-04 10:56:10'),
(7, 'ร่างบทความ', '/blog/1757945592190-ieerjpx68.jpg', '2025-09-14 00:00:00', 'draft', '<p>darft</p>', 'draft', '2025-09-15 14:13:12', '2025-09-15 14:19:28');

-- --------------------------------------------------------

--
-- Table structure for table `eating_record`
--

CREATE TABLE `eating_record` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `log_date` date NOT NULL,
  `food_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meal_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `calories` int DEFAULT NULL,
  `carbs` int DEFAULT NULL,
  `fat` int DEFAULT NULL,
  `protein` int DEFAULT NULL,
  `meal_time` time DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `unique_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eating_record`
--

INSERT INTO `eating_record` (`id`, `user_id`, `log_date`, `food_name`, `meal_type`, `calories`, `carbs`, `fat`, `protein`, `meal_time`, `image`, `unique_id`) VALUES
(17, 3, '2025-08-19', 'ข้าวต้มไก่', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '19000'),
(18, 3, '2025-08-19', 'ผัดกระเพราหมู', 'มื้อกลางวัน', 889, 80, 22, 43, '12:30:00', NULL, '19100'),
(52, 3, '2025-08-20', 'ผัดกะเพราหมูสับ', 'มื้อกลางวัน', 889, 80, 22, 43, '12:30:00', NULL, '20100'),
(53, 3, '2025-08-20', 'ข้าวต้มไข่เจียว', 'มื้อกลางวัน', 350, 50, 10, 15, '12:30:00', NULL, '20101'),
(54, 3, '2025-08-20', 'ต้มยำกุ้ง', 'มื้อเย็น', 667, 44, 19, 46, '18:30:00', NULL, '20200'),
(55, 3, '2025-08-20', 'ข้าวต้มไข่ไก่', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '20000'),
(56, 3, '2025-08-20', 'ข้าวหมา', 'มื้อเช้า', 300, 20, 30, 40, '07:30:00', NULL, '20001'),
(57, 3, '2025-08-24', 'ข้าวมันไก่', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '24000'),
(70, 3, '2025-08-25', 'ต้มยำกุ้ง', 'มื้อเย็น', 667, 43, 19, 51, '18:30:00', NULL, '25200'),
(76, 3, '2025-08-25', 'ผัดกะเพราหมูสับ', 'มื้อกลางวัน', 889, 79, 21, 43, '12:30:00', NULL, '25100'),
(82, 3, '2025-08-25', 'ข้าวต้มไข่ไก่', 'มื้อเช้า', 667, 56, 15, 31, '07:30:00', NULL, '25000'),
(85, 3, '2025-08-26', 'ข้าวต้มไข่ไก่', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '26000'),
(86, 3, '2025-08-26', 'ผัดกะเพราหมูสับ', 'มื้อกลางวัน', 889, 80, 22, 43, '12:30:00', NULL, '26100'),
(87, 3, '2025-08-26', 'ต้มยำกุ้ง', 'มื้อเย็น', 667, 44, 19, 46, '18:30:00', NULL, '26200'),
(96, 3, '2025-08-17', 'ข้าวหมา', 'มื้อเช้า', 300, 20, 30, 40, '07:30:00', '/images/user_foods/1755072294286_549810228.jpeg', NULL),
(98, 3, '2025-08-24', 'ข้าวมันไก่', 'มื้อกลางวัน', 600, 55, 25, 30, '12:30:00', '/foods/1750673087601-h8pdg0d6m.jpg', NULL),
(106, 3, '2025-08-21', 'ข้าวต้มไข่เจียว', 'มื้อเช้า', 350, 50, 10, 15, '07:30:00', NULL, NULL),
(109, 3, '2025-08-21', 'ผัดไทยกุ้งสด', 'มื้อกลางวัน', 480, 50, 15, 20, '12:30:00', NULL, NULL),
(110, 3, '2025-08-22', 'newmeal', 'มื้อกลางวัน', 20, 20, NULL, 20, '12:30:00', NULL, NULL),
(118, 3, '2025-08-22', 'ข้าวหมา', 'มื้อเช้า', 300, 20, 30, 40, '07:30:00', '/images/user_foods/1755072294286_549810228.jpeg', NULL),
(119, 3, '2025-08-21', 'ข้าวหมา', 'มื้อเช้า', 300, 20, 30, 40, '07:30:00', '/images/user_foods/1755072294286_549810228.jpeg', NULL),
(120, 3, '2025-08-23', 'ผัดไทย', 'มื้อเช้า', 350, 45, 10, 15, '07:30:00', NULL, NULL),
(121, 3, '2025-08-22', 'ข้าวหมา', 'มื้อเช้า', 300, 20, 30, 40, '07:30:00', '/images/user_foods/1755072294286_549810228.jpeg', NULL),
(122, 3, '2025-08-23', 'ผัดไทย', 'มื้อเช้า', 350, 45, 10, 15, '07:30:00', NULL, NULL),
(129, 3, '2025-08-23', 'ผัดไทย', 'มื้อเช้า', 350, 45, 10, 15, '07:30:00', NULL, NULL),
(131, 3, '2025-08-24', 'ข้าวหมา', 'มื้อเช้า', 300, 20, 30, 40, '07:30:00', '/images/user_foods/1755072294286_549810228.jpeg', NULL),
(140, 3, '2025-08-27', 'ข้าวมันไก่', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '27000'),
(141, 3, '2025-08-27', 'แกงเขียวหวานไก่', 'มื้อกลางวัน', 889, 80, 22, 43, '12:30:00', NULL, '27100'),
(143, 3, '2025-08-27', 'ผัดผักรวม', 'มื้อเย็น', 667, 44, 19, 46, '18:30:00', NULL, '27200'),
(146, 3, '2025-08-28', 'ข้าวผัดปู', 'มื้อกลางวัน', 889, 80, 22, 43, '12:30:00', NULL, '28100'),
(147, 3, '2025-08-28', 'แกงมัสมั่นเนื้อ', 'มื้อเย็น', 667, 44, 19, 46, '18:30:00', NULL, '28200'),
(153, 3, '2025-08-28', 'ขนมปังปิ้ง', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '2025-8-28-breakfast-0'),
(157, 3, '2025-08-29', 'ข้าวมันไก่', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '29000'),
(158, 3, '2025-08-30', 'แกงมัสมั่นเนื้อ', 'มื้อเย็น', 667, 44, 19, 46, '18:30:00', NULL, '30200'),
(160, 3, '2025-08-30', 'ข้าวผัดปู', 'มื้อกลางวัน', 889, 80, 22, 43, '12:15:00', NULL, '2025-8-30-lunch-0'),
(161, 3, '2025-08-30', 'ขนมปังปิ้ง', 'มื้อเช้า', 667, 57, 16, 28, '07:30:00', NULL, '2025-8-30-breakfast-0'),
(164, 3, '2025-08-31', 'ปลาทูน่าทอด', 'มื้อเย็น', 667, 44, 19, 46, '18:30:00', NULL, '31200'),
(165, 3, '2025-08-31', 'ข้าวผัดกระเพราไก่', 'มื้อเช้า', 607, 45, 12, 25, '07:30:00', NULL, '2025-8-31-breakfast-0'),
(169, 5, '2025-08-31', 'ข้าวต้มหมู', 'มื้อเช้า', 300, 40, 8, 15, '07:30:00', NULL, '31000'),
(170, 5, '2025-08-31', 'ไข่ต้ม 1 ฟอง', 'มื้อเช้า', 70, NULL, 5, 6, '07:30:00', NULL, '31001'),
(171, 5, '2025-08-31', 'ข้าวผัดไข่ + ไก่ทอด', 'มื้อกลางวัน', 750, 70, 35, 30, '12:30:00', NULL, '31100'),
(172, 5, '2025-08-31', 'แกงจืดเต้าหู้หมูสับ', 'มื้อเย็น', 200, 10, 10, 15, '18:30:00', NULL, '31200'),
(173, 5, '2025-08-31', 'ข้าวสวย 1 ถ้วย', 'มื้อเย็น', 230, 45, 1, 4, '18:30:00', NULL, '31202'),
(174, 5, '2025-08-31', 'ไข่เจียวไม่ใส่ผัก', 'มื้อเย็น', 300, NULL, 25, 12, '18:30:00', NULL, '31201'),
(176, 3, '2025-08-31', 'ข้าวราดแกงเขียวหวานไก่', 'มื้อกลางวัน', 810, 45, 12, 25, '12:15:00', NULL, '2025-9-1-lunch-0'),
(179, 3, '2025-09-01', 'ข้าวหมูทอดกระเทียม', 'มื้อเช้า', 607, 45, 12, 25, '07:30:00', NULL, '2025-9-1-breakfast-0'),
(180, 3, '2025-09-02', 'ข้าวขาหมู', 'มื้อเช้า', 607, 45, 12, 25, '07:30:00', NULL, '2025-9-2-breakfast-0'),
(181, 3, '2025-09-02', 'ข้าวหมูกระเทียมพริกไทย', 'มื้อกลางวัน', 810, 45, 12, 25, '12:15:00', NULL, '2025-9-2-lunch-0'),
(182, 10, '2025-09-01', 'ข้าวมันไก่', 'มื้อเช้า', 600, 55, 25, 30, '07:30:00', '/foods/1750673087601-h8pdg0d6m.jpg', NULL),
(183, 10, '2025-09-02', 'ข้าวผัดหมู', 'มื้อเช้า', 550, 65, 20, 15, '07:30:00', NULL, '02000'),
(184, 10, '2025-09-02', 'ข้าวผัดหมู', 'มื้อกลางวัน', 550, 65, 20, 15, '12:30:00', '/foods/1753376625003-cv634ylfb.jpg', NULL),
(185, 3, '2025-09-05', 'ข้าวผัดหนำเลียบ', 'มื้อเช้า', 607, 45, 12, 25, '07:30:00', NULL, '2025-9-5-breakfast-0'),
(186, 3, '2025-09-05', 'ข้าวราดแกงเขียวหวานปลาหมึก', 'มื้อกลางวัน', 810, 45, 12, 25, '12:15:00', NULL, '2025-9-5-lunch-0'),
(187, 3, '2025-09-05', 'ต้มข่าไก่', 'มื้อเย็น', 607, 45, 12, 25, '19:00:00', NULL, '2025-9-5-dinner-0'),
(188, 3, '2025-09-05', 'แตงโมสุก', 'custom4', 202, 45, 12, 25, '22:30:00', NULL, '2025-9-5-custom4-0'),
(189, 3, '2025-09-09', 'ส้มตำไทย', 'มื้อเย็น', 607, 45, 12, 25, '18:30:00', NULL, '09200'),
(190, 3, '2025-09-09', 'ข้าวผัดกระเพราไก่', 'มื้อเช้า', 607, 45, 12, 25, '07:30:00', NULL, '09000'),
(191, 3, '2025-09-09', 'ข้าวมันไก่', 'มื้อกลางวัน', 810, 45, 12, 25, '12:30:00', NULL, '09100'),
(192, 3, '2025-09-09', 'กล้วยสด', 'custom4', 202, 45, 12, 25, '22:30:00', NULL, '09300'),
(193, 3, '2025-09-15', 'ข้าวราดแกงมัสมั่นหมู', 'มื้อเช้า', 607, 45, 12, 25, '07:30:00', NULL, '15000'),
(194, 3, '2025-09-15', 'ข้าวราดแกงเขียวหวานไก่', 'มื้อกลางวัน', 810, 45, 12, 25, '12:30:00', NULL, '15100'),
(195, 3, '2025-09-15', 'ยำวุ้นเส้น', 'มื้อเย็น', 607, 45, 12, 25, '18:30:00', NULL, '15200'),
(196, 3, '2025-09-15', 'แอปเปิลสด', 'custom4', 202, 45, 12, 25, '22:30:00', NULL, '15300'),
(197, 3, '2025-09-16', 'ข้าวเหนียวหมูปิ้ง', 'มื้อเช้า', 606, 80, 15, 25, '07:30:00', NULL, '2025-9-16-breakfast-0'),
(198, 3, '2025-09-16', 'ยำวุ้นเส้น', 'มื้อเย็น', 606, 70, 15, 20, '19:00:00', NULL, '2025-9-16-dinner-0'),
(199, 3, '2025-09-16', 'ขนมจีนน้ำยาป่า', 'custom', 204, 30, 5, 5, '22:30:00', NULL, '2025-9-16-custom-0'),
(200, 3, '2025-09-16', 'แกงเขียวหวานไก่', 'มื้อกลางวัน', 808, 100, 25, 30, '12:15:00', NULL, '2025-9-16-lunch-0'),
(201, 3, '2025-09-17', 'ข้าวต้มไข่เค็ม', 'มื้อเช้า', 606, 80, 12, 25, '07:30:00', NULL, '2025-9-17-breakfast-0'),
(202, 3, '2025-09-17', 'ข้าวซอยไก่', 'มื้อกลางวัน', 808, 100, 30, 30, '12:15:00', NULL, '2025-9-17-lunch-0'),
(203, 3, '2025-09-17', 'ผัดกะเพราเนื้อ', 'มื้อเย็น', 606, 70, 20, 25, '19:00:00', NULL, '2025-9-17-dinner-0'),
(204, 3, '2025-09-17', 'กล้วยหอม', 'custom', 203, 30, 5, 5, '22:30:00', NULL, '2025-9-17-custom-0'),
(205, 3, '2025-09-18', 'ข้าวเหนียวมะม่วง', 'มื้อเช้า', 606, 90, 10, 15, '07:30:00', NULL, '2025-9-18-breakfast-0'),
(206, 3, '2025-09-18', 'ข้าวผัดกุ้ง', 'มื้อกลางวัน', 808, 100, 20, 30, '12:15:00', NULL, '2025-9-18-lunch-0'),
(207, 3, '2025-09-18', 'แกงส้มปลา', 'มื้อเย็น', 606, 80, 15, 25, '19:00:00', NULL, '2025-9-18-dinner-0'),
(208, 3, '2025-09-18', 'ผลไม้รวม', 'custom', 205, 40, 5, 5, '22:30:00', NULL, '2025-9-18-custom-0'),
(209, 17, '2025-09-18', 'ข้าวผัดหมู', 'มื้อเช้า', 550, 65, 20, 15, '07:30:00', NULL, '2025-9-18-breakfast-0'),
(210, 17, '2025-09-18', 'ข้าวมันไก่', 'มื้อกลางวัน', 600, 55, 25, 30, '12:15:00', NULL, '2025-9-18-lunch-0'),
(211, 17, '2025-09-18', 'ข้าวผัดกุ้ง', 'มื้อเย็น', 490, 60, 15, 30, '19:00:00', NULL, '2025-9-18-dinner-0'),
(218, 3, '2025-09-19', 'ข้าวหมูกระเทียมไข่ดาว', 'มื้อเช้า', 607, 88, 21, 17, '07:30:00', NULL, '19000'),
(219, 3, '2025-09-19', 'ข้าวกะเพราไก่ไข่ดาว (ไม่ใส่ถั่วฝักยาว)', 'มื้อกลางวัน', 809, 116, 28, 23, '12:30:00', NULL, '19100'),
(220, 3, '2025-09-19', 'ข้าวผัดหมูใส่ไข่', 'มื้อเย็น', 607, 88, 21, 17, '18:30:00', NULL, '19200'),
(221, 3, '2025-09-19', 'ขนมปังโฮลวีตทาแยมสตรอว์เบอร์รี 2 แผ่น', 'custom', 202, 30, 7, 5, '23:26:00', NULL, '19300'),
(222, 3, '2025-09-20', 'โจ๊กหมูใส่ไข่', 'มื้อเช้า', 607, 80, 18, 14, '07:30:00', NULL, '2025-9-20-breakfast-0'),
(223, 3, '2025-09-20', 'ข้าวกะเพราหมูสับไข่ดาว (ไม่ใส่ถั่วฝักยาว)', 'มื้อกลางวัน', 809, 110, 35, 28, '12:15:00', NULL, '2025-9-20-lunch-0');

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cal` decimal(8,2) NOT NULL,
  `carb` decimal(8,2) DEFAULT NULL,
  `fat` decimal(8,2) DEFAULT NULL,
  `protein` decimal(8,2) DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ingredient` text COLLATE utf8mb4_general_ci,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  `serving` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `name`, `cal`, `carb`, `fat`, `protein`, `img`, `ingredient`, `is_delete`, `serving`) VALUES
(1, 'ข้าวผัดหมู', 550.00, 65.00, 20.00, 15.00, '/foods/1753376625003-cv634ylfb.jpg', '', 0, ''),
(2, 'ข้าวมันไก่', 600.00, 55.00, 25.00, 30.00, '/foods/1750673087601-h8pdg0d6m.jpg', '', 0, ''),
(5, 'ข้าวไข่เจียว', 420.00, 35.00, 25.00, 12.00, NULL, NULL, 0, ''),
(7, 'ผัดกะเพราไก่ไข่ดาว', 650.00, 60.00, 30.00, 25.00, NULL, NULL, 0, ''),
(9, 'ขนมจีนแกงเผ็ด', 500.00, 60.00, 15.00, 18.00, NULL, NULL, 0, ''),
(10, 'ก๋วยเตี๋ยวเรือ', 400.00, 45.00, 10.00, 20.00, NULL, NULL, 0, ''),
(11, 'ข้าวหน้าเป็ด', 520.00, 55.00, 20.00, 22.00, NULL, NULL, 0, ''),
(12, 'บะหมี่แห้งหมูแดง', 470.00, 50.00, 15.00, 18.00, NULL, NULL, 0, ''),
(13, 'ซุปข้าวโพด', 180.00, 22.00, 8.00, 5.00, NULL, NULL, 0, ''),
(14, 'ไก่ทอด', 300.00, 10.00, 20.00, 18.00, NULL, NULL, 0, ''),
(15, 'หมูปิ้งข้าวเหนียว', 450.00, 40.00, 15.00, 20.00, NULL, NULL, 0, ''),
(16, 'ข้าวต้มหมู', 280.00, 35.00, 5.00, 12.00, NULL, NULL, 0, ''),
(17, 'เกี๊ยวน้ำ', 320.00, 38.00, 8.00, 15.00, NULL, NULL, 0, ''),
(18, 'แซนด์วิชทูน่า', 350.00, 30.00, 18.00, 20.00, NULL, NULL, 1, ''),
(19, 'โจ๊กหมูไข่ลวก', 320.00, 28.00, 7.00, 14.00, NULL, NULL, 0, ''),
(21, 'ถั่วเหลืองผัดลำพัง', 450.00, 45.00, 28.00, 15.00, NULL, 'ถั่วเหลือง, ลำพัง, พริกไทย, น้ำล่น, ข้าวเหนียว, ผงขม, น้ำตาล, เกลือ', 1, ''),
(22, 'ส้มั๊กผักชีแก้ง', 300.00, 35.00, 15.00, 5.00, NULL, 'ย่างมะเขือเทศ, พริกไทย, ผักชี, น้ำตาล, เกลือ, ข้าวเหนียว, น้ำตาล', 1, ''),
(23, 'ค็อกเทลไก่ท้ออิเล็กทรอนิกส์', 400.00, 20.00, 15.00, 35.00, NULL, 'ไก่ท้อ, น้ำตาล, มะเขือเทศ, พริกไทย, เกลือ', 1, ''),
(24, 'ข้าวเหนียวถั่วเหลืองเบียร์', 350.00, 55.00, 10.00, 15.00, NULL, 'ข้าวเหนียว, ถั่วเหลือง, เบอร์เกอร์, น้ำตาล, ผงขม', 1, ''),
(25, 'พริกหมูลำพังที่มีอะโอนิเมนท็อป', 500.00, 40.00, 30.00, 20.00, NULL, 'หมู, ลำพัง, อะโอนิเมนท็อป, น้ำตาล, พริกไทย, น้ำล่น', 1, ''),
(26, 'ส้มตำผักขาว', 200.00, 30.00, 10.00, 8.00, NULL, 'พริกไทย สงบ ผักขาว นมปูน', 1, ''),
(27, 'น้ำตาลโหระพา', 180.00, 40.00, 5.00, 3.00, NULL, 'เนย น้ำตาล น้ำมันควัน', 1, ''),
(28, 'มะนาวชีสหมึก', 220.00, 25.00, 15.00, 10.00, NULL, 'มะนาว ไข่ หมึก พริกไทย น้ำมัน', 1, ''),
(29, 'แกงจิ้มตาโหระพา', 240.00, 35.00, 18.00, 12.00, NULL, 'ข้าวหมึก ตาโหระพาสำหรับตาโหระพา น้ำมะนาว เกลือ', 1, ''),
(30, 'ส้มตำอีโอโทเคิล', 150.00, 20.00, 7.00, 6.00, NULL, 'ช็อกโกแลต สงบ อีโอโทเคิล น้ำมันถั่วมะกอก', 1, ''),
(31, 'ข้าวเหนียวและมะเขือเทศส้มควัน', 550.00, 65.00, 15.00, 10.00, NULL, 'ข้าวเหนียว, มะเขือเทศส้มควัน, น้ำมันมะกอก, ไข่', 1, ''),
(32, 'ลำพังผักชี', 400.00, 45.00, 10.00, 20.00, NULL, 'ผักชี, แขส, น้ำมันมะกอก, ไข่', 1, ''),
(33, 'ลำพังไก่กับใบโหระพา', 600.00, 50.00, 20.00, 35.00, NULL, 'ไก่, ใบโหระพา, ข้าวเหนียวสลัด, น้ำมันมะกอก, กระเทียم', 1, ''),
(34, 'ปังผักไทย', 300.00, 35.00, 5.00, 15.00, NULL, 'ข้าวเหนียว, ไทน์, ขมิ้น, กะหล่ำ, น้ำมะนาว', 1, ''),
(35, 'หมูกับกุ้งหอม', 750.00, 25.00, 35.00, 30.00, NULL, 'หมู, กุ้งหอม, น้ำมะนาว, ผัก, ข้าวเหนียว', 1, ''),
(36, 'แกงจานมะเขือเทศดำ', 320.00, 20.00, 15.00, 25.00, NULL, 'ข้าวเหนียว, มะเขือเทศดำ, ไก่, ถั่วต้ม', 1, ''),
(37, 'พาสเทอร์ทาโหมแดง', 450.00, 60.00, 25.00, 20.00, NULL, 'ปากิสเนตร, ถั่วต้ม, พาสเทอร์ทา', 1, ''),
(38, 'อาหารพริกแห้งหวาน', 280.00, 30.00, 10.00, 15.00, NULL, 'พริกย่าง, พริกผัก, ผงสับ, น้ำมะนาว', 1, ''),
(39, 'แช่บีโอลิซันดา', 410.00, 45.00, 20.00, 25.00, NULL, 'ปอกเกอร์, องค์ที่ละมะม่วง, สลัดชีส', 1, ''),
(40, 'ข้าวเหนียวส้มแซด', 350.00, 70.00, 5.00, 10.00, NULL, 'ข้าวเหนียว, น้ำตาลนม, ปริมาณพอเหมาะ', 1, ''),
(42, 'ข้าวผัดกุ้ง', 490.00, 60.00, 15.00, 30.00, NULL, 'ข้าว ผัก กุ้ง ส้มกรั่ว', 0, ''),
(43, 'ข้าวเหนียวและมะเขือเทศ', 350.00, 60.00, 10.00, 8.00, NULL, 'ข้าวเหนียว, มะเขือเทศสด, น้ำตาล, น้ำส้มผสม', 1, ''),
(44, 'กาดูซึ้ง', 450.00, 40.00, 30.00, 15.00, NULL, 'ข้าวกล้วย, แซลมินธอร์, ไชย์ซิเนดา, น้ำตาล, น้ำมะนาว', 1, ''),
(45, 'ส้มแห้ง', 300.00, 45.00, 5.00, 10.00, NULL, 'อำลาสด, น้ำตาล, น้ำวานิลลา', 1, ''),
(46, 'ข้าวเหนียวหวาน', 450.00, 60.00, 10.00, 15.00, NULL, 'ข้าวเหนียว, น้ำตาล, วุ้นช้าง, น้ำคม', 1, ''),
(47, 'ผักกาดลัดไทย', 350.00, 30.00, 10.00, 20.00, NULL, 'ผักเขียว, กาดลัด, น้ำปลา, ผงพริก', 1, ''),
(48, 'แกงมะเขือเทศ', 400.00, 40.00, 15.00, 10.00, NULL, 'มะเขือเทศ, หัวหอม, ไข่, ปลาหมึก', 0, ''),
(49, 'แกงผักลมห้า', 300.00, 35.00, 5.00, 20.00, '/foods/1750673065182-gsa2mykjt.jpg', 'ชิ้นปลาจริง, หัวหอม, แก้วมะเขือเทศ, ผักต้ม', 1, ''),
(51, 'ข้าวขาหมู', 120.00, 21.00, 10.00, 20.00, '/foods/1751358064771-dsxtvqlvo.jpg', '', 0, ''),
(52, 'เมนู', 6.00, 0.00, 1.00, 0.00, '/foods/1754279460907-yotzqo1lu.jpg', 'ไก่,ไข่', 1, ''),
(53, 'เมนูใหม่ๆ-', 10.00, 10.00, 10.00, 10.00, '/foods/1755067493006-owd5dlb01.jpg', 'เนื้อ, หมู, ผัก', 1, ''),
(54, 'แหนมเหนือม', 555.00, 40.00, 40.00, 40.00, '/foods/1756801341801-8d2vit9og.jpg', 'หมูหมัก, ผัก, น้ำจิ้ม, ..', 0, ''),
(56, 'สลัดผัก', 180.00, NULL, 6.00, 8.00, NULL, 'ผักกาดหอม, มะเขือเทศ, แครอท, แตงกวา', 0, ''),
(59, 'ผัดไทยกุ้งสด', 540.00, NULL, 15.00, 22.00, NULL, 'เส้นจันท์, กุ้ง, ไข่, ถั่วงอก, ถั่วลิสง, ซอสผัดไทย', 0, ''),
(60, 'ต้มยำกุ้ง', 150.00, NULL, 5.00, 18.00, NULL, 'กุ้ง, ข่า, ตะไคร้, ใบมะกรูด, พริกสด', 0, ''),
(61, 'แกงเขียวหวานไก่', 320.00, NULL, 22.00, 20.00, NULL, 'ไก่, กะทิ, พริกแกงเขียวหวาน, มะเขือพวง, ใบโหระพา', 0, ''),
(62, 'กะเพราไก่ไข่ดาว', 600.00, 0.00, 20.00, 28.00, NULL, 'ข้าว, ไก่สับ, พริก, กระเทียม, ใบกะเพรา, ไข่ไก่', 0, ''),
(63, 'ส้มตำไทย', 200.00, NULL, 7.00, 6.00, NULL, 'มะละกอดิบ, มะเขือเทศ, ถั่วฝักยาว, กุ้งแห้ง, ถั่วลิสง', 0, ''),
(64, 'ก๋วยเตี๋ยวเรือน้ำตก', 400.00, NULL, 12.00, 24.00, NULL, 'เส้นเล็ก, หมู, ตับหมู, ผักบุ้ง, น้ำซุป', 0, ''),
(65, 'แกงส้มชะอมกุ้ง', 280.00, NULL, 14.00, 22.00, NULL, 'กุ้ง, ไข่, ชะอม, พริกแกงส้ม, น้ำมะขามเปียก', 0, ''),
(67, 'ยำวุ้นเส้นทะเล', 280.00, NULL, 10.00, 20.00, NULL, 'วุ้นเส้น, กุ้ง, ปลาหมึก, หมูสับ, มะเขือเทศ, หอมแดง', 0, ''),
(68, 'ก๋วยเตี๋ยวเรือหมู', 420.00, NULL, 12.00, 22.00, NULL, 'เส้นเล็ก, หมู, ตับ, ถั่วงอก, ใบโหระพา', 0, ''),
(69, 'ข้าวซอยไก่', 650.00, NULL, 28.00, 28.00, NULL, 'เส้นข้าวซอย, ไก่, กะทิ, พริกแกง, หอมแดง, ผักกาดดอง', 0, ''),
(70, 'แกงป่าไก่', 350.00, NULL, 20.00, 25.00, NULL, NULL, 0, ''),
(71, 'ผัดผักรวมมิตรน้ำมันหอย', 220.00, NULL, 9.00, 10.00, NULL, NULL, 0, ''),
(72, 'แกงเลียงกุ้งสด', 180.00, NULL, 6.00, 15.00, NULL, NULL, 0, ''),
(73, 'ข้าวเหนียวหมูปิ้ง', 400.00, 0.00, 12.00, 20.00, NULL, '', 0, ''),
(74, 'ปลากระพงนึ่งมะนาว', 320.00, NULL, 12.00, 35.00, NULL, NULL, 0, ''),
(75, 'แกงจืดเต้าหู้หมูสับ', 210.00, NULL, 8.00, 18.00, NULL, NULL, 0, ''),
(76, 'ผัดขี้เมาทะเล', 420.00, NULL, 16.00, 28.00, NULL, NULL, 0, ''),
(77, 'ห่อหมกทะเล', 380.00, NULL, 22.00, 26.00, NULL, NULL, 0, ''),
(78, 'คั่วกลิ้งหมู', 370.00, NULL, 24.00, 27.00, NULL, NULL, 0, ''),
(79, 'ข้าวผัดปู', 480.00, NULL, 14.00, 22.00, NULL, NULL, 0, ''),
(80, 'ข้าวสวย 1 ชาม', 210.00, NULL, 0.40, 4.00, NULL, NULL, 0, ''),
(81, 'ข้าวกล้อง 1 ชาม', 215.00, NULL, 1.50, 5.00, NULL, NULL, 0, ''),
(82, 'ไข่เจียว 1 ฟอง', 220.00, 0.00, 18.00, 12.00, '/foods/1758314915759-fdxk062le.jpg', 'ไข่', 0, ''),
(83, 'ไข่ต้ม 1 ฟอง', 80.00, 0.00, 5.00, 7.00, '/foods/1758199407918-vzaeli89z.jpg', '', 0, ''),
(84, 'ไข่ 555', 0.00, 0.00, 0.00, 0.00, '/foods/1758197572368-omewkbc67.jpg', '', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `food_category`
--

CREATE TABLE `food_category` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_category`
--

INSERT INTO `food_category` (`id`, `name`, `is_delete`) VALUES
(1, 'อาหารไทย', 0),
(2, 'อาหารตะวันตก', 0),
(3, 'อาหารญี่ปุ่น', 0),
(4, 'อาหารจีน', 0),
(5, 'อาหารเกาหลี', 0),
(6, 'อาหารมังสวิรัติ', 0),
(7, 'อาหารคลีน', 0),
(8, 'อาหารเพื่อสุขภาพ', 0),
(9, 'อาหารจานเดียว', 0),
(10, 'อาหารว่างและของหวาน', 0),
(11, 'อาหารทะเล', 0),
(12, 'อาหารฟิวชัน', 0),
(13, 'อาหารฮาลาล', 1),
(14, 'อาหารสำหรับเด็ก', 1),
(15, 'อาหารพื้นเมืองหรืออาหารท้องถิ่น', 0),
(16, 'อาหารแคลอรี่ต่ำ', 0),
(17, 'อาหารคีโต', 0),
(18, 'อาหารวีแกน', 0),
(19, 'อาหารออร์แกนิก', 0),
(20, 'อาหารฟาสต์ฟู้ด', 1),
(21, 'อาหารแช่แข็งหรืออาหารพร้อมทาน', 0),
(22, 'อาหารสำหรับผู้ป่วยหรืออาหารทางการแพทย์', 0),
(23, 'อาหารนานาชาติ', 0),
(24, 'อาหารพื้นบ้านไทย', 0),
(25, 'อาหารเสริมหรืออาหารเสริมพลังงาน', 0);

-- --------------------------------------------------------

--
-- Table structure for table `food_category_map`
--

CREATE TABLE `food_category_map` (
  `food_id` int NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_category_map`
--

INSERT INTO `food_category_map` (`food_id`, `category_id`) VALUES
(49, 1),
(59, 1),
(60, 1),
(61, 1),
(62, 1),
(63, 1),
(64, 1),
(65, 1),
(49, 4),
(49, 7),
(56, 8),
(67, 8),
(49, 9),
(59, 9),
(62, 9),
(64, 9),
(60, 11),
(65, 11),
(67, 11),
(49, 17),
(51, 17),
(49, 21),
(52, 22),
(51, 23),
(52, 23),
(52, 24),
(53, 24),
(82, 24),
(49, 25),
(51, 25),
(52, 25),
(53, 25),
(54, 25),
(82, 25);

-- --------------------------------------------------------

--
-- Table structure for table `global_food_plan`
--

CREATE TABLE `global_food_plan` (
  `plan_id` int NOT NULL,
  `plan_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `duration` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `global_food_plan`
--

INSERT INTO `global_food_plan` (`plan_id`, `plan_name`, `duration`, `description`, `created_at`, `image`, `is_delete`) VALUES
(1, 'plan 1', 14, 'meal plan 1 descriptions', '2025-06-15 00:00:00', '/mealplan/1750056478454-7a25kwnko.jpg', 0),
(2, 'plan2', 7, NULL, '2025-07-01 00:00:00', '/mealplan/1758198498613-jcgrtlz8a.jpg', 0),
(4, 'plan4', NULL, 'des4', '2025-07-24 00:00:00', '/mealplan/1753517956229-gfb74apoo.jpg', 0),
(6, 'plan6 ', 7, 'des6', '2025-07-24 00:00:00', '/mealplan/1753371677081-jbnk2ll38.jpg', 0),
(7, 'plan7', NULL, 'plan8', '2025-07-24 00:00:00', NULL, 1),
(8, 'plan8', NULL, 'plan8', '2025-07-24 00:00:00', NULL, 1),
(9, 'plan9', NULL, 'plan9', '2025-07-24 00:00:00', NULL, 0),
(14, 'planTest', 7, 'planTest description ', '2025-07-26 00:00:00', '/mealplan/1753769408760-6fppop7wc.jpg', 0),
(17, 'plan-test-2', 7, 'เพิ่มน้ำหนัก', '2025-07-28 00:00:00', '/mealplan/1753769400469-mp1vj83h3.jpg', 1),
(18, 'plan999', 7, '444', '2025-08-04 00:00:00', '/mealplan/1754279532569-v51t91fuj.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `meal_plan_detail`
--

CREATE TABLE `meal_plan_detail` (
  `detail_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `day_number` int DEFAULT '1',
  `meal_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `meal_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `meal_time` time DEFAULT NULL,
  `calories` decimal(8,2) DEFAULT '0.00',
  `protein` decimal(8,2) DEFAULT '0.00',
  `carb` decimal(8,2) DEFAULT '0.00',
  `fat` decimal(8,2) DEFAULT '0.00',
  `food_id` int DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_plan_detail`
--

INSERT INTO `meal_plan_detail` (`detail_id`, `plan_id`, `day_number`, `meal_type`, `meal_name`, `meal_time`, `calories`, `protein`, `carb`, `fat`, `food_id`, `img`) VALUES
(15, 2, 1, 'Breakfast', 'หมูปิ้งข้าวเหนียว', '07:00:00', 450.00, 20.00, 40.00, 15.00, 15, NULL),
(61, 1, 1, 'breakfast', 'ข้าวผัดหมู', '07:00:00', 550.00, 15.00, 65.00, 20.00, 1, '/foods/1753376625003-cv634ylfb.jpg'),
(62, 1, 1, 'Lunch', 'ข้าวมันไก่', '12:00:00', 600.00, 30.00, 55.00, 25.00, 2, '/foods/1750673087601-h8pdg0d6m.jpg'),
(63, 1, 1, 'Dinner', 'ข้าวผัดหมู', '18:00:00', 550.00, 15.00, 65.00, 20.00, 1, '/foods/1753376625003-cv634ylfb.jpg'),
(64, 1, 2, 'Breakfast', 'ข้าวมันไก่', '11:11:00', 600.00, 30.00, 55.00, 25.00, 2, '/foods/1750673087601-h8pdg0d6m.jpg'),
(65, 1, 2, 'Lunch', 'ก๋วยเตี๋ยวเรือ', '12:12:00', 400.00, 20.00, 45.00, 10.00, 10, NULL),
(108, 14, 1, 'breakfast', 'ข้าวต้มหมู', '07:00:00', 300.00, 15.00, 40.00, 8.00, NULL, NULL),
(109, 14, 1, 'breakfast', 'ไข่ต้ม 1 ฟอง', '07:00:00', 70.00, 6.00, 0.00, 5.00, NULL, NULL),
(110, 14, 1, 'lunch', 'ข้าวผัดไข่ + ไก่ทอด', '12:00:00', 750.00, 30.00, 70.00, 35.00, NULL, NULL),
(111, 14, 1, 'dinner', 'แกงจืดเต้าหู้หมูสับ', '18:00:00', 200.00, 15.00, 10.00, 10.00, NULL, NULL),
(112, 14, 1, 'dinner', 'ไข่เจียวไม่ใส่ผัก', '18:00:00', 300.00, 12.00, 0.00, 25.00, NULL, NULL),
(113, 14, 1, 'dinner', 'ข้าวสวย 1 ถ้วย', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(114, 14, 2, 'breakfast', 'ข้าวเหนียวหมูปิ้ง (3 ไม้)', '07:00:00', 400.00, 20.00, 45.00, 15.00, NULL, NULL),
(115, 14, 2, 'breakfast', 'กล้วยหอม 1 ลูก', '07:00:00', 100.00, 1.00, 27.00, 0.00, NULL, NULL),
(116, 14, 2, 'lunch', 'ข้าวราดพะแนงหมู + แตงกวา', '12:00:00', 700.00, 30.00, 50.00, 35.00, NULL, NULL),
(117, 14, 2, 'dinner', 'ข้าวสวย 1 ถ้วย', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(118, 14, 2, 'dinner', 'ไข่พะโล้ 1 ฟอง + หมูพะโล้', '18:00:00', 350.00, 15.00, 10.00, 25.00, NULL, NULL),
(119, 14, 2, 'dinner', 'ผัดถั่วงอกเต้าหู้', '18:00:00', 120.00, 6.00, 8.00, 6.00, NULL, NULL),
(120, 14, 3, 'breakfast', 'ข้าวไข่กระทะ', '07:00:00', 350.00, 15.00, 25.00, 20.00, NULL, NULL),
(121, 14, 3, 'breakfast', 'นมจืด 1 กล่อง', '07:00:00', 130.00, 6.00, 10.00, 7.00, NULL, NULL),
(122, 14, 3, 'lunch', 'ข้าวกะเพราหมูไข่ดาว (ไม่ใส่ถั่วฝักยาว)', '12:00:00', 800.00, 30.00, 60.00, 40.00, NULL, NULL),
(123, 14, 3, 'dinner', 'ข้าวสวย 1 ถ้วย', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(124, 14, 3, 'dinner', 'ต้มยำน้ำใสปลากะพง', '18:00:00', 270.00, 25.00, 5.00, 12.00, NULL, NULL),
(125, 14, 3, 'dinner', 'ไข่ต้ม 1 ฟอง', '18:00:00', 70.00, 6.00, 0.00, 5.00, NULL, NULL),
(126, 14, 4, 'breakfast', 'โจ๊กหมูไม่ใส่เครื่องใน', '07:00:00', 250.00, 10.00, 35.00, 5.00, NULL, NULL),
(127, 14, 4, 'breakfast', 'ไข่ลวก 1 ฟอง', '07:00:00', 70.00, 6.00, 0.00, 5.00, NULL, NULL),
(128, 14, 4, 'lunch', 'ข้าวหมูกระเทียม + ต้มจืดผักกาดขาว', '12:00:00', 820.00, 35.00, 60.00, 30.00, NULL, NULL),
(129, 14, 4, 'dinner', 'ข้าวสวย 1 ถ้วย', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(130, 14, 4, 'dinner', 'ปลาทูทอด', '18:00:00', 320.00, 25.00, 0.00, 20.00, NULL, NULL),
(131, 14, 4, 'dinner', 'น้ำพริกกะปิ (ไม่ใส่ผักแนม)', '18:00:00', 180.00, 5.00, 8.00, 10.00, NULL, NULL),
(132, 14, 5, 'breakfast', 'แซนด์วิชไข่ต้ม', '07:00:00', 300.00, 10.00, 30.00, 10.00, NULL, NULL),
(133, 14, 5, 'breakfast', 'โยเกิร์ตไม่หวาน', '07:00:00', 150.00, 6.00, 15.00, 4.00, NULL, NULL),
(134, 14, 5, 'lunch', 'ข้าวผัดพริกแกงหมูกรอบ (ไม่ใส่ถั่ว)', '12:00:00', 850.00, 30.00, 65.00, 40.00, NULL, NULL),
(135, 14, 5, 'dinner', 'ข้าวสวย', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(136, 14, 5, 'dinner', 'ไก่ต้มน้ำปลา', '18:00:00', 290.00, 25.00, 5.00, 15.00, NULL, NULL),
(137, 14, 5, 'dinner', 'แกงจืดฟักหมูสับ', '18:00:00', 100.00, 6.00, 5.00, 4.00, NULL, NULL),
(138, 14, 6, 'breakfast', 'ไข่กระทะ', '07:00:00', 300.00, 15.00, 10.00, 20.00, NULL, NULL),
(139, 14, 6, 'breakfast', 'กล้วยต้ม', '07:00:00', 150.00, 1.00, 35.00, 0.00, NULL, NULL),
(140, 14, 6, 'lunch', 'ราดหน้าหมู (คะน้าน้อย)', '12:00:00', 750.00, 30.00, 60.00, 25.00, NULL, NULL),
(141, 14, 6, 'dinner', 'ข้าว', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(142, 14, 6, 'dinner', 'ไข่ลูกเขย', '18:00:00', 300.00, 8.00, 10.00, 20.00, NULL, NULL),
(143, 14, 6, 'dinner', 'ผัดวุ้นเส้นหมูสับ', '18:00:00', 130.00, 8.00, 15.00, 5.00, NULL, NULL),
(144, 14, 7, 'breakfast', 'ข้าวต้มไก่ฉีก', '07:00:00', 300.00, 15.00, 40.00, 5.00, NULL, NULL),
(145, 14, 7, 'breakfast', 'น้ำส้มคั้นสด', '07:00:00', 120.00, 1.00, 30.00, 0.00, NULL, NULL),
(146, 14, 7, 'lunch', 'ข้าวขาหมูไม่เอาหนัง + ไข่พะโล้', '12:00:00', 850.00, 30.00, 55.00, 35.00, NULL, NULL),
(147, 14, 7, 'dinner', 'ข้าว', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(148, 14, 7, 'dinner', 'ปลานิลทอด', '18:00:00', 300.00, 25.00, 0.00, 20.00, NULL, NULL),
(149, 14, 7, 'dinner', 'แกงจืดมะระยัดไส้', '18:00:00', 100.00, 5.00, 5.00, 5.00, NULL, NULL),
(210, 17, 1, 'breakfast', 'ข้าวต้มหมู', '07:00:00', 300.00, 15.00, 40.00, 8.00, NULL, NULL),
(211, 17, 1, 'breakfast', 'ไข่ต้ม 1 ฟอง', '07:00:00', 70.00, 6.00, 0.00, 5.00, NULL, NULL),
(212, 17, 1, 'lunch', 'ข้าวผัดไข่ + ไก่ทอด', '12:00:00', 750.00, 30.00, 70.00, 35.00, NULL, NULL),
(213, 17, 1, 'dinner', 'แกงจืดเต้าหู้หมูสับ', '18:00:00', 200.00, 15.00, 10.00, 10.00, NULL, NULL),
(214, 17, 1, 'dinner', 'ไข่เจียวไม่ใส่ผัก', '18:00:00', 300.00, 12.00, 0.00, 25.00, NULL, NULL),
(215, 17, 1, 'dinner', 'ข้าวสวย 1 ถ้วย', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(216, 17, 2, 'breakfast', 'ข้าวเหนียวหมูปิ้ง (3 ไม้)', '07:00:00', 400.00, 20.00, 45.00, 15.00, NULL, NULL),
(217, 17, 2, 'lunch', 'ข้าวราดหน้าไก่', '12:00:00', 600.00, 25.00, 60.00, 25.00, NULL, NULL),
(218, 17, 2, 'lunch', 'ไข่ดาว 1 ฟอง', '12:00:00', 100.00, 7.00, 0.00, 8.00, NULL, NULL),
(219, 17, 2, 'dinner', 'ข้าวผัดกุ้ง (ไม่ใส่ผักชี)', '18:00:00', 600.00, 25.00, 60.00, 25.00, NULL, NULL),
(220, 17, 2, 'dinner', 'ไข่ต้ม 1 ฟอง', '18:00:00', 70.00, 6.00, 0.00, 5.00, NULL, NULL),
(221, 17, 3, 'breakfast', 'โจ๊กหมูใส่ไข่', '07:00:00', 350.00, 20.00, 40.00, 10.00, NULL, NULL),
(222, 17, 3, 'lunch', 'ข้าวผัดหมู + ไข่ดาว', '12:00:00', 700.00, 28.00, 65.00, 30.00, NULL, NULL),
(223, 17, 3, 'dinner', 'ไก่ย่าง 1/4 ตัว + ข้าวเหนียว 1 ห่อ', '18:00:00', 500.00, 35.00, 50.00, 20.00, NULL, NULL),
(224, 17, 3, 'dinner', 'น้ำตกหมู (ไม่ใส่ผักเหม็นเขียว)', '18:00:00', 300.00, 25.00, 15.00, 15.00, NULL, NULL),
(225, 17, 4, 'breakfast', 'ขนมปังปิ้ง 2 แผ่น + เนยถั่ว + กล้วยหอม 1 ลูก', '07:00:00', 400.00, 10.00, 55.00, 15.00, NULL, NULL),
(226, 17, 4, 'lunch', 'ข้าวขาหมู (ไม่เอาหนังมากนัก)', '12:00:00', 600.00, 25.00, 50.00, 30.00, NULL, NULL),
(227, 17, 4, 'dinner', 'ปลาทอดกระเทียม + ข้าวสวย 1.5 ถ้วย', '18:00:00', 500.00, 30.00, 60.00, 20.00, NULL, NULL),
(228, 17, 4, 'dinner', 'ไข่เจียวหมูสับ (ไม่ใส่ผัก)', '18:00:00', 350.00, 15.00, 5.00, 30.00, NULL, NULL),
(229, 17, 5, 'breakfast', 'ข้าวเหนียวหมูฝอย + ไข่ต้ม 1 ฟอง', '07:00:00', 450.00, 25.00, 50.00, 20.00, NULL, NULL),
(230, 17, 5, 'lunch', 'ผัดซีอิ๊วหมู', '12:00:00', 650.00, 25.00, 70.00, 30.00, NULL, NULL),
(231, 17, 5, 'dinner', 'ต้มยำกุ้งน้ำข้น (ไม่ใส่ผักชี/ผักเหม็นเขียว) + ข้าวสวย 1 ถ้วย', '18:00:00', 450.00, 25.00, 40.00, 20.00, NULL, NULL),
(232, 17, 5, 'dinner', 'หมูทอดกระเทียม', '18:00:00', 350.00, 20.00, 10.00, 25.00, NULL, NULL),
(233, 17, 6, 'breakfast', 'แซนด์วิชทูน่า (ไม่ใส่ผักเหม็นเขียว) + นมจืด 1 กล่อง', '07:00:00', 400.00, 25.00, 40.00, 20.00, NULL, NULL),
(234, 17, 6, 'lunch', 'กะเพราหมูสับไข่ดาว (ไม่ใส่ผักชี)', '12:00:00', 700.00, 30.00, 60.00, 35.00, NULL, NULL),
(235, 17, 6, 'dinner', 'สเต็กหมู/ไก่ (เลือกเนื้อแดงติดมันเล็กน้อย) + มันบด', '18:00:00', 750.00, 40.00, 50.00, 40.00, NULL, NULL),
(236, 17, 7, 'breakfast', 'ข้าวไข่เจียวหมูสับ + ไส้กรอก 2 ชิ้น', '07:00:00', 500.00, 25.00, 40.00, 30.00, NULL, NULL),
(237, 17, 7, 'lunch', 'ข้าวซอยไก่ (ไม่ใส่ผักชี/ผักเหม็นเขียว)', '12:00:00', 600.00, 25.00, 60.00, 25.00, NULL, NULL),
(238, 17, 7, 'dinner', 'สุกี้น้ำ/แห้ง (เลือกเนื้อสัตว์ โปรตีนสูง ไม่ใส่ผักเหม็นเขียว)', '18:00:00', 500.00, 35.00, 30.00, 20.00, NULL, NULL),
(239, 17, 7, 'dinner', 'ข้าวสวย 1 ถ้วย', '18:00:00', 230.00, 4.00, 45.00, 1.00, NULL, NULL),
(242, 18, 1, 'breakfast', 'ข้าวขาหมู', '07:00:00', 120.00, 20.00, 21.00, 10.00, 51, '/foods/1751358064771-dsxtvqlvo.jpg'),
(243, 18, 1, 'lunch', 'ข้าวเหนียวหวาน', '12:00:00', 450.00, 15.00, 60.00, 10.00, 46, NULL),
(244, 18, 2, 'breakfast', 'ข้าวเหนียวหวาน', '18:00:00', 450.00, 15.00, 60.00, 10.00, 46, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_tag`
--

CREATE TABLE `post_tag` (
  `post_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_tag`
--

INSERT INTO `post_tag` (`post_id`, `tag_id`) VALUES
(3, 5),
(6, 5),
(3, 6),
(5, 6),
(6, 6),
(7, 8);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(2, '1'),
(4, '2'),
(1, '3'),
(3, '4'),
(7, 'fasdf'),
(6, 'สุขภาพ'),
(8, 'สุภาพ'),
(5, 'อาหาร');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `age` int DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `last_updated_weight` decimal(5,2) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `body_fat` enum('high','low','normal','unknown') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `target_goal` enum('decrease','increase','healthy') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `target_weight` decimal(5,2) DEFAULT NULL,
  `activity_level` enum('low','moderate','high','very high') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `additional_requirements` text COLLATE utf8mb4_general_ci,
  `dietary_restrictions` text COLLATE utf8mb4_general_ci,
  `eating_type` enum('vegan','vegetarian','omnivore','keto','other') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_status` enum('active','suspended','deactivated') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `suspend_reason` text COLLATE utf8mb4_general_ci,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_password_reset` timestamp NULL DEFAULT NULL,
  `first_time_setting` tinyint(1) NOT NULL DEFAULT '0',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_date`, `age`, `weight`, `last_updated_weight`, `height`, `gender`, `body_fat`, `target_goal`, `target_weight`, `activity_level`, `additional_requirements`, `dietary_restrictions`, `eating_type`, `account_status`, `suspend_reason`, `updated_at`, `last_password_reset`, `first_time_setting`, `is_verified`) VALUES
(3, 'suchao', 'suchao0101@gmail.com', '$2b$10$rymK2vAYi50quLcxV0x/H.rf6Q//ibIEvkuwGKrs/ZFCJJ3Eoh5LG', '2025-06-27 13:42:26', 2006, 52.00, 52.00, 163.00, 'male', 'normal', 'healthy', 52.00, 'moderate', NULL, 'ถั่ว, ถั่วเหลือง', 'omnivore', 'active', NULL, '2025-09-19 19:11:01', '2025-09-04 13:02:03', 1, 1),
(4, 'tawan', 't@w.com', '$2b$10$hhvit3x73v/.PLaSCHONBuilIZRLkefhdKPhbeHPs1bzJklc00mTC', '2025-06-28 13:01:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'suspended', 'upload weird pic\n', '2025-08-03 22:26:54', NULL, 0, 0),
(5, 'suchao01', 'suchaocloud@gmail.con', '$2b$10$Pd1jmJoErJKzmW32gU7N0.puP4vYVzYsefpyhHi0OPNNrLKyOwfXi', '2025-07-01 15:14:44', 2005, 60.00, 60.00, 170.00, 'male', 'normal', 'decrease', 59.00, 'moderate', NULL, 'กลูเตน, ถั่วเหลือง', 'omnivore', 'active', NULL, '2025-08-31 22:03:43', NULL, 1, 0),
(8, 'suchao3', 'suchao@gmail.com', '$2b$10$O4iFNkDcEkA/xQbZUSGS3eSyY/St/kJtewOrYjVkYZuZ4rcVHN3TK', '2025-08-13 14:15:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, 0, 0),
(9, 'suchao00001', 'sucha0101@gmail.com', '$2b$10$Vwv55Dpk7HoYtfIuSbPMAOqYt8zGEos7JVmvBsB73ItKuKr/tUoEu', '2025-09-01 15:15:47', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', NULL, '2025-09-05 13:01:27', NULL, 0, 0),
(10, 'suchaocloud', 'suchaocloud001@gmail.com', '$2b$10$7jr31OAY9WkovAwldcKvLOuzpVgZFlN2LM3AVFdoUG5viJWiME7Ji', '2025-09-02 14:47:24', 2003, 52.00, 52.00, 163.00, 'male', 'unknown', 'increase', 103.00, 'high', NULL, '', 'omnivore', 'suspended', '.', '2025-09-03 14:22:21', NULL, 1, 0),
(17, 'suchao555', 'suchaocloud555@gmail.com', '$2b$10$jO6GpknEixR4uV8wEi/ITOXEaQ3nVkl2R6zCtE4e.cj6FFnMUXo0.', '2025-09-18 15:19:39', 2003, 52.00, 52.00, 163.00, 'male', 'unknown', 'healthy', 52.00, 'moderate', NULL, '', 'omnivore', 'active', NULL, '2025-09-18 09:19:44', '2025-09-18 08:26:37', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_food`
--

CREATE TABLE `user_food` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cal` decimal(8,2) DEFAULT NULL,
  `carb` decimal(8,2) DEFAULT NULL,
  `fat` decimal(8,2) DEFAULT NULL,
  `protein` decimal(8,2) DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ingredient` text COLLATE utf8mb4_general_ci NOT NULL,
  `src` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `serving` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_food`
--

INSERT INTO `user_food` (`id`, `name`, `cal`, `carb`, `fat`, `protein`, `img`, `user_id`, `ingredient`, `src`, `created_at`, `serving`) VALUES
(6, 'newmeal', 20.00, 20.00, 0.00, 20.00, NULL, 3, '', 'user', NULL, ''),
(7, 'ข้าวโพดแป้งเบียร์โภชนาการมังสวิรัติ', 400.00, 50.00, 10.00, 20.00, NULL, 3, 'ข้าวโพด, แป้งเบียร์, ชีส, พริกไทย', 'user', NULL, ''),
(8, 'สลัดเกลียวเต้อืด', 150.00, 20.00, 8.00, 5.00, NULL, 3, 'ต้มย่อย, แก้วเต้อืด, กะหรี่, ผักกล้วย, ข้นปลาวัว', 'user', NULL, ''),
(10, 'แกงมะเขือเทศ', 180.00, 15.00, 10.00, 5.00, NULL, 3, 'มะเขือเทศ, น้ำตาลแดง, กระเทียม, ถั่วหนึ่งช้อน, กากป่วน', 'user', NULL, ''),
(11, 'ยีดซ์แก๊งมะเขือเทศ', 150.00, 20.00, 10.00, 5.00, NULL, 3, 'ก้นเปล่ากิน, มะเขือเทศสดๆ', 'ai', NULL, ''),
(12, 'ผัดไทยกุ้งสด', 300.00, 35.00, 10.00, 20.00, NULL, 3, 'กุ้งสด, เส้นหมี่, น้ำตาลทราย, น้ำปลา, ถั่วงอก, ไข่เจียว', 'ai', NULL, ''),
(13, 'ข้าวต้มไข่เจียว', 350.00, 50.00, 10.00, 15.00, NULL, 3, 'ข้าวสวย, ไข่ไก่, น้ำปลา, พริกไทย, กระเทียม, น้ำมันพืช', 'ai', '2025-08-03 13:30:31', ''),
(14, 'ผัดไทย', 350.00, 45.00, 10.00, 15.00, NULL, 3, 'กุ้ง, กระเทียม, ถั่วงอก, ไข่ไก่, น้ำมะนาว, บะหมี่', 'ai', '2025-08-03 13:36:11', ''),
(15, 'ทอดกะปินไก่', 350.00, 15.00, 20.00, 25.00, NULL, 6, 'ไก่, น้ำปลา, น้ำตาลทราย, พริกไทย, น้ำมันพืช', 'ai', '2025-08-03 23:46:54', ''),
(16, 'ไก่บูลโกกิ', 400.00, 30.00, 20.00, 25.00, NULL, 6, 'เนื้อไก่, ซอสบูลโกกิ, กระเทียม, ขิง, น้ำตาล, งา, ต้นหอม, พริก', 'ai', '2025-08-03 23:48:16', ''),
(17, 'ไก่ทอด', 100.00, 3.00, 10.00, 8.00, '/images/user_foods/1754265066189_289889080.jpg', 6, '', 'user', '2025-08-03 23:49:35', ''),
(18, 'ไก่ไข่', 0.00, 0.00, 0.00, 0.00, NULL, 6, '', 'user', '2025-08-03 23:53:06', ''),
(19, 'ไก่ผัดกะหล่ำโพด', 350.00, 15.00, 20.00, 30.00, '/images/user_foods/1754278090870_743982645.jpg', 7, 'ไก่, กระหล่ำ, ไข่, น้ำจิ้มสุกี้', 'ai', '2025-08-04 03:27:23', ''),
(20, 'ข้าวหมา', 300.00, 20.00, 30.00, 40.00, '/images/user_foods/1755072294286_549810228.jpeg', 3, '', 'user', '2025-08-13 08:04:54', ''),
(21, 'ข้าวต้มไข่', 150.00, 30.00, 3.00, 7.00, NULL, 3, 'ข้าวสวย, ไข่ไก่, น้ำซุป, ต้นหอม, พริกไทย', 'ai', '2025-09-04 09:40:13', ''),
(22, 'ข้าวต้มหมูสับ', 250.00, 40.00, 5.00, 20.00, '/images/user_foods/1756980541798_918167574.jpg', 14, 'ข้าวหอมมะลิ, หมูสับ, กระเทียม, ต้นหอม, น้ำซุป', 'ai', '2025-09-04 10:08:11', ''),
(23, 'ข้าวต้มปลา', 150.00, 30.00, 2.00, 20.00, NULL, 17, 'ข rice, ปลา, น้ำซุป, กระเทียม, ขิง, ต้นหอม', 'ai', '2025-09-18 09:25:33', ''),
(24, 'ข้าวต้มไก่', 190.00, 26.00, 3.00, 14.00, NULL, 3, 'ข้าวหอมมะลิหุงสุก, เนื้อไก่ฉีก, น้ำซุปไก่, ขิงซอย, ต้นหอม, ผักชี, กระเทียมเจียว (เล็กน้อย), น้ำปลา, เกลือ, พริกไทยป่น', 'ai', '2025-09-19 15:00:33', '200 g'),
(25, 'ข้าวหน้าเนื้อย่างเกลือสไตล์ญี่ปุ่น', 320.00, 30.00, 11.00, 23.00, NULL, 3, 'เนื้อวัวสไลซ์บาง 70 กรัม, ข้าวญี่ปุ่นหุงสุก 100 กรัม, เกลือทะเล, พริกไทยดำป่น, ขิงขูด, กระเทียมสับ, น้ำส้มสายชูข้าว, น้ำตาลเล็กน้อย, น้ำมันรำข้าวหรือคาโนลา, ต้นหอมซอย', 'ai', '2025-09-19 15:22:31', '1 ชามเล็ก (ประมาณ 220 กรัม)'),
(26, 'แกงจืดผักกาดขาวหมูสับ', 150.00, 8.00, 6.00, 15.00, NULL, 3, 'ผักกาดขาว, หมูสับ, กระเทียม, พริกไทยขาว, น้ำปลา, เกลือ, ต้นหอม, ผักชี, น้ำ', 'ai', '2025-09-19 17:43:04', ''),
(27, 'ข้าวต้มไก่ (มื้อเช้าแบบเบา)', 200.00, 30.00, 5.00, 18.00, NULL, 3, 'ข้าวหุงสุก, น้ำซุปไก่ใส, อกไก่สับ, ขิงซอย, ต้นหอม, ซีอิ๊วขาว, เกลือเล็กน้อย, พริกไทยป่น', 'ai', '2025-09-19 18:03:32', '1 ถ้วย (200 กรัม)');

-- --------------------------------------------------------

--
-- Table structure for table `user_food_plans`
--

CREATE TABLE `user_food_plans` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `plan_start_date` date DEFAULT NULL,
  `is_repeat` tinyint(1) NOT NULL DEFAULT '0'
) ;

--
-- Dumping data for table `user_food_plans`
--

INSERT INTO `user_food_plans` (`id`, `name`, `description`, `plan`, `img`, `user_id`, `plan_start_date`, `is_repeat`) VALUES
(1, 'plan1', 'description', '\"{\\\"1\\\":{\\\"totalCal\\\":1150,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00\\\",\\\"name\\\":\\\"อาหารมื้อเช้า\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1750055661288-zabvsd0du.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"lunch\\\":{\\\"time\\\":\\\"12:00\\\",\\\"name\\\":\\\"อาหารมื้อกลางวัน\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_2\\\",\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":600,\\\"carb\\\":55,\\\"fat\\\":25,\\\"protein\\\":30,\\\"img\\\":\\\"/foods/1750673087601-h8pdg0d6m.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600}}},\\\"2\\\":{\\\"totalCal\\\":0,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00\\\",\\\"name\\\":\\\"อาหารมื้อเช้า\\\",\\\"items\\\":[{\\\"id\\\":\\\"user_2\\\",\\\"name\\\":\\\"a\\\",\\\"cal\\\":0,\\\"carb\\\":0,\\\"fat\\\":0,\\\"protein\\\":0,\\\"img\\\":\\\"/images/user_foods/1752848040133_112747320.jpeg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"user_food\\\",\\\"isUserFood\\\":true}],\\\"totalCal\\\":0}}}}\"', NULL, 3, NULL, 0),
(3, 'plan1', 'des', '{\"1\":{\"totalCal\":1700,\"meals\":{\"breakfast\":{\"name\":\"อาหารมื้อเช้า\",\"time\":\"07:00\",\"items\":[{\"id\":\"global_1\",\"name\":\"ข้าวผัดหมู\",\"cal\":550,\"carb\":65,\"fat\":20,\"protein\":15,\"img\":\"/foods/1750055661288-zabvsd0du.jpg\",\"ingredient\":\"\",\"source\":\"foods\",\"isUserFood\":false}],\"totalCal\":550},\"lunch\":{\"name\":\"อาหารมื้อกลางวัน\",\"time\":\"12:00\",\"items\":[{\"id\":\"global_2\",\"name\":\"ข้าวมันไก่\",\"cal\":600,\"carb\":55,\"fat\":25,\"protein\":30,\"img\":\"/foods/1750673087601-h8pdg0d6m.jpg\",\"ingredient\":\"\",\"source\":\"foods\",\"isUserFood\":false}],\"totalCal\":600},\"dinner\":{\"time\":\"18:00\",\"name\":\"อาหารมื้อเย็น\",\"items\":[{\"id\":\"global_1_1753175187598_6jep4l3wc\",\"name\":\"ข้าวผัดหมู\",\"cal\":550,\"carb\":65,\"fat\":20,\"protein\":15,\"img\":\"/foods/1750055661288-zabvsd0du.jpg\",\"ingredient\":\"\",\"source\":\"foods\",\"isUserFood\":false}],\"totalCal\":550}}},\"2\":{\"totalCal\":0,\"meals\":{\"breakfast\":{\"name\":\"อาหารมื้อเช้า\",\"time\":\"07:00\",\"items\":[{\"id\":\"user_2\",\"name\":\"a\",\"cal\":0,\"carb\":0,\"fat\":0,\"protein\":0,\"img\":\"/images/user_foods/1752848040133_112747320.jpeg\",\"ingredient\":\"\",\"source\":\"user_food\",\"isUserFood\":true}],\"totalCal\":0}}}}', '/images/user_food_plans/1752936367731_588392115.jpeg', 3, NULL, 0),
(4, 'Plan2', 'des2', '{\"1\":{\"totalCal\":550,\"meals\":{\"breakfast\":{\"time\":\"07:00\",\"name\":\"อาหารมื้อเช้า\",\"items\":[{\"id\":\"global_1_1753224051309_bxqsejopj\",\"name\":\"ข้าวผัดหมู\",\"cal\":550,\"carb\":65,\"fat\":20,\"protein\":15,\"img\":\"/foods/1750055661288-zabvsd0du.jpg\",\"ingredient\":\"\",\"source\":\"foods\",\"isUserFood\":false}],\"totalCal\":550}}}}', '/images/user_food_plans/1753171417324_814986888.jpeg', 3, NULL, 0),
(9, 'plan 1 (คัดลอก)', 'meal plan 1 descriptions', '\"{\\\"1\\\":{\\\"totalCal\\\":1700,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"Lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_2\\\",\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":600,\\\"carb\\\":55,\\\"fat\\\":25,\\\"protein\\\":30,\\\"img\\\":\\\"/foods/1750673087601-h8pdg0d6m.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"Dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550}}},\\\"2\\\":{\\\"totalCal\\\":1000,\\\"meals\\\":{\\\"Breakfast\\\":{\\\"time\\\":\\\"11:11:00\\\",\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_2\\\",\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":600,\\\"carb\\\":55,\\\"fat\\\":25,\\\"protein\\\":30,\\\"img\\\":\\\"/foods/1750673087601-h8pdg0d6m.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"Lunch\\\":{\\\"time\\\":\\\"12:12:00\\\",\\\"name\\\":\\\"ก๋วยเตี๋ยวเรือ\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_10\\\",\\\"name\\\":\\\"ก๋วยเตี๋ยวเรือ\\\",\\\"cal\\\":400,\\\"carb\\\":45,\\\"fat\\\":10,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400}}}}\"', NULL, 3, NULL, 0),
(11, 'plan00', 'plan00', '{\"1\":{\"totalCal\":88,\"meals\":{\"breakfast\":{\"name\":\"อาหารมื้อเช้า\",\"time\":\"07:00\",\"items\":[{\"id\":\"user_2\",\"name\":\"abc\",\"cal\":88,\"carb\":77,\"fat\":0,\"protein\":0,\"img\":\"/images/user_foods/1752848040133_112747320.jpeg\",\"ingredient\":\"\",\"source\":\"user_food\",\"isUserFood\":true}],\"totalCal\":88}}}}', '/images/user_food_plans/1753384419252_518384337.jpeg', 3, '2025-08-25', 1),
(18, 'แผนอาหารจาก AI (7 วัน)', 'แผนอาหารที่สร้างโดย AI สำหรับ 7 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มใส่ไข่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไข่ไก่\\\",\\\"cal\\\":667,\\\"carb\\\":56,\\\"fat\\\":15,\\\"protein\\\":31,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"cal\\\":889,\\\"carb\\\":79,\\\"fat\\\":21,\\\"protein\\\":43,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"cal\\\":667,\\\"carb\\\":43,\\\"fat\\\":19,\\\"protein\\\":51,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวผัดกระเพราหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดกระเพราหมู\\\",\\\"cal\\\":667,\\\"carb\\\":68,\\\"fat\\\":23,\\\"protein\\\":36,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ส้มตำปูม้า\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ส้มตำปูม้า\\\",\\\"cal\\\":889,\\\"carb\\\":89,\\\"fat\\\":26,\\\"protein\\\":41,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงเขียวหวานปลาช่อน\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงเขียวหวานปลาช่อน\\\",\\\"cal\\\":667,\\\"carb\\\":54,\\\"fat\\\":20,\\\"protein\\\":45,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":667,\\\"carb\\\":70,\\\"fat\\\":24,\\\"protein\\\":32,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ปูผัดผงกระหรี่\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ปูผัดผงกระหรี่\\\",\\\"cal\\\":889,\\\"carb\\\":81,\\\"fat\\\":27,\\\"protein\\\":44,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"cal\\\":667,\\\"carb\\\":56,\\\"fat\\\":20,\\\"protein\\\":48,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"4\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ขนมจีนน้ำเงี้ยว\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ขนมจีนน้ำเงี้ยว\\\",\\\"cal\\\":667,\\\"carb\\\":67,\\\"fat\\\":23,\\\"protein\\\":34,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"หมูทอดกระเทียม\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"หมูทอดกระเทียม\\\",\\\"cal\\\":889,\\\"carb\\\":82,\\\"fat\\\":28,\\\"protein\\\":42,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"cal\\\":667,\\\"carb\\\":53,\\\"fat\\\":21,\\\"protein\\\":49,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"5\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวขาหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวขาหมู\\\",\\\"cal\\\":667,\\\"carb\\\":68,\\\"fat\\\":24,\\\"protein\\\":36,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"หมูกรอบ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"หมูกรอบ\\\",\\\"cal\\\":889,\\\"carb\\\":81,\\\"fat\\\":27,\\\"protein\\\":44,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงเขียวหวานไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงเขียวหวานไก่\\\",\\\"cal\\\":667,\\\"carb\\\":54,\\\"fat\\\":20,\\\"protein\\\":45,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"6\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":667,\\\"carb\\\":70,\\\"fat\\\":24,\\\"protein\\\":32,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดไทยกุ้งสด\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ผัดไทยกุ้งสด\\\",\\\"cal\\\":889,\\\"carb\\\":80,\\\"fat\\\":26,\\\"protein\\\":43,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มกุ้ง\\\",\\\"cal\\\":667,\\\"carb\\\":56,\\\"fat\\\":20,\\\"protein\\\":48,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"7\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวไข่เจียว\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวไข่เจียว\\\",\\\"cal\\\":667,\\\"carb\\\":68,\\\"fat\\\":23,\\\"protein\\\":36,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"แกงมัสมั่นไก่\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"แกงมัสมั่นไก่\\\",\\\"cal\\\":889,\\\"carb\\\":81,\\\"fat\\\":27,\\\"protein\\\":44,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มชะอมปลาช่อน\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มชะอมปลาช่อน\\\",\\\"cal\\\":667,\\\"carb\\\":54,\\\"fat\\\":20,\\\"protein\\\":45,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, 3, '2025-08-25', 1),
(19, 'แผนอาหารจาก AI (7 วัน)', 'แผนอาหารที่สร้างโดย AI สำหรับ 7 วัน', '{\"1\":{\"totalCal\":2223,\"meals\":{\"breakfast\":{\"name\":\"ข้าวต้มใส่ไข่\",\"time\":\"07:00\",\"items\":[{\"id\":\"1755666835696_0.7376632228466802\",\"name\":\"ข้าวต้มไข่ไก่\",\"cal\":667,\"carb\":57,\"fat\":16,\"protein\":28,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667},\"lunch\":{\"name\":\"ผัดกะเพราหมูสับ\",\"time\":\"12:00\",\"items\":[{\"id\":\"1755666835702_0.9081488537374914\",\"name\":\"ผัดกะเพราหมูสับ\",\"cal\":889,\"carb\":80,\"fat\":22,\"protein\":43,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":889},\"dinner\":{\"name\":\"ต้มยำกุ้ง\",\"time\":\"18:00\",\"items\":[{\"id\":\"1755666835704_0.7856291698980394\",\"name\":\"ต้มยำกุ้ง\",\"cal\":667,\"carb\":44,\"fat\":19,\"protein\":46,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667}}},\"2\":{\"totalCal\":2223,\"meals\":{\"breakfast\":{\"name\":\"ข้าวมันไก่\",\"time\":\"07:00\",\"items\":[{\"id\":\"1755666835709_0.8480698490277341\",\"name\":\"ข้าวมันไก่\",\"cal\":667,\"carb\":57,\"fat\":16,\"protein\":28,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667},\"lunch\":{\"name\":\"แกงเขียวหวานไก่\",\"time\":\"12:00\",\"items\":[{\"id\":\"1755666835713_0.6537977693666048\",\"name\":\"แกงเขียวหวานไก่\",\"cal\":889,\"carb\":80,\"fat\":22,\"protein\":43,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":889},\"dinner\":{\"name\":\"ผัดผักรวม\",\"time\":\"18:00\",\"items\":[{\"id\":\"1755666835716_0.6018367832122034\",\"name\":\"ผัดผักรวม\",\"cal\":667,\"carb\":44,\"fat\":19,\"protein\":46,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667}}},\"3\":{\"totalCal\":2223,\"meals\":{\"breakfast\":{\"name\":\"ขนมปังปิ้ง\",\"time\":\"07:00\",\"items\":[{\"id\":\"1755666835726_0.24313726563988006\",\"name\":\"ขนมปังปิ้ง\",\"cal\":667,\"carb\":57,\"fat\":16,\"protein\":28,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667},\"lunch\":{\"name\":\"ข้าวผัดปู\",\"time\":\"12:00\",\"items\":[{\"id\":\"1755666835729_0.31373932971087487\",\"name\":\"ข้าวผัดปู\",\"cal\":889,\"carb\":80,\"fat\":22,\"protein\":43,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":889},\"dinner\":{\"name\":\"แกงมัสมั่นเนื้อ\",\"time\":\"18:00\",\"items\":[{\"id\":\"1755666835734_0.9415972205237728\",\"name\":\"แกงมัสมั่นเนื้อ\",\"cal\":667,\"carb\":44,\"fat\":19,\"protein\":46,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667}}},\"4\":{\"totalCal\":2223,\"meals\":{\"breakfast\":{\"name\":\"โจ๊กหมู\",\"time\":\"07:00\",\"items\":[{\"id\":\"1755666835738_0.029216288268345502\",\"name\":\"โจ๊กหมู\",\"cal\":667,\"carb\":57,\"fat\":16,\"protein\":28,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667},\"lunch\":{\"name\":\"ข้าวหมูแดง\",\"time\":\"12:00\",\"items\":[{\"id\":\"1755666835741_0.5031213886011138\",\"name\":\"ข้าวหมูแดง\",\"cal\":889,\"carb\":80,\"fat\":22,\"protein\":43,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":889},\"dinner\":{\"name\":\"ปลาทูน่าทอด\",\"time\":\"18:00\",\"items\":[{\"id\":\"1755666835745_0.1824549803981099\",\"name\":\"ปลาทูน่าทอด\",\"cal\":667,\"carb\":44,\"fat\":19,\"protein\":46,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667}}},\"5\":{\"totalCal\":2223,\"meals\":{\"breakfast\":{\"name\":\"ข้าวมันไก่\",\"time\":\"07:00\",\"items\":[{\"id\":\"1755666835750_0.44438174091804594\",\"name\":\"ข้าวมันไก่\",\"cal\":667,\"carb\":57,\"fat\":16,\"protein\":28,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667},\"lunch\":{\"name\":\"ผัดพริกแกงหมู\",\"time\":\"12:00\",\"items\":[{\"id\":\"1755666835752_0.2719329689792822\",\"name\":\"ผัดพริกแกงหมู\",\"cal\":889,\"carb\":80,\"fat\":22,\"protein\":43,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":889},\"dinner\":{\"name\":\"ต้มยำกุ้ง\",\"time\":\"18:00\",\"items\":[{\"id\":\"1755666835757_0.5263559342866563\",\"name\":\"ต้มยำกุ้ง\",\"cal\":667,\"carb\":44,\"fat\":19,\"protein\":46,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667}}},\"6\":{\"totalCal\":2223,\"meals\":{\"breakfast\":{\"name\":\"ข้าวต้มไก่\",\"time\":\"07:00\",\"items\":[{\"id\":\"1755666835761_0.22224343899645332\",\"name\":\"ข้าวต้มไก่\",\"cal\":667,\"carb\":57,\"fat\":16,\"protein\":28,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667},\"lunch\":{\"name\":\"ผัดกระเพราหมู\",\"time\":\"12:00\",\"items\":[{\"id\":\"1755666835763_0.8828602768058491\",\"name\":\"ผัดกระเพราหมู\",\"cal\":889,\"carb\":80,\"fat\":22,\"protein\":43,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":889},\"dinner\":{\"name\":\"แกงจืดวุ้นเส้น\",\"time\":\"18:00\",\"items\":[{\"id\":\"1755666835767_0.647011539278282\",\"name\":\"แกงจืดวุ้นเส้น\",\"cal\":667,\"carb\":44,\"fat\":19,\"protein\":46,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667}}},\"7\":{\"totalCal\":2223,\"meals\":{\"breakfast\":{\"name\":\"ข้าวผัดกุ้ง\",\"time\":\"07:00\",\"items\":[{\"id\":\"1755666835771_0.16931614138168372\",\"name\":\"ข้าวผัดกุ้ง\",\"cal\":667,\"carb\":57,\"fat\":16,\"protein\":28,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667},\"lunch\":{\"name\":\"แกงเขียวหวานไก่\",\"time\":\"12:00\",\"items\":[{\"id\":\"1755666835773_0.6137866458333734\",\"name\":\"แกงเขียวหวานไก่\",\"cal\":889,\"carb\":80,\"fat\":22,\"protein\":43,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":889},\"dinner\":{\"name\":\"ผัดคะน้าหมูกรอบ\",\"time\":\"18:00\",\"items\":[{\"id\":\"1755666835775_0.12369150119508251\",\"name\":\"ผัดคะน้าหมูกรอบ\",\"cal\":667,\"carb\":44,\"fat\":19,\"protein\":46,\"img\":null,\"ingredient\":\"\",\"source\":\"ai\",\"isUserFood\":false}],\"totalCal\":667}}}}', NULL, 3, '2025-08-22', 1),
(20, 'แผนอาหารจาก AI (7 วัน)', 'แผนอาหารที่สร้างโดย AI สำหรับ 7 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มใส่ไข่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไข่ไก่\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวราดแกงเขียวหวานไก่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวราดแกงเขียวหวานไก่\\\",\\\"cal\\\":667,\\\"carb\\\":80,\\\"fat\\\":22,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดผักรวมมิตร\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ผัดผักรวมมิตร\\\",\\\"cal\\\":720,\\\"carb\\\":60,\\\"fat\\\":24,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":540,\\\"carb\\\":55,\\\"fat\\\":15,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ขนมจีนน้ำยา\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ขนมจีนน้ำยา\\\",\\\"cal\\\":667,\\\"carb\\\":80,\\\"fat\\\":22,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"หมูผัดผงกระหรี่\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"หมูผัดผงกระหรี่\\\",\\\"cal\\\":720,\\\"carb\\\":60,\\\"fat\\\":24,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มข่าไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ต้มข่าไก่\\\",\\\"cal\\\":540,\\\"carb\\\":55,\\\"fat\\\":15,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"4\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดไทยกุ้งสด\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ผัดไทยกุ้งสด\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"5\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวผัด\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัด\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ข้าวหมูแดง\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวหมูแดง\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"6\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวหมูกรอบ\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวหมูกรอบ\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกะเพราไก่ไข่ดาว\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราไก่ไข่ดาว\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มหมู\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มหมู\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"7\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวราดแกงเผ็ดหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวราดแกงเผ็ดหมู\\\",\\\"cal\\\":667,\\\"carb\\\":80,\\\"fat\\\":22,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ข้าวผัดปู\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดปู\\\",\\\"cal\\\":720,\\\"carb\\\":60,\\\"fat\\\":24,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงมัสมั่นไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"แกงมัสมั่นไก่\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, NULL, NULL, 0),
(21, 'plan-test-2 (คัดลอก)', 'เพิ่มน้ำหนัก', '\"{\\\"1\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":300,\\\"carb\\\":40,\\\"fat\\\":8,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":370},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดไข่ + ไก่ทอด\\\",\\\"cal\\\":750,\\\"carb\\\":70,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"cal\\\":200,\\\"carb\\\":10,\\\"fat\\\":10,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่เจียวไม่ใส่ผัก\\\",\\\"cal\\\":300,\\\"carb\\\":0,\\\"fat\\\":25,\\\"protein\\\":12,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}},\\\"2\\\":{\\\"totalCal\\\":1770,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวเหนียวหมูปิ้ง (3 ไม้)\\\",\\\"cal\\\":400,\\\"carb\\\":45,\\\"fat\\\":15,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวราดหน้าไก่\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ดาว 1 ฟอง\\\",\\\"cal\\\":100,\\\"carb\\\":0,\\\"fat\\\":8,\\\"protein\\\":7,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดกุ้ง (ไม่ใส่ผักชี)\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":670}}},\\\"3\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"โจ๊กหมูใส่ไข่\\\",\\\"cal\\\":350,\\\"carb\\\":40,\\\"fat\\\":10,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":350},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดหมู + ไข่ดาว\\\",\\\"cal\\\":700,\\\"carb\\\":65,\\\"fat\\\":30,\\\"protein\\\":28,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไก่ย่าง 1/4 ตัว + ข้าวเหนียว 1 ห่อ\\\",\\\"cal\\\":500,\\\"carb\\\":50,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"น้ำตกหมู (ไม่ใส่ผักเหม็นเขียว)\\\",\\\"cal\\\":300,\\\"carb\\\":15,\\\"fat\\\":15,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":800}}},\\\"4\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ขนมปังปิ้ง 2 แผ่น + เนยถั่ว + กล้วยหอม 1 ลูก\\\",\\\"cal\\\":400,\\\"carb\\\":55,\\\"fat\\\":15,\\\"protein\\\":10,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวขาหมู (ไม่เอาหนังมากนัก)\\\",\\\"cal\\\":600,\\\"carb\\\":50,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ปลาทอดกระเทียม + ข้าวสวย 1.5 ถ้วย\\\",\\\"cal\\\":500,\\\"carb\\\":60,\\\"fat\\\":20,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่เจียวหมูสับ (ไม่ใส่ผัก)\\\",\\\"cal\\\":350,\\\"carb\\\":5,\\\"fat\\\":30,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":850}}},\\\"5\\\":{\\\"totalCal\\\":1900,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวเหนียวหมูฝอย + ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":450,\\\"carb\\\":50,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":450},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ผัดซีอิ๊วหมู\\\",\\\"cal\\\":650,\\\"carb\\\":70,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":650},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ต้มยำกุ้งน้ำข้น (ไม่ใส่ผักชี/ผักเหม็นเขียว) + ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":450,\\\"carb\\\":40,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"หมูทอดกระเทียม\\\",\\\"cal\\\":350,\\\"carb\\\":10,\\\"fat\\\":25,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":800}}},\\\"6\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แซนด์วิชทูน่า (ไม่ใส่ผักเหม็นเขียว) + นมจืด 1 กล่อง\\\",\\\"cal\\\":400,\\\"carb\\\":40,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"กะเพราหมูสับไข่ดาว (ไม่ใส่ผักชี)\\\",\\\"cal\\\":700,\\\"carb\\\":60,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"สเต็กหมู/ไก่ (เลือกเนื้อแดงติดมันเล็กน้อย) + มันบด\\\",\\\"cal\\\":750,\\\"carb\\\":50,\\\"fat\\\":40,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750}}},\\\"7\\\":{\\\"totalCal\\\":1830,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวไข่เจียวหมูสับ + ไส้กรอก 2 ชิ้น\\\",\\\"cal\\\":500,\\\"carb\\\":40,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":500},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวซอยไก่ (ไม่ใส่ผักชี/ผักเหม็นเขียว)\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"สุกี้น้ำ/แห้ง (เลือกเนื้อสัตว์ โปรตีนสูง ไม่ใส่ผักเหม็นเขียว)\\\",\\\"cal\\\":500,\\\"carb\\\":30,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}}}\"', NULL, NULL, NULL, 0),
(22, 'plan1', 'Plan1 des', '{\"1\":{\"totalCal\":1450,\"meals\":{\"breakfast\":{\"name\":\"อาหารมื้อเช้า\",\"time\":\"07:00\",\"items\":[{\"id\":\"global_1\",\"name\":\"ข้าวผัดหมู\",\"cal\":550,\"carb\":65,\"fat\":20,\"protein\":15,\"img\":\"/foods/1753376625003-cv634ylfb.jpg\",\"ingredient\":\"\",\"source\":\"foods\",\"isUserFood\":false},{\"id\":\"user_20_1755072318353_o3v6vljef\",\"name\":\"ข้าวหมา\",\"cal\":300,\"carb\":20,\"fat\":30,\"protein\":40,\"img\":\"/images/user_foods/1755072294286_549810228.jpeg\",\"ingredient\":\"\",\"source\":\"user_food\",\"isUserFood\":true}],\"totalCal\":850},\"lunch\":{\"name\":\"อาหารมื้อกลางวัน\",\"time\":\"12:00\",\"items\":[{\"id\":\"global_2\",\"name\":\"ข้าวมันไก่\",\"cal\":600,\"carb\":55,\"fat\":25,\"protein\":30,\"img\":\"/foods/1750673087601-h8pdg0d6m.jpg\",\"ingredient\":\"\",\"source\":\"foods\",\"isUserFood\":false}],\"totalCal\":600}}}}', '/images/user_food_plans/1754267112447_645434557.jpeg', 3, NULL, 0),
(23, 'plan1', 'Plan1 des', '\"{\\\"1\\\":{\\\"totalCal\\\":1250,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00\\\",\\\"name\\\":\\\"อาหารมื้อเช้า\\\",\\\"items\\\":[{\\\"id\\\":\\\"user_19\\\",\\\"name\\\":\\\"ไก่ผัดกะหล่ำโพด\\\",\\\"cal\\\":350,\\\"carb\\\":15,\\\"fat\\\":20,\\\"protein\\\":30,\\\"img\\\":\\\"/images/user_foods/1754278090870_743982645.jpg\\\",\\\"ingredient\\\":\\\"ไก่, กระหล่ำ, ไข่, น้ำจิ้มสุกี้\\\",\\\"source\\\":\\\"user_food\\\",\\\"isUserFood\\\":true}],\\\"totalCal\\\":350},\\\"lunch\\\":{\\\"time\\\":\\\"12:00\\\",\\\"name\\\":\\\"อาหารมื้อกลางวัน\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"meal_1754278221491\\\":{\\\"time\\\":\\\"17:29\\\",\\\"name\\\":\\\"ดึก\\\",\\\"items\\\":[{\\\"id\\\":\\\"user_19\\\",\\\"name\\\":\\\"ไก่ผัดกะหล่ำโพด\\\",\\\"cal\\\":350,\\\"carb\\\":15,\\\"fat\\\":20,\\\"protein\\\":30,\\\"img\\\":\\\"/images/user_foods/1754278090870_743982645.jpg\\\",\\\"ingredient\\\":\\\"ไก่, กระหล่ำ, ไข่, น้ำจิ้มสุกี้\\\",\\\"source\\\":\\\"user_food\\\",\\\"isUserFood\\\":true}],\\\"totalCal\\\":350}}}}\"', '/images/user_food_plans/1754278281280_277542555.jpeg', NULL, NULL, 0),
(24, 'plan-test-2 (คัดลอก)', 'เพิ่มน้ำหนัก', '\"{\\\"1\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":300,\\\"carb\\\":40,\\\"fat\\\":8,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":370},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดไข่ + ไก่ทอด\\\",\\\"cal\\\":750,\\\"carb\\\":70,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"cal\\\":200,\\\"carb\\\":10,\\\"fat\\\":10,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่เจียวไม่ใส่ผัก\\\",\\\"cal\\\":300,\\\"carb\\\":0,\\\"fat\\\":25,\\\"protein\\\":12,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}},\\\"2\\\":{\\\"totalCal\\\":1770,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวเหนียวหมูปิ้ง (3 ไม้)\\\",\\\"cal\\\":400,\\\"carb\\\":45,\\\"fat\\\":15,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวราดหน้าไก่\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ดาว 1 ฟอง\\\",\\\"cal\\\":100,\\\"carb\\\":0,\\\"fat\\\":8,\\\"protein\\\":7,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดกุ้ง (ไม่ใส่ผักชี)\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":670}}},\\\"3\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"โจ๊กหมูใส่ไข่\\\",\\\"cal\\\":350,\\\"carb\\\":40,\\\"fat\\\":10,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":350},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดหมู + ไข่ดาว\\\",\\\"cal\\\":700,\\\"carb\\\":65,\\\"fat\\\":30,\\\"protein\\\":28,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไก่ย่าง 1/4 ตัว + ข้าวเหนียว 1 ห่อ\\\",\\\"cal\\\":500,\\\"carb\\\":50,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"น้ำตกหมู (ไม่ใส่ผักเหม็นเขียว)\\\",\\\"cal\\\":300,\\\"carb\\\":15,\\\"fat\\\":15,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":800}}},\\\"4\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ขนมปังปิ้ง 2 แผ่น + เนยถั่ว + กล้วยหอม 1 ลูก\\\",\\\"cal\\\":400,\\\"carb\\\":55,\\\"fat\\\":15,\\\"protein\\\":10,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวขาหมู (ไม่เอาหนังมากนัก)\\\",\\\"cal\\\":600,\\\"carb\\\":50,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ปลาทอดกระเทียม + ข้าวสวย 1.5 ถ้วย\\\",\\\"cal\\\":500,\\\"carb\\\":60,\\\"fat\\\":20,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่เจียวหมูสับ (ไม่ใส่ผัก)\\\",\\\"cal\\\":350,\\\"carb\\\":5,\\\"fat\\\":30,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":850}}},\\\"5\\\":{\\\"totalCal\\\":1900,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวเหนียวหมูฝอย + ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":450,\\\"carb\\\":50,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":450},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ผัดซีอิ๊วหมู\\\",\\\"cal\\\":650,\\\"carb\\\":70,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":650},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ต้มยำกุ้งน้ำข้น (ไม่ใส่ผักชี/ผักเหม็นเขียว) + ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":450,\\\"carb\\\":40,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"หมูทอดกระเทียม\\\",\\\"cal\\\":350,\\\"carb\\\":10,\\\"fat\\\":25,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":800}}},\\\"6\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แซนด์วิชทูน่า (ไม่ใส่ผักเหม็นเขียว) + นมจืด 1 กล่อง\\\",\\\"cal\\\":400,\\\"carb\\\":40,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"กะเพราหมูสับไข่ดาว (ไม่ใส่ผักชี)\\\",\\\"cal\\\":700,\\\"carb\\\":60,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"สเต็กหมู/ไก่ (เลือกเนื้อแดงติดมันเล็กน้อย) + มันบด\\\",\\\"cal\\\":750,\\\"carb\\\":50,\\\"fat\\\":40,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750}}},\\\"7\\\":{\\\"totalCal\\\":1830,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวไข่เจียวหมูสับ + ไส้กรอก 2 ชิ้น\\\",\\\"cal\\\":500,\\\"carb\\\":40,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":500},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวซอยไก่ (ไม่ใส่ผักชี/ผักเหม็นเขียว)\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"สุกี้น้ำ/แห้ง (เลือกเนื้อสัตว์ โปรตีนสูง ไม่ใส่ผักเหม็นเขียว)\\\",\\\"cal\\\":500,\\\"carb\\\":30,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}}}\"', NULL, NULL, NULL, 0);
INSERT INTO `user_food_plans` (`id`, `name`, `description`, `plan`, `img`, `user_id`, `plan_start_date`, `is_repeat`) VALUES
(25, 'แผนอาหารจาก AI (3 วัน)', 'แผนอาหารที่สร้างโดย AI สำหรับ 3 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2151,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มใส่ไข่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":645,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไข่ไก่\\\",\\\"cal\\\":645,\\\"carb\\\":54,\\\"fat\\\":18,\\\"protein\\\":32,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":860,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"cal\\\":860,\\\"carb\\\":75,\\\"fat\\\":23,\\\"protein\\\":45,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":645,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"cal\\\":645,\\\"carb\\\":42,\\\"fat\\\":22,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2151,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวผัดกุ้ง\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":645,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดกุ้ง\\\",\\\"cal\\\":645,\\\"carb\\\":56,\\\"fat\\\":20,\\\"protein\\\":31,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ข้าวหมูกรอบ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":860,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวหมูกรอบ\\\",\\\"cal\\\":860,\\\"carb\\\":58,\\\"fat\\\":30,\\\"protein\\\":43,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ส้มตำปูม้า\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":645,\\\"items\\\":[{\\\"name\\\":\\\"ส้มตำปูม้า\\\",\\\"cal\\\":645,\\\"carb\\\":42,\\\"fat\\\":18,\\\"protein\\\":38,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2151,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวขาหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":645,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวขาหมู\\\",\\\"cal\\\":645,\\\"carb\\\":44,\\\"fat\\\":25,\\\"protein\\\":32,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดซีอิ๊วกุ้ง\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":860,\\\"items\\\":[{\\\"name\\\":\\\"ผัดซีอิ๊วกุ้ง\\\",\\\"cal\\\":860,\\\"carb\\\":70,\\\"fat\\\":28,\\\"protein\\\":44,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มข่าไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":645,\\\"items\\\":[{\\\"name\\\":\\\"ต้มข่าไก่\\\",\\\"cal\\\":645,\\\"carb\\\":46,\\\"fat\\\":21,\\\"protein\\\":39,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, NULL, NULL, 0),
(27, 'แผนอาหารจาก AI (7 วัน)', 'แผนอาหารที่สร้างโดย AI สำหรับ 7 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มใส่ไข่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไข่ไก่\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2226,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวหมูแดดเดียว\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวหมูแดดเดียว\\\",\\\"cal\\\":668,\\\"carb\\\":80,\\\"fat\\\":27,\\\"protein\\\":29,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":890,\\\"items\\\":[{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"cal\\\":890,\\\"carb\\\":70,\\\"fat\\\":41,\\\"protein\\\":55,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ส้มตำปูม้า\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ส้มตำปูม้า\\\",\\\"cal\\\":668,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":33,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2226,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":668,\\\"carb\\\":78,\\\"fat\\\":21,\\\"protein\\\":32,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"แกงจืดไข่\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":890,\\\"items\\\":[{\\\"name\\\":\\\"แกงจืดไข่\\\",\\\"cal\\\":890,\\\"carb\\\":65,\\\"fat\\\":45,\\\"protein\\\":45,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ข้าวผัดหนำเลียบ\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดหนำเลียบ\\\",\\\"cal\\\":668,\\\"carb\\\":85,\\\"fat\\\":28,\\\"protein\\\":27,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"4\\\":{\\\"totalCal\\\":2226,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวราดแกงส้มชะอม\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวราดแกงส้มชะอม\\\",\\\"cal\\\":668,\\\"carb\\\":80,\\\"fat\\\":24,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"หมูผัดน้ำปลา\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":890,\\\"items\\\":[{\\\"name\\\":\\\"หมูผัดน้ำปลา\\\",\\\"cal\\\":890,\\\"carb\\\":75,\\\"fat\\\":42,\\\"protein\\\":50,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มข่าไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ต้มข่าไก่\\\",\\\"cal\\\":668,\\\"carb\\\":60,\\\"fat\\\":22,\\\"protein\\\":38,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"5\\\":{\\\"totalCal\\\":2226,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวราดแกงฟักทอง\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวราดแกงฟักทอง\\\",\\\"cal\\\":668,\\\"carb\\\":85,\\\"fat\\\":26,\\\"protein\\\":28,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"หมูกรอบ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":890,\\\"items\\\":[{\\\"name\\\":\\\"หมูกรอบ\\\",\\\"cal\\\":890,\\\"carb\\\":50,\\\"fat\\\":55,\\\"protein\\\":45,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ยำขนมจีน\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ยำขนมจีน\\\",\\\"cal\\\":668,\\\"carb\\\":75,\\\"fat\\\":22,\\\"protein\\\":33,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"6\\\":{\\\"totalCal\\\":2226,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวหมูแดดเดียว\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวหมูแดดเดียว\\\",\\\"cal\\\":668,\\\"carb\\\":80,\\\"fat\\\":27,\\\"protein\\\":29,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"สปาเก็ตตี้ผัดพริกแกงหมู\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":890,\\\"items\\\":[{\\\"name\\\":\\\"สปาเก็ตตี้ผัดพริกแกงหมู\\\",\\\"cal\\\":890,\\\"carb\\\":75,\\\"fat\\\":35,\\\"protein\\\":47,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ยำวุ้นเส้น\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":668,\\\"items\\\":[{\\\"name\\\":\\\"ยำวุ้นเส้น\\\",\\\"cal\\\":668,\\\"carb\\\":80,\\\"fat\\\":20,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"7\\\":{\\\"totalCal\\\":2226,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มไข่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไข่ไก่\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, 3, NULL, 0),
(28, 'แผนอาหารจาก AI', 'Gg', '\"{\\\"1\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มใส่ไข่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไข่ไก่\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราหมูสับ\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกระเพราไก่\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกระเพราไก่\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"4\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"5\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกระเพราไก่\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกระเพราไก่\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"6\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดพริกแกงหมู\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"แกงส้มชะอมกุ้ง\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"7\\\":{\\\"totalCal\\\":1800,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"time\\\":\\\"07:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":540,\\\"carb\\\":45,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"ผัดกระเพราไก่\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":720,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกระเพราไก่\\\",\\\"cal\\\":720,\\\"carb\\\":65,\\\"fat\\\":18,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":540,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"cal\\\":540,\\\"carb\\\":35,\\\"fat\\\":15,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', '/images/user_food_plans/1756629791859_410274087.jpeg', 3, NULL, 0),
(30, 'planTest (คัดลอก)', 'planTest description', '\"{\\\"1\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":300,\\\"carb\\\":40,\\\"fat\\\":8,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":370},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดไข่ + ไก่ทอด\\\",\\\"cal\\\":750,\\\"carb\\\":70,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"cal\\\":200,\\\"carb\\\":10,\\\"fat\\\":10,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่เจียวไม่ใส่ผัก\\\",\\\"cal\\\":300,\\\"carb\\\":0,\\\"fat\\\":25,\\\"protein\\\":12,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}},\\\"2\\\":{\\\"totalCal\\\":1900,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวเหนียวหมูปิ้ง (3 ไม้)\\\",\\\"cal\\\":400,\\\"carb\\\":45,\\\"fat\\\":15,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"กล้วยหอม 1 ลูก\\\",\\\"cal\\\":100,\\\"carb\\\":27,\\\"fat\\\":0,\\\"protein\\\":1,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":500},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวราดพะแนงหมู + แตงกวา\\\",\\\"cal\\\":700,\\\"carb\\\":50,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่พะโล้ 1 ฟอง + หมูพะโล้\\\",\\\"cal\\\":350,\\\"carb\\\":10,\\\"fat\\\":25,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ผัดถั่วงอกเต้าหู้\\\",\\\"cal\\\":120,\\\"carb\\\":8,\\\"fat\\\":6,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700}}},\\\"3\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวไข่กระทะ\\\",\\\"cal\\\":350,\\\"carb\\\":25,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"นมจืด 1 กล่อง\\\",\\\"cal\\\":130,\\\"carb\\\":10,\\\"fat\\\":7,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":480},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวกะเพราหมูไข่ดาว (ไม่ใส่ถั่วฝักยาว)\\\",\\\"cal\\\":800,\\\"carb\\\":60,\\\"fat\\\":40,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":800},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ต้มยำน้ำใสปลากะพง\\\",\\\"cal\\\":270,\\\"carb\\\":5,\\\"fat\\\":12,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":570}}},\\\"4\\\":{\\\"totalCal\\\":1870,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"โจ๊กหมูไม่ใส่เครื่องใน\\\",\\\"cal\\\":250,\\\"carb\\\":35,\\\"fat\\\":5,\\\"protein\\\":10,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ลวก 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":320},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวหมูกระเทียม + ต้มจืดผักกาดขาว\\\",\\\"cal\\\":820,\\\"carb\\\":60,\\\"fat\\\":30,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":820},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ปลาทูทอด\\\",\\\"cal\\\":320,\\\"carb\\\":0,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"น้ำพริกกะปิ (ไม่ใส่ผักแนม)\\\",\\\"cal\\\":180,\\\"carb\\\":8,\\\"fat\\\":10,\\\"protein\\\":5,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}},\\\"5\\\":{\\\"totalCal\\\":1920,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แซนด์วิชไข่ต้ม\\\",\\\"cal\\\":300,\\\"carb\\\":30,\\\"fat\\\":10,\\\"protein\\\":10,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"โยเกิร์ตไม่หวาน\\\",\\\"cal\\\":150,\\\"carb\\\":15,\\\"fat\\\":4,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":450},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดพริกแกงหมูกรอบ (ไม่ใส่ถั่ว)\\\",\\\"cal\\\":850,\\\"carb\\\":65,\\\"fat\\\":40,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":850},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไก่ต้มน้ำปลา\\\",\\\"cal\\\":290,\\\"carb\\\":5,\\\"fat\\\":15,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แกงจืดฟักหมูสับ\\\",\\\"cal\\\":100,\\\"carb\\\":5,\\\"fat\\\":4,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":620}}},\\\"6\\\":{\\\"totalCal\\\":1860,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่กระทะ\\\",\\\"cal\\\":300,\\\"carb\\\":10,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"กล้วยต้ม\\\",\\\"cal\\\":150,\\\"carb\\\":35,\\\"fat\\\":0,\\\"protein\\\":1,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":450},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ราดหน้าหมู (คะน้าน้อย)\\\",\\\"cal\\\":750,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าว\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ลูกเขย\\\",\\\"cal\\\":300,\\\"carb\\\":10,\\\"fat\\\":20,\\\"protein\\\":8,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ผัดวุ้นเส้นหมูสับ\\\",\\\"cal\\\":130,\\\"carb\\\":15,\\\"fat\\\":5,\\\"protein\\\":8,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":660}}},\\\"7\\\":{\\\"totalCal\\\":1900,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวต้มไก่ฉีก\\\",\\\"cal\\\":300,\\\"carb\\\":40,\\\"fat\\\":5,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"น้ำส้มคั้นสด\\\",\\\"cal\\\":120,\\\"carb\\\":30,\\\"fat\\\":0,\\\"protein\\\":1,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":420},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวขาหมูไม่เอาหนัง + ไข่พะโล้\\\",\\\"cal\\\":850,\\\"carb\\\":55,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":850},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าว\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ปลานิลทอด\\\",\\\"cal\\\":300,\\\"carb\\\":0,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แกงจืดมะระยัดไส้\\\",\\\"cal\\\":100,\\\"carb\\\":5,\\\"fat\\\":5,\\\"protein\\\":5,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":630}}}}\"', NULL, 5, NULL, 0),
(32, 'plan3day', NULL, '\"{\\\"1\\\":{\\\"totalCal\\\":1700,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"08:30\\\",\\\"name\\\":\\\"มื้อเช้า\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"lunch\\\":{\\\"time\\\":\\\"12:30\\\",\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_2\\\",\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":600,\\\"carb\\\":55,\\\"fat\\\":25,\\\"protein\\\":30,\\\"img\\\":\\\"/foods/1750673087601-h8pdg0d6m.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:30\\\",\\\"name\\\":\\\"มื้อเย็น\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550}}},\\\"2\\\":{\\\"totalCal\\\":1650,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"08:30\\\",\\\"name\\\":\\\"มื้อเช้า\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"lunch\\\":{\\\"time\\\":\\\"12:30\\\",\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"dinner\\\":{\\\"time\\\":\\\"18:30\\\",\\\"name\\\":\\\"มื้อเย็น\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550}}},\\\"3\\\":{\\\"totalCal\\\":1650,\\\"meals\\\":{\\\"lunch\\\":{\\\"time\\\":\\\"12:30\\\",\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"breakfast\\\":{\\\"time\\\":\\\"08:30\\\",\\\"name\\\":\\\"มื้อเช้า\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"dinner\\\":{\\\"time\\\":\\\"18:30\\\",\\\"name\\\":\\\"มื้อเย็น\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550}}}}\"', NULL, 10, NULL, 0),
(33, 'plan-test-2 (คัดลอก)', 'เพิ่มน้ำหนัก', '\"{\\\"1\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":300,\\\"carb\\\":40,\\\"fat\\\":8,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":370},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดไข่ + ไก่ทอด\\\",\\\"cal\\\":750,\\\"carb\\\":70,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แกงจืดเต้าหู้หมูสับ\\\",\\\"cal\\\":200,\\\"carb\\\":10,\\\"fat\\\":10,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่เจียวไม่ใส่ผัก\\\",\\\"cal\\\":300,\\\"carb\\\":0,\\\"fat\\\":25,\\\"protein\\\":12,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}},\\\"2\\\":{\\\"totalCal\\\":1770,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวเหนียวหมูปิ้ง (3 ไม้)\\\",\\\"cal\\\":400,\\\"carb\\\":45,\\\"fat\\\":15,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวราดหน้าไก่\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ดาว 1 ฟอง\\\",\\\"cal\\\":100,\\\"carb\\\":0,\\\"fat\\\":8,\\\"protein\\\":7,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดกุ้ง (ไม่ใส่ผักชี)\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":70,\\\"carb\\\":0,\\\"fat\\\":5,\\\"protein\\\":6,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":670}}},\\\"3\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"โจ๊กหมูใส่ไข่\\\",\\\"cal\\\":350,\\\"carb\\\":40,\\\"fat\\\":10,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":350},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวผัดหมู + ไข่ดาว\\\",\\\"cal\\\":700,\\\"carb\\\":65,\\\"fat\\\":30,\\\"protein\\\":28,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไก่ย่าง 1/4 ตัว + ข้าวเหนียว 1 ห่อ\\\",\\\"cal\\\":500,\\\"carb\\\":50,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"น้ำตกหมู (ไม่ใส่ผักเหม็นเขียว)\\\",\\\"cal\\\":300,\\\"carb\\\":15,\\\"fat\\\":15,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":800}}},\\\"4\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ขนมปังปิ้ง 2 แผ่น + เนยถั่ว + กล้วยหอม 1 ลูก\\\",\\\"cal\\\":400,\\\"carb\\\":55,\\\"fat\\\":15,\\\"protein\\\":10,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวขาหมู (ไม่เอาหนังมากนัก)\\\",\\\"cal\\\":600,\\\"carb\\\":50,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ปลาทอดกระเทียม + ข้าวสวย 1.5 ถ้วย\\\",\\\"cal\\\":500,\\\"carb\\\":60,\\\"fat\\\":20,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ไข่เจียวหมูสับ (ไม่ใส่ผัก)\\\",\\\"cal\\\":350,\\\"carb\\\":5,\\\"fat\\\":30,\\\"protein\\\":15,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":850}}},\\\"5\\\":{\\\"totalCal\\\":1900,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวเหนียวหมูฝอย + ไข่ต้ม 1 ฟอง\\\",\\\"cal\\\":450,\\\"carb\\\":50,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":450},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ผัดซีอิ๊วหมู\\\",\\\"cal\\\":650,\\\"carb\\\":70,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":650},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ต้มยำกุ้งน้ำข้น (ไม่ใส่ผักชี/ผักเหม็นเขียว) + ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":450,\\\"carb\\\":40,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"หมูทอดกระเทียม\\\",\\\"cal\\\":350,\\\"carb\\\":10,\\\"fat\\\":25,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":800}}},\\\"6\\\":{\\\"totalCal\\\":1850,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"แซนด์วิชทูน่า (ไม่ใส่ผักเหม็นเขียว) + นมจืด 1 กล่อง\\\",\\\"cal\\\":400,\\\"carb\\\":40,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":400},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"กะเพราหมูสับไข่ดาว (ไม่ใส่ผักชี)\\\",\\\"cal\\\":700,\\\"carb\\\":60,\\\"fat\\\":35,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":700},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"สเต็กหมู/ไก่ (เลือกเนื้อแดงติดมันเล็กน้อย) + มันบด\\\",\\\"cal\\\":750,\\\"carb\\\":50,\\\"fat\\\":40,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":750}}},\\\"7\\\":{\\\"totalCal\\\":1830,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"07:00:00\\\",\\\"name\\\":\\\"breakfast\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวไข่เจียวหมูสับ + ไส้กรอก 2 ชิ้น\\\",\\\"cal\\\":500,\\\"carb\\\":40,\\\"fat\\\":30,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":500},\\\"lunch\\\":{\\\"time\\\":\\\"12:00:00\\\",\\\"name\\\":\\\"lunch\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวซอยไก่ (ไม่ใส่ผักชี/ผักเหม็นเขียว)\\\",\\\"cal\\\":600,\\\"carb\\\":60,\\\"fat\\\":25,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:00:00\\\",\\\"name\\\":\\\"dinner\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"สุกี้น้ำ/แห้ง (เลือกเนื้อสัตว์ โปรตีนสูง ไม่ใส่ผักเหม็นเขียว)\\\",\\\"cal\\\":500,\\\"carb\\\":30,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false},{\\\"id\\\":\\\"global_null\\\",\\\"name\\\":\\\"ข้าวสวย 1 ถ้วย\\\",\\\"cal\\\":230,\\\"carb\\\":45,\\\"fat\\\":1,\\\"protein\\\":4,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":730}}}}\"', NULL, 10, NULL, 0),
(34, 'แผนอาหารจาก AI', 'แผนอาหารที่สร้างโดย AI สำหรับ 7 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2824,\\\"meals\\\":{\\\"07:00\\\":{\\\"name\\\":\\\"ข้าวไข่เจียว\\\",\\\"cal\\\":450},\\\"12:00\\\":{\\\"name\\\":\\\"ข้าวหมูทอดกระเทียม\\\",\\\"cal\\\":700},\\\"18:00\\\":{\\\"name\\\":\\\"ข้าวผัดไก่\\\",\\\"cal\\\":950}}},\\\"2\\\":{\\\"totalCal\\\":2800,\\\"meals\\\":{\\\"07:00\\\":{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":450},\\\"12:00\\\":{\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":700},\\\"18:00\\\":{\\\"name\\\":\\\"ข้าวหมูกรอบ\\\",\\\"cal\\\":650}}},\\\"3\\\":{\\\"totalCal\\\":2850,\\\"meals\\\":{\\\"07:00\\\":{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":500},\\\"12:00\\\":{\\\"name\\\":\\\"ข้าวผัดหมูสับ\\\",\\\"cal\\\":750},\\\"18:00\\\":{\\\"name\\\":\\\"ข้าวราดหน้าหมู\\\",\\\"cal\\\":600}}},\\\"4\\\":{\\\"totalCal\\\":2800,\\\"meals\\\":{\\\"07:00\\\":{\\\"name\\\":\\\"ข้าวผัดกุ้ง\\\",\\\"cal\\\":600},\\\"12:00\\\":{\\\"name\\\":\\\"ข้าวหมูกระเทียม\\\",\\\"cal\\\":750},\\\"18:00\\\":{\\\"name\\\":\\\"ข้าวหมูแดง\\\",\\\"cal\\\":500}}},\\\"5\\\":{\\\"totalCal\\\":2830,\\\"meals\\\":{\\\"07:00\\\":{\\\"name\\\":\\\"ข้าวหมูผัดพริกแกง\\\",\\\"cal\\\":750},\\\"12:00\\\":{\\\"name\\\":\\\"ข้าวไก่ทอด\\\",\\\"cal\\\":650},\\\"18:00\\\":{\\\"name\\\":\\\"ข้าวผัดหมูกรอบ\\\",\\\"cal\\\":650}}},\\\"6\\\":{\\\"totalCal\\\":2820,\\\"meals\\\":{\\\"07:00\\\":{\\\"name\\\":\\\"ข้าวราดแกงกะหรี่ไก่\\\",\\\"cal\\\":650},\\\"12:00\\\":{\\\"name\\\":\\\"ข้าวผัดหมูน้ำพาน\\\",\\\"cal\\\":700},\\\"18:00\\\":{\\\"name\\\":\\\"ข้าวหมูผัดพริก\\\",\\\"cal\\\":650}}},\\\"7\\\":{\\\"totalCal\\\":2830,\\\"meals\\\":{\\\"07:00\\\":{\\\"name\\\":\\\"ข้าวผัดกุ้งใส่ไข่\\\",\\\"cal\\\":700},\\\"12:00\\\":{\\\"name\\\":\\\"ข้าวหมูนุ่ม\\\",\\\"cal\\\":700},\\\"18:00\\\":{\\\"name\\\":\\\"ข้าวราดหน้าไก่\\\",\\\"cal\\\":650}}}}\"', NULL, 10, NULL, 0),
(37, 'แผนอาหาร', NULL, '\"{\\\"1\\\":{\\\"totalCal\\\":1640,\\\"meals\\\":{\\\"breakfast\\\":{\\\"time\\\":\\\"08:00\\\",\\\"name\\\":\\\"มื้อเช้า\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_1\\\",\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":550,\\\"carb\\\":65,\\\"fat\\\":20,\\\"protein\\\":15,\\\"img\\\":\\\"/foods/1753376625003-cv634ylfb.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":550},\\\"lunch\\\":{\\\"time\\\":\\\"12:00\\\",\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_2\\\",\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":600,\\\"carb\\\":55,\\\"fat\\\":25,\\\"protein\\\":30,\\\"img\\\":\\\"/foods/1750673087601-h8pdg0d6m.jpg\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":600},\\\"dinner\\\":{\\\"time\\\":\\\"18:00\\\",\\\"name\\\":\\\"มื้อเย็น\\\",\\\"items\\\":[{\\\"id\\\":\\\"global_42\\\",\\\"name\\\":\\\"ข้าวผัดกุ้ง\\\",\\\"cal\\\":490,\\\"carb\\\":60,\\\"fat\\\":15,\\\"protein\\\":30,\\\"img\\\":null,\\\"ingredient\\\":\\\"ข้าว ผัก กุ้ง ส้มกรั่ว\\\",\\\"source\\\":\\\"foods\\\",\\\"isUserFood\\\":false}],\\\"totalCal\\\":490}}}}\"', NULL, 17, NULL, 0);
INSERT INTO `user_food_plans` (`id`, `name`, `description`, `plan`, `img`, `user_id`, `plan_start_date`, `is_repeat`) VALUES
(38, 'แผนอาหารจาก AI', 'แผนอาหารที่สร้างโดย AI สำหรับ 3 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2223,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":667,\\\"carb\\\":85,\\\"fat\\\":15,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าว, ไก่, น้ำซุป\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":889,\\\"carb\\\":110,\\\"fat\\\":25,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าว, หมู, ผัก, ไข่\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ผัดไทยหม่าล่า\\\",\\\"cal\\\":667,\\\"carb\\\":80,\\\"fat\\\":30,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"เส้นผัดไทย, หม่าล่า, ไก่, ถั่วงอก\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2220,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มหมู\\\",\\\"cal\\\":667,\\\"carb\\\":85,\\\"fat\\\":14,\\\"protein\\\":29,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าว, หมู, น้ำซุป\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวหมูแดง\\\",\\\"cal\\\":889,\\\"carb\\\":120,\\\"fat\\\":20,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าว, หมูแดง, น้ำราด\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":664,\\\"items\\\":[{\\\"name\\\":\\\"ผัดกะเพราหมู\\\",\\\"cal\\\":664,\\\"carb\\\":70,\\\"fat\\\":28,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าว, หมู, กะเพรา, ไข่\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2225,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:00\\\",\\\"totalCal\\\":667,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":667,\\\"carb\\\":85,\\\"fat\\\":15,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าว, ไก่, น้ำซุป\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"12:00\\\",\\\"totalCal\\\":889,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดหมู\\\",\\\"cal\\\":889,\\\"carb\\\":110,\\\"fat\\\":25,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าว, หมู, ผัก, ไข่\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:00\\\",\\\"totalCal\\\":669,\\\"items\\\":[{\\\"name\\\":\\\"ผัดไทยหม่าล่า\\\",\\\"cal\\\":669,\\\"carb\\\":80,\\\"fat\\\":30,\\\"protein\\\":20,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"เส้นผัดไทย, หม่าล่า, ไก่, ถั่วงอก\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, 17, '2025-09-18', 1),
(39, 'แผนอาหารจาก AI', 'แผนอาหารที่สร้างโดย AI สำหรับ 3 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2222,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":607,\\\"carb\\\":80,\\\"fat\\\":10,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดไก่\\\",\\\"cal\\\":809,\\\"carb\\\":100,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"cal\\\":607,\\\"carb\\\":30,\\\"fat\\\":15,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":199,\\\"items\\\":[{\\\"name\\\":\\\"ผลไม้รวม\\\",\\\"cal\\\":199,\\\"carb\\\":30,\\\"fat\\\":2,\\\"protein\\\":2,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2225,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":607,\\\"carb\\\":80,\\\"fat\\\":10,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวมันไก่\\\",\\\"cal\\\":809,\\\"carb\\\":90,\\\"fat\\\":25,\\\"protein\\\":40,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"แกงเขียวหวานไก่\\\",\\\"cal\\\":607,\\\"carb\\\":30,\\\"fat\\\":20,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"ผลไม้รวม\\\",\\\"cal\\\":202,\\\"carb\\\":30,\\\"fat\\\":2,\\\"protein\\\":2,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2224,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มไก่\\\",\\\"cal\\\":607,\\\"carb\\\":80,\\\"fat\\\":10,\\\"protein\\\":30,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดไก่\\\",\\\"cal\\\":809,\\\"carb\\\":100,\\\"fat\\\":20,\\\"protein\\\":35,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ต้มยำไก่\\\",\\\"cal\\\":607,\\\"carb\\\":30,\\\"fat\\\":15,\\\"protein\\\":25,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":201,\\\"items\\\":[{\\\"name\\\":\\\"ผลไม้รวม\\\",\\\"cal\\\":201,\\\"carb\\\":30,\\\"fat\\\":2,\\\"protein\\\":2,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, 3, NULL, 0),
(41, 'แผนอาหารจาก AI', 'แผนอาหารที่สร้างโดย AI สำหรับ 1 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2224,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวหมูกระเทียมไข่ดาว\\\",\\\"cal\\\":607,\\\"carb\\\":87.5,\\\"fat\\\":21,\\\"protein\\\":17,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวหอมมะลิสุก, สันคอหมูหั่น, กระเทียม, พริกไทย, น้ำปลา, น้ำตาลทรายเล็กน้อย, น้ำมันรำข้าว, ไข่ไก่ดาว\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวกะเพราไก่ไข่ดาว (ไม่ใส่ถั่วฝักยาว)\\\",\\\"cal\\\":809,\\\"carb\\\":116.25,\\\"fat\\\":28,\\\"protein\\\":23,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวหอมมะลิสุก, อกไก่หั่น, ใบกะเพรา, กระเทียม, พริกขี้หนู, น้ำปลา, น้ำตาลทรายเล็กน้อย, น้ำมันรำข้าว, ไข่ไก่ดาว\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดหมูใส่ไข่\\\",\\\"cal\\\":607,\\\"carb\\\":87.5,\\\"fat\\\":21,\\\"protein\\\":17,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวหอมมะลิค้างคืน, สันคอหมูหั่น, ไข่ไก่, กระเทียม, หอมหัวใหญ่, แครอท, ต้นหอม, น้ำปลา, เกลือ, น้ำมันรำข้าว\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"ขนมปังโฮลวีตทาแยมสตรอว์เบอร์รี 2 แผ่น\\\",\\\"cal\\\":202,\\\"carb\\\":29.75,\\\"fat\\\":7,\\\"protein\\\":5,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ขนมปังโฮลวีต 2 แผ่น, แยมสตรอว์เบอร์รี\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, 3, NULL, 0),
(42, 'แผนอาหารจา ai', 'แผนอาหารที่สร้างโดย AI สำหรับ 3 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2224,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวต้มเห็ดรวมใส่ไข่ไก่\\\",\\\"cal\\\":607,\\\"carb\\\":90,\\\"fat\\\":19,\\\"protein\\\":19,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวหอมมะลิ, เห็ดหอม/เห็ดฟาง, ไข่ไก่, ขิงซอย, ต้นหอม, เกลือ, พริกไทย, น้ำมันพืชเล็กน้อย (ไม่ใส่ถั่วทุกชนิดและไม่ใช้ซอสถั่วเหลือง)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ผัดไทยเจเส้นจันท์ใส่ไข่ (ไม่ใส่ถั่วลิสง)\\\",\\\"cal\\\":809,\\\"carb\\\":115,\\\"fat\\\":29,\\\"protein\\\":22,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"เส้นจันท์, ไข่ไก่, กุยช่าย, กะหล่ำปลีซอย (แทนถั่วงอก), น้ำมะขาม, น้ำตาลปี๊บ, เกลือ, น้ำมันพืช, พริกป่น, มะนาว (ไม่ใส่ถั่วทุกชนิดและไม่ใช้ซอสถั่วเหลือง)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ก๋วยเตี๋ยวต้มยำเห็ดน้ำใสใส่ไข่ต้ม\\\",\\\"cal\\\":607,\\\"carb\\\":90,\\\"fat\\\":19,\\\"protein\\\":19,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"เส้นหมี่ข้าวเจ้า, เห็ดรวม, ไข่ต้ม, น้ำซุปผัก, ตะไคร้, ใบมะกรูด, น้ำมะนาว, พริกป่น, เกลือ (ไม่ใส่ถั่วทุกชนิดและไม่ใช้ถั่วงอก)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"โยเกิร์ตธรรมชาติไขมันต่ำกับกล้วยหอม\\\",\\\"cal\\\":202,\\\"carb\\\":30,\\\"fat\\\":6,\\\"protein\\\":7,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"โยเกิร์ตธรรมชาติ, กล้วยหอม (ไม่ใส่ถั่วทุกชนิด)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2224,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวไข่เจียวเห็ดหอมคู่ผักสด\\\",\\\"cal\\\":607,\\\"carb\\\":90,\\\"fat\\\":19,\\\"protein\\\":19,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวหอมมะลิ, ไข่ไก่, เห็ดหอม, น้ำมันพืชเล็กน้อย, แตงกวา, มะเขือเทศ, เกลือ, พริกไทย (ไม่ใส่ถั่วทุกชนิด)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวราดแกงเขียวหวานผักรวมใส่มันฝรั่งและไข่ต้ม\\\",\\\"cal\\\":809,\\\"carb\\\":115,\\\"fat\\\":29,\\\"protein\\\":22,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวหอมมะลิ, กะทิ, มันฝรั่ง, ฟักทอง, มะเขือเปราะ, ใบโหระพา, พริกแกงเจไร้กะปิ, เกลือ, ไข่ต้ม (ไม่ใส่ถั่วทุกชนิดและไม่ใช้ซีอิ๊ว)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวผัดผักรวมใส่ไข่\\\",\\\"cal\\\":607,\\\"carb\\\":90,\\\"fat\\\":19,\\\"protein\\\":19,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวสวย, ไข่ไก่, แครอท, คะน้า, ข้าวโพดอ่อน, น้ำมันพืชเล็กน้อย, เกลือ, พริกไทย (ไม่ใส่ถั่วทุกชนิดและไม่ใช้ซีอิ๊ว/เต้าเจี้ยว)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"นมจืดพาสเจอร์ไรซ์กับกล้วยน้ำว้า\\\",\\\"cal\\\":202,\\\"carb\\\":30,\\\"fat\\\":6,\\\"protein\\\":7,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"นมโคพาสเจอร์ไรซ์, กล้วยน้ำว้า (ไม่ใส่ถั่วทุกชนิด)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2224,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"โจ๊กข้าวกล้องเห็ดรวมใส่ไข่ลวก\\\",\\\"cal\\\":607,\\\"carb\\\":90,\\\"fat\\\":19,\\\"protein\\\":19,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวกล้อง, เห็ดรวม, ไข่ลวก, ขิงซอย, ต้นหอม, เกลือ, พริกไทย (ไม่ใส่ถั่วทุกชนิด)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวกะเพราเห็ดรวมใส่ไข่ดาว\\\",\\\"cal\\\":809,\\\"carb\\\":115,\\\"fat\\\":29,\\\"protein\\\":22,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวสวย, เห็ดรวม, ใบกะเพรา, พริก, กระเทียม, ไข่ดาว, น้ำมันพืช, เกลือ (ไม่ใส่ถั่วทุกชนิดและไม่ใช้ซีอิ๊ว)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"เส้นหมี่น้ำใสผักรวมใส่ไข่\\\",\\\"cal\\\":607,\\\"carb\\\":90,\\\"fat\\\":19,\\\"protein\\\":19,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"เส้นหมี่ข้าวเจ้า, ไข่ไก่, ผักกาดขาว, แครอท, น้ำซุปผัก, ต้นหอม, เกลือ, พริกไทย (ไม่ใส่ถั่วทุกชนิดและไม่ใช้ถั่วงอก)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวโพดต้มกับนมเปรี้ยวไขมันต่ำ\\\",\\\"cal\\\":202,\\\"carb\\\":30,\\\"fat\\\":6,\\\"protein\\\":7,\\\"img\\\":\\\"\\\",\\\"ingredient\\\":\\\"ข้าวโพดต้ม, นมเปรี้ยวไขมันต่ำ (ไม่ใส่ถั่วทุกชนิด)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, 3, NULL, 0),
(43, 'แผนAI', 'แผนอาหารที่สร้างโดย AI สำหรับ 3 วัน', '\"{\\\"1\\\":{\\\"totalCal\\\":2225,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"โจ๊กหมูใส่ไข่\\\",\\\"cal\\\":607,\\\"carb\\\":80,\\\"fat\\\":18,\\\"protein\\\":14,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 ชามใหญ่ (700 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวกะเพราหมูสับไข่ดาว (ไม่ใส่ถั่วฝักยาว)\\\",\\\"cal\\\":809,\\\"carb\\\":110,\\\"fat\\\":35,\\\"protein\\\":28,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 จานใหญ่ (650 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวไข่เจียวหมูสับ\\\",\\\"cal\\\":607,\\\"carb\\\":78,\\\"fat\\\":23,\\\"protein\\\":18,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 จาน (550 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"กล้วยหอม\\\",\\\"cal\\\":202,\\\"carb\\\":53,\\\"fat\\\":1,\\\"protein\\\":2,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"2 ผลกลาง (230 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"2\\\":{\\\"totalCal\\\":2225,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"โจ๊กหมูใส่ไข่\\\",\\\"cal\\\":607,\\\"carb\\\":80,\\\"fat\\\":18,\\\"protein\\\":14,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 ชามใหญ่ (700 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวกะเพราหมูสับไข่ดาว (ไม่ใส่ถั่วฝักยาว)\\\",\\\"cal\\\":809,\\\"carb\\\":110,\\\"fat\\\":35,\\\"protein\\\":28,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 จานใหญ่ (650 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวไข่เจียวหมูสับ\\\",\\\"cal\\\":607,\\\"carb\\\":78,\\\"fat\\\":23,\\\"protein\\\":18,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 จาน (550 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"กล้วยหอม\\\",\\\"cal\\\":202,\\\"carb\\\":53,\\\"fat\\\":1,\\\"protein\\\":2,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"2 ผลกลาง (230 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}},\\\"3\\\":{\\\"totalCal\\\":2225,\\\"meals\\\":{\\\"breakfast\\\":{\\\"name\\\":\\\"มื้อเช้า\\\",\\\"time\\\":\\\"08:30\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"โจ๊กหมูใส่ไข่\\\",\\\"cal\\\":607,\\\"carb\\\":80,\\\"fat\\\":18,\\\"protein\\\":14,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 ชามใหญ่ (700 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"lunch\\\":{\\\"name\\\":\\\"มื้อกลางวัน\\\",\\\"time\\\":\\\"14:27\\\",\\\"totalCal\\\":809,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวกะเพราหมูสับไข่ดาว (ไม่ใส่ถั่วฝักยาว)\\\",\\\"cal\\\":809,\\\"carb\\\":110,\\\"fat\\\":35,\\\"protein\\\":28,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 จานใหญ่ (650 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"dinner\\\":{\\\"name\\\":\\\"มื้อเย็น\\\",\\\"time\\\":\\\"18:38\\\",\\\"totalCal\\\":607,\\\"items\\\":[{\\\"name\\\":\\\"ข้าวไข่เจียวหมูสับ\\\",\\\"cal\\\":607,\\\"carb\\\":78,\\\"fat\\\":23,\\\"protein\\\":18,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"1 จาน (550 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]},\\\"custom\\\":{\\\"name\\\":\\\"Custom\\\",\\\"time\\\":\\\"23:26\\\",\\\"totalCal\\\":202,\\\"items\\\":[{\\\"name\\\":\\\"กล้วยหอม\\\",\\\"cal\\\":202,\\\"carb\\\":53,\\\"fat\\\":1,\\\"protein\\\":2,\\\"img\\\":\\\"assets/images/menuplaceholder.png\\\",\\\"serving\\\":\\\"2 ผลกลาง (230 กรัม)\\\",\\\"source\\\":\\\"ai\\\",\\\"isUserFood\\\":false}]}}}}\"', NULL, 3, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_food_plan_using`
--

CREATE TABLE `user_food_plan_using` (
  `id` int NOT NULL,
  `food_plan_id` int NOT NULL,
  `user_id` int NOT NULL,
  `start_date` date NOT NULL,
  `is_repeat` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_food_plan_using`
--

INSERT INTO `user_food_plan_using` (`id`, `food_plan_id`, `user_id`, `start_date`, `is_repeat`) VALUES
(5, 30, 5, '2025-08-31', 0),
(6, 32, 10, '2025-09-02', 0),
(7, 38, 17, '2025-09-18', 1),
(8, 43, 3, '2025-09-19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_meal_time`
--

CREATE TABLE `user_meal_time` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `meal_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `meal_time` time NOT NULL,
  `sort_order` smallint UNSIGNED DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_meal_time`
--

INSERT INTO `user_meal_time` (`id`, `user_id`, `meal_name`, `meal_time`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(170, 17, 'มื้อเช้า', '08:00:00', 1, 1, '2025-09-18 08:19:39', '2025-09-18 08:19:39'),
(171, 17, 'มื้อกลางวัน', '12:00:00', 2, 1, '2025-09-18 08:19:39', '2025-09-18 08:19:39'),
(172, 17, 'มื้อเย็น', '18:00:00', 3, 1, '2025-09-18 08:19:39', '2025-09-18 08:19:39'),
(177, 3, 'มื้อเช้า', '08:30:00', 1, 1, '2025-09-19 20:34:28', '2025-09-19 20:34:28'),
(178, 3, 'มื้อกลางวัน', '14:27:00', 2, 1, '2025-09-19 20:34:28', '2025-09-19 20:34:28'),
(179, 3, 'มื้อเย็น', '18:38:00', 3, 1, '2025-09-19 20:34:28', '2025-09-19 20:34:28'),
(180, 3, 'Custom', '23:26:00', 4, 0, '2025-09-19 20:34:28', '2025-09-19 20:34:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_weight_logs`
--

CREATE TABLE `user_weight_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `logged_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_weight_logs`
--

INSERT INTO `user_weight_logs` (`id`, `user_id`, `weight`, `logged_at`) VALUES
(1, 3, 52.20, '2025-08-24 13:07:39'),
(2, 3, 52.00, '2025-08-24 13:08:02'),
(3, 3, 52.20, '2025-08-26 15:20:30'),
(4, 3, 52.30, '2025-08-31 13:46:19'),
(5, 3, 52.00, '2025-09-16 23:23:17'),
(6, 3, 52.20, '2025-09-16 23:23:22'),
(7, 3, 52.20, '2025-09-18 15:07:29'),
(8, 3, 52.00, '2025-09-18 23:01:41'),
(9, 3, 52.10, '2025-09-18 23:01:52');

-- --------------------------------------------------------

--
-- Table structure for table `weekly_nutrition_summary`
--

CREATE TABLE `weekly_nutrition_summary` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `week_start_date` date NOT NULL,
  `total_calories` int DEFAULT NULL,
  `total_fat` int DEFAULT NULL,
  `total_protein` int DEFAULT NULL,
  `total_carbs` int DEFAULT NULL,
  `recommendation` text COLLATE utf8mb4_general_ci,
  `weight` decimal(5,2) DEFAULT NULL
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
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user` (`user_id`);

--
-- Indexes for table `chat_session`
--
ALTER TABLE `chat_session`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `daily_nutrition_summary`
--
ALTER TABLE `daily_nutrition_summary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_daily` (`user_id`);

--
-- Indexes for table `eating_blog`
--
ALTER TABLE `eating_blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eating_record`
--
ALTER TABLE `eating_record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
-- Indexes for table `user_meal_time`
--
ALTER TABLE `user_meal_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_meal_time_user` (`user_id`);

--
-- Indexes for table `user_weight_logs`
--
ALTER TABLE `user_weight_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_logged_at` (`user_id`,`logged_at`);

--
-- Indexes for table `weekly_nutrition_summary`
--
ALTER TABLE `weekly_nutrition_summary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_weekly` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `daily_nutrition_summary`
--
ALTER TABLE `daily_nutrition_summary`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `eating_blog`
--
ALTER TABLE `eating_blog`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `eating_record`
--
ALTER TABLE `eating_record`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `food_category`
--
ALTER TABLE `food_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `global_food_plan`
--
ALTER TABLE `global_food_plan`
  MODIFY `plan_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `meal_plan_detail`
--
ALTER TABLE `meal_plan_detail`
  MODIFY `detail_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_food`
--
ALTER TABLE `user_food`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `user_food_plans`
--
ALTER TABLE `user_food_plans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_food_plan_using`
--
ALTER TABLE `user_food_plan_using`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_meal_time`
--
ALTER TABLE `user_meal_time`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `user_weight_logs`
--
ALTER TABLE `user_weight_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `weekly_nutrition_summary`
--
ALTER TABLE `weekly_nutrition_summary`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daily_nutrition_summary`
--
ALTER TABLE `daily_nutrition_summary`
  ADD CONSTRAINT `fk_user_daily` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `eating_record`
--
ALTER TABLE `eating_record`
  ADD CONSTRAINT `eating_record_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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

--
-- Constraints for table `user_meal_time`
--
ALTER TABLE `user_meal_time`
  ADD CONSTRAINT `fk_user_meal_time_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_weight_logs`
--
ALTER TABLE `user_weight_logs`
  ADD CONSTRAINT `user_weight_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `weekly_nutrition_summary`
--
ALTER TABLE `weekly_nutrition_summary`
  ADD CONSTRAINT `fk_user_weekly` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
