document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal");
    const modalAjoutPhoto = document.getElementById("modalAjoutPhoto");
    const modalAjoutPhoto2 = document.getElementById("modalAjoutPhoto2");

    // Sélection de l'élément de fermeture
    const closeModal = document.getElementById("closeModal");
    const closeModalAjoutPhoto2 = document.getElementById('closeModalAjoutPhoto2');

    // Ajout d'un écouteur d'événements pour le clic sur l'élément de fermeture
    closeModal.addEventListener("click", hideFirstModal);
    closeModalAjoutPhoto2.addEventListener("click", hideSecondModal);

    function hideFirstModal() {
        modal.style.display = "none";
    }

    function hideSecondModal() {
        modalAjoutPhoto2.style.display = 'none';
    }

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
});
