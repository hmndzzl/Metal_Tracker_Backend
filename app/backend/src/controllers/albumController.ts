import { Request, Response } from 'express';
import pool from '../config/db';

// GET /albums - Listar todos con paginación, búsqueda y ordenamiento (Challenge: 60 pts en total)
export const getAlbums = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, q = '', sort = 'release_year', order = 'desc' } = req.query;

        // Sanitización básica para ordenamiento (evitar SQL Injection)
        const validSortColumns = ['title', 'release_year', 'id'];
        const validOrders = ['asc', 'desc'];

        const sortBy = validSortColumns.includes(String(sort).toLowerCase()) ? String(sort) : 'release_year';
        const orderBy = validOrders.includes(String(order).toLowerCase()) ? String(order).toUpperCase() : 'DESC';

        const offset = (Number(page) - 1) * Number(limit);

        // Construcción dinámica de la consulta
        let queryStr = `
            SELECT a.id, a.title, a.release_year, a.cover_image_url, b.name AS band_name, b.genre 
            FROM albums a 
            JOIN bands b ON a.band_id = b.id 
            WHERE a.title ILIKE $1 
            ORDER BY a.${sortBy} ${orderBy} 
            LIMIT $2 OFFSET $3
        `;

        // El % rodea el término de búsqueda para que actúe como un "LIKE" de SQL
        const values = [`%${q}%`, Number(limit), offset];

        const result = await pool.query(queryStr, values);

        // Respondemos con código 200 por defecto
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching albums:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /albums/:id - Obtener un álbum por ID
export const getAlbumById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const albumQuery = `
            SELECT a.*, b.name AS band_name 
            FROM albums a 
            JOIN bands b ON a.band_id = b.id 
            WHERE a.id = $1
        `;
        const result = await pool.query(albumQuery, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Álbum no encontrado en el abismo' });
            return;
        }

        // Extra: Traemos las canciones de este álbum para que el cliente las muestre
        const songsQuery = `SELECT id, track_number, title, duration_seconds FROM songs WHERE album_id = $1 ORDER BY track_number`;
        const songsResult = await pool.query(songsQuery, [id]);

        const albumData = {
            ...result.rows[0],
            tracklist: songsResult.rows
        };

        res.json(albumData);
    } catch (error) {
        console.error('Error fetching album by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /albums - Crear un álbum nuevo
export const createAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
        const { band_id, title, release_year, cover_image_url } = req.body;

        // Validación Server-Side (Challenge 20 pts)
        if (!band_id || !title) {
            res.status(400).json({ error: 'Faltan datos obligatorios: band_id y title son requeridos' });
            return;
        }

        const queryStr = `
            INSERT INTO albums (band_id, title, release_year, cover_image_url) 
            VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const values = [band_id, title, release_year, cover_image_url || null];

        const result = await pool.query(queryStr, values);

        // Código 201 Created exigido por la rúbrica
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT /albums/:id - Editar un álbum existente
export const updateAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, release_year, cover_image_url } = req.body;

        const queryStr = `
            UPDATE albums 
            SET title = COALESCE($1, title), 
                release_year = COALESCE($2, release_year), 
                cover_image_url = COALESCE($3, cover_image_url) 
            WHERE id = $4 RETURNING *
        `;
        const values = [title, release_year, cover_image_url, id];

        const result = await pool.query(queryStr, values);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Álbum no encontrado' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating album:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /albums/:id - Eliminar un álbum
export const deleteAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const result = await pool.query(`DELETE FROM albums WHERE id = $1 RETURNING id`, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Álbum no encontrado' });
            return;
        }

        // Código 204 No Content exigido por la rúbrica (204 no devuelve body)
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /albums/:id/cover 
export const uploadAlbumCover = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Si Multer rechazó el archivo (por tamaño o formato) o no se envió nada
        if (!req.file) {
            res.status(400).json({ error: 'No se envió ninguna imagen o el archivo supera 1MB' });
            return;
        }

        // Generamos la URL relativa que consumirá el frontend
        const imageUrl = `/uploads/${req.file.filename}`;

        // Actualizamos el álbum en la base de datos
        const queryStr = `UPDATE albums SET cover_image_url = $1 WHERE id = $2 RETURNING *`;
        const result = await pool.query(queryStr, [imageUrl, id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Álbum no encontrado' });
            return;
        }

        res.json({
            message: 'Imagen subida con éxito',
            album: result.rows[0]
        });
    } catch (error) {
        console.error('Error uploading cover:', error);
        res.status(500).json({ error: 'Internal server error al subir la imagen' });
    }
};