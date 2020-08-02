import express from 'express';
import people from './people';

export const router = express.Router();
// Declaracion de todas las rutas
router.use('/people', people);

