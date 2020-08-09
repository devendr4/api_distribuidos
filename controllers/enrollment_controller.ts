import {Enrollment} from "../models/enrollment"
import {Request, Response} from 'express'
import {Person} from "../models/person";
import {Section} from "../models/section";
import {success, failure,create_success} from "./helpers";

export const enrollment_list = async (req: Request, res: Response ) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    const enrollments = await Enrollment.find({status: 'enabled'}, 'type section person')
                                  .populate('section','name')
                                  .populate('person', 'dni first_name last_name')
                                  .skip(skip)
                                  .limit(10)
                                  .exec();
    success(enrollments, res, page);

}

export const create_enrollment = async (req: Request, res: Response) => {
    let persona:any, seccion:any;
    let enrollment:any = {
        section: req.body.section || "0",
        person: req.body.person || "0",
        type: req.body.type
    }
    try {
        persona = await Person.findById(enrollment.person).exec();
        seccion = await Section.findById(enrollment.section).exec();
    }catch(err){
        return failure(res, 'La persona o la seccion son erroneas')
    } finally {
        if (persona.status == 'disabled' || seccion.status == 'disabled'){
            return failure(res, 'La persona o la seccion no disponibles')
        }
    }
    const exist:any = await Enrollment.findOne(
        {status: 'enabled', section: enrollment.section, person: enrollment.person}).exec();
    if (exist) {
        return failure(res, 'Ya se encuentra inscrito en esa seccion')
    }else {
        Enrollment.create(enrollment, async (err:any, inscripcion:any)=>{
            if(err){
                return failure(res, err.message);
            }
            await inscripcion.populate('section','name description').populate('person','dni first_name last_name').execPopulate();
            create_success(inscripcion, res);
        })
    }

}

export const delete_enrollment = (req: Request, res: Response) =>{
    const id = req.params.id;
    Enrollment.findByIdAndUpdate(id, {status: 'disabled', deleted_date: new Date()}, {new: true, runValidators: true},
    (err:any, seccion:any) => {
        if (err) {
            return failure(res, err.message);
        }
        success(seccion, res);
    });

}
