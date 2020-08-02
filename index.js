const Server = require('./classes/server');
const ejemplo = require('./routes/ejemplo');


const server = new Server();

server.app.use('/ejemplo', ejemplo);
console.log(server.app.routes);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
