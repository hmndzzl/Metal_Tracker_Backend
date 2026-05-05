import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import pool from './config/db';
import albumRoutes from './routes/albumRoutes';
import bandRoutes from './routes/bandRoutes';
import songRoutes from './routes/songRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.use('/api/albums', albumRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/songs', songRoutes);

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Metal Tracker API corriendo en http://localhost:${PORT}`);
    console.log(`📖 Documentación Swagger lista en http://localhost:${PORT}/api-docs`);
});