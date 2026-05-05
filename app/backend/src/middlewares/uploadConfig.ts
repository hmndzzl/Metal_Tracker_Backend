import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento local
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Apuntamos a la carpeta src/uploads
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        // Renombramos el archivo: cover-123456789.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'cover-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Exportamos el middleware configurado
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 // Tope exacto de 1 MegaByte (1MB) - Challenge 30 pts
    },
    fileFilter: (req, file, cb) => {
        // Seguridad: Validar que realmente sea una imagen
        const fileTypes = /jpeg|jpg|png|webp/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, webp)'));
        }
    }
});