const express = require('express');

// const router = require('./componets/messages/network')
const router = require('./network/routes')
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
