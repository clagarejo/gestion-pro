const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const mongoUri = process.env.DB_CNN;
        await mongoose.connect(mongoUri);
        console.log('✅ Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;
