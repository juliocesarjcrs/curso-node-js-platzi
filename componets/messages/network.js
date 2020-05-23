// Aqui va toda la capa de red, la encargada de ricibir la petición http, 
// procesar la información y enviarla al controlador
const express = require('express');
const multer = require('multer'); // instala npm i multer // para cargar archivos
const response = require('../../network/response');
const controller = require('./controller')
const router = express.Router();
const upload = multer({
    dest:'uploads/' // carpeta destino
})
/*
si yo quiero hacer la siguiente consulta ++**SQL SELECT * FROM messages WHERE user LIKE “%carl%” **++en mongo con node
¿Cómo sería?
{"user": /carl/}
En caso de que queramos hacer una búsqueda por el nombre ignorando mayúsculas o minúsculas se puede implementar el siguiente código:

  let userFilter = {};
  if (user) {
    userFilter.user = new RegExp(user, "i");
  }
Mongo puede utilizar Regular Expressions para realizar búsquedas y en estas es posible indicarle que busque “case-insensitive”. Esto se logra con el flag “i” que vemos en el código. Este código se traduce a: /usuario/i.
*/
router.get('/', function(req, res){
    const filterMessages = req.query.chat || null;
    controller.getMessage(filterMessages).then((messaList) =>{
        response.success(req, res, messaList, 200)
    })
    .catch((error) =>{
        response.error(req, res, 'Unexpected Error', 500, error)  
    })

    // console.log(req.headers);
    // res.header({
    //     'custom-header': "Nuestro valor perzonalizado"
    // })
    // response.success(req, res, 'Lista de mensajes')
    // res.status(201).send({error: '', message: 'Creado correctamente'})
    // res.send('Lista de mensajes')
});
router.post('/',upload.single('file'), function(req, res){
    controller.addMessage(req.body.chat, req.body.user, req.body.message)
    .then((fullMessage)=>{
        response.success(req, res, fullMessage, 201)   
    })
    .catch((error) =>{
        response.error(req, res, 'Información invalida', 400, error)  
    })

});
router.patch('/:id', function(req, res){// patch modificación parcial
    controller.updateMessage(req.params.id, req.body.message)
    .then((data)=> {
        response.success(req, res, data, 200);
    })
    .catch(e =>{
        response.error(req, res, 'Errror interno actualizar', 500, e);
    });
    
});
router.delete('/:id', function(req, res) {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
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