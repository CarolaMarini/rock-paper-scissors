const express = require("express");
const app = express();
const port = 3001;
const path = require("path");
const PUBLIC_DIR = path.join(__dirname, "../public");
let server;

app.use(express.static(PUBLIC_DIR));


module.exports = {
    start: function start() {
        server = app.listen(port)
    },
    close: function close() {
        return server.close()
    },
}