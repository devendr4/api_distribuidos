const express = require('express');


const ejemplo = express.Router();

ejemplo.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo Funciona bien'

    });
});

module.exports = ejemplo;
