import {Router, Request, Response} from "express";

const ejemplo = Router();


ejemplo.get('/prueba', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    });
});
export default ejemplo;

