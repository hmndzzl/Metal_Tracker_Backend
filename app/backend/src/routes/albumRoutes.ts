import { Router } from 'express';
import {
    getAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    uploadAlbumCover
} from '../controllers/albumController';

import {
    getAlbumRatings,
    createAlbumRating
} from '../controllers/ratingController';

import { upload } from '../middlewares/uploadConfig';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Rutas Albumes
// GET /api/albums
router.get('/', getAlbums);

// GET /api/albums/:id
router.get('/:id', getAlbumById);

// POST /api/albums
router.post('/', verifyToken, createAlbum);

// PUT /api/albums/:id
router.put('/:id', verifyToken, updateAlbum);

// DELETE /api/albums/:id
router.delete('/:id', verifyToken, deleteAlbum);

// Rutas Ratings
// GET /api/albums/:id/ratings
router.get('/:id/ratings', getAlbumRatings);

// POST /api/albums/:id/ratings
router.post('/:id/ratings', verifyToken, createAlbumRating);

// Rutas de subida de imágen
// POST /api/albums/:id/cover
router.post('/:id/cover', verifyToken, upload.single('cover'), uploadAlbumCover);

export default router;