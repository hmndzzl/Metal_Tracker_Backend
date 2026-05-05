import { Router } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();
router.post('/login', login);
router.post('/register', register); // Úsalo una vez con Postman y luego puedes borrarlo/comentarlo

export default router;