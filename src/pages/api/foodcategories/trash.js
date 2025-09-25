import db from '@/lib/db';

const parseCategoryRow = (row) => ({
  id: row.id,
  name: row.name,
  totalFoods: Number(row.total_food_count || 0),
  activeFoods: Number(row.active_food_count || 0),
  deletedFoods: Number(row.deleted_food_count || 0),
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const rows = await db('food_category as fc')
        .leftJoin('food_category_map as fcm', 'fc.id', 'fcm.category_id')
        .leftJoin('foods', 'fcm.food_id', 'foods.id')
        .select(
          'fc.id',
          'fc.name',
          db.raw('COUNT(DISTINCT fcm.food_id) as total_food_count'),
          db.raw('COUNT(DISTINCT CASE WHEN foods.is_delete = 0 THEN foods.id END) as active_food_count'),
          db.raw('COUNT(DISTINCT CASE WHEN foods.is_delete = 1 THEN foods.id END) as deleted_food_count')
        )
        .where('fc.is_delete', true)
        .groupBy('fc.id', 'fc.name')
        .orderBy('fc.id', 'desc');

      const categories = rows.map(parseCategoryRow);
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching deleted categories:', error);
      res.status(500).json({ error: 'Failed to fetch deleted categories' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
      }

      const restored = await db('food_category')
        .where('id', id)
        .andWhere('is_delete', true)
        .update({ is_delete: false });

      if (restored === 0) {
        return res.status(404).json({ error: 'Category not found or already restored' });
      }

      res.status(200).json({ message: 'Category restored successfully' });
    } catch (error) {
      console.error('Error restoring category:', error);
      res.status(500).json({ error: 'Failed to restore category' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
      }

      const category = await db('food_category')
        .where('id', id)
        .andWhere('is_delete', true)
        .select('id')
        .first();

      if (!category) {
        return res.status(404).json({ error: 'Category not found in trash' });
      }

      await db.transaction(async (trx) => {
        await trx('food_category_map').where('category_id', id).del();
        await trx('food_category').where('id', id).del();
      });

      res.status(200).json({ message: 'Category permanently deleted' });
    } catch (error) {
      console.error('Error permanently deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category permanently' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

