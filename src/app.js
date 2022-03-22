const express = require('express')
const app = express()

const path = require('path')
const hbs = require('hbs')
const port = 9000;
const forecast = require('./utils/forecast')
const geocode = require('./utils/weather')

const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// this is used to set the path of views Folder in order to run HBS File IF WE RUNNING NODE FILE FROM SRC FOLDER
app.set('views', viewsPath)
app.set("view engine", "hbs")

hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

app.get("/", (req, res) => {
    res.render('index11', {
        name: "Weather",
        age: 26
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Naman",
        age: 26
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: "Naman"
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (address) {
        geocode(address, (error, { latitude, longitude, location }) => {
            if (error) {
                res.send({ error })
            } else {
                forecast(latitude, longitude, (error, { weather, wind }) => {
                    if (error) {
                        res.send({ error })
                    } else {
                        res.send({
                            wind,
                            weather,
                            address
                        })
                    }
                })
            }
        })
    } else {
        res.send({
            error: 'You must provide an address!'
        })
    }

})

app.get('/products', (req, res) => {
    if (req.query.search) {
        return res.send({
            products: []
        })
    }
    res.send({
        error: "You must provide a search term!!!"
    })

})

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         name: "Weather",
//         errorMessage: "Help section which you are trying to access didn't find. Kindly access another section in the Help Page!!! "
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        name: "Weather",
        errorMessage: "Page Not Found. Kindly Try Again!!!"
    })
})


app.listen(port, () => {
    console.log(`Your Port ${port} is running. Thank you!!!`)
})