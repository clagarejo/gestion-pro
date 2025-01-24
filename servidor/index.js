const express = require("express");
const app = express();
const cors = require('cors');
const  dbConnection  = require('./database/config')
require('dotenv').config({ path: "../.env" });
const PORT = process.env.PORT || 4000; 

dbConnection()

app.use(cors());  

app.use(express.json()); 


app.use('/api/products', require('./routes/products'))

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
