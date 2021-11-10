
const mensaje_model = require('../models/mensaje_model');
const UsuarioModel = require('../models/usuario_models');


//***** USUARIO CONECTADO */
const usuarioConectado = async ( uid = '' ) =>{
    //Capturando las propiedades del usuario
    const usuario = await UsuarioModel.findById( uid );

    //igualando a true online
    usuario.online = true;

    //Grabando en la BD
    await usuario.save();

    return usuario;
}


//***** USUARIO DESCONECTADO */
const usuarioDesconectado = async ( uid = '' ) =>{
    //Capturando las propiedades del usuario
    const usuario = await UsuarioModel.findById( uid );

    //igualando a false online
    usuario.online = false;

    //Grabando en la BD
    await usuario.save();

    return usuario;
}

const grabarMensaje = async ( payload ) =>{

    try {
        const mensaje = new mensaje_model( payload );

        //Grabando en la BD
        await mensaje.save();


    } catch (error) {
        return true;
    }


}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje,
}


