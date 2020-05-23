
const Model = require('./model')


function addUser(user){
    // list.push(user);
    const myuser = new Model(user)
    return myuser.save();
}
async function getUser(filteuser){
    let filter = {};
    if(filteuser !== null){
        filter = {user: filteuser};
    }
    const users = await Model.find(filter);
    return users;
}
async function updateText(id, user){
    const founduser = await Model.findOne({
        _id:id // va  al modelo trae todo los registros y compara con el id y trae solo ese
    });
    founduser.user = user;
    const newuser = await founduser.save();
    return newuser;

}
 function removeUser(id){
    return  Model.deleteOne({
        _id: id
    });
}
module.exports={
    add: addUser,
    list: getUser,
    updateText: updateText,
    remove: removeUser,
}