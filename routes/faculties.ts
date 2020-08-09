import {Router} from "express"
import * as faculty_controller from "../controllers/faculty_controller"
import {validate_name_description} from "../controllers/helpers"
const faculties = Router()

faculties.get('/', faculty_controller.faculty_list)

faculties.post('/', validate_name_description,faculty_controller.create_faculty)

faculties.put('/:id',validate_name_description,faculty_controller.update_faculty) 

faculties.delete('/:id',faculty_controller.disable_faculty)

export default faculties;

