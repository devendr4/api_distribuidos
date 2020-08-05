import express from 'express';
import people from './people';
import enrollments from './enrollments';
import sections from './sections';
export const router = express.Router();
// Declaracion de todas las rutas
router.use('/people', people);
router.use('/sections', sections);
router.use('/enrollments', enrollments);

