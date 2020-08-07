import mongoose, { Schema  } from 'mongoose';
import {BaseEntity} from './base_entity';

const facultySchema = new Schema({
});

facultySchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.__t;
    return obj;
};

export const Faculty = BaseEntity.discriminator('Faculty', facultySchema);
