document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal");
    const modalAjoutPhoto2 = document.getElementById("modalAjoutPhoto2");
    const closeModal = document.getElementById("closeModal");
    const closeModalAjoutPhoto2 = document.getElementById('closeModalAjoutPhoto2');
    const btnModifier = document.getElementById('btnModifier');
    const modalContent = document.querySelector('.modal-content');
    let addPhotoButtonAdded = false;
    let listeworks = [];
  
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
  
    const boutonPrecedent = document.querySelector('.bouton-precedent');
    boutonPrecedent.addEventListener('click', () => {
      modalAjoutPhoto2.style.display = 'none';
    });
  
    btnModifier.addEventListener('click', () => {
      modal.style.display = 'block';
  
      if (!addPhotoButtonAdded) {
        addAddPhotoButton();
      }
  
      // Fetch pour récupérer les œuvres et initialiser listeworks
      fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {
          listeworks = works;
          modalContent.innerHTML = ''; // Clear previous modal content
  
          // Add the close button
          const closeButton = document.createElement('button');
          closeButton.id = 'closeModal';
          closeButton.textContent = '×';
          closeButton.addEventListener('click', hideFirstModal);
          modalContent.appendChild(closeButton);
  
          // Add the "Add Photo" button
          const addPhotoButton = document.createElement('button');
          addPhotoButton.id = 'btnAjoutPhoto';
          addPhotoButton.textContent = 'Ajouter une photo';
          addPhotoButton.addEventListener('click', () => {
            modalAjoutPhoto2.style.display = 'block';
          });
          modalContent.appendChild(addPhotoButton);
  
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
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des œuvres :", error);
        });
    });
  
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
  
    const inputPhoto = document.getElementById('input-photo');
    const inputTexte = document.getElementById('input-texte');
    const categorieSelect = document.getElementById('categorie');
    const formAjoutPhoto = document.getElementById('input-form');
  
    inputPhoto.addEventListener('change', handleFileSelect);
  
    function handleFileSelect(event) {
      const file = event.target.files[0];
      const preview = document.getElementById('preview');
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
    const categories = ['Objets', 'Appartement', 'Hotels & Restaurants'];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorieSelect.appendChild(option);
    });
  
    const boutonEnvoyer = document.getElementById('bouton-envoyer');
    boutonEnvoyer.addEventListener('click', (e) => {
      e.preventDefault();
      const image = inputPhoto.files[0];
      const title = inputTexte.value;
      const category = categorieSelect.value;
  
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('category', 2);
  
      const token = localStorage.getItem('token');
  
      fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi des données');
        }
        console.log('Données envoyées avec succès !');
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
    });
  });
  