const mongoose = require('mongoose');
module.exports = {
    connectDB: () => {
        mongoose.connect('mongodb+srv://Vnef_N:NKPiePOQb2KAfRKZ@proyectouneweb-q8d8d.mongodb.net/gestorproyectos?retryWrites=true&w=majority', {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
        })
            .then(db => console.log('db is connected'))
            .catch(err => console.log(err))
    }
}