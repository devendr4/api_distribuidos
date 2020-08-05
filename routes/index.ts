import express from 'express';
import people from './people';
import sections from './sections';
import schools from './schools';
import faculties from './faculties';
export const router = express.Router();
// Declaracion de todas las rutas
router.use('/people', people);
router.use('/sections', sections);
router.use('/schools', schools);
router.use('/faculties', faculties);

