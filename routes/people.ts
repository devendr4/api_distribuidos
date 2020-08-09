import {Router} from "express";
import {person_list, create_person, update_person, delete_person} from "../controllers/person_controller";

const people = Router();
// people/
people.get('/',person_list);
people.post('/',create_person );
people.put('/:id', update_person);
people.delete('/:id', delete_person );
export default people;

