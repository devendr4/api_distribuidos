import {Router, Request, Response} from "express";
import {Section} from "../models/section";
import {Enrollment} from "../models/enrollment";
import {School} from "../models/school";

const sections = Router();

sections.get('/', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 10;
    let sections = await Section.find({status: 'enabled'},{enrollments: 0})
                               .populate('school','name')
                               .skip(skip)
                               .limit(10)
                               .exec();
    res.json({
        ok: true,
        page,
        sections
    })
})

sections.get('/:id/:type', async ( req: Request, res: Response) => {
    const id = req.params.id;
    const type = req.params.type;
    if (type !== 'teachers' && type !== 'students'){
        res.status(404).json({
            ok: false,
            error: 'Opcion invalida'
        })
        return;
    }
    const section:any = await Section.findOne({_id: id, status: 'enabled'}).exec();
    if (section) {
        const enrollments = await Enrollment.find({section: id, type: type.slice(0,-1), status: 'enabled'}, 'person')
                                            .populate('person', 'dni first_name last_name')
        let people: any[] = [];
        enrollments.forEach((enrollment:any) => {
            people.unshift(enrollment.person);
        })
        let object:any = {
            ok:true,
            section: section.name
        }
        object[type] = people
        res.json(object)
    }else{
        res.json({
            ok: false,
            error: 'La seccion no existe'
        })
    }
});

// /sections/
sections.post('/', async (req: Request, res: Response) => {
    // falta colocar el atributo school
    const section:any = {
        name: req.body.name,
        description: req.body.description,
        uc: req.body.uc,
        semester: req.body.semester,
        type: req.body.type,
        ht: req.body.ht,
        hp: req.body.hp,
        hl: req.body.hl,
		school: req.body.school
    }
    const name:any = await Section.findOne({status: 'disabled', name: section.name}).exec();

    const school = await School.findOne({_id: section.school, status: 'enabled'}).exec();
    if (school){
        if (name){
            section.status = 'enabled';
            section.deleted_date = undefined;
            Section.findByIdAndUpdate(name._id, section, {new: true, runValidators: true, context: 'query'},
            async (err:any, seccion:any) => {
                if (err){
                    res.status(404).json({
                        ok: false,
                        error: err.message
                    })
                    return;
                }
                await seccion.populate('school','name').execPopulate();
                res.json({
                    ok: true,
                    section: seccion
                })
            });
        }else {
            Section.create(section,async (err:any, seccion:any) => {
                if (err) {
                    res.status(404).json({
                        ok: false,
                        error: err.message
                    })
                    return;
                }
                await seccion.populate('school','name').execPopulate();
                res.status(201).json({
                    ok: true,
                    section: seccion
                })
            })
        }
    }else {
        res.status(404).json({
            ok: false,
            error: 'Escuela no existe'
        })
    }
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

sections.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    Section.findByIdAndUpdate(id, {status: 'disabled', deleted_date: new Date()}, {new: true, runValidators: true},
     async (err:any, seccion:any) => {
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
        Enrollment.disableMany('section', id);
    });
})
export default sections;

