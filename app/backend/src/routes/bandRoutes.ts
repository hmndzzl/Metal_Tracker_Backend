import { Router } from 'express';
import { getBands } from '../controllers/bandController';

const router = Router();

router.get('/', getBands);

export default router;