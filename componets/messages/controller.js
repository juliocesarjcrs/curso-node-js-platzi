const store = require('./store')
const socket = require('../../socket').socket;
function addMessage(chat,user, message, file){
    return new Promise((resolve, reject)=>{
        if(!user || !message){
            
             reject('Los datos son incorrectos')
             return false
        }
        let fileUrl = '';
        if (file) {
            fileUrl = 'http://localhost:4000/app/files/' + file.filename;
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }
        
        store.add(fullMessage);
        socket.io.emit('mensaje', fullMessage)
        // http://localhost:4000/app/socket.html
        resolve(fullMessage)

    })
    
}
function getMessage(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser));
    })
}
function updateMessage(id, message){
    return new Promise(async(resolve, reject)=>{
        if(!id || !message){
            reject('Los datos son inválidos');
            return false;
        }
        const result = await store.updateText(id, message);
        resolve(result);
    })
}
function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id invalido');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}
module.exports = {
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage
}