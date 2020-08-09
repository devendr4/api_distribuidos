import {Router} from "express";
import {section_list, section_by_enrollment_type, create_section, update_section, delete_section} from "../controllers/section_controller";
import {validate_name_description} from "../controllers/helpers";

const sections = Router();

// /sections/
sections.get('/',section_list);

sections.get('/:id/:type', section_by_enrollment_type);

sections.post('/', validate_name_description, create_section);

sections.put('/:id',validate_name_description, update_section);

sections.delete('/:id', delete_section);

export default sections;

