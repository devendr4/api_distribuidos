const express = require('express');


class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
    }

    start(callback) {
        this.app.listen(this.port, callback());
    }
}

module.exports = Server;
