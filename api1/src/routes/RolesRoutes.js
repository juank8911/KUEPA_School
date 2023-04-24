const RolController = require('../controllers/RolesController')
module.exports = function(app){

    app.get('/roles',async(req,resp)=>{

   let rol = await RolController.getRoles();
            resp.status(200).send(rol)
    })
}