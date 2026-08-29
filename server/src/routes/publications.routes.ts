import { Router } from 'express';
import {
  listPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
  getLatestPublications,
} from '../controllers/publications.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { publicationCreateSchema } from '../shared/validation';

const router = Router();

router.get('/latest', getLatestPublications);
router.get('/', listPublications);
router.get('/:id', getPublication);
router.post('/', authenticate, requireAdmin, validate(publicationCreateSchema), createPublication);
router.put('/:id', authenticate, requireAdmin, updatePublication);
router.delete('/:id', authenticate, requireAdmin, deletePublication);

export default router;
