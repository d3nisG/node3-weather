const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')
const iconDiv = document.querySelector('#msg-3')


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    /**
     * fetch -> triggers the route '/weather' set in src/app.js
     * There it calls geocode function passing the parameter from query-string
     */
    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecastData
                iconDiv.textContent = 'Weather icon: ' + data.icon
            }
        })
    })
})