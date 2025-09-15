import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { status } = req.body;
    
    if (!id || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate status
    const validStatuses = ['release', 'pending', 'draft'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be either "release" or "pending" or "draft"' 
      });
    }

    const updatedRows = await db('eating_blog')
      .where('id', id)
      .update({
        status,
        updated_at: new Date()
      });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Get updated article data
    const updatedArticle = await db('eating_blog')
      .select('id', 'title', 'status', 'updated_at')
      .where('id', id)
      .first();

    res.status(200).json({ 
      message: 'Article status updated successfully',
      article: updatedArticle
    });
  } catch (err) {
    console.error('Error updating article status:', err);
    res.status(500).json({ error: 'Failed to update article status' });
  }
}
