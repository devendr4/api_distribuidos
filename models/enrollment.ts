import { Schema, Model  } from 'mongoose';
import {BaseEntity, IBaseEntity} from './base_entity';


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

enrollmentSchema.statics.disableMany = async function disableMany(type:string, id: string){
    let object:any = {}
    object[type] = id
    await this.updateMany(object,{status: 'disabled', deleted_date: new Date()});
}

enrollmentSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.__t;
    return obj;
};
interface IEnrollment extends IBaseEntity {
    type: string;
    person: string;
    section: string;

}

interface IEnrollmentStatic extends Model<IEnrollment> {
    disableMany(type:string, id:string):void;
}
export const Enrollment  = BaseEntity.discriminator<IEnrollment, IEnrollmentStatic>('Enrollment', enrollmentSchema);
