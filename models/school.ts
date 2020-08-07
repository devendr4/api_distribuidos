import mongoose, { Schema } from 'mongoose';
import {BaseEntity} from './base_entity';

const schoolSchema = new Schema({
	faculty: {
		type: Schema.Types.ObjectId,
		ref: 'Faculty',
		required: [true, 'Debe contar con una facultad']
	}
});

schoolSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.__t;
    return obj;
};
export const School = BaseEntity.discriminator('School', schoolSchema);
