# Image Upload System Documentation

## Overview
This reusable image upload system provides a standardized way to handle image uploads across the application with automatic resizing, optimization, and proper file management.

## Components

### 1. Core Helper (`/src/lib/imageUpload.js`)
The main helper that handles all image upload functionality:

- **`handleImageUpload(req, options)`** - Main upload handler
- **`deleteImageFile(imagePath, baseDir)`** - File deletion helper
- **`sendResponse(res, status, data)`** - Standardized API response

### 2. Upload APIs
Pre-configured upload endpoints for different content types:

- **`/api/upload-image`** - Food images (400x400, foods/ directory)
- **`/api/upload-blog-image`** - Blog/article images (800x600, blog/ directory)  
- **`/api/upload-mealplan-image`** - Meal plan images (600x400, mealplan/ directory)

## Configuration Options

```javascript
const options = {
  uploadDir: 'blog',      // Directory under public/
  width: 800,             // Target width in pixels
  height: 600,            // Target height in pixels
  quality: 90,            // JPEG quality (1-100)
  fit: 'cover'           // Sharp fit option: 'cover', 'contain', 'fill', etc.
}
```

## Usage Examples

### Creating a New Upload API

```javascript
// /pages/api/upload-avatar.js
import { handleImageUpload, config, sendResponse } from '@/lib/imageUpload';

export { config };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendResponse(res, 405, { error: 'Method not allowed' });
  }

  try {
    const result = await handleImageUpload(req, {
      uploadDir: 'avatars',
      width: 200,
      height: 200,
      quality: 90,
      fit: 'cover'
    });

    sendResponse(res, 200, result);
  } catch (error) {
    console.error('Avatar upload error:', error);
    sendResponse(res, error.status || 500, { error: error.error || 'Failed to upload image' });
  }
}
```

### Frontend Image Upload

```javascript
// In your component
const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch('/api/upload-blog-image', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Upload successful:', result.imageUrl);
      return result.imageUrl;
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
```

### Deleting Images

```javascript
// In your API routes
import { deleteImageFile } from '@/lib/imageUpload';

// Auto-detect directory from path
deleteImageFile('/blog/image-123.jpg');

// Or specify directory explicitly
deleteImageFile('image-123.jpg', 'blog');
```

## Image Processing Features

- **Automatic Resizing**: Images are resized to specified dimensions
- **Format Standardization**: All images are converted to JPEG for consistency
- **Quality Optimization**: Configurable quality settings for file size control
- **Smart Cropping**: Uses Sharp's 'cover' fit to maintain aspect ratio
- **Progressive JPEG**: Enables progressive loading for better user experience

## File Organization

```
public/
├── foods/          # Food item images (400x400)
├── blog/           # Blog/article images (800x600)
├── mealplan/       # Meal plan images (600x400)
└── avatars/        # User avatar images (200x200)
```

## Error Handling

The system provides comprehensive error handling:
- File validation
- Directory creation
- Image processing errors
- Cleanup of temporary files
- Standardized error responses

## Security Considerations

- File type validation through MIME type checking
- Automatic filename generation to prevent conflicts
- File size limits (configurable)
- Directory traversal protection
- Temporary file cleanup

## Integration with Existing Code

The system is designed to be backward compatible. Existing upload endpoints can be gradually migrated to use the new helper system while maintaining the same API interface.

## Future Enhancements

- Support for multiple image formats (WebP, AVIF)
- Cloud storage integration (S3, Cloudinary)
- Image watermarking
- Batch upload support
- Image metadata extraction
