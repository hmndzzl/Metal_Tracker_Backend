import { Request, Response } from 'express';
import pool from '../config/db';

// GET /bands - Obtener todas las bandas
export const getBands = async (req: Request, res: Response): Promise<void> => {
    try {
        const queryStr = `SELECT * FROM bands ORDER BY name ASC`;
        const result = await pool.query(queryStr);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching bands:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /bands/:id - Obtener una banda específica
export const getBandById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM bands WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Banda no encontrada' });
            return;
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching band by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /bands - Crear una nueva banda
export const createBand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, genre, formation_year } = req.body;

        if (!name) {
            res.status(400).json({ error: 'El nombre de la banda es obligatorio' });
            return;
        }

        const queryStr = `
            INSERT INTO bands (name, genre, formation_year) 
            VALUES ($1, $2, $3) RETURNING *
        `;
        const values = [name, genre || null, formation_year || null];

        const result = await pool.query(queryStr, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating band:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT /bands/:id - Editar una banda
export const updateBand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, genre, formation_year } = req.body;

        const queryStr = `
            UPDATE bands 
            SET name = COALESCE($1, name), 
                genre = COALESCE($2, genre), 
                formation_year = COALESCE($3, formation_year) 
            WHERE id = $4 RETURNING *
        `;
        const values = [name, genre, formation_year, id];

        const result = await pool.query(queryStr, values);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Banda no encontrada' });
            return;
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating band:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /bands/:id - Eliminar una banda
export const deleteBand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const result = await pool.query(`DELETE FROM bands WHERE id = $1 RETURNING id`, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Banda no encontrada' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting band:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};