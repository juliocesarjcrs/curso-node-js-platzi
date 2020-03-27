const express = require('express');
// const bodyParser = require('body-parser')
const response = require('./network/response');
const router = express.Router();
var app = express();
app.use(express.json());
app.use(router);

router.get('/message', function(req, res){
    console.log(req.headers);
    res.header({
        'custom-header': "Nuestro valor perzonalizado"
    })
    response.success(req, res, 'Lista de mensajes')
    // res.status(201).send({error: '', message: 'Creado correctamente'})
    // res.send('Lista de mensajes')
});
router.post('/message', function(req, res){
    if(req.query.error == 'ok'){    
        response.error(req, res, 'Error inesperado', 500, 'Es solo una simulación de los errores')
    }else{
        response.success(req, res, 'Crewado correctamentes', 201)
    }
    // res.send('Mensaje añadido')
});
router.delete('/message', function(req, res){
    // console.log(req.body);
    
    res.send('Mensaje eliminado')
});
// app.use('/', function(req, res){
//     res.send('Hola');
// });
app.use('/app', express.static('public'));
app.listen(4000);
console.log('la pp esta esccuhando http://localhost:4000');
