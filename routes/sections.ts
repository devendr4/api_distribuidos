import {Router} from "express";
import {section_list, section_by_enrollment_type, create_section, update_section, delete_section} from "../controllers/section_controller";

const sections = Router();

// /sections/
sections.get('/',section_list);
sections.get('/:id/:type', section_by_enrollment_type);
sections.post('/', create_section);
sections.put('/:id', update_section);
sections.delete('/:id', delete_section);
export default sections;

