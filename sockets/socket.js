const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje }  = require('../controllers/sockets')


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    //console.log( client.handshake.headers['x-token'] );
    //Obtenienedo el JWT

    const[ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );
    //console.log(valido, uid);

    //***** VERIFICAR AUNTENTICACION */
    if ( !valido ) { return client.disconnect(); }

    //***** CLIENTE AUNTENTICADO */
    usuarioConectado( uid );

    //Ingresar al usuario en Especifico usando el id del servidor ejm: 6181ce55a9cb8fbd35d9119d
    client.join( uid );
    
    //ESCCHAR DEL CLIENTE LE MENSAJE PERSONAL
    client.on('mensage-persona', async (payload) => {
        
        //GRABAR MENSAJE EN LA BD y esperar al await antes de emitir algun mensaje
        await grabarMensaje( payload )

        //io.to para mandar un mensaje a un canal en ese caso al cliente conectado
        io.to( payload.para ).emit('mensage-persona', payload);
        
        //console.log(payload);
    });


    //console.log('Solo 1 cliente Autenticado')

    client.on('disconnect', () => {
        
        usuarioDesconectado( uid )

        // console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
        //con io.emit emite un mensaje a todos los clientes

    });


});
