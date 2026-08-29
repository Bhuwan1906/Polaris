import path from 'path';

export const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
