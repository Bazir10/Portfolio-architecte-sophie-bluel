document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal");
    const modalAjoutPhoto = document.getElementById("modalAjoutPhoto");
    const modalAjoutPhoto2 = document.getElementById("modalAjoutPhoto2");

    // Sélection de l'élément de fermeture
    const closeModal = document.getElementById("closeModal");
    const closeModalAjoutPhoto2 = document.getElementById('closeModalAjoutPhoto2');

    // Ajout d'un écouteur d'événements pour le clic sur l'élément de fermeture
    closeModal.addEventListener("click", hideFirstModal);
    closeModalAjoutPhoto2.addEventListener("click", () => {
        hideFirstModal();
        hideSecondModal();
    });

    function hideFirstModal() {
        modal.style.display = "none";
    }

    function hideSecondModal() {
        modalAjoutPhoto2.style.display = 'none';
    }

    // Sélection du bouton précédent
    const boutonPrecedent = document.querySelector('.bouton-precedent');

    // Ajout d'un gestionnaire d'événement au clic sur le bouton précédent
    boutonPrecedent.addEventListener('click', () => {
        // Fermer la deuxième modal
        modalAjoutPhoto2.style.display = 'none';
    });

    const modalAjoutPhotoContent = document.querySelector('#modalAjoutPhoto .modal-content');
    const btnAjoutPhoto = modalAjoutPhotoContent.querySelector('#btnAjoutPhoto');

    if (btnAjoutPhoto) {
        btnAjoutPhoto.addEventListener('click', () => {
            hideFirstModal();
            modalAjoutPhoto2.style.display = 'block';
        });
    } else {
        console.error('Le bouton "Ajouter une photo" n\'a pas été trouvé.');
    }

    let listeworks = [];

    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {
            listeworks = works;
            const gallery = document.querySelector(".gallery");
            gallery.innerHTML = "";

            works.forEach(work => {
                gallery.innerHTML += `
                <figure data-work-id="${work.id}">
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>`;
            });
        });

    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            const filtersContainer = document.getElementById("filters");
            filtersContainer.innerHTML = "";
            filtersContainer.innerHTML += `<button id="filtre-0" type="button" value="0" >Tous</button>`;

            categories.forEach(categ => {
                filtersContainer.innerHTML += `<button id="filtre-${categ.id}" type="button" value="${categ.id}">${categ.name}</button>`;
            });

            filtersContainer.addEventListener("click", (event) => {
                const categoryId = event.target.value;
                applyFilter(categoryId);
            });
        });

    function applyFilter(categoryId) {
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";

        listeworks.forEach(work => {
            if (categoryId === "0" || work.categoryId === parseInt(categoryId)) {
                gallery.innerHTML += `
                <figure data-category="${work.categoryId}">
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>`;
            }
        });
    }

    const isLoggedIn = localStorage.getItem('token') !== null;
    const btnModifier = document.getElementById('btnModifier');
    const modalContent = document.querySelector('.modal-content');

    let addPhotoButtonAdded = false;

    function addAddPhotoButton() {
        const addPhotoButton = document.createElement('button');
        addPhotoButton.textContent = 'Ajouter une photo';
        addPhotoButton.id = 'btnAjoutPhoto';

        addPhotoButton.addEventListener('click', () => {   
            modalAjoutPhoto2.style.display = 'block';
        });

        modalContent.appendChild(addPhotoButton);
        addPhotoButtonAdded = true;
        addPhotoButton.style.display = 'block';
    }

    btnModifier.addEventListener('click', () => {
        modal.style.display = 'block';

        if (!addPhotoButtonAdded) {
            addAddPhotoButton();
        }
    });

    // Partie ajoutée
    const inputPhoto = document.getElementById('input-photo');
    const inputTexte = document.getElementById('input-texte');
    const categorieSelect = document.getElementById('categorie');
    const formAjoutPhoto = document.getElementById('input-form');

    // Écouter les changements dans la sélection de fichier
    inputPhoto.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('preview');
        
        // Afficher l'aperçu de l'image sélectionnée
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image">`;
            };
            reader.readAsDataURL(file);
        }
    }

    // Remplir la liste déroulante des catégories
    const categories = ['Objets', 'Appartement', 'Hotels & Restaurants'];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorieSelect.appendChild(option);
    });

    // Ajout d'un gestionnaire d'événements au clic sur le bouton Envoyer
    const boutonEnvoyer = document.getElementById('bouton-envoyer');
    boutonEnvoyer.addEventListener('click', () => {
        // Récupérer les données du formulaire
        const image = inputPhoto.files[0];
        const title = inputTexte.value;
        const category = categorieSelect.value;

        // Construire les données à envoyer
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('category', category);

        // Envoyer les données à votre API
        fetch('http://localhost:5678/api/categories', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi des données');
            }
            // Si la requête est réussie, vous pouvez effectuer des actions supplémentaires ici
            console.log('Données envoyées avec succès !');
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});
