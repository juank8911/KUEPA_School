const { mongoose } = require("mongoose");


var rolOptions = { strict:false,strictPopulate:false}
var RolSchema = mongoose.Schema({
    nombre:String,
    descripcion:String,

},rolOptions);

var Rol = mongoose.model('Rol', RolSchema);

module.exports = Rol;