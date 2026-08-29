import { Router } from 'express';
import {
  listLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locations.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { locationCreateSchema } from '../shared/validation';

const router = Router();

router.get('/', listLocations);
router.get('/:id', getLocation);
router.post('/', authenticate, requireAdmin, validate(locationCreateSchema), createLocation);
router.put('/:id', authenticate, requireAdmin, updateLocation);
router.delete('/:id', authenticate, requireAdmin, deleteLocation);

export default router;
