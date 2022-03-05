const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weather = require('./utils/weather');

const port = process.env.PORT || 3001;


console.log(__dirname);
const publicDirPath = path.join(__dirname, '../public');

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

//setup statis directory to serve
app.use(express.static(publicDirPath));

//setup handlebars han views
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


app.get('', (req,res) => {
    res.render('index', {title:'This is home page', auther:'Abhijeet'});
})

app.get('/about', (req,res) => {
    res.render('about', {title:'This is about page', author:'Abhijeet'});
});

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide the adress"
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: "error"})
        }

        weather(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error: "error"})
            }

            res.send(data);
        })
    })

    // res.send({
    //     'address': "Jaipur",
    //     'forecast': "Weather forecast"
    // })
})


app.get('/help', (req,res) => {
    res.render('help', 
    {
        title:'This is help page',
        author:'Abhijeet'
    });
});



app.get('/help/*', (req,res) => {
    res.render('404', {title:'Article not found', author:'Abhijeet'});
})

app.get('*', (req,res) => {
    res.render('404', {title:'Page not found', author:'Abhijeet'});
})

app.listen(port, () => {
    console.log("Server is up");
});