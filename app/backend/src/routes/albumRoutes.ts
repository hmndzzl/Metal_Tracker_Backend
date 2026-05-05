import { Router } from 'express';
import {
    getAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
} from '../controllers/albumController';

import {
    getAlbumRatings,
    createAlbumRating
} from '../controllers/ratingController';

const router = Router();

// Rutas Albums
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

// Rutas Ratings
// GET /api/albums/:id/ratings
router.get('/:id/ratings', getAlbumRatings);

// POST /api/albums/:id/ratings
router.post('/:id/ratings', createAlbumRating);

export default router;