import  {Model, Schema } from 'mongoose';
import {BaseEntity, IBaseEntity} from './base_entity';
import {Enrollment} from './enrollment';

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
        ref: 'School',
        required: true,
    }
});

sectionSchema.statics.disableMany = async function disableMany( id: string){
    const sections = await this.find({school: id}, '_id').exec();
    sections.forEach((section:any) => Enrollment.disableMany('section', section._id));
    await this.updateMany({school: id},{status: 'disabled', deleted_date: new Date()});
}

sectionSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.__t;
    return obj;
};

interface ISection extends IBaseEntity {
    type: string;
    school: string;
    uc: number;
    semester: number;
    ht: number;
    hl: number;
    hp: number;

}

interface ISectionStatic extends Model<ISection> {
    disableMany(id:string):void;
}

export const Section = BaseEntity.discriminator<ISection, ISectionStatic>('Section', sectionSchema);
