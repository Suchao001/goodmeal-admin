import { handleImageUpload, config, sendResponse } from '@/lib/imageUpload';

export { config };

export default async function handler(req, res) {
  if (!['POST', 'PATCH'].includes(req.method)) {
    return sendResponse(res, 405, { error: 'Method not allowed' });
  }

  try {
    const result = await handleImageUpload(req, {
      uploadDir: 'foods',
      width: 400,
      height: 400,
      quality: 85,
      fit: 'cover'
    });

    const responsePayload = {
      success: result.success,
      imageUrl: result.imageUrl,
      imagePath: result.imageUrl, // keep compatibility with editors expecting imagePath
      fileName: result.fileName,
      message: result.message
    };

    sendResponse(res, 200, responsePayload);
  } catch (error) {
    console.error('Food image upload error:', error);
    sendResponse(res, error.status || 500, { error: error.error || 'Failed to upload image' });
  }
}
