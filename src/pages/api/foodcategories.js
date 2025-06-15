import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await db('food_category').select('id', 'name');
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      const [categoryId] = await db('food_category').insert({
        name
      });

      res.status(201).json({ id: categoryId, name, message: 'Category created successfully' });
    } catch (error) {
      console.error('Error creating category:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'Category name already exists' });
      } else {
        res.status(500).json({ error: 'Failed to create category' });
      }
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, name } = req.body;
      
      if (!id || !name) {
        return res.status(400).json({ error: 'Category ID and name are required' });
      }

      const updated = await db('food_category')
        .where('id', id)
        .update({ name });

      if (updated === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({ id, name, message: 'Category updated successfully' });
    } catch (error) {
      console.error('Error updating category:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'Category name already exists' });
      } else {
        res.status(500).json({ error: 'Failed to update category' });
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
      }

      // Check if category is being used by any foods
      const categoryInUse = await db('food_category_map')
        .where('category_id', id)
        .first();

      if (categoryInUse) {
        return res.status(400).json({ error: 'Cannot delete category that is in use by foods' });
      }

      const deleted = await db('food_category')
        .where('id', id)
        .del();

      if (deleted === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
