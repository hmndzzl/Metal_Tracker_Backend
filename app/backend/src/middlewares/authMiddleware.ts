import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer <token>"

    if (!token) {
        res.status(403).json({ error: 'Acceso denegado: Token requerido' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        // Inyectamos los datos del usuario en la request para usarlos luego si es necesario
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

// Middleware para verificar si el usuario es Administrador
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    // El usuario ya fue desencriptado por verifyToken y guardado en req.user
    const user = (req as any).user;

    if (user && user.role === 'admin') {
        next(); // Tiene pase VIP, déjalo pasar a la ruta
    } else {
        res.status(403).json({ error: 'Acceso denegado: Solo los administradores pueden alterar el Vault.' });
    }
};