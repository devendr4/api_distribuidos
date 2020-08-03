import {Router, Request, Response} from "express";
import {Person} from "../models/person";

const people = Router();

people.get('/', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    const people = await Person.find({status: 'enabled'})
                               .skip(skip)
                               .limit(10)
                               .exec();
    res.json({
        ok: true,
        page,
        people
    })
})

// /people/
people.post('/', async (req: Request, res: Response) => {
    const person = {
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    Person.create(person, (err, persona) => {
        if (err) {
            res.status(404).json({
                ok: false,
                error: err.message
            })
        }
        res.status(201).json({
            ok: true,
            person: persona
        })
    })
});

people.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const person = {
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    Person.findByIdAndUpdate(id, person, {new: true, runValidators: true},
    (err, persona) => {
        if (err){
            res.status(404).json({
                ok: false,
                error: err.message
            })
        }
        res.json({
            ok: true,
            person: persona
        })
    });

});

people.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Person.findByIdAndUpdate(id, {status: 'disabled'}, {new: true, runValidators: true},
    (err, persona) => {
        if (err) {
            res.status(404).json({
                ok: false,
                error: err.message
            })
        }
        res.json({
            ok: true,
            person: persona
        })
    });
})
export default people;

