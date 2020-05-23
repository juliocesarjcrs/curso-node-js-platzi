const express = require('express');

// const router = require('./componets/messages/network')
const db = require('./db')
const router = require('./network/routes')
const user = 'julio';
const pass = 'julio747';
const host = 'cluster0-b0vla.mongodb.net'
const database = 'telegram'
const uri = `mongodb+srv://${user}:${pass}@${host}/test?retryWrites=true&w=majority`
db(uri);
var app = express();
app.use(express.json());
// app.use(router);
router(app);


// app.use('/', function(req, res){
//     res.send('Hola');
// });
app.use('/app', express.static('public'));
app.listen(4000);
console.log('la pp esta esccuhando http://localhost:4000');
