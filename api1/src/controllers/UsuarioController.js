const conf = require("../config");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var Usuario = require('../models/UsuarioModel');
var Rol = require('../models/RolesModel');


let usuarioController ={};

usuarioController.saveUsuario = async (usu) =>{
    if(!usu.n_usuario|| !usu.contrasenia)
    {return {estado:'fail',error:'faltan datos de usaurio o contraseña'}}
    let response={};

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(String.toString( usu.contrasenia), salt);
    usu.contrasenia = hashPassword;


    let usuario = new Usuario({n_usuario:usu.n_usuario, contrasenia:usu.contrasenia,salt:salt});

   await usuario.save().then(usu=>  {console.log(response),
    response = {estado:'ok',usuario:usu}}
        ).catch((err)=>
            response = {estado:'ok',usuario:usu,error:err});
    return response;

}

usuarioController.getUsuarios = async()=>{
    let response={};

await Usuario.find().then(usuarios => { console.log(usuarios)
    response={estado:'ok',usuarios:usuarios}}

    ).catch(err=> {throw err
        response={estado:'fail',error:err}});
return response;
    
}


usuarioController.getUsuarioId = async(id)=>{
    let respon={};
    await Usuario.findById(id).then(
        async resp=>{
            console.log(resp)
            await Rol.findById(resp.id_rol).then(rol=>{
                console.log('busacndo rol')
                console.log(rol);
                respon={usuario:resp,rol:rol.nombre,estado:'ok'}
            }).catch((err)=>{console.log(err)})
            }
        ).catch((err)=>{throw err});
        
    return respon;
}

usuarioController.deleteUsuarioId = async(id)=>{
    let respo ={};
    await Usuario.deleteOne({id:id}).then(
        resp=>{
            console.log(resp);
        respo={response:resp,estado:'ok'}}

    ).catch((err)=>{throw err,
        respo={error:err,estado:'fail'}});
    return respo;
}

usuarioController.isLogin = async(req)=>{

    try {
        console.log('comprobando login')
        const token = req.cookies;
        
        console.log(token)
        if(!token){
            return {estado:false, login:false ,mensaje:'Please login to access the data'};
        }
        console.log(token.token)
        const verify = await jwt.verify(token.token,conf.jwt_secreto);
        console.log(verify)
        let usuario = await Usuario.findById(verify.id);
        console.log(usuario);
        let rol = await Rol.findById(usuario.id_rol);
        return {estado:true,login:true,rol:rol.nombre, mensaje:'User login succes'};
    } catch (err) {
        return {estado:false,login:false ,mensaje:err};
    }
}

usuarioController.login = async(login) => {
    console.log("login")
    console.log(login)
    var userFind = await Usuario.findOne({n_usuario: login.n_usuario}).exec();
    console.log(userFind)
    if(!userFind) {return {estado:'fail',error:'usuario o contraseña incorrectos'};}
    else
    {
    const hashPassword = bcrypt.hashSync(String.toString( login.contrasenia), userFind.salt);
    console.log(hashPassword + " *--------* " + userFind.contrasenia);
    var isPasswordMatched = await bcrypt.compareSync(userFind.contrasenia,hashPassword);
    console.log(isPasswordMatched)
    if(!isPasswordMatched & !hashPassword.match(userFind.contrasenia)){ return {estado:'fail',error:'usuario o contraseña incorrectos'};}
    let rol = await Rol.findById(userFind.id_rol);
    const token = await jwt.sign({ id: userFind._id,n_usuario:userFind.n_usuario, rol:rol.nombre }, conf.jwt_secreto, {
        expiresIn: conf.jwt_expire,
    })
    console.log(token)
    return token
}
    
}

module.exports = usuarioController;