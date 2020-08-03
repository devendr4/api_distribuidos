const express = require('express');
const app = express();

app.use(require('./people'));


module.exports = app;
