import {Faculty} from '../models/faculty'
import {Request, Response} from "express"
import {School} from "../models/school"
import * as responses from "../controllers/helpers"

export const faculty_list = async (req: Request, res: Response) => {	
	const page = Number(req.query.page) || 1;
	const skip = (page -1) * 10;
    const faculties = await Faculty.find({status: 'enabled'})
                               .skip(skip)
                               .limit(10)
                               .exec();
	responses.success({faculties},res,page)	
}

export const create_faculty = async (req: Request, res: Response) => {
	const faculty = {
		name: req.body.name,
		description: req.body.description
	}
	Faculty.create(faculty, (err:any, faculty:any)=>{
		if (err) {
			responses.failure(res,err.message)
		}
		else
			responses.create_success({faculty},res)
	})
}

export const update_faculty = (req: Request, res: Response) => {
	const id = req.params.id
	const faculty = {
		name: req.body.name,
		description: req.body.description
	}
	Faculty.findByIdAndUpdate(id, faculty, {new: true, runValidators: true, context: 'query'},
    (err:any, faculty:any) => {
        if (err){
        	responses.failure(res,err.message)
		}
		else
			responses.success({faculty},res)
    })
}

export const disable_faculty = (req: Request, res: Response) => {
	const id = req.params.id;
	Faculty.findByIdAndUpdate(id, {status:'disabled',deleted_date: new Date()}, 
							  {new: true, runValidators: true},
							  async(err: any, faculty: any) => {
        if (err) {
        	responses.failure(res,err.message)
		}
		else
			responses.success({faculty},res)
			await School.updateMany({faculty: id},{status:'disabled',deleted_date: new Date()});
    })
}

export const validate_faculty = async (id: any) => {
	var a = await Faculty.findOne({_id: id,status:'disabled'}, (err: any ,faculty: any) => {	
	}).exec()
	if (a){
		return false
	}
	else
		return true
}

