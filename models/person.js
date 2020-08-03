const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    dni: {
        type: String,
        required: [true, 'El campo dni es obligatorio']
    },
    first_name: {
        type: String,
        required: [true, 'El campo nombre es obligatorio']
    },
    last_name: {
        type: String,
        require: [true, 'El campo apellido es obligatorio']
    },
    created_date:{
        type: Date,
        require: true,
        default: Date.now
    }
}
);

module.exports = mongoose.model('Person', personSchema);
