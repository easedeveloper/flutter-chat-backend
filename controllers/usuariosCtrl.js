const { response } = require("express");
const UsuarioModel = require("../models/usuario_models");

const getUsuarios = async ( req, res = response ) =>{

    const desde = Number( req.query.desde ) || 0; 

    //Extrear la informacion del listado completo de los usuarios
    const usuarios = await UsuarioModel
        .find({ _id: { $ne: req.uid } })
        //Me devueve todos los id excepto el req.uid en este caso el dueño del token logeado
        .sort('-online')
        //Ordenalos de manera descendente
        .skip(desde)
        .limit(20)
        //usando el .skip llama al 'desde' que empezaria de cero y la de un .limit hasta 2

    res.json({
        ok: true,
        usuarios,
        //desde
    });
}



module.exports ={

    getUsuarios

}