import mongoose, { Schema  } from 'mongoose';
import {BaseEntity} from './base_entity';

const facultySchema = new Schema({
});

export const Faculty = BaseEntity.discriminator('Faculty', facultySchema);
