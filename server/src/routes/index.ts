import { Router } from 'express';
import authRoutes from './auth.routes';
import expeditionRoutes from './expeditions.routes';
import publicationRoutes from './publications.routes';
import datasetRoutes from './datasets.routes';
import reportRoutes from './reports.routes';
import mediaRoutes from './media.routes';
import searchRoutes from './search.routes';
import locationRoutes from './locations.routes';
import tagRoutes from './tags.routes';
import outreachRoutes from './outreach.routes';
import statsRoutes from './stats.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/expeditions', expeditionRoutes);
router.use('/publications', publicationRoutes);
router.use('/datasets', datasetRoutes);
router.use('/reports', reportRoutes);
router.use('/media', mediaRoutes);
router.use('/search', searchRoutes);
router.use('/locations', locationRoutes);
router.use('/tags', tagRoutes);
router.use('/outreach', outreachRoutes);
router.use('/stats', statsRoutes);
router.use('/users', usersRoutes);

export default router;
