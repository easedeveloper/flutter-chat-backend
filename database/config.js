const mongoose = require('mongoose');

const dbConnection = async ()=> {
    try {
        await mongoose.connect( process.env.DB_CONN, {
        // // Utilizando el await esperamos que haga la conexion    
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        });

        console.log('DB ONLINE')
    } catch (error) {
        console.error(error);
        throw new Error('Error en la BD - Conversar Seriamente con el ADMIN')
    }
}

module.exports = {
    dbConnection
}