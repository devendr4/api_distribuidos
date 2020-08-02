import { Schema, model, Document } from 'mongoose';


const personSchema = new Schema({

    dni: {
        type: String,
        required: [true, 'La cedula es necesaria']
    },
    first_name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    last_name: {
        type: String,
        required: [true, 'El apellido es necesario']
    }

});

interface IPerson extends Document {
    dni:string;
    first_name:string;
    last_name:string;
}

export const Person = model<IPerson>('Person', personSchema);
