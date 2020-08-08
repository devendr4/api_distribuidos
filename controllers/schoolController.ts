import {School} from '../models/school'
import {Section} from "../models/section"
import {Request, Response} from "express"
import {validate_faculty} from "../controllers/faculty_controller"
export const school_list = async (req: Request, res: Response) => {	
	const page = Number(req.query.page) || 1;
	const skip = (page -1) * 10;
	const schools = await School.find({status:'enabled'}).populate('faculty', 'name').skip(skip).limit(10).exec();
	res.json({
		ok: true,
		page,
		schools
	})
}

export const create_school = async (req: Request, res: Response) => {
	const school = {
		name: req.body.name,
		description: req.body.last_name,
		faculty: req.body.faculty
	}
	School.create(school, (err:any, school:any) => {
		if (err) {
			res.status(404).json({
				ok: false,
				error: err.message
			})
		return;
		}
		res.status(201).json({
			ok: true,
			school: school
		})
	})	
	///validate_faculty(school.faculty)
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
            res.status(404).json({
                ok: false,
                error: err.message
            })
            return
        }
        res.json({
            ok: true,
            school: school
        })
    })
}

export const disable_school = (req: Request, res: Response) => {
	const id = req.params.id;
	School.findByIdAndUpdate(id, {status:'disabled',deleted_date: new Date()}, {new: true, runValidators: true},
							 (err: any, school: any) => {
        if (err) {
            res.status(404).json({
                ok: false,
                error: err.message
            })
            return;
        }
        res.json({
            ok: true,
            school: school
        })
        Section.disableMany(id);
    });
}

