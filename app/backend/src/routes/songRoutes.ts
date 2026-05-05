import { Router } from 'express';
import {
    getSongs,
    createSong,
    updateSong,
    deleteSong
} from '../controllers/songController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getSongs);
router.post('/', verifyToken, createSong);
router.put('/:id', verifyToken, updateSong);
router.delete('/:id', verifyToken, deleteSong);

export default router;