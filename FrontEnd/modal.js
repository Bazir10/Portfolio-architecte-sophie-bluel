// Sélection de l'élément de fermeture
var closeModal = document.getElementById("closeModal");

// Sélection de la fenêtre modale
var modal = document.getElementById("modal");

// Ajout d'un écouteur d'événements pour le clic sur l'élément de fermeture
closeModal.addEventListener("click", function() {
    // Masquer la fenêtre modale
    modal.style.display = "none";
});


