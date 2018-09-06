const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});
app.set('view engine', 'hbs');
app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next()
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
    res.render('home',{
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res)=>{
    res.render('about', {
        pageTitle: 'About page',
    })
});

app.get('/projects', (req, res)=>{
    res.render('projects', {
        pageTitle: 'Projects page'
    })
})
app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    })
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is on port ${port}`)
})