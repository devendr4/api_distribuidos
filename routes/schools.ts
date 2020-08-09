import {Router} from "express";
import * as school_controller from "../controllers/school_controller";

const schools = Router();

schools.get('/',school_controller.school_list)

schools.post('/',school_controller.create_school)

schools.put('/:id',school_controller.update_school)

schools.delete('/:id', school_controller.disable_school)

export default schools;
