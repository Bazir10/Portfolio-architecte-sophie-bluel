// Récupérer le formulaire et les éléments nécessaires
const loginForm = document.querySelector('.login__form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorDiv = document.querySelector('.alredyLogged__error');

// Ajouter un écouteur d'événements au formulaire
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher la soumission du formulaire par défaut

    // Récupérer les valeurs des champs
    const email = emailInput.value;
    const password = passwordInput.value;

    // Effectuer une vérification rudimentaire (vous devez le remplacer par une vérification côté serveur sécurisée)
    if (email === 'utilisateur@example.com' && password === 'motdepasse123') {
        // Connexion réussie, rediriger vers la page d'accueil
        window.location.href = 'index.html';
    } else {
        // Afficher un message d'erreur
        errorDiv.innerHTML = 'Les informations utilisateur / mot de passe ne sont pas correctes.';
    }
});
