const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
// const router = require('./componets/messages/network')
const db = require('./db')
const router = require('./network/routes')
const user = 'julio';
const pass = 'julio747';
const host = 'cluster0-b0vla.mongodb.net'
const database = 'telegram'
const uri = `mongodb+srv://${user}:${pass}@${host}/test?retryWrites=true&w=majority`
db(uri);
app.use(express.json());
app.use(cors());
// app.use(router);

// para socket
const socket = require('./socket');
socket.connect(server);
router(app);


// app.use('/', function(req, res){
//     res.send('Hola');
// });
app.use('/app', express.static('public'));
server.listen(4000, function(){
    console.log('la pp esta esccuhando http://localhost:4000');

});
