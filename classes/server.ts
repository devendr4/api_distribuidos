import express from 'express';


export default class Server {
    // default es para que cuando se exporte el archivo tome como defecto esta clase
    public app: express.Application;
    public port: number = 3000;

    constructor() {
        this.app = express();
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
    }
}

