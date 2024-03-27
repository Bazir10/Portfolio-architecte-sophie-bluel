//const { filter } = require("lodash");


let listeworks = []

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
        listeworks = works

        var gallery = document.getElementsByClassName("gallery");
        gallery = gallery[0]
        console.log(gallery)
        gallery.innerHTML = ``

        for (let work of works) {
            gallery.innerHTML += `
            <figure>
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>`
        }
    })


let fitrage = {
    data: [{
            filtrageName: "Mes Project",
            category: "projet",
        },
        {
            filtrageName: "contact",
            category: "contact",
        },
        {
            filtrageName: "loging",
            category: "loging",
        },
    ],
};

// Add Categories name to the HTML
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {

        var filters = document.getElementById("filters");
        filters.innerHTML = ``;

        filters.innerHTML += `<button id="filtre-0" type="button" value="0" >Tous</button>`;

        for (let categ of categories) {
            filters.innerHTML += `<button id="filtre-${categ.id}" type="button" value="${categ.id}">${categ.name}</button>`;
        }
        filters.addEventListener("click", (event) => {
            const categoryId = event.target.value;
            applyFilter(categoryId);
        });
    });

function applyFilter(categoryId) {
    var gallery = document.getElementsByClassName("gallery");
    gallery = gallery[0];
    gallery.innerHTML = ``;

    for (let work of listeworks) {
        if (categoryId === "0" || work.categoryId === parseInt(categoryId)) {
            gallery.innerHTML += `
              <figure data-category="${work.categoryId}">
                  <img src="${work.imageUrl}" alt="${work.title}">
                  <figcaption>${work.title}</figcaption>
              </figure>`;
        }
    }
}

// Event Listener to change filter category

// recuperer les boutons de filtres et les stocker dans une variable

// parcourir chaque filtre et lui ajouter un event listener
var filters = document.getElementById("filters");
const myButton = document.getElementById("my-button-id");

/*myButton.addEventListener("click", () => {
  console.log(someString); // Expected Value: 'Data'

  for (let categ of categories) {
        filters.addEventListener += `<button id="filtre-${categ.id}" type="button" value="${categ.id}">${categ.name}</button>`;
    }
  someString = "Data Again";
});*/
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('token') !== null;

    const btnModifier = document.getElementById('btnModifier');
    const filters = document.getElementById('filters');

    if (isLoggedIn) {
        // Si l'utilisateur est connecté, affiche le bouton "Modifier" et masque les filtres
        btnModifier.style.display = 'block';
        filters.style.display = 'none';
    } else {
        // Si l'utilisateur n'est pas connecté, affiche les filtres et masque le bouton "Modifier"
        btnModifier.style.display = 'none';
        filters.style.display = 'block';
    }



    btnModifier.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
        // Ajoutez ici le code pour ajouter/supprimer des images

        const modalContent = document.querySelector('.modal-content');
        const addImageButton = document.createElement('button');
        addImageButton.textContent = 'Ajouter une photo';
        modalContent.appendChild(addImageButton);

        const galleryImages = document.querySelectorAll('#portfolio .gallery img');

        galleryImages.forEach(img => {
            // Vérifier si l'image n'est pas déjà présente dans la fenêtre modale
            if (!modalContent.querySelector(`img[src="${img.src}"]`)) {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                const image = document.createElement('img');
                image.src = img.src;
                image.alt = img.alt;
                image.classList.add('modal-image');

                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fas', 'fa-trash-alt');
                deleteIcon.dataset.workId = img.dataset.workId; // Ajoutez l'ID du travail en tant qu'attribut de données
                deleteIcon.addEventListener('click', async () => {
                    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
                    if (confirmation) {
                        try {
                            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                                method: 'DELETE'
                            });
                            if (response.ok) {
                                event.target.parentElement.remove();
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


                imageContainer.appendChild(image);
                imageContainer.appendChild(deleteIcon);
                modalContent.appendChild(imageContainer);
            }
        });


        const imageGrid = document.querySelector('.image-grid');
        imageGrid.appendChild(modalContent); // Ajoutez le contenu de la fenêtre modale à la grille d'images


    });


    // Intégration de la logique pour supprimer un travail
    document.querySelector('.gallery').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-work')) {
            const workId = event.target.dataset.workId;

            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");

            if (confirmation) {
                try {
                    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        event.target.parentElement.remove();
                        alert('Le travail a été supprimé avec succès!');
                    } else {
                        alert('Une erreur s\'est produite lors de la suppression du travail. Veuillez réessayer.');
                    }
                } catch (error) {
                    console.error('Erreur lors de la suppression du travail:', error);
                    alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
                }
            }
        }
    });

});


document.addEventListener('DOMContentLoaded', () => {
    const btnAjoutPhoto = document.getElementById('btnAjoutPhoto'); // Sélection du bouton correct

    if (btnAjoutPhoto) {
        btnAjoutPhoto.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalAjoutPhoto = document.getElementById('modalAjoutPhoto');
            modal.style.display = 'none'; // Masquer la fenêtre modale principale
            modalAjoutPhoto.style.display = 'block'; // Afficher la fenêtre modale pour l'ajout de photo

        });
    }




    // Intégration de la logique pour envoyer les données du formulaire
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        const formData = new FormData(form); // Récupère les données du formulaire

        try {
            const response = await fetch('http://localhost:5678/api/categories', {
                method: 'POST',
                body: formData // Envoie les données du formulaire au serveur
            });

            if (response.ok) {
                alert('Le projet a été ajouté avec succès!');
                window.location.reload(); // Recharge la page pour afficher les nouveaux projets
            } else {
                alert('Une erreur s\'est produite lors de l\'ajout du projet. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        }
    });

    // Autres parties de votre code...
});




/*for(let i of products.data){
    //Create Card
    let card = document.createElement("div");
    //card should have category
    card.classList.add("card", "i.category");
    //image div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    //img tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);
    document.getElementById("filters").appendChild(card);
}
*/