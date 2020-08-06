import {Router, Request, Response} from "express";
import {Faculty} from "../models/faculty";
import {School} from "../models/school";
const faculties = Router();

faculties.get('/', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    const faculties = await Faculty.find({status: 'enabled'})
                               .skip(skip)
                               .limit(10)
                               .exec();
    res.json({
        ok: true,
        page,
        faculties
    })
})

faculties.post('/', async(req: Request, res: Response)=> {
	const faculty = {
		name: req.body.name,
		description: req.body.description
	}
	Faculty.create(faculty, (err:any, faculty:any)=>{
		if (err) {
			res.status(404).json({
				ok: false,
				error: err.message
			})
			return;
		}
		res.status(201).json({
			ok: true,
			faculty: faculty
		})
	})
});

faculties.put('/:id', (req: Request, res: Response)=>{
	const id = req.params.id;
	const faculty = {
		name: req.body.name,
		description: req.body.description,
	}
	Faculty.findByIdAndUpdate(id, faculty, {new: true, runValidators: true, context: 'query'},
    (err:any, faculty:any) => {
        if (err){
            res.status(404).json({
                ok: false,
                error: err.message
            })
            return;
        }
        res.json({
            ok: true,
            faculty: faculty 
        })
    });

});

faculties.delete('/:id', (req: Request, res: Response) => {
	const id = req.params.id;
	Faculty.findByIdAndUpdate(id, {status:'disabled',deleted_date: new Date()}, {new: true, runValidators: true},
	async(err: any, faculty: any) => {
        if (err) {
            res.status(404).json({
                ok: false,
                error: err.message
            })
            return;
        }
        res.json({
            ok: true,
            faculty: faculty
        })
		await School.updateMany({faculty: id},{status:'disabled',deleted_date: new Date()});
    });
})
export default faculties;
