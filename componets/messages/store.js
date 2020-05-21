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
async function getMessage(message){
    const messages = await Model.find();
    return messages;
}
module.exports={
    add: addMessage,
    list: getMessage
}