import { Request, Response } from 'express';
import pool from '../config/db';

// GET /bands - Obtener todas las bandas para los selects del frontend
export const getBands = async (req: Request, res: Response): Promise<void> => {
    try {
        const queryStr = `SELECT id, name, genre, formation_year FROM bands ORDER BY name ASC`;
        const result = await pool.query(queryStr);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching bands:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};