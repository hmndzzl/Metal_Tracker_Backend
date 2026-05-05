import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Evento que se dispara cuando se establece una nueva conexión exitosa
pool.on('connect', () => {
    console.log('Conexión a la base de datos forjada con éxito (PostgreSQL conectado)');
});

// Evento para capturar errores inesperados en el pool de conexiones
pool.on('error', (err) => {
    console.error('Error crítico y fatal en la base de datos:', err);
    process.exit(-1);
});

export default pool;