export const success = (model: Object, res:any, page: Number = 0) => {	
	if (page == 0){
		res.json({
			ok: true,
			model
		})	
	}
	else {
		res.json({
			ok: true,
			page,
			model
		})	
	}
}

export const create_success = (model: Object, res:any) => {
		res.status(201).json({
			ok: true,
			model
		})	
}

export const failure = (res: any, message: String) => {
	res.status(404).json({
		ok: false,
		error: message 
	})
}

