import mongoose, { Schema  } from 'mongoose';
import {BaseEntity} from './base_entity';


const entitySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: [true, 'El nombre ya existe'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es necesaria'],
        minlength: [5, 'El nombre debe tener minimo 5 caracteres'],
        maxlength: [50, 'El nombre excede los caracteres']
    },
});

export const Entity = BaseEntity.discriminator('Entity', entitySchema);
