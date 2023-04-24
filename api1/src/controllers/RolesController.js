var Rol = require('../models/RolesModel')
let RolesController ={};

RolesController.getRoles = async()=>
{
let roles={};
    await Rol.find().then(data=>{
        roles = data;
        console.log(roles);
        console.log(data);
    }).catch((err)=>{throw err})

    return roles
}
module.exports = RolesController;