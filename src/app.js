const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')



const app = express()  

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Anjali'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:"Enter address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
          }

    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
          return res.send({error})
        }
        res.send({
            location,
            forecast: forecastData,
            address: req.query.address
        })
      })
    })
})


app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide search term",
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        name:'Anjali'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: "This is a help text",
        title: "Help",
        name:"Anjali"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        title: "404",
        errorMessage:"Help article not found",
        name:'Anjali'
    })
})

app.get('*', (req, res)=>{
    res.render('404Page',{
        title: "404",
        errorMessage: "This page doesn't exist",
        name: 'Anjali'
    })
})

app.listen(5000, ()=>{
    console.log('Server is up on port 5000')
})