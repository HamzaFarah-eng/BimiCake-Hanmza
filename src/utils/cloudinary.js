import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import { AppError } from './AppError.js';

if(!process.env.cloud_name ||!process.env.api_key ||!process.env.api_secret) {
    throw new AppError('Missing cloudinary configuration', 500);
}
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

export default cloudinary;