import { Schema, model } from 'mongoose';


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

    }
});

export const BaseEntity = model('BaseEntity', baseEntitySchema);
