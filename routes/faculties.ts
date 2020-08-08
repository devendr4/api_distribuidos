import {Router} from "express"
import * as faculty_controller from "../controllers/faculty_controller"
const faculties = Router()

faculties.get('/', faculty_controller.faculty_list)

faculties.post('/', faculty_controller.create_faculty)

faculties.put('/:id',faculty_controller.update_faculty) 

faculties.delete('/:id',faculty_controller.disable_faculty)

export default faculties;

