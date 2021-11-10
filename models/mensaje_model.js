const { Schema, model } = require('mongoose');


const mensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        //Obtener el ID en mi collecion de usuarios
        ref: 'Usuario',
        required: true,
    },

    para: {
        type: Schema.Types.ObjectId,
        //Obtener el ID en mi collecion de usuarios
        ref: 'Usuario',
        required: true,
    },
    mensaje:{
        type: String,
        require: true,

    }
}, {
    timestamps: true
});

mensajeSchema.method('toJSON', function(){
                //, password
    const { __v, _id, ...demasObject} = this.toObject();
    //Usando tecnica desustructuracion. Extrayendo para excluirlos. Incluir los demas objetco con: ...demasObject

    //demasObject.uid = _id;
    return demasObject;

});

module.exports = model('Mensaje', mensajeSchema);