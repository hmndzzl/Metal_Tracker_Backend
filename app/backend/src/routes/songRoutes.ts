import { Router } from 'express';
import {
    getSongs,
    createSong,
    updateSong,
    deleteSong
} from '../controllers/songController';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getSongs);
router.post('/', verifyToken, isAdmin, createSong);
router.put('/:id', verifyToken, isAdmin, updateSong);
router.delete('/:id', verifyToken, isAdmin, deleteSong);

export default router;