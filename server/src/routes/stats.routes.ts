import { Router } from 'express';
import {
  getOverviewStats,
  getExpeditionsByYear,
  getRegionStats,
  getResourcesByType,
} from '../controllers/stats.controller';

const router = Router();

router.get('/overview', getOverviewStats);
router.get('/expeditions-by-year', getExpeditionsByYear);
router.get('/regions', getRegionStats);
router.get('/resources-by-type', getResourcesByType);

export default router;
