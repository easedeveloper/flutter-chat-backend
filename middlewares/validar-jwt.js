
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res= response, next) =>{

    //LEER EL TOKEN    
    const token = req.header('x-token');

    //Validar si el token existe
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg:'No hay token en la peticion',
        });
    }

    try {
        
        const{ uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    console.log(token);


}


module.exports = {
    validarJWT
}


