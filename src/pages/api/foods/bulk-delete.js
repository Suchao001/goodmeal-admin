import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ids } = req.body || {};

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Field "ids" must be a non-empty array' });
    }

    // Ensure all ids are numbers
    const validIds = ids
      .map((id) => Number(id))
      .filter((id) => Number.isInteger(id) && id > 0);

    if (validIds.length === 0) {
      return res.status(400).json({ error: 'No valid IDs provided' });
    }

    // Only soft-delete records that are not already deleted
    const affected = await db('foods')
      .whereIn('id', validIds)
      .andWhere('is_delete', false)
      .update({ is_delete: true });

    return res.status(200).json({
      message: 'Foods moved to trash successfully',
      affected,
      ids: validIds,
    });
  } catch (error) {
    console.error('Error bulk deleting foods:', error);
    return res.status(500).json({ error: 'Failed to bulk delete foods' });
  }
}

