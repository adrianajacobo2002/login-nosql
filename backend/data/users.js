const bcrypt = require('bcrypt');
const { client } = require('../config/database');

const addUser = async (username, plainPassword) => {
    try {
        const db = client.db('loginDB');
        const collection = db.collection('users');

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        // Insertar usuario en la base de datos
        const result = await collection.insertOne({ username: username, password: hashedPassword });
        console.log(`Usuario insertado con ID: ${result.insertedId}`);
    } catch (error) {
        console.error(error);
    }
};

// Llamar a la función con el nombre de usuario y la contraseña en texto plano
addUser('admin', '123456');
