import {Router} from "express";
import * as school_controller from "../controllers/school_controller";
import {validate_name_description} from "../controllers/helpers"
const schools = Router();

// people/
schools.get('/',school_controller.school_list)

schools.post('/',validate_name_description, school_controller.create_school)

schools.put('/:id',validate_name_description, school_controller.update_school)

schools.delete('/:id', school_controller.disable_school)

export default schools;
