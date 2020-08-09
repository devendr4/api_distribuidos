import {Person} from "../models/person"
import {Request, Response} from "express";
import {Enrollment} from "../models/enrollment";
import {success, failure, create_success} from "./helpers";

export const person_list = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    const people = await Person.find({status: 'enabled'})
                               .skip(skip)
                               .limit(10)
                               .exec();
    success(people, res, page);
}

export const create_person= async (req: Request, res: Response) =>{
    const person: any = {
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    const dni:any = await Person.findOne({ dni: person.dni, status: 'disabled'}).exec()

    if (dni){
        dni.first_name = person.first_name;
        dni.last_name = person.last_name;
        dni.deleted_date = undefined;
        dni.status = 'enabled';
        dni.save((err:any, dni:any) => {
            if (err) {
                return failure(res, err.message);
            }
            return create_success( dni, res)
        })
    }
    else{
        Person.create(person, (err:any, persona:any) => {
            if (err) {
                return failure(res, err.message);
            }
            return create_success( persona, res)
        })

    }
}

export const update_person = (req: Request, res: Response) =>{

    const id = req.params.id;
    const person = {
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    Person.findByIdAndUpdate(id, person, {new: true, runValidators: true,context: 'query'},
    (err:any, persona:any) => {
        if (err){
            return failure(res, err.message);
        }
        return success(persona, res);
      });


}

export const delete_person = (req: Request, res: Response) => {

    const id = req.params.id;
    Person.findByIdAndUpdate(id, {status: 'disabled', deleted_date: new Date()}, {new: true, runValidators: true},
    async(err:any, persona:any) => {

        if (err) {
            return failure(res, err.message)
        }
        success(persona, res);
        Enrollment.disableMany('person', id);
    });
}
