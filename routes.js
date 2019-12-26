const router = require("express").Router();

function getRandomInt(max) {
    return Math.floor(Math.random() * (max))
}

router.get('/computerPlay', (req, res) => {
    res.status(200)
    let options = ["rock", "paper", "scissors"]
    let response = options[getRandomInt(options.length)]
    res.send(response)
})


module.exports = router;