import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Get article with its tags
      const articles = await db('eating_blog')
        .leftJoin('post_tag', 'eating_blog.id', 'post_tag.post_id')
        .leftJoin('tags', 'post_tag.tag_id', 'tags.id')
        .where('eating_blog.id', id)
        .select(
          'eating_blog.id',
          'eating_blog.title',
          'eating_blog.img',
          'eating_blog.publish_date',
          'eating_blog.status',
          'eating_blog.content',
          'eating_blog.excerpt_content',
          'eating_blog.created_at',
          'eating_blog.updated_at',
          'tags.id as tag_id',
          'tags.name as tag_name'
        );

      if (articles.length === 0) {
        return res.status(404).json({ error: 'Article not found' });
      }

      // Group article data and collect tags
      const article = {
        id: articles[0].id,
        title: articles[0].title,
        image: articles[0].img,
        date: articles[0].publish_date,
        status: articles[0].status,
        content: articles[0].content,
        excerpt: articles[0].excerpt_content,
        created_at: articles[0].created_at,
        updated_at: articles[0].updated_at,
        tags: []
      };

      articles.forEach(row => {
        if (row.tag_id && row.tag_name) {
          article.tags.push({
            id: row.tag_id,
            name: row.tag_name
          });
        }
      });

      res.status(200).json(article);
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({ error: 'Failed to fetch article' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
