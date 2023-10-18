import { Router } from 'express';
import { libros } from './controller.js';

export const router = Router()

router.get('/libro', libros.getAll);
router.post('/libro', libros.add);