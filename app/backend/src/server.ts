import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware requerido por el laboratorio (CORS y parseo de JSON)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'Brutal!',
            message: 'Server and Database are alive',
            db_time: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Metal Tracker API corriendo en http://localhost:${PORT}`);
});