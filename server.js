const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const rollController = require('./controllers/rollController');

const port = process.env.PORT || 3011;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next)=>{
//     var now = new Date().toString();
//     var log = `${now}: ${req.method} ${req.url}`;
//     fs.appendFile('server.log', log + '\n', (err) =>{
//         if(err){
//             console.log('Unable to append to server.log');
//         }
//     });
//     console.log(log);
//     next();
// });


app.get('/', rollController.getHome);

app.post('/', rollController.rollStats);

app.listen(port, () => {
    console.log('server is up on port :3011');
}); 