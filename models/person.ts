import mongoose, { Schema, model, Document } from 'mongoose';


const personSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['enabled', 'disabled'],
        default: 'enabled'
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    deleted_date: {
        type: Date,

    },
    dni: {
        type: String,
        required: [true, 'La cedula es necesaria'],
        unique: [true, 'El DNI ya existe'],
        match: [/^[VE]\d{3,9}$/, 'DNI no cumple con el formato V00000000']

    },
    first_name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        minlength: [3, 'El nombre debe tener minimo 3 caracteres'],
        maxlength: [15, 'El nombre excede los caracteres']
    },
    last_name: {
        type: String,
        required: [true, 'El apellido es necesario'],
        minlength: [3, 'El apellido debe tener minimo 3 caracteres'],
        maxlength: [15, 'El apellido excede los caracteres']
    }

});
personSchema.path('dni').validate( async (value) => {
    const dniCount = await mongoose.models.Person.countDocuments({
        dni: value});
    return !dniCount;
}, 'dni ya existe')

interface IPerson extends Document {
    dni:string;
    first_name:string;
    last_name:string;
}

export const Person = model<IPerson>('Person', personSchema);
