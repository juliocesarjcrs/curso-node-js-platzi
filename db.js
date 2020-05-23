const db = require('mongoose');
db.Promise = global.Promise;
// mongodb+srv://julio:julio747@cluster0-b0vla.mongodb.net/test?retryWrites=true&w=majority
// const user = 'julio';
// const pass = 'julio747';
// const host = 'cluster0-b0vla.mongodb.net'
// const database = 'telegram'
// const uri = `mongodb+srv://${user}:${pass}@${host}/test?retryWrites=true&w=majority`;
// console.log('uri', uri);
async function connect(uri){
    console.log('ur', uri);
    try {
        await db.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'telegram'
        });
        console.log('[db] Conectada con éxito');  
        
    } catch (err){
        console.error('[db]', err);
    }
    // .then(() =>{
    // }).catch(err =>{
        
    //     console.error('[db]', err);
    // })
}
module.exports = connect;