const { mongoose } = require("mongoose");

var MaterialCursoSchema = mongoose.Schema({
    nombre:String,
    descripcion:String,

});

var material_c = mongoose.model('material_curso', MaterialCursoSchema);
module.exports = material_c;