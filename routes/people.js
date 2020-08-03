const express = require('express');
const Person = require('../models/person')
const app = express();

app.post('/people/', (req, res) => {
    const person = new Person({
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });
    person.save((err, persona) => {
        if (err){
            res.status(404).json({
                ok: false,
                error: err.message
            })
        }
        res.status(201).json({
            ok: true,
            person
        })
    })


});

module.exports = app;
