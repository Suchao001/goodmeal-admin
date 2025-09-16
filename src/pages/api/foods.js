import db from '@/lib/db';
import { deleteImageFile } from '@/lib/imageUpload';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get all foods with their categories (exclude deleted items)
      const foods = await db('foods')
        .leftJoin('food_category_map', 'foods.id', 'food_category_map.food_id')
        .leftJoin('food_category', 'food_category_map.category_id', 'food_category.id')
        .select(
          'foods.id',
          'foods.name',
          'foods.cal as calories',
          'foods.carb as carbohydrates',
          'foods.fat',
          'foods.protein',
          'foods.img',
          'foods.ingredient as ingredients',
          'food_category.id as category_id',
          'food_category.name as category_name'
        )
        .where('foods.is_delete', false) // เฉพาะข้อมูลที่ไม่ถูกลบ
        .orderBy('foods.id', 'desc');

      // Group foods by id and collect categories
      const foodsMap = {};
      foods.forEach(food => {
        if (!foodsMap[food.id]) {
          foodsMap[food.id] = {
            id: food.id,
            name: food.name,
            calories: parseFloat(food.calories) || 0,
            carbohydrates: parseFloat(food.carbohydrates) || 0,
            fat: parseFloat(food.fat) || 0,
            protein: parseFloat(food.protein) || 0,
            img: food.img,
            ingredients: food.ingredients,
            categories: []
          };
        }
        
        if (food.category_id && food.category_name) {
          foodsMap[food.id].categories.push({
            id: food.category_id,
            name: food.category_name
          });
        }
      });

      const result = Object.values(foodsMap);
      // Sort by id descending to maintain the order after Object.values()
      result.sort((a, b) => b.id - a.id);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching foods:', error);
      res.status(500).json({ error: 'Failed to fetch foods' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, calories, carbohydrates, fat, protein, image, ingredients, categories } = req.body;

      // Prevent duplicate food names among active entries
      const duplicateFood = await db('foods')
        .where('name', name)
        .where('is_delete', false)
        .first();

      if (duplicateFood) {
        return res.status(409).json({ error: 'Food name already exists' });
      }

      // Insert the food with is_delete = false as default
      const [foodId] = await db('foods').insert({
        name,
        cal: calories,
        carb: carbohydrates,
        fat,
        protein,
        img: image,
        ingredient: ingredients,
        is_delete: false 
      });

      if (categories && categories.length > 0) {
        const categoryMappings = categories.map(categoryId => ({
          food_id: foodId,
          category_id: categoryId
        }));
        await db('food_category_map').insert(categoryMappings);
      }

      res.status(201).json({ id: foodId, message: 'Food created successfully' });
    } catch (error) {
      console.error('Error creating food:', error);
      res.status(500).json({ error: 'Failed to create food' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, name, calories, carbohydrates, fat, protein, image, ingredients, categories } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Food ID is required' });
      }

      // Get current food data to check for old image (only if not deleted)
      const currentFood = await db('foods')
        .where('id', id)
        .where('is_delete', false) // เฉพาะข้อมูลที่ไม่ถูกลบ
        .select('img')
        .first();

      if (!currentFood) {
        return res.status(404).json({ error: 'Food not found or has been deleted' });
      }

      // Ensure updated name does not match another active food entry
      if (name) {
        const duplicateFood = await db('foods')
          .where('name', name)
          .where('id', '!=', id)
          .where('is_delete', false)
          .first();

        if (duplicateFood) {
          return res.status(409).json({ error: 'Food name already exists' });
        }
      }

      // If image is being changed, delete the old image
      if (currentFood.img && image && currentFood.img !== image) {
        deleteImageFile(currentFood.img);
      }

      // Update the food (only if not deleted)
      const updated = await db('foods')
        .where('id', id)
        .where('is_delete', false) // ป้องกันการอัพเดทข้อมูลที่ถูกลบแล้ว
        .update({
          name,
          cal: calories,
          carb: carbohydrates,
          fat,
          protein,
          img: image,
          ingredient: ingredients
        });

      if (updated === 0) {
        return res.status(404).json({ error: 'Food not found' });
      }

      // Update category mappings if categories are provided
      if (categories && Array.isArray(categories)) {
        // Remove existing mappings
        await db('food_category_map').where('food_id', id).del();
        
        // Insert new mappings
        if (categories.length > 0) {
          const categoryMappings = categories.map(categoryId => ({
            food_id: id,
            category_id: categoryId
          }));
          await db('food_category_map').insert(categoryMappings);
        }
      }

      res.status(200).json({ id, message: 'Food updated successfully' });
    } catch (error) {
      console.error('Error updating food:', error);
      res.status(500).json({ error: 'Failed to update food' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Food ID is required' });
      }

      // Check if food exists and is not already deleted
      const food = await db('foods')
        .where('id', id)
        .where('is_delete', false)
        .select('id', 'name', 'img')
        .first();

      if (!food) {
        return res.status(404).json({ error: 'Food not found or already deleted' });
      }

      // Soft delete: Mark as deleted instead of actually deleting
      const updated = await db('foods')
        .where('id', id)
        .update({
          is_delete: true,
        });

      if (updated === 0) {
        return res.status(404).json({ error: 'Failed to delete food' });
      }

      res.status(200).json({ 
        message: 'Food deleted successfully',
        food: {
          id: food.id,
          name: food.name
        }
      });
    } catch (error) {
      console.error('Error deleting food:', error);
      res.status(500).json({ error: 'Failed to delete food' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
