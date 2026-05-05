import { Request, Response } from 'express';
import pool from '../config/db';

// GET /albums/:id/ratings - Obtener las reseñas de un álbum
export const getAlbumRatings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // ID del álbum

        const queryStr = `
            SELECT r.id, r.score, r.review_text, u.username 
            FROM album_ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.album_id = $1
            ORDER BY r.id DESC
        `;
        const result = await pool.query(queryStr, [id]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /albums/:id/ratings - Agregar una nueva reseña
export const createAlbumRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // ID del álbum
        const { score, review_text } = req.body;

        // Extraemos el user_id del token JWT inyectado en el request
        const user_id = (req as any).user?.id;

        // Validación Server-Side
        if (!score || score < 1 || score > 10) {
            res.status(400).json({ error: 'El score es obligatorio y debe estar entre 1 y 10' });
            return;
        }

        if (!user_id) {
            res.status(401).json({ error: 'Usuario no autenticado' });
            return;
        }

        const queryStr = `
            INSERT INTO album_ratings (album_id, user_id, score, review_text)
            VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const values = [id, user_id, score, review_text || null];

        const result = await pool.query(queryStr, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};