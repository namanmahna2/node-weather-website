const weatherForm = document.querySelector('form')
const searchedLocation = document.querySelector('input')
const resultSend = document.querySelector('.result')
const paraOne = document.querySelector('.errorMess')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchedLocation.value
    paraOne.textContent = 'Loading.....'
    resultSend.textContent = ''
    fetch('http://localhost:9000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                paraOne.textContent = data.error
            } else {
                console.log(data.location, data.wind)
                resultSend.textContent = `${data.address}'s Wind Speed is ${data.wind} and the Weather is ${data.weather}`
                paraOne.textContent = ''
            }
        })
    })


})