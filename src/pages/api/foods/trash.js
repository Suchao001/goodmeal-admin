import db from '@/lib/db';
import { deleteImageFile } from '@/lib/imageUpload';

const buildFoodResponse = (rows = []) => {
  const foodsMap = {};

  rows.forEach((row) => {
    if (!foodsMap[row.id]) {
      foodsMap[row.id] = {
        id: row.id,
        name: row.name,
        calories: parseFloat(row.calories) || 0,
        carbohydrates: parseFloat(row.carbohydrates) || 0,
        fat: parseFloat(row.fat) || 0,
        protein: parseFloat(row.protein) || 0,
        img: row.img,
        ingredients: row.ingredients,
        serving: row.serving,
        categories: [],
      };
    }

    if (row.category_id && row.category_name) {
      foodsMap[row.id].categories.push({
        id: row.category_id,
        name: row.category_name,
      });
    }
  });

  const result = Object.values(foodsMap);
  result.sort((a, b) => b.id - a.id);
  return result;
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const rows = await db('foods')
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
          'foods.serving',
          'food_category.id as category_id',
          'food_category.name as category_name'
        )
        .where('foods.is_delete', true)
        .orderBy('foods.id', 'desc');

      const foods = buildFoodResponse(rows);
      res.status(200).json(foods);
    } catch (error) {
      console.error('Error fetching deleted foods:', error);
      res.status(500).json({ error: 'Failed to fetch deleted foods' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Food ID is required' });
      }

      const restored = await db('foods')
        .where('id', id)
        .andWhere('is_delete', true)
        .update({ is_delete: false });

      if (restored === 0) {
        return res.status(404).json({ error: 'Food not found or already restored' });
      }

      res.status(200).json({ message: 'Food restored successfully' });
    } catch (error) {
      console.error('Error restoring food:', error);
      res.status(500).json({ error: 'Failed to restore food' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Food ID is required' });
      }

      const food = await db('foods')
        .where('id', id)
        .andWhere('is_delete', true)
        .select('id', 'img')
        .first();

      if (!food) {
        return res.status(404).json({ error: 'Food not found in trash' });
      }

      await db.transaction(async (trx) => {
        await trx('food_category_map').where('food_id', id).del();
        await trx('foods').where('id', id).del();
      });

      if (food.img) {
        deleteImageFile(food.img);
      }

      res.status(200).json({ message: 'Food permanently deleted' });
    } catch (error) {
      console.error('Error permanently deleting food:', error);
      res.status(500).json({ error: 'Failed to delete food permanently' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

