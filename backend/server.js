const express = require('express');
const bcrypt = require('bcrypt');
const { client, connectDB } = require('./config/database');

const app = express();
const port = 3000;

// Middleware para manejar datos JSON
app.use(express.json());
app.use(express.static('frontend')); // Sirve los archivos del frontend

// Conectar a la base de datos
connectDB();

// Ruta de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = client.db('loginDB');
        const collection = db.collection('users');

        const user = await collection.findOne({ username: username });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json({ success: true, message: "Login exitoso" });
            } else {
                res.json({ success: false, message: "Contraseña incorrecta" });
            }
        } else {
            res.json({ success: false, message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
