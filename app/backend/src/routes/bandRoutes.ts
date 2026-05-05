import { Router } from 'express';
import {
    getBands,
    getBandById,
    createBand,
    updateBand,
    deleteBand
} from '../controllers/bandController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getBands);
router.get('/:id', getBandById);
router.post('/', verifyToken, createBand);
router.put('/:id', verifyToken, updateBand);
router.delete('/:id', verifyToken, deleteBand);

export default router;