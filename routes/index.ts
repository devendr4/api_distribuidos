import express from 'express';
import people from './people';
import enrollments from './enrollments';
import sections from './sections';
import schools from './schools';
import faculties from './faculties';
export const router = express.Router();
// Declaracion de todas las rutas
router.use('/v1/people', people);
router.use('/v1/sections', sections);
router.use('/v1/schools', schools);
router.use('/v1/faculties', faculties);
router.use('/v1/enrollments', enrollments);

