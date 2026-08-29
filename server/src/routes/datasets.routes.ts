import { Router } from 'express';
import {
  listDatasets,
  getDataset,
  createDataset,
  updateDataset,
  deleteDataset,
} from '../controllers/datasets.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { datasetCreateSchema } from '../shared/validation';

const router = Router();

router.get('/', listDatasets);
router.get('/:id', getDataset);
router.post('/', authenticate, requireAdmin, validate(datasetCreateSchema), createDataset);
router.put('/:id', authenticate, requireAdmin, updateDataset);
router.delete('/:id', authenticate, requireAdmin, deleteDataset);

export default router;
