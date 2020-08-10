import express from 'express';

import * as swaggerUi from 'swagger-ui-express';

export default class Server {
    public app: express.Application;
    public port: number = Number(process.env.PORT);

    constructor() {
        this.app = express();
    }

    start(callback: Function) {
        this.startSwaggerUi();
        this.app.listen(this.port, callback());
    }

    startSwaggerUi(){
        // incluir swagger-ui para consultar y probar documentación.
    try {
        const swaggerDocumentation = require('../swagger.json');
        this.app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocumentation));
    } catch (error) {
        console.log("   No se pudo leer archivo swagger.json", error);
    }
    }
}

