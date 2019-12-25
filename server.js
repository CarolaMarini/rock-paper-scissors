const express = require("express");
const app = express();
const port = 3001;
const path = require("path");
const PUBLIC_DIR = path.join(__dirname, "./public");

app.use(express.static(PUBLIC_DIR));


module.exports = {
    start: function start() {
        app.listen(port, () => console.log(`Listening on port ${port}`))
    },
}