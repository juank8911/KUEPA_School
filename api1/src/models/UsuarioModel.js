const { mongoose } = require("mongoose");
var Schema = mongoose.Schema;
var Rol = require('./RolesModel');


var userOptions = { strict:false}
var UsuarioSchema = new Schema({
    n_usuario:String,
    contrasenia:String,
    salt:String,
    id_rol:{ type: mongoose.Schema.Types.ObjectId, ref: "Rol" }


},userOptions);


var usuario = mongoose.model('usuario', UsuarioSchema);
module.exports = usuario;