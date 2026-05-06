import { Router } from 'express';
import {
    getBands,
    getBandById,
    createBand,
    updateBand,
    deleteBand
} from '../controllers/bandController';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getBands);
router.get('/:id', getBandById);
router.post('/', verifyToken, isAdmin, createBand);
router.put('/:id', verifyToken, isAdmin, updateBand);
router.delete('/:id', verifyToken, isAdmin, deleteBand);

export default router;