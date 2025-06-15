import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  
  try {
    // Convert relative path to absolute path
    let fullPath;
    if (imagePath.startsWith('/blog/')) {
      fullPath = path.join(process.cwd(), 'public', imagePath);
    } else if (imagePath.startsWith('/foods/')) {
      fullPath = path.join(process.cwd(), 'public', imagePath);
    } else if (imagePath.startsWith('/')) {
      fullPath = path.join(process.cwd(), 'public', imagePath);
    } else {
      fullPath = path.join(process.cwd(), 'public', 'blog', imagePath);
    }
    
    // Check if file exists and delete it
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log('Deleted image file:', fullPath);
    }
  } catch (error) {
    console.error('Error deleting image file:', error);
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get all articles with their tags
      const articles = await db('eating_blog')
        .leftJoin('post_tag', 'eating_blog.id', 'post_tag.post_id')
        .leftJoin('tags', 'post_tag.tag_id', 'tags.id')
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
        )
        .orderBy('eating_blog.created_at', 'desc');

      // Group articles by id and collect tags
      const articlesMap = {};
      articles.forEach(article => {
        if (!articlesMap[article.id]) {
          articlesMap[article.id] = {
            id: article.id,
            title: article.title,
            image: article.img,
            date: article.publish_date,
            status: article.status,
            content: article.content,
            excerpt: article.excerpt_content,
            created_at: article.created_at,
            updated_at: article.updated_at,
            tags: []
          };
        }
        
        if (article.tag_id && article.tag_name) {
          articlesMap[article.id].tags.push({
            id: article.tag_id,
            name: article.tag_name
          });
        }
      });

      const result = Object.values(articlesMap);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'Failed to fetch articles' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, image, date, status, content, excerpt, tags } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Insert the article
      const [articleId] = await db('eating_blog').insert({
        title,
        img: image,
        publish_date: date,
        status: status || 'pending',
        content,
        excerpt_content: excerpt,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Process tags if provided
      if (tags && Array.isArray(tags) && tags.length > 0) {
        for (const tagName of tags) {
          if (!tagName.trim()) continue;
          
          // Check if tag exists, if not create it
          let tag = await db('tags').where('name', tagName.trim()).first();
          if (!tag) {
            const [tagId] = await db('tags').insert({ name: tagName.trim() });
            tag = { id: tagId, name: tagName.trim() };
          }
          
          // Create post-tag mapping
          await db('post_tag').insert({
            post_id: articleId,
            tag_id: tag.id
          });
        }
      }

      res.status(201).json({ id: articleId, message: 'Article created successfully' });
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ error: 'Failed to create article' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, title, image, date, status, content, excerpt, tags } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Article ID is required' });
      }

      // Get current article data to check for old image
      const currentArticle = await db('eating_blog')
        .where('id', id)
        .select('img')
        .first();

      if (!currentArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }

      // If image is being changed, delete the old image
      if (currentArticle.img && image && currentArticle.img !== image) {
        deleteImageFile(currentArticle.img);
      }

      // Update the article
      const updated = await db('eating_blog')
        .where('id', id)
        .update({
          title,
          img: image,
          publish_date: date,
          status,
          content,
          excerpt_content: excerpt,
          updated_at: new Date()
        });

      if (updated === 0) {
        return res.status(404).json({ error: 'Article not found' });
      }

      // Update tags if provided
      if (tags && Array.isArray(tags)) {
        // Remove existing tag mappings
        await db('post_tag').where('post_id', id).del();
        
        // Insert new tag mappings
        for (const tagName of tags) {
          if (!tagName.trim()) continue;
          
          // Check if tag exists, if not create it
          let tag = await db('tags').where('name', tagName.trim()).first();
          if (!tag) {
            const [tagId] = await db('tags').insert({ name: tagName.trim() });
            tag = { id: tagId, name: tagName.trim() };
          }
          
          // Create post-tag mapping
          await db('post_tag').insert({
            post_id: id,
            tag_id: tag.id
          });
        }
      }

      res.status(200).json({ id, message: 'Article updated successfully' });
    } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ error: 'Failed to update article' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Article ID is required' });
      }

      // Get the article data to get the image path before deletion
      const article = await db('eating_blog')
        .where('id', id)
        .select('img')
        .first();

      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      // Delete tag mappings first
      await db('post_tag').where('post_id', id).del();
      
      // Delete the article
      const deleted = await db('eating_blog').where('id', id).del();

      if (deleted === 0) {
        return res.status(404).json({ error: 'Article not found' });
      }

      // Delete the associated image file
      if (article.img) {
        deleteImageFile(article.img);
      }

      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.error('Error deleting article:', error);
      res.status(500).json({ error: 'Failed to delete article' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
