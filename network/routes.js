const express = require('express');
const message = require('../componets/messages/network')
const user = require('../componets/user/network')
const chat = require('../componets/chat/network')

const routes = function(server){
    server.use('/message', message )
    server.use('/user', user )
    server.use('/chat', chat )
}
module.exports = routes;