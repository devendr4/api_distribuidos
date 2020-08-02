import Server from "./classes/server";
import ejemplo from "./routes/ejemplo";


const server = new Server();
server.app.use('/ejemplo', ejemplo);
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});

