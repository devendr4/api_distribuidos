import mongoose, { Schema  } from 'mongoose';
import {BaseEntity} from './base_entity';
import uniqueValidator from 'mongoose-unique-validator';

const personSchema = new Schema({
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

personSchema.plugin(uniqueValidator);

personSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.__t;
    return obj;
};
export const Person = BaseEntity.discriminator('Person', personSchema);
