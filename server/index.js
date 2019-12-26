const express = require("express");
const app = express();
const port = 3001;
const path = require("path");
const PUBLIC_DIR = path.join(__dirname, "../public");
const router = require("../routes")
let server;

app.use(express.static(PUBLIC_DIR));
app.use('/', router)

module.exports = {
    start: function start() {
        server = app.listen(port)
    },
    close: function close() {
        return server.close()
    },
    getApp: app
}