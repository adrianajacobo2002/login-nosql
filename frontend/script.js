document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (result.success) {
            alert("Login exitoso!");
        } else {
            document.getElementById('error-message').textContent = result.message;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
});
