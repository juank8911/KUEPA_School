const { mongoose } = require("mongoose");

var CursoSchema = mongoose.Schema({
    nombre:String,
    descripcion:String,
    activo:Boolean,

});

var curso = mongoose.model('curso', CursoSchema);
module.exports = curso;