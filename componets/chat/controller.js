const store = require('./store')
function addChat(users){
    if(!users || !Array.isArray(users)){
        return Promise.reject('Invalida list chats')
    }


    const chat = {
        users: users
    }
    return store.add(chat);
    
}
function getChats(userId){
    return store.list(userId);

    // return new Promise((resolve, reject)=>{
    //     resolve(store.list(filterUser));
    // })
}


module.exports = {
    addChat,
    getChats
}