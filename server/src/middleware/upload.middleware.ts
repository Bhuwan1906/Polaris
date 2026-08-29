import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UPLOAD_DIR, MAX_FILE_SIZE } from '../lib/constants';
import fs from 'fs';

// Ensure upload directories exist
const dirs = ['images', 'documents', 'videos'];
dirs.forEach((dir) => {
  const dirPath = path.join(UPLOAD_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subfolder = 'images';
    if (file.mimetype.startsWith('video/')) subfolder = 'videos';
    if (file.mimetype === 'application/pdf' || file.mimetype.includes('document'))
      subfolder = 'documents';
    cb(null, path.join(UPLOAD_DIR, subfolder));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    // Accept images, documents, videos
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.mimetype === 'application/pdf' ||
      file.mimetype.includes('document')
    ) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not supported`));
    }
  },
});

export function getUploadUrl(filename: string, subfolder: string): string {
  return `/uploads/${subfolder}/${filename}`;
}
