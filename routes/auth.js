const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


/* path: api/login */


router.post('/new', [
    //Escribiendo middlewares
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);


router.post('/', [
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
],login);

router.get('/renew', validarJWT ,renewToken)


module.exports = router;