import mongoose, { Schema } from 'mongoose';
import {BaseEntity} from './base_entity';

const schoolSchema = new Schema({
	section: {
		type: Schema.Types.ObjectId,
		ref: 'Section',
		required: [true, 'Debe contar con una sección']
	}
});

export const School = BaseEntity.discriminator('Faculty', schoolSchema);
