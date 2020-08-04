import { Schema, model } from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';

const baseEntitySchema = new Schema({
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
    name: {
        type: String,
        unique: [true, 'El nombre ya existe'],
    },
    description: {
        type: String,
        minlength: [5, 'La descripcion debe tener minimo 5 caracteres'],
        maxlength: [50, 'Descripcion excede los caracteres']
    }
});
baseEntitySchema.plugin(uniqueValidator);
export const BaseEntity = model('BaseEntity', baseEntitySchema);
