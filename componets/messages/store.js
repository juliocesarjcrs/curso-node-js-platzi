// const list = [];
const db = require('mongoose');
const Model = require('./model')
db.Promise = global.Promise;
// mongodb+srv://julio:julio747@cluster0-b0vla.mongodb.net/test?retryWrites=true&w=majority
const user = 'julio';
const pass = 'julio747';
const host = 'cluster0-b0vla.mongodb.net'
const database = 'telegram'
const uri = `mongodb+srv://${user}:${pass}@${host}/test?retryWrites=true&w=majority`;
// console.log('uri', uri);

db.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: database
})
.then(() =>{
    console.log('[db] Conectada con éxito');  
}).catch(err =>{
    
    console.error('[db]', err);
})


function addMessage(message){
    // list.push(message);
    const myMessage = new Model(message)
    myMessage.save();
}
async function getMessage(filteuser){
    let filter = {};
    if(filteuser !== null){
        filter = {user: filteuser};
    }
    const messages = await Model.find(filter);
    return messages;
}
async function updateText(id, message){
    const foundMessage = await Model.findOne({
        _id:id // va  al modelo trae todo los registros y compara con el id y trae solo ese
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;

}
 function removeMessage(id){
    return  Model.deleteOne({
        _id: id
    });
}
module.exports={
    add: addMessage,
    list: getMessage,
    updateText: updateText,
    remove: removeMessage,
}