function show(selector) {
    let elem = document.querySelector(selector)
    elem.classList.remove('hidden');
}

function hide(selector) {
    let elem = document.querySelector(selector)
    elem.classList.add('hidden');
}


async function getWinner(player1Choice) {
    const computerChoiceSelector = '#computerChoice'
    let p2play = await axios.get('/computerPlay')
    let computerChoiceElem = await document.querySelector(computerChoiceSelector)
    computerChoiceElem.innerHTML = p2play.data
    let gameResult = await axios.post('/rps', { p1play: player1Choice, p2play: p2play.data })
    let gameResultSelector = '#gameResult'
    let gameResultElem = await document.querySelector(gameResultSelector)
    gameResultElem.innerHTML = gameResult.data
}

async function showPlayer1Choice(choice) {
    let player1ChoiceSelector = '#player1Choice'
    let player1ChoiceElem = await document.querySelector(player1ChoiceSelector)
    player1ChoiceElem.innerHTML = choice
}

document.querySelector('#human').addEventListener('click', function () { show('#humanOpts') })

document.querySelector('#computer').addEventListener('click', async function () {
    let p1play = await axios.get('/computerPlay')
    showPlayer1Choice(p1play.data)
    getWinner(p1play.data)
})

document.querySelector('#scissors').addEventListener('click', async function () {
    hide('#humanOpts')
    showPlayer1Choice('scissors')
    getWinner('scissors')
})

document.querySelector('#rock').addEventListener('click', async function () {
    hide('#humanOpts')
    showPlayer1Choice('rock')
    getWinner('rock')
})

document.querySelector('#paper').addEventListener('click', async function () {
    hide('#humanOpts')
    showPlayer1Choice('paper')
    getWinner('paper')
})
