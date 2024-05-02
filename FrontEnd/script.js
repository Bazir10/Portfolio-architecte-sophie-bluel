
document.addEventListener('DOMContentLoaded', () => {
    const modalAjoutPhotoContent = document.querySelector('#modalAjoutPhoto .modal-content');
    const btnAjoutPhoto = modalAjoutPhotoContent.querySelector('#btnAjoutPhoto');
    console.log(modalAjoutPhotoContent)
    if (btnAjoutPhoto) {
        btnAjoutPhoto.addEventListener('click', async () => {
            try {
                const token = localStorage.getItem('token');
                const selectedFigure = document.querySelector('.gallery .selected'); // Sélectionnez la figure sélectionnée
                if (selectedFigure) {
                    const workID = selectedFigure.dataset.workId; // Récupérer l'ID du travail à partir de l'attribut data-work-id
                    console.log(workID)
                    const response = await fetch(`http://localhost:5678/api/works/${workID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        console.log('La requête DELETE a été effectuée avec succès.');
                        // Votre logique de traitement en cas de succès de la requête DELETE ici
                    } else {
                        console.error('La requête DELETE a échoué.');
                        // Votre logique de traitement en cas d'échec de la requête DELETE ici
                    }
                } else {
                    console.error('Aucune figure sélectionnée.');
                }
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la requête DELETE :', error);
            }
        });
    } else {
        console.error('Le bouton "Ajouter une photo" n\'a pas été trouvé.');
    }

    let listeworks = [];

    // Le reste de votre code ici...
});


fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
        listeworks = works;
        console.log(works)

        const gallery = document.querySelector(".gallery");
        console.log(gallery);
        gallery.innerHTML = "";

        works.forEach(work => {
            const figure = document.createElement('figure');
            figure.dataset.workId = work.id;

            const image = document.createElement('img');
            image.src = work.imageUrl;
            image.dataset.workID = work.id
           
            image.alt = work.title;
            
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = work.title;

            figure.appendChild(image);
            figure.appendChild(figcaption);

            figure.addEventListener('click', (event) => {
                const workId = event.currentTarget.dataset.workId;
                console.log(`ID du travail: ${workId}`);
                // Vous pouvez faire ce que vous voulez avec l'ID du travail ici
            });

            gallery.appendChild(figure);
        });
    });


fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
        listeworks = works;
        console.log(works)

        const gallery = document.querySelector(".gallery");
        console.log(gallery);
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
        console.log(filtersContainer)
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
document.addEventListener('DOMContentLoaded', () => {

    const isLoggedIn = localStorage.getItem('token') !== null;
    const btnModifier = document.getElementById('btnModifier');
    const filtersContainer = document.getElementById('filters');
    const galleryImages = document.querySelectorAll('#portfolio .gallery img');
    console.log(galleryImages); 
    let addPhotoButtonAdded = false; // Variable pour vérifier si le bouton "Ajouter une photo" a déjà été ajouté

    if (isLoggedIn) {
        btnModifier.style.display = 'block';
        filtersContainer.style.display = 'none';
    } else {
        btnModifier.style.display = 'none';
        filtersContainer.style.display = 'block';
    }


     // Sélection de l'élément modal-content par sa classe
     const modalContent = document.querySelector('.modal-content');

     // Assurez-vous que l'élément modal-content existe et est défini
     /*if (modalContent) {
         // Votre code qui utilise modalContent ici
         const galleryImages = document.querySelectorAll('#portfolio .gallery img');
         galleryImages.forEach(img => {
             if (!modalContent.querySelector(`img[src="${img.src}"]`)) {
                 // Votre code pour manipuler les images ici
             }
         });
     } else {
         console.error("L'élément modal-content n'a pas été trouvé.");
     }*/

    // Fonction pour ajouter dynamiquement le bouton "Ajouter une photo"
    function addAddPhotoButton() {
        const modalAjoutPhotoContent = document.querySelector('#modalAjoutPhoto .modal-content');
        const addPhotoButton = document.createElement('button');
        addPhotoButton.textContent = 'Ajouter une photo';
        addPhotoButton.id = 'btnAjoutPhoto';
        console.log(modalAjoutPhotoContent)
        console.log(btnAjoutPhoto)
        console.log(addPhotoButton)

        addPhotoButton.addEventListener('click', () => {   
            modalAjoutPhoto2.style.display = 'block';
        });

        modalAjoutPhotoContent.appendChild(addPhotoButton);
        addPhotoButtonAdded = true;
        // Rendre le bouton visible
        addPhotoButton.style.display = 'block';
    }

    btnModifier.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';

        if (!addPhotoButtonAdded) {
            addAddPhotoButton(); // Ajouter le bouton "Ajouter une photo" si ce n'est pas déjà fait
        }

        galleryImages.forEach(img => {
            if (!modalContent.querySelector(`img[src="${img.src}"]`)) {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
        
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fas', 'fa-trash-alt');
                deleteIcon.dataset.workID = img.dataset.workID;
                console.log(deleteIcon.dataset.workID)
                console.log("test")

                deleteIcon.addEventListener('click', async (event) => {
                    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
                    if (confirmation) {
                        try {
                            const workId = event.target.dataset.workID;
                            const token = localStorage.getItem('token');
                            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });
                            if (response.ok) {
                                imageContainer.remove();
                                alert('Le travail a été supprimé avec succès !');
                            } else {
                                alert('Une erreur s\'est produite lors de la suppression du travail. Veuillez réessayer.');
                            }
                        } catch (error) {
                            console.error('Erreur lors de la suppression du travail :', error);
                            alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
                        }
                    }
                });
        
                const image = document.createElement('img');
                image.src = img.src;
                image.alt = img.alt;
                image.classList.add('modal-image');
        
                imageContainer.appendChild(image);
                imageContainer.appendChild(deleteIcon);
                modalContent.appendChild(imageContainer);
            }
        });

        /*const deleteIcons = document.querySelectorAll('.modal .fa-trash-alt');

        deleteIcons.forEach(deleteIcon => {
            deleteIcon.addEventListener('click', async (event) => {
                const workId = event.target.dataset.workId;
                

                const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");

                if (confirmation) {
                    try {
                        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            deleteIcon.parentElement.remove();
                            alert('Le travail a été supprimé avec succès !');
                        } else {
                            alert('Une erreur s\'est produite lors de la suppression du travail. Veuillez réessayer.');
                        }
                    } catch (error) {
                        console.error('Erreur lors de la suppression du travail :', error);
                        alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
                    }
                }
            });
        });
        */
    });

    const closeModalAjoutPhoto = document.getElementById('closeModalAjoutPhoto');
    const closeModalAjoutPhoto2 = document.getElementById('closeModalAjoutPhoto2');

    closeModalAjoutPhoto.addEventListener('click', () => {
        modalAjoutPhoto2.style.display = 'none';
        modalAjoutPhoto.style.display = 'block';
    });
});

