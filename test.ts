import {Person} from "./models/person";
import {Enrollment} from "./models/enrollment";
require('dotenv').config();
import mongoose from "mongoose";
import {Section} from "./models/section";


// conexion a base de datos
mongoose.connect(
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) throw err;
        console.log('Base de datos Online');
    }
);



const crear = async () => {
    //const persona = await Person.create(person)
    const enrollment = await Enrollment.create({person: "5f29b4896d74c4418c2353d3" , type: 'student'})
    const enrollmenta = await Enrollment.create({person: "5f29b4896d74c4418c2353d3", type: 'teacher'})
    const section:any= await Section.create(
        {
            uc: 14,
            semester: 3,
            type: 'mandatory',
            ht: 8.5,
            name: 'Math',
            description: 'Tarea jodida'
        });
    const pepr = await section.addEnrollment(enrollment._id);
    const pepa = await section.addEnrollment(enrollmenta._id);
    console.log(pepa)
}
crear();

