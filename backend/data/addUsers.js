const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

// URL de conexión de MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'loginDB';

async function addUsers() {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Conectado correctamente al servidor");

        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Agrega múltiples usuarios con contraseñas encriptadas
        const users = [
            { username: 'user1', password: 'password1' },
            { username: 'user2', password: 'password2' },
            { username: 'user3', password: 'password3' },
        ];

        for (let user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await usersCollection.insertOne({ username: user.username, password: hashedPassword });
            console.log(`Usuario ${user.username} agregado con contraseña encriptada`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

addUsers();
