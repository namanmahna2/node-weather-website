const weatherForm = document.querySelector('form')
const searchedLocation = document.querySelector('input')
const resultSend = document.querySelector('.result')
const paraOne = document.querySelector('.errorMess')
const result2 = document.querySelector('.result2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchedLocation.value
    paraOne.textContent = 'Loading.....'
    resultSend.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                paraOne.textContent = data.error
            } else {
                resultSend.textContent = data.result
                paraOne.textContent = data.address
                result2.textContent = data.windD
            }
        })
    })


})