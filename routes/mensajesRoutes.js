
const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
/* path: api/usuarios */

router.get('/:de', validarJWT , obtenerChat);

module.exports = router; 