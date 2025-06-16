import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Helper function to handle image upload with resizing and optimization
 * @param {object} req - Request object
 * @param {object} options - Upload options
 * @param {string} options.uploadDir - Directory name under public/ (e.g., 'foods', 'blog')
 * @param {number} options.width - Target width for resizing (default: 400)
 * @param {number} options.height - Target height for resizing (default: 400)
 * @param {number} options.quality - JPEG quality (default: 85)
 * @param {string} options.fit - Sharp fit option (default: 'cover')
 * @returns {Promise<object>} - Upload result with imageUrl or error
 */
export async function handleImageUpload(req, options = {}) {
  const {
    uploadDir = 'uploads',
    width = 400,
    height = 400,
    quality = 85,
    fit = 'cover'
  } = options;

  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return reject({ status: 500, error: 'Error parsing form data' });
      }

      let file = files.image;
      
      // Handle different file structures that formidable might return
      if (Array.isArray(file)) {
        file = file[0];
      }
      
      if (!file) {
        return reject({ status: 400, error: 'No image file provided' });
      }

      try {
        // Ensure the upload directory exists
        const fullUploadDir = path.join(process.cwd(), 'public', uploadDir);
        if (!fs.existsSync(fullUploadDir)) {
          fs.mkdirSync(fullUploadDir, { recursive: true });
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
        const filePath = path.join(fullUploadDir, fileName);

        // Get source file path
        const sourceFilePath = file.filepath || file.path;
        if (!sourceFilePath) {
          return reject({ status: 500, error: 'Unable to locate uploaded file' });
        }
        
        try {
          // Process and resize image with sharp
          await sharp(sourceFilePath)
            .resize({
              width,
              height,
              fit, // This will crop the image to maintain aspect ratio
              position: 'center'
            })
            .jpeg({ 
              quality, // Good quality while reducing file size
              progressive: true 
            })
            .toFile(filePath);
          
          // Clean up the temporary file
          fs.unlinkSync(sourceFilePath);
        } catch (processError) {
          console.error('Error processing image:', processError);
          return reject({ status: 500, error: 'Failed to process image' });
        }

        // Return the relative path for database storage
        const imageUrl = `/${uploadDir}/${fileName}`;
        
        resolve({ 
          success: true, 
          imageUrl,
          fileName,
          message: 'Image uploaded successfully' 
        });
      } catch (error) {
        console.error('Upload error:', error);
        reject({ status: 500, error: 'Failed to upload image' });
      }
    });
  });
}

/**
 * Helper function to delete image file
 * @param {string} imagePath - Relative path to image
 * @param {string} baseDir - Base directory under public/ (optional, will auto-detect)
 */
export function deleteImageFile(imagePath, baseDir = null) {
  if (!imagePath) return;
  
  try {
    let fullPath;
    
    if (baseDir) {
      // Use specified base directory
      if (imagePath.startsWith('/')) {
        fullPath = path.join(process.cwd(), 'public', imagePath);
      } else {
        fullPath = path.join(process.cwd(), 'public', baseDir, imagePath);
      }
    } else {
      // Auto-detect directory from path
      if (imagePath.startsWith('/blog/')) {
        fullPath = path.join(process.cwd(), 'public', imagePath);
      } else if (imagePath.startsWith('/foods/')) {
        fullPath = path.join(process.cwd(), 'public', imagePath);
      } else if (imagePath.startsWith('/mealplan/')) {
        fullPath = path.join(process.cwd(), 'public', imagePath);
      } else if (imagePath.startsWith('/')) {
        fullPath = path.join(process.cwd(), 'public', imagePath);
      } else {
        // Default to uploads directory
        fullPath = path.join(process.cwd(), 'public', 'uploads', imagePath);
      }
    }
    
    // Check if file exists and delete it
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log('Deleted image file:', fullPath);
      return true;
    } else {
      console.log('Image file not found:', fullPath);
      return false;
    }
  } catch (error) {
    console.error('Error deleting image file:', error);
    return false;
  }
}

/**
 * Standard API response helper
 * @param {object} res - Response object
 * @param {number} status - HTTP status code
 * @param {object} data - Response data
 */
export function sendResponse(res, status, data) {
  res.status(status).json(data);
}
