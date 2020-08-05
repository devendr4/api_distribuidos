import mongoose, { Schema, model  } from 'mongoose';
import {BaseEntity} from './base_entity';

const sectionSchema = new Schema({
	uc: {
		type: Number,
		required: [true, 'La cantidad de UC es necesaria.']
	},
    semester: {
        type: Number,
        required: [true, 'Es necesario especificar el numero de semestre'],
        min: [1, 'El numero del semestre es entre 1-10'],
        max: [10, 'El numero del semestre es entre 1-10']
    },
    type: {
        type: String,
        enum: ['mandatory', 'elective'],
        required: [true, 'Debe indicar el tipo (mandatory o elective)'],
    },
    ht: {
        type: Number,
        required: true,
        default: 0.0
    },
    hp: {
        type: Number,
        required: true,
        default: 0.0

    },
    hl: {
        type: Number,
        required: true,
        default: 0.0

    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }
//    enrollments: [{
//        type: Schema.Types.ObjectId,
//        ref: 'Enrollment'
//    }]
});

//sectionSchema.method('addEnrollment', function(enrollmentId: string):any{
//    return mongoose.models.Section.findByIdAndUpdate(this._id,
//        {$push: { enrollments: enrollmentId}},
//        {new: true, useFindAndModify: false});
//});
sectionSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.__t;
    return obj;
};

export const Section = BaseEntity.discriminator('Section', sectionSchema);
