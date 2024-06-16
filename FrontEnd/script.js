document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const btnModifier = document.getElementById("btnModifier");
  const editIcon = document.querySelector(".edit-button-container");
  const filtersContainer = document.getElementById("filters");
  const galleryImages = document.querySelectorAll(".gallery figure");
  const modalAjoutPhoto2 = document.getElementById("modalAjoutPhoto2");

  let addPhotoButtonAdded = false; // Variable pour vérifier si le bouton "Ajouter une photo" a déjà été ajouté

  if (isLoggedIn) {
    editIcon.style.display = "block";
    filtersContainer.style.display = "none";
  } else {
    editIcon.style.display = "none";
    filtersContainer.style.display = "block";
  }

  // Sélection de l'élément modal-content par sa classe
  const modalContent = document.querySelector(".modal-content");

  // Fetch pour récupérer les catégories et les afficher dans un select
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
      const selectCategory = document.getElementById("selectCategory");

      // Remplir le select avec les options de catégorie
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectCategory.appendChild(option);
      });
    });

  // Fonction pour ajouter dynamiquement le bouton "Ajouter une photo"
  function addAddPhotoButton() {
    const modalAjoutPhotoContent = document.querySelector("#modalAjoutPhoto .modal-content");
    const addPhotoButton = document.createElement("button");
    addPhotoButton.textContent = "Ajouter une photo";
    addPhotoButton.id = "btnAjoutPhoto";

    addPhotoButton.addEventListener("click", () => {
      modalAjoutPhoto2.style.display = "block";
    });

    modalAjoutPhotoContent.appendChild(addPhotoButton);
    addPhotoButtonAdded = true;
    // Rendre le bouton visible
    addPhotoButton.style.display = "block";
  }

  btnModifier.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    if (!addPhotoButtonAdded) {
      addAddPhotoButton(); // Ajouter le bouton "Ajouter une photo" si ce n'est pas déjà fait
    }

    listeworks.forEach(work => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      const image = document.createElement("img");
      image.src = work.imageUrl;
      image.alt = work.title;
      image.classList.add("modal-image");

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");

      deleteIcon.addEventListener("click", async event => {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
        if (confirmation) {
          try {
            const workId = event.target.dataset.workID;
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              // Supprimer l'image de la modalité
              imageContainer.remove();

              // Supprimer l'image de la page d'accueil
              const imageToRemove = document.querySelector(`[data-work-id~="${work.id}"]`);
              if (imageToRemove) {
                imageToRemove.remove();
              }

              alert("Le travail a été supprimé avec succès !");
            } else {
              alert("Une erreur s'est produite lors de la suppression du travail. Veuillez réessayer.");
            }
          } catch (error) {
            console.error("Erreur lors de la suppression du travail :", error);
            alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
          }
        }
      });

      imageContainer.appendChild(deleteIcon);
      imageContainer.appendChild(image);
      modalContent.appendChild(imageContainer);
    });
  });

  const closeModalAjoutPhoto = document.getElementById("closeModalAjoutPhoto");

  closeModalAjoutPhoto.addEventListener("click", () => {
    modalAjoutPhoto2.style.display = "none";
  });
});
