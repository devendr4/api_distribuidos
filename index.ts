require('dotenv').config();
import Server from "./classes/server";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import {router} from "./routes";
import cors from 'cors';


const server = new Server();

// bodyParser convierte los objetos json en objetos js
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// definicion de rutas
server.app.use('/', router);

// conexion a base de datos
mongoose.connect(
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
		useFindAndModify: false
    },
    (err) => {
        if (err) throw err;
        console.log('Base de datos Online');
    }
);

// cors
server.app.use(cors({ origin: true, credentials: true }));
// iniciar el servidor
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});

