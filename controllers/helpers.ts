import {NextFunction, Request, Response} from 'express'
export const success = (model: Object, res:any, page: Number = 0) => {
	if (page == 0){
		res.json({
			ok: true,
			model
		})
	}
	else {
		//school
		res.json({
			ok: true,
			page,
			model
		})
	}
}

export const create_success = (model: Object, res:any) => {
       // const objecto = {...{ok:true}, ...model}
		res.status(201).json({
            ok:true,
            model
        })
}

export const failure = (res: any, message: string) => {
	res.status(404).json({
		ok: false,
		error: message
	})
}


export const validate_name_description = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name) return failure(res, 'El campo nombre es obligatorio');
    if (!req.body.description) return failure(res, 'El campo descripcion es obligatorio');
    next();
}
