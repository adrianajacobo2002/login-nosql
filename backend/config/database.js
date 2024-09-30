const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Conexión local a MongoDB
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

module.exports = { client, connectDB };
