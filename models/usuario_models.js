const { Schema, model } = require('mongoose');


const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    online: {
        type: Boolean,
        default: false,
    },
});

usuarioSchema.method('toJSON', function(){
    
    const { __v, _id, password, ...demasObject} = this.toObject();
    //Usando tecnica desustructuracion. Extrayendo para excluirlos. Incluir los demas objetco con: ...demasObject

    demasObject.uid = _id;
    return demasObject;

});

module.exports = model('Usuario', usuarioSchema);



