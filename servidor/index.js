const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv'); 

const PORT = process.env.PORT || 4000; 

app.use(cors());  

app.use(express.json()); 

app.use('/products', require('./routes/products'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
