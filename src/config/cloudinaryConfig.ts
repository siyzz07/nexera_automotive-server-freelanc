import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { envConfig } from './envConfig.js';

cloudinary.config({
  cloud_name: envConfig.cloudinary.CLOUD_NAME,
  api_key: envConfig.cloudinary.API_KEY,
  api_secret: envConfig.cloudinary.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video');
    return {
      folder: 'nexera_vehicles',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: isVideo ? ['mp4', 'mov', 'avi'] : ['jpg', 'png', 'jpeg', 'webp'],
      transformation: isVideo ? [{ duration: 16 }] : undefined, // Cloudinary can also trim but we'll validate client-side too
    };
  },
});

export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for video
  }
});

export { cloudinary };
