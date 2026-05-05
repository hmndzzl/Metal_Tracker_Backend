import { Router } from 'express';
import {
    getAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
} from '../controllers/albumController';

const router = Router();

// GET /api/albums
router.get('/', getAlbums);

// GET /api/albums/:id
router.get('/:id', getAlbumById);

// POST /api/albums
router.post('/', createAlbum);

// PUT /api/albums/:id
router.put('/:id', updateAlbum);

// DELETE /api/albums/:id
router.delete('/:id', deleteAlbum);

export default router;