require('dotenv').config();
const Server = require('./classes/server');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = new Server();

server.app.use(bodyParser.urlencoded({extended:false}));
server.app.use(bodyParser.json());

server.app.use(require('./routes/index'));
mongoose.connect(
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) throw err;
        console.log('Base de datos Online');
    }
);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
