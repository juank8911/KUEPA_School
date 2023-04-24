const { mongoose } = require("mongoose");
const usuario = mongoose.model('Usuario')
const curso = mongoose.model('Curso')

var UsuarioCursoSchema = mongoose.Schema({
    id_usuario:{ type: Schema.ObjectId, ref: "usuario" },
    id_curso:{ type: Schema.ObjectId, ref: "curso" }
});

var usuarioCurso = mongoose.model('usuario_curso', UsuarioCursoSchema);
module.exports = usuarioCurso;