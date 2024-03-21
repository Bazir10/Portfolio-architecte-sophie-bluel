//const { filter } = require("lodash");


let listeworks = []

fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(works => {
    listeworks = works

    var gallery = document.getElementsByClassName("gallery");
    gallery = gallery[0]
    console.log(gallery)
    gallery.innerHTML=``

    for (let work of works) {
        gallery.innerHTML += `
            <figure>
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>`
    }
})


let fitrage = {
    data:  [
        {
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
    filters.innerHTML=``;

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
                deleteIcon.addEventListener('click', () => {
                    // Ajouter ici la logique pour supprimer l'image
                });

                imageContainer.appendChild(image);
                imageContainer.appendChild(deleteIcon);
                modalContent.appendChild(imageContainer);
            }
        });


const imageGrid = document.querySelector('.image-grid');
imageGrid.appendChild(modalContent); // Ajoutez le contenu de la fenêtre modale à la grille d'images


    });

});

document.addEventListener('DOMContentLoaded', function() {
    // Code JavaScript ici
    // Récupération du bouton "Ajout de photo"
    const btnAjoutPhoto = document.getElementById('btnAjouterPhoto');

    // Récupération des deux fenêtres modales
    const modal = document.getElementById('modal');
    const modalAjoutPhoto = document.getElementById('modalAjoutPhoto');

    // Ajout d'un gestionnaire d'événements au clic sur le bouton "Ajout de photo"
    btnAjoutPhoto.addEventListener('click', () => {
        // Masquer la première fenêtre modale
        modal.style.display = 'none';

        // Afficher la nouvelle fenêtre modale
        modalAjoutPhoto.style.display = 'block';
    });
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
