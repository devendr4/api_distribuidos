import {Router, Request, Response} from "express";
import {Enrollment} from "../models/enrollment";
import {Person} from "../models/person";
import {Section} from "../models/section";

const enrollments = Router();

enrollments.get('/', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    const enrollments = await Enrollment.find({status: 'enabled'}, 'type section person')
                                  .populate('section','name')
                                  .populate('person', 'dni first_name last_name')
                                  .skip(skip)
                                  .limit(10)
                                  .exec();
    res.json({
        ok: true,
        page,
        enrollments
    })
})
// /enrollments/
enrollments.post('/', async (req: Request, res: Response) => {
    let persona:any, seccion:any;
    let enrollment = {
        section: req.body.section || 0,
        person: req.body.person || 0,
        type: req.body.type
    }
    try {
        persona = await Person.findById(enrollment.person).exec();
        seccion = await Section.findById(enrollment.section).exec();

    }catch(err){
        res.status(404).json({
            ok: false,
            error: 'La persona o la seccion son erroneas'
        });
        return;
    } finally {
        if (persona.status == 'disabled' || seccion.status == 'disabled'){
            res.status(404).json({
                ok: false,
                error: 'Persona o Seccion no disponibles'
            });
            return;
        }
    }
    console.log(persona)
    console.log(seccion)
    const exist:any = await Enrollment.findOne(
        {status: 'enabled', section: enrollment.section, person: enrollment.person}).exec();
    console.log(exist);
    if (exist) {
        res.status(404).json({
            ok: false,
            error: 'Ya se encuentra inscrito en esa seccion'
        })
        return
    }else {
        Enrollment.create(enrollment, async (err:any, inscripcion:any)=>{
            if(err){
                res.status(404).json({
                    ok: false,
                    error: err.message
                })
                return;
            }
            await inscripcion.populate('section','name description').populate('person','dni first_name last_name').execPopulate();
            res.json({
                ok: true,
                enrollment: inscripcion
            })
        })
    }
});


enrollments.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Enrollment.findByIdAndUpdate(id, {status: 'disabled', deleted_date: new Date()}, {new: true, runValidators: true},
    (err:any, seccion:any) => {
        if (err) {
            res.status(404).json({
                ok: false,
                error: err.message
            })
            return;
        }
        res.json({
            ok: true,
            section: seccion
        })
    });
})
export default enrollments;

