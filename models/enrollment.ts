import { Schema  } from 'mongoose';
import {BaseEntity} from './base_entity';


const enrollmentSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['student', 'teacher'],
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'Es necesario una persona para la incripcion']
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: [true, 'Es necesario la seccion para la inscripcion']
    }
});

enrollmentSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.__t;
    return obj;
};
export const Enrollment  = BaseEntity.discriminator('Enrollment', enrollmentSchema);
