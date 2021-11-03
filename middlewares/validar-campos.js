const { validationResult } = require("express-validator");



const validarCampos = (req, res, next ) => {

    const errores = validationResult( req );

    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}


module.exports = {
    validarCampos
}


//next se va a llamar si todo sale bien continue con el siguiente middleware

