-- Update meal_plan_detail table to support meal planner functionality
-- Add additional columns for day number, meal type, nutritional information

ALTER TABLE `meal_plan_detail` 
ADD COLUMN `day_number` int(11) DEFAULT 1 AFTER `plan_id`,
ADD COLUMN `meal_type` varchar(50) DEFAULT NULL AFTER `day_number`,
ADD COLUMN `calories` decimal(8,2) DEFAULT 0 AFTER `meal_time`,
ADD COLUMN `protein` decimal(8,2) DEFAULT 0 AFTER `calories`,
ADD COLUMN `carb` decimal(8,2) DEFAULT 0 AFTER `protein`,
ADD COLUMN `fat` decimal(8,2) DEFAULT 0 AFTER `carb`;

-- Make food_id nullable since users can add custom meals
ALTER TABLE `meal_plan_detail` 
MODIFY COLUMN `food_id` int(11) DEFAULT NULL;

-- Update foreign key constraint to allow NULL values
ALTER TABLE `meal_plan_detail` 
DROP FOREIGN KEY `meal_plan_detail_ibfk_2`;

ALTER TABLE `meal_plan_detail` 
ADD CONSTRAINT `meal_plan_detail_ibfk_2` 
FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE SET NULL;
