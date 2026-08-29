import { Router } from 'express';
import { listTags, createTag, deleteTag } from '../controllers/tags.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { tagCreateSchema } from '../shared/validation';

const router = Router();

router.get('/', listTags);
router.post('/', authenticate, requireAdmin, validate(tagCreateSchema), createTag);
router.delete('/:id', authenticate, requireAdmin, deleteTag);

export default router;
