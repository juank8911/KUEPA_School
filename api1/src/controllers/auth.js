const usuario = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken');
const conf = require('../config')


const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        console.log(req.cookies)
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,conf.jwt_secreto);
        req.user = await usuario.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}


module.exports = isAuthenticated;