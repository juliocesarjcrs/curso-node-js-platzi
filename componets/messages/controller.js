const store = require('./store')
function addMessage(user, message){
    // console.log('user', user);
    return new Promise((resolve, reject)=>{
        if(!user || !message){
            console.error('[messageController] No hay usurio o mensaje');
            
             reject('Los datos osn incorrectos')
             return false
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        }
        store.add(fullMessage)
        resolve(fullMessage)

    })
    
}
function getMessage(){
    return new Promise((resolve, reject)=>{
        resolve(store.list());
    })
}
module.exports = {
    addMessage,
    getMessage
}