document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.role === 'admin') {
            // Afficher les fonctionnalités d'administration
            // Par exemple, vous pourriez modifier le DOM pour afficher des liens ou des boutons pour les fonctionnalités d'administration.
            // Assurez-vous de remplacer '#admin-features' par le sélecteur approprié pour votre contenu d'administration.
            const adminFeatures = document.querySelector('#admin-features');
            adminFeatures.style.display = 'block'; // Afficher les fonctionnalités d'administration
        }
    }
});
