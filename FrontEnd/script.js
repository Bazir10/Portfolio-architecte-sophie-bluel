    // Écoute de l'événement 'DOMContentLoaded', qui est déclenché lorsque le document HTML initial est complètement chargé et analysé
document.addEventListener('DOMContentLoaded', () => {
    // Sélection du contenu de la modale d'ajout de photo
    const modalAjoutPhotoContent = document.querySelector('#modalAjoutPhoto .modal-content');
    // Recherche du bouton 'Ajouter une photo' dans cette modale
    const btnAjoutPhoto = modalAjoutPhotoContent.querySelector('#btnAjoutPhoto');
    
    console.log(modalAjoutPhotoContent); // Affiche l'élément dans la console pour débogage
    if (btnAjoutPhoto) {
    // Si le bouton existe, attache un gestionnaire d'événement 'click'
        btnAjoutPhoto.addEventListener('click', async () => {
            try {
    // Récupération du token de stockage local pour l'authentification
                const token = localStorage.getItem('token');
    // Sélection de l'élément 'figure' actuellement sélectionné dans la galerie
                const selectedFigure = document.querySelector('.gallery .selected'); // Sélectionnez la figure sélectionnée
                if (selectedFigure) {
    // Récupération de l'ID de l'œuvre stockée dans l'attribut data
                    const workID = selectedFigure.dataset.workID; // Récupérer l'ID du travail à partir de l'attribut data-work-id
                    console.log(workID)
    // Envoi d'une requête DELETE à l'API pour supprimer l'œuvre spécifiée
                    const response = await fetch(`http://localhost:5678/api/works/${workID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        // Logique en cas de succès de la requête
                        console.log('La requête DELETE a été effectuée avec succès.');
                    } else {
                        // Logique en cas d'échec de la requête
                        console.error('La requête DELETE a échoué.');
                    }
                } else {
                    // Erreur si aucun élément 'figure' n'est sélectionné
                    console.error('Aucune figure sélectionnée.');
                }
            } catch (error) {
                // Gestion des erreurs de la requête
                console.error('Une erreur s\'est produite lors de la requête DELETE :', error);
            }
        });
    } else {
        // Erreur si le bouton "Ajouter une photo" n'est pas trouvé
        console.error('Le bouton "Ajouter une photo" n\'a pas été trouvé.');
    }


});

// Requête GET pour récupérer les œuvres via une API
fetch("http://localhost:5678/api/works")
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(works => {
        listeworks = works; // Stocke les œuvres dans une variable
        console.log(works);

        const gallery = document.querySelector(".gallery"); // Sélection de la galerie
        console.log(gallery);
        gallery.innerHTML = ""; // Nettoie la galerie

       // Parcours de chaque œuvre pour la créer et l'ajouter à la galerie
       works.forEach(work => {
        const figure = document.createElement('figure');
        figure.dataset.workID = work.id;

        const image = document.createElement('img');
        image.src = work.imageUrl;
        image.dataset.workID = work.id
        console.log(work.id);
        image.alt = work.title;
        
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

            /* figure.addEventListener('click', (event) => {
                const workId = event.currentTarget.dataset.workId;
                console.log(`ID du travail: ${workId}`);
                // Vous pouvez faire ce que vous voulez avec l'ID du travail ici
            });*/

            
        });
        console.log('test1')
    });


/*fetch("http://localhost:5678/api/works")
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
*/
// Requête GET pour récupérer les catégories et les afficher sous forme de boutons pour filtrer
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
        const filtersContainer = document.getElementById("filters"); // Sélection du conteneur de filtres
        console.log(filtersContainer);
        filtersContainer.innerHTML = ""; // Nettoie le conteneur
        filtersContainer.innerHTML += `<button id="filtre-0" type="button" value="0" >Tous</button>`;

        // Création des boutons pour chaque catégorie
        categories.forEach(categ => {
            filtersContainer.innerHTML += `<button id="filtre-${categ.id}" type="button" value="${categ.id}">${categ.name}</button>`;
        });

        // Gestionnaire d'événement pour les clics sur les boutons de filtrage
        filtersContainer.addEventListener("click", (event) => {
            const categoryId = event.target.value;
            applyFilter(categoryId); // Appel de la fonction de filtrage
        });
    });
console.log('test2');


// Fonction pour appliquer le filtre de catégorie
function applyFilter(categoryId) {
    const gallery = document.querySelector(".gallery"); // Sélection de la galerie
    gallery.innerHTML = ""; // Nettoie la galerie

    // Filtre les œuvres selon la catégorie et les ajoute à la galerie
    listeworks.forEach(work => {
        if (categoryId === "0" || work.categoryId === parseInt(categoryId)) {
            gallery.innerHTML += `
              <figure data-category="${work.categoryId}">
              <img src="${work.imageUrl}" alt="${work.title}" data-workID="${work.id}">
                  <img src="${work.imageUrl}" alt="${work.title}">
                  <figcaption>${work.title}</figcaption>
              </figure>`;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('token') !== null;
    const btnModifier = document.getElementById('btnModifier');
    const editIcon = document.querySelector('.edit-button-container');
    const filtersContainer = document.getElementById('filters');
    const galleryImages = document.querySelectorAll('.gallery figure');
    console.log(galleryImages); 


    let addPhotoButtonAdded = false; // Variable pour vérifier si le bouton "Ajouter une photo" a déjà été ajouté

    if (isLoggedIn) {
        editIcon.style.display = 'block';
        filtersContainer.style.display = 'none';
    } else {
        editIcon.style.display = 'none';
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

        galleryImages.forEach(figure => {
            console.log(figure)
            const img = figure.querySelector('img')
            console.log(img)
            if (!modalContent.querySelector(`img[src="${img.src}"]`)) {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
        
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fas', 'fa-trash-alt','delete-icon' );
                console.log("test", img.dataset.workID)
                deleteIcon.dataset.workID = figure.dataset.workID;
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
                            console.log('test3')
                            if (response.ok) {
                                // Supprimer l'image de la modalité
                                imageContainer.remove();
                
                                // Supprimer l'image de la page d'accueil
                                const imageToRemove = document.querySelector(`.gallery figure[data-workID="${workId}"]`);
                                if (imageToRemove) {
                                    imageToRemove.remove();
                                }
                
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
        
                imageContainer.appendChild(deleteIcon);
                imageContainer.appendChild(image);
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

