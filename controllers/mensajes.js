
const Mensaje = require('../models/mensaje_model');


const obtenerChat = async ( req, res ) => {

    const miID = req.uid;
    const mensajesDe = req.params.de;

    const las30 = await Mensaje.find({
        $or: [
            { de: miID, para: mensajesDe },
            //primera condicion, traeria todos los mensaje que yo eh enviado "para Fulano"
            { de: mensajesDe, para: miID },
            //y aqui la condicion opuesta, para que concatenen ambos IDs
        ]
    })
    .sort({ createdAt:'desc' })
    //ordenarlo de forma descenente en la BD
    .limit(30);

    res.json({
        ok: true,
        mensajes: las30
    });


}


module.exports = {

    obtenerChat

}