import mongoose, { Schema } from 'mongoose';
import {Entity} from './entity';

const schoolSchema = new Schema({
	section: {
		type: Schema.Types.ObjectId,
		ref: 'Section',
		required: [true, 'Debe contar con una sección'] 
	}
});

export const School = Entity.discriminator('Faculty', schoolSchema);
