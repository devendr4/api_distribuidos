import {School} from '../models/school'
import {Section} from "../models/section"
import {Request, Response} from "express"
import {validate_faculty} from "../controllers/faculty_controller"
import * as responses from "../controllers/helpers"

export const school_list = async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const skip = (page -1) * 10;
	const schools = await School.find({status:'enabled'}).populate('faculty', 'name')
	.skip(skip)
	.limit(10)
	.exec()
	responses.success({schools},res,page)
}

export const create_school = async (req: Request, res: Response) => {
	const school = {
		name: req.body.name,
		description: req.body.last_name,
		faculty: req.body.faculty
	}
	var validate = await validate_faculty(school.faculty)
	if (validate){
		School.create(school, (err:any, school:any) => {
			if (err) {
				responses.failure(res,err.message)
			}
			else
				responses.create_success({school},res)
		})
	}
	else
		responses.failure(res,'La facultad ingresada no se encuentra activa')
}

export const update_school = (req: Request, res: Response) => {
	const id = req.params.id
	const school = {
		name: req.body.name,
		description: req.body.description
	}
	School.findByIdAndUpdate(id, school, {new: true, runValidators: true, context: 'query'},
    (err:any, school:any) => {
        if (err){
			responses.failure(res,err.message)
        }
       	else
			responses.success({school},res)

    })
}

export const disable_school = (req: Request, res: Response) => {
	const id = req.params.id;
	School.findByIdAndUpdate(id, {status:'disabled',deleted_date: new Date()}, {new: true, runValidators: true},
							 (err: any, school: any) => {
        if (err) {
        	responses.failure(res,err.message)
		}
		else{
 			responses.success({school},res)

            Section.disableMany(id);
        }
    });
}

