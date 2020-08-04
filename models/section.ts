import mongoose, { Schema  } from 'mongoose';
import {Entity} from './entity';

const sectionSchema = new Schema({
	uc: {
		type: String,
		required: [true, 'La cantidad de UC es necesaria.']
	}
});

export const Section = Entity.discriminator('Section', sectionSchema);
