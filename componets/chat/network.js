
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')
const router = express.Router();

router.get('/:user_id', function(req, res){
    // console.log('req.body.users.user_id =-------------------->>>', req.body.users.user_id);
    
    // const filterMessages = req.query.users || null;
    controller.getChats(req.params.user_id)
    .then((users) =>{
        response.success(req, res, users, 200)
    })
    .catch((error) =>{
        response.error(req, res, 'Unexpected Error', 500, error)  
    })
});
router.post('/', function(req, res){
    
    controller.addChat(req.body.users)
    .then((fullChat)=>{
        response.success(req, res, fullChat, 201)   
    })
    .catch((error) =>{
        response.error(req, res, 'Información invalida', 400, error)  
    })

});


module.exports = router;
