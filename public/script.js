function show(selector) {
    let elem = document.querySelector(selector)
    elem.classList.remove('hidden');
}

document.querySelector('#human').addEventListener('click', function () { show('#humanOpts') })

document.querySelector('#scissors').addEventListener('click', async function () {
    const computerChoiceSelector = '#computerChoice'
    let p2play = await axios.get('/computerPlay')
    let computerChoiceElem = await document.querySelector(computerChoiceSelector)
    computerChoiceElem.innerHTML = p2play.data
    let gameResult = await axios.post('/rps', { p1play: 'scissors', p2play: p2play.data })
    let gameResultSelector = '#gameResult'
    let gameResultElem = await document.querySelector(gameResultSelector)
    gameResultElem.innerHTML = gameResult.data
})
