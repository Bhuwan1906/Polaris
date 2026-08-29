import { Router } from 'express';
import {
  listMedia,
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/media.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';

const router = Router();

router.get('/', listMedia);
router.get('/:id', getMedia);
router.post('/', authenticate, requireAdmin, createMedia);
router.put('/:id', authenticate, requireAdmin, updateMedia);
router.delete('/:id', authenticate, requireAdmin, deleteMedia);

export default router;
