import { handleImageUpload, config, sendResponse } from '@/lib/imageUpload';

export { config };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

    sendResponse(res, 200, result);
  } catch (error) {
    console.error('Food image upload error:', error);
    sendResponse(res, error.status || 500, { error: error.error || 'Failed to upload image' });
  }
}
