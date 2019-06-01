const path = require('path')    //used to serve a directory
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//instatiate express()
const app = express()

<<<<<<< HEAD
//
const port = process.ENV.PORT || 3000
=======
//const setup when running on Heroku
const port = process.env.PORT || 3000
>>>>>>> 457dd9cf9e148d0466d6187b34c39be52c755b85

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
//define a path to views' directory
/**
 * Express needs a 'views' directory to serve dynamic pages.
 * If we put the templates in another dir, then we have to 
 * make 'views' point to that directory.
 * 1) define the tamplate's path
 * 2) Assigns setting 'views' to 'definedPath'.
 * app.set('views', definedPath)
 */
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir serve
app.use(express.static(publicDir))
//sets the '/public' folder as the route for the project

app.get('', (req, res) => {
    //to render a dynamic page from views dir
    res.render('index', {
        title: 'Wheather App',
        name: 'Denis, home page'
    })
    //2nd argument are the arguments passed to the dynamic page 'index.hbs'
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Denis, about page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Denis, help page',
        helpText: 'This is useful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }
    //receive the querystring '?address=locationName'
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: 'Error trying to find location'
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    forecast_error: 'Error trying to find forecast'
                })
            }

            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Not found'
        })
    }

    console.log(req.query)

    res.send({
        products: []
    })
})

//route to manage all routes that has not been matched till now -> '*'
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Denis',
        msg: 'Help page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Denis',
        msg: 'Page not found.'
    })
})

//start the server up
app.listen(port, () => {
    console.log('Server listens on port ' + port)
})