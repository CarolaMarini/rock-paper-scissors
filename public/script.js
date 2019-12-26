function show(selector) {
    let elem = document.querySelector(selector)
    elem.classList.remove('hidden');
}

document.querySelector('#human').addEventListener('click', function () { show("#humanOpts") })

document.querySelector('#scissors').addEventListener('click', function () {
    const computerChoiceSelector = "#computerChoice"
    show(computerChoiceSelector)
    axios.get('/computerPlay').then(res => {
        let elem = document.querySelector(computerChoiceSelector)
        elem.innerHTML = res.data
    })
})
