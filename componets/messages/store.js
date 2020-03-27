const list = [];
function addMessage(message){
    list.push(message);
}
function getMessage(message){
    return list;
}
module.exports={
    add: addMessage,
    list: getMessage
}