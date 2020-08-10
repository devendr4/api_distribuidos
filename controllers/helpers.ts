import {NextFunction, Request, Response} from 'express'
export const success = (model: Object, res:any, page: Number = 0) => {
	if (page == 0){
        const objeto = {...{ok: true}, ...model}
		res.json(objeto);
	}
	else {
		//school
        const objeto = {...{ok: true, page}, ...model}
		res.json(objeto)
	}
}

export const create_success = (model: Object, res:any) => {
        const objeto = {...{ok:true}, ...model}
		res.status(201).json(objeto)
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
