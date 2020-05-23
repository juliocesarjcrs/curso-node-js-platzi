const store = require('./store')
function addUser(name){
    // console.log('user', user);
    return new Promise((resolve, reject)=>{
        if(!name ){
            console.error('[userController] No hay usurio ');
            
             reject('Los datos son incorrectos')
             return false
        }
        const fullMessage = {
            name: name
        }
        store.add(fullMessage)
        resolve(fullMessage)

    })
    
}
function getUsers(filterUser){
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
    addUser,
    getUsers,
    updateMessage,
    deleteMessage
}