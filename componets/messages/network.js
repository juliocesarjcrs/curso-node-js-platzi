// Aqui va toda la capa de red, la encargada de ricibir la petición http, 
// procesar la información y enviarla al controlador
const express = require('express');
const response = require('../../network/response');
const router = express.Router();

router.get('/', function(req, res){
    console.log(req.headers);
    res.header({
        'custom-header': "Nuestro valor perzonalizado"
    })
    response.success(req, res, 'Lista de mensajes')
    // res.status(201).send({error: '', message: 'Creado correctamente'})
    // res.send('Lista de mensajes')
});
router.post('/', function(req, res){
    if(req.query.error == 'ok'){    
        response.error(req, res, 'Error inesperado', 500, 'Es solo una simulación de los errores')
    }else{
        response.success(req, res, 'Crewado correctamentes', 201)
    }
    // res.send('Mensaje añadido')
});
router.delete('/', function(req, res){
    // console.log(req.body);
    
    res.send('Mensaje eliminado')
});

module.exports = router;