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
                // Définition de la fonction pour gérer une authentification réussie
                async function handleSuccessfulLogin(response) {
                    // Récupération du token d'authentification depuis la réponse
                    const responseData = await response.json(); // Conversion de la réponse en JSON

                    // Récupération du token d'authentification depuis les données de réponse
                    const authToken = responseData.token;

                    // Stockage du token dans le localStorage
                    localStorage.setItem('token', authToken);

                    // Redirection de l'utilisateur vers une autre page ou effectuer d'autres actions
                    window.location.href = 'index.html';
                }

                // Utilisation de la fonction pour gérer la réponse après une authentification réussie
                handleSuccessfulLogin(response);
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

    // Fonction pour supprimer une image
    async function deleteImage(imageId) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Supprimez l'image du DOM ou actualisez la page pour refléter les changements
                // par exemple, en rechargeant les images
                location.reload(); // Cela recharge la page pour refléter les modifications
            } else {
                console.error('Échec de la suppression de l\'image');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image :', error);
        }
    }

    // Sélectionnez toutes les icônes de poubelle
    const deleteIcons = document.querySelectorAll('.fa-trash-alt');

    // Ajoutez un écouteur d'événements à chaque icône de poubelle
    deleteIcons.forEach(deleteIcon => {
        deleteIcon.addEventListener('click', async (event) => {
            const imageId = event.target.dataset.imageId; // Récupérez l'ID de l'image à supprimer depuis l'attribut data-image-id
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
            if (confirmation) {
                await deleteImage(imageId); // Appel de la fonction pour supprimer l'image
            }
        });
    });
});
