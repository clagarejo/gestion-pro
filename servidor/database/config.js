const mongoose = require('mongoose');

const dbConnection = async () => {
    const DB_CNN = `mongodb+srv://yanc55292:YfrlwNo5DzZl1SYX@gestion-pro.bxcjd.mongodb.net/?retryWrites=true&w=majority&appName=gestion-pro`
    try {
        await mongoose.connect(DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = dbConnection;
