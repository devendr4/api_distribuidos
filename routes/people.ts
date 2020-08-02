import {Router, Request, Response} from "express";
import {Person} from "../models/person";

const people = Router();

// /people/
people.post('/', async (req: Request, res: Response) => {
    const person = {
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    Person.create(person).then(dbPerson => {
        res.status(201).json({
            ok: true,
            person: dbPerson
        });
    }).catch(err => {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    });
});
export default people;

