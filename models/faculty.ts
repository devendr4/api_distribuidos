import mongoose, { Schema  } from 'mongoose';
import {Entity} from './entity';

const facultySchema = new Schema({
	school: {
			type: Schema.Types.ObjectId,
			ref: 'School',
			required: [true, 'Debe contar con una escuela']
	}
});

export const Faculty = Entity.discriminator('Faculty', facultySchema);
