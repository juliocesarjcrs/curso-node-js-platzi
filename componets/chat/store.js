
const Model = require('./model')


function addChat(chat){
    const mychat = new Model(chat)
    return mychat.save();
}
async function getChat(userid){
    return new Promise((resolve, reject) =>{
        let filter = {};
        if(userid !== null){
            filter = {users: userid};
        }
        Model.find(filter)
        .populate('users')
        .exec((error, populated)=>{
            if(error){
                reject(error);
                return false;
            }
            resolve(populated);          
        })

    })
}

module.exports={
    add: addChat,
    list: getChat,
}