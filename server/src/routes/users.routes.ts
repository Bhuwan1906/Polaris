import { Router } from 'express';
import { listUsers, updateUserRole, deleteUser } from '../controllers/users.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';

const router = Router();

router.use(authenticate, requireAdmin);

router.get('/', listUsers);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

export default router;
