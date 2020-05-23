
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')
const router = express.Router();

router.get('/', function(req, res){
    const filterMessages = req.query.user || null;
    controller.getUsers(filterMessages).then((messaList) =>{
        response.success(req, res, messaList, 200)
    })
    .catch((error) =>{
        response.error(req, res, 'Unexpected Error', 500, error)  
    })
});
router.post('/', function(req, res){
    
    controller.addUser(req.body.name)
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
