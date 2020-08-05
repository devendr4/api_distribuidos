import {Router, Request, Response} from "express";
import {Section} from "../models/section";
import {Enrollment} from "../models/enrollment";

const sections = Router();

sections.get('/', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    let sections = await Section.find({status: 'enabled'},{enrollments: 0})
                               .skip(skip)
                               .limit(10)
                               .exec();
    res.json({
        ok: true,
        page,
        sections
    })
})

sections.get('/:id/teachers', async( req: Request, res: Response) => {
    const id = req.params.id;
    let teachers;
    const sections = await Section.find({status: 'enabled', _id: id}).exec();
    if(sections){
        teachers = sections.filter(section => {
            section
        })
    }
});

sections.get('/:id/students',( req: Request, res: Response) => {

});
// /sections/
sections.post('/', async (req: Request, res: Response) => {
    // falta colocar el atributo school
    const section = {
        name: req.body.name,
        description: req.body.description,
        uc: req.body.uc,
        semester: req.body.semester,
        type: req.body.type,
        ht: req.body.ht,
        hp: req.body.hp,
        hl: req.body.hl
    }
    Section.create(section, (err:any, seccion:any) => {
        if (err) {
            res.status(404).json({
                ok: false,
                error: err.message
            })
            return;
        }
        res.status(201).json({
            ok: true,
            section: seccion
        })
    })
});

sections.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const section = {
        name: req.body.name,
        description: req.body.description,
        uc: req.body.uc,
        semester: req.body.semester,
        type: req.body.type,
        ht: req.body.ht || 0.0,
        hp: req.body.hp || 0.0,
        hl: req.body.hl || 0.0
    }

    Section.findByIdAndUpdate(id, section, {new: true, runValidators: true, context: 'query'},
    (err:any, seccion:any) => {
        if (err){
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

});

sections.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Section.findByIdAndUpdate(id, {status: 'disabled', deleted_date: new Date()}, {new: true, runValidators: true},
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
export default sections;

