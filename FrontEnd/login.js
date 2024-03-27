// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login__form');
    const errorElement = document.getElementById('loginError');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Effacez les erreurs précédentes
        errorElement.textContent = '';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                // Stockez le token dans localStorage ou un autre mécanisme de gestion des sessions
                localStorage.setItem('token', token);

                // Redirigez l'utilisateur vers la page d'accueil ou une autre page protégée
                window.location.href = 'index.html';
            } else {
                // Récupérez le message d'erreur depuis la réponse
                const { error } = await response.json();

                // Affichez le message d'erreur dans la div spécifiée
                errorElement.textContent = `Erreur d'authentification: ${error}`;
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    });
});