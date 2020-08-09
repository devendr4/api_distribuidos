import {Router} from "express";
import {enrollment_list, create_enrollment, delete_enrollment} from "../controllers/enrollment_controller";

const enrollments = Router();

enrollments.get('/',enrollment_list);
// /enrollments/
enrollments.post('/',create_enrollment);

enrollments.delete('/:id',delete_enrollment);

export default enrollments;

