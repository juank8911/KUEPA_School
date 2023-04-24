var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/kuepa').then(()=>{
    console.log('conexion establecida con exito');
}).catch((err)=>{
    throw err;
})