const socketIO =  require('socket.io')
const socket = {}; // pq como objeto pq se guardan como referencia
function connect(server){
    socket.io = socketIO(server);
}

module.exports = {
    connect,
    socket,
}