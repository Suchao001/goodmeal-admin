import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      
      
      let file = files.image;
      
      // Handle different file structures that formidable might return
      if (Array.isArray(file)) {
        file = file[0];
      }
      
      if (!file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

    

      // Ensure the public/foods directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'foods');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Handle different property names for original filename
      const originalFilename = file.originalFilename || file.name || file.fileName || 'unknown';
      
      
      // Generate unique filename with fallback extension
      let fileExtension = '';
      if (originalFilename && originalFilename !== 'unknown') {
        fileExtension = path.extname(originalFilename);
      }
      
      // If no extension found, try to determine from mimetype
      if (!fileExtension && file.mimetype) {
        const mimeToExt = {
          'image/jpeg': '.jpg',
          'image/jpg': '.jpg', 
          'image/png': '.png',
          'image/gif': '.gif',
          'image/webp': '.webp'
        };
        fileExtension = mimeToExt[file.mimetype] || '.jpg';
      }
      
      if (!fileExtension) {
        fileExtension = '.jpg';
      }

      // Generate unique filename - force .jpg for consistency after processing
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
      const filePath = path.join(uploadDir, fileName);

      // Get source file path
      const sourceFilePath = file.filepath || file.path;
      if (!sourceFilePath) {
        return res.status(500).json({ error: 'Unable to locate uploaded file' });
      }
      
      try {
        // Process and resize image with sharp
        await sharp(sourceFilePath)
          .resize({
            width: 400,
            height: 400,
            fit: 'cover', // This will crop the image to maintain aspect ratio
            position: 'center'
          })
          .jpeg({ 
            quality: 85, // Good quality while reducing file size
            progressive: true 
          })
          .toFile(filePath);
        
        // Clean up the temporary file
        fs.unlinkSync(sourceFilePath);
      } catch (processError) {
        console.error('Error processing image:', processError);
        return res.status(500).json({ error: 'Failed to process image' });
      }

      // Return the relative path for database storage
      const imageUrl = `/foods/${fileName}`;
      
      res.status(200).json({ 
        success: true, 
        imageUrl,
        message: 'Image uploaded successfully' 
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}
