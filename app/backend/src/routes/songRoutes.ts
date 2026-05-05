import { Router } from 'express';
import {
    getSongs,
    createSong,
    updateSong,
    deleteSong
} from '../controllers/songController';

const router = Router();

router.get('/', getSongs);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;