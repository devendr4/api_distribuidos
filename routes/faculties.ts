import {Router, Request, Response} from "express";
import {Faculty} from "../models/faculty";

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
		
	}
})

export default faculties;
