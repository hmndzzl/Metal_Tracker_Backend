import { Request, Response } from 'express';
import pool from '../config/db';

// GET /songs - Obtener todas las canciones
export const getSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const queryStr = `
            SELECT s.*, a.title AS album_title 
            FROM songs s
            JOIN albums a ON s.album_id = a.id
            ORDER BY s.album_id, s.track_number ASC
        `;
        const result = await pool.query(queryStr);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /songs - Agregar una nueva canción a un álbum
export const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { album_id, track_number, title, duration_seconds } = req.body;

        if (!album_id || !track_number || !title) {
            res.status(400).json({ error: 'Faltan datos obligatorios: album_id, track_number y title' });
            return;
        }

        const queryStr = `
            INSERT INTO songs (album_id, track_number, title, duration_seconds) 
            VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const values = [album_id, track_number, title, duration_seconds || null];

        const result = await pool.query(queryStr, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT /songs/:id - Editar una canción existente
export const updateSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { track_number, title, duration_seconds } = req.body;

        const queryStr = `
            UPDATE songs 
            SET track_number = COALESCE($1, track_number), 
                title = COALESCE($2, title), 
                duration_seconds = COALESCE($3, duration_seconds) 
            WHERE id = $4 RETURNING *
        `;
        const values = [track_number, title, duration_seconds, id];

        const result = await pool.query(queryStr, values);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Canción no encontrada' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /songs/:id - Eliminar una canción
export const deleteSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const result = await pool.query(`DELETE FROM songs WHERE id = $1 RETURNING id`, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Canción no encontrada' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};