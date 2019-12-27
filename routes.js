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

router.post('/rps', (req, res) => {
    if (req.body.p1play === req.body.p2play) res.send("tie")

    if (req.body.p1play === "scissors") {
        if (req.body.p2play === "paper") res.send("Player 1 won!")
        if (req.body.p2play === "rock") res.send("Player 2 won!")
    }
    if (req.body.p1play === "paper") {
        if (req.body.p2play === "scissors") res.send("Player 2 won!")
        if (req.body.p2play === "rock") res.send("Player 1 won!")
    }
    if (req.body.p1play === "rock") {
        if (req.body.p2play === "scissors") res.send("Player 1 won!")
        if (req.body.p2play === "paper") res.send("Player 2 won!")
    }
})

module.exports = router;