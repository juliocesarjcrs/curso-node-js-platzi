// Aqui va toda la capa de red, la encargada de ricibir la petición http, 
// procesar la información y enviarla al controlador
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')
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
    controller.addMessage(req.body.user, req.body.message)
    .then((fullMessage)=>{
        response.success(req, res, fullMessage, 201)   
    })
    .catch((error) =>{
        response.error(req, res, 'Información invalida', 400, error)  
    })

});
router.delete('/', function(req, res){
    // console.log(req.body);
    
    res.send('Mensaje eliminado')
});

module.exports = router;
// Hola, Sergio,
// .
// Cualquier aplicación va a tener tres puntos de responsabilidad, que deben responder a tres preguntas:

// ¿Cómo me comunico con ella?
// ¿Qué hace?
// ¿Dónde y cómo se guardan los resultados?
// .
// La respuesta a estos tres puntos, corresponden a las tres capas que vamos a generar:
// Capa de red (en inglés “network”)
// Capa controladora (en inglés, “controller”)
// Capa de almacenamiento (en inglés, “store”)
// .
// De esto hablo en profundidad en la clase anterior.
// .
// La primera capa es una capa de red, porque la conexión con la aplicación se hace a través del protocolo de comunicación en red HTTP. Es la responsable de comunicar al cliente HTTP con nuestro código del controlador.
// .
// Si recuerdas las primeras clases, verás que el protocolo HTTP construye una petición con una dirección (route), un verbo (method), unas cabeceras (headers) y un mensaje (body).
// .
// Por esto, cada uno de nuestros componentes, tendrá un archivo “network.js” encargado de traducir la petición del cliente HTTP a la acción que queremos realizar en nuestro controlador.
// .
// Así, lo que hace nuestro código (la funcionalidad) no está acoplado a unos requisitos de red, y puede ser reutilizado con otras fuentes de entrada (colas MQTT, una biblioteca externa, microservicios…).
// .
// La opción que planteas, llamarlo “interface” en lugar de network es también una opción válida. En caso de que tu carpeta se llame interface (o, quizá mejor, “interfaces”), llama a tu archivo “http-response.js” para poder generar nuevas interfaces de escucha o/y respuesta no HTTP.