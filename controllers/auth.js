const { response, json } = require("express");
const usuarioModels = require("../models/usuario_models");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
//const { validationResult } = require("express-validator");


const crearUsuario = async ( req, res = response) => {
    // const { email, nombre, password } = req.body;
    
    const { email, password } = req.body;
    //aplicando la tecnica de la desestructuracion
    
    try {

        const existeEmail = await usuarioModels.findOne({ email: email });
        //Espera a que tengamos la informacion de la BD

        if ( existeEmail ) {
           return res.status(400).json({
               ok: false,
               msg:'El correo ya esta registrado'
           //cuando se ejecuta un return significa que las demas sentencia no se ejecutaran    
           });
        }

        const usuario = new usuarioModels( req.body )
        //Obtengo una instancia de mi MODELO
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        await usuario.save();
        //esperar antes que se grabe en mi BD, despues seguir con la siguiente sentencia

        //Generar mi JWT
        const token = await generarJWT( usuario.id );

        
        res.json({
            ok: true,
            usuario,
            token
            //msg: req.body 
        });
    } catch (error) {
        console.log( error )
        res.status( 500 ).json({
            ok: false,
            msg: 'Hable con el Administrador',
        })
    }
}

const login = async (req, res = response) => {

    const{ email, password } = req.body;

    try {
        const usuarioDB = await usuarioModels.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok:false,
                msg:'La Email no es Valida',
            });
        }
        //si en este punto se encontro el EMAIL pasa a verificar el passsword

        //VALIDAR EL PASSWORD
        const validPassword = bcrypt.compareSync( password, usuarioDB.password )
        if ( !validPassword ) {
            return res.status(404).json({
                ok:false,
                msg:'La contraseña no encontrado',
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        //Respuesta que se manda en un Login exitoso
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admistrador',
        });
    }

}

const renewToken = async (req, res = response) =>{

    //obtener el uid del usuario
    const uid = req.uid;

    //Generar un nuevo JWT
    const token = await generarJWT( uid );

    //Obtener el usuario por el UID
    const usuario = await usuarioModels.findById( uid );


    res.json({
        ok: true,
        usuario: usuario,
        token
    //Respuesta que se manda en un Login exitoso
    });



    // res.json({
    //     ok: true,
    //     uid: req.uid
    //     //obteniendo el id del usuario
    // });

}

module.exports = {
    crearUsuario,
    login,
    renewToken
}