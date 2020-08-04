import mongoose, { Schema  } from 'mongoose';
import {BaseEntity} from './base_entity';

const facultySchema = new Schema({
	school: {
			type: Schema.Types.ObjectId,
			ref: 'School',
			required: [true, 'Debe contar con una escuela']
	}
});

export const Faculty = BaseEntity.discriminator('Faculty', facultySchema);
