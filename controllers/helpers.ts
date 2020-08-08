/*import {Request, Response} from "express"
import from mod
export const school_list = async (req: Request, res: Response) => {	
	const page = Number(req.query.page) || 1;
	const skip = (page -1) * 10;
	const schools = await School.find({status:'enabled'}).populate('faculty', 'name').skip(skip).limit(10).exec();
	res.json({
		ok: true,
		page,
		schools
	})
}*/
