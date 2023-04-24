const usuario = require('../models/UsuarioModel');
const usuarioController = require('../controllers/UsuarioController')
const isAuthenticated = require('../controllers/auth');

module.exports = function(app){


    app.get('/usuario',async (req,resp)=>{
        let usuarios = await usuarioController.getUsuarios();
        resp.status(200).send(usuarios)
    });

    app.get('/usuario/:id?',isAuthenticated,async (req,resp)=>{
        console.log('dentro de usuario por id' );
        // console.log(req.params)
        let id = req.params.id;
        let usuario = await usuarioController.getUsuarioId(id);
        // console.log(usuario);
        resp.status(200).send(usuario);
    })

    app.put('/usuario',async (req,resp)=>{
        var usuario = {
            n_usuario:req.body.n_usuario,
            contrasenia:req.body.contrasenia,
        };
        console.log(usuario);
       let response = await usuarioController.saveUsuario(usuario)
       console.log(response)
       resp.status(200).send(response);
    });

    app.delete('/usuario/:id?',async(req,resp)=>{
        let id = req.param.id;
        let response = await usuarioController.deleteUsuarioId(id)
        resp.status(200).send(response);
    });

    app.post('/usuario/login', async(req,resp)=>{
        loginU = {n_usuario:req.body.n_usuario,
            contrasenia:req.body.contrasenia}
            console.log(loginU)
        if(!loginU.n_usuario || !loginU.contrasenia)
        {
            return resp.status(300).send({estado:"fail",login:false,error:"usuario o contraseña incorrectos router"})
        }
            console.log(loginU)
            let token = await usuarioController.login(loginU);
            console.log("token de login");
            console.log(token);
            let options = {value:token}
            resp.cookie('token',token,options)
            resp.status(200).send({estado:'ok',login:true,token:token})
    });

    app.get('/usuarios/login',async (req,resp)=>{

        await usuarioController.isLogin(req).then(login=>{
            login = login
            if(login.estado==true)
            {
                resp.status(200).send({estado:'ok',login:true,mensaje:'usuario atenticado'})
            }
            else{
                resp.status(200).send({estado:'fail',login:false,mensaje:'usuario no atenticado'})
            }
        }).catch((err)=>{throw err})
      

    })

 
}