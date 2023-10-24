import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);//ver todos los libros
router.get('/libro', libro.getOne);//buscar un libros por id
router.post('/libro', libro.add);////agregar un libro
router.put('/libro',libro.update);