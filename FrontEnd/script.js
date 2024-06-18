let listeworks = []; // Définir listeworks globalement

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const editIcon = document.querySelector(".edit-button-container");
  const filtersContainer = document.getElementById("filters");

  if (isLoggedIn) {
    editIcon.style.display = "block";
    filtersContainer.style.display = "none";
  } else {
    editIcon.style.display = "none";
    filtersContainer.style.display = "block";
  }

  // Fetch pour récupérer les œuvres et initialiser listeworks
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
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des œuvres :", error);
    });

  // Fetch pour récupérer les catégories et les afficher dans un select
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
      const filtersContainer = document.getElementById("filters");
      filtersContainer.innerHTML = "";
      filtersContainer.innerHTML += `<button id="filtre-0" type="button" value="0">Tous</button>`;

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
});
