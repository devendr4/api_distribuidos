import {Section} from "../models/section"
import { Request, Response } from 'express'
import {Enrollment} from "../models/enrollment";
import {School} from "../models/school";
import {success, failure, create_success} from "./helpers";


export const section_list = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    let sections = await Section.find({status: 'enabled'},{enrollments: 0})
                               .populate('school','name')
                               .skip(skip)
                               .limit(10)
                               .exec();
    success({sections}, res, page)

}

export const section_by_enrollment_type = async (req: Request, res: Response) => {
    const id = req.params.id;
    const type = req.params.type;
    if (type !== 'teachers' && type !== 'students'){
        return failure(res, 'opcion invalida')
    }
    const section:any = await Section.findOne({_id: id, status: 'enabled'}).exec();
    if (section) {
        const enrollments = await Enrollment.find({section: id, type: type.slice(0,-1), status: 'enabled'}, 'person')
                                            .populate('person', 'dni first_name last_name')
        let people: any[] = [];
        enrollments.forEach((enrollment:any) => {
            people.unshift(enrollment.person);
        })
        let object:any = {
            ok:true,
            section: section.name
        }
        object[type] = people
        res.json(object)
    }else{
        return failure(res, 'La seccion no existe')
    }

}

export const create_section = async (req: Request, res: Response) => {
    const section:any = {
        name: req.body.name,
        description: req.body.description,
        uc: req.body.uc,
        semester: req.body.semester,
        type: req.body.type,
        ht: req.body.ht,
        hp: req.body.hp,
        hl: req.body.hl,
		school: req.body.school
    }
    const name:any = await Section.findOne({status: 'disabled', name: section.name}).exec();

    const school = await School.findOne({_id: section.school, status: 'enabled'}).exec();
    if (school){
        if (name){
            section.status = 'enabled';
            section.deleted_date = undefined;
            Section.findByIdAndUpdate(name._id, section, {new: true, runValidators: true, context: 'query'},
            async (err:any, seccion:any) => {
                if (err){
                    return failure(res, err.message)
                }
                await seccion.populate('school','name').execPopulate();
                create_success({section: seccion}, res);
            });
        }else {
            Section.create(section,async (err:any, seccion:any) => {
                if (err) {
                    return failure(res, err.message);
                }
                await seccion.populate('school','name').execPopulate();

                create_success({section: seccion}, res);
            })
        }
    }else {
        return failure(res, 'Escuela no existe');
    }

}

export const update_section = async (req: Request, res: Response) => {
    const id = req.params.id;
    const section = {
        name: req.body.name,
        description: req.body.description,
        uc: req.body.uc,
        semester: req.body.semester,
        type: req.body.type,
        ht: req.body.ht || 0.0,
        hp: req.body.hp || 0.0,
        hl: req.body.hl || 0.0,
        school: req.body.school || undefined
    }

    const school = await School.findOne({_id: section.school, status: 'enabled'}).exec();
    console.log(school)
    if(school){
        Section.findByIdAndUpdate(id, section, {new: true, runValidators: true, context: 'query'},
        async(err:any, seccion:any) => {
            if (err){
                return failure(res, err.message);
            }

            await seccion.populate('school','name').execPopulate();
            return success({section: seccion}, res);
        });

    }else{
        return failure(res, 'La escuela no existe')
    }

}

export const delete_section =  (req: Request, res: Response) => {
    const id = req.params.id;
    Section.findByIdAndUpdate(id, {status: 'disabled', deleted_date: new Date()}, {new: true, runValidators: true},
      (err:any, seccion:any) => {
        if (err) {
            return failure(res, err.message)
        }
        success({section: seccion}, res)
        Enrollment.disableMany('section', id);
    });

}
