const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuariosCtrl');

/* path: api/usuarios */




router.get('/', validarJWT , getUsuarios);


module.exports = router;