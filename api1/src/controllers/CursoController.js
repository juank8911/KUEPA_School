const CursoModel = require('../models/CursoModel')

let CursoController={};


CursoController.getCursoId() = async(id) =>{
    let curso ={};
if(!id){return {estado:'fail',error:'id del curso esta vacio'}}
CursoModel.findById(id).then(resp=>{console.log(resp),
{estado:'ok',curso:resp}}).catch((err)=> {throw err})
return curso;
}

CursoController.getCursos() = async() =>{
    let curso ={};
if(!id){return {estado:'fail',error:'id del curso esta vacio'}}
CursoModel.find().then(resp=>{console.log(resp),
{estado:'ok',curso:resp}}).catch((err)=> {throw err})
return curso;
}

CursoController.saveCurso() = async(curso) =>{
    let curso = new CursoModel({curso});
    let respuesta ={};
    await curso.save().then((resp=>{
        respuesta = {estado:'ok',curso:curso}
    })).catch((err)=>{respuesta={estado:'fail',error:err}
})
return respuesta;
    
}