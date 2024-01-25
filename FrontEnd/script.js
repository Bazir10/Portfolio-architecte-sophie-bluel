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
})

// Event Listener to change filter category

    // recuperer les boutons de filtres et les stocker dans une variable

    // parcourir chaque filtre et lui ajouter un event listener
    var filters = document.getElementById("filters");
const myButton = document.getElementById("my-button-id");

myButton.addEventListener("click", () => {
  console.log(someString); // Expected Value: 'Data'

  for (let categ of categories) {
        filters.addEventListener += `<button id="filtre-${categ.id}" type="button" value="${categ.id}">${categ.name}</button>`;
    }
  someString = "Data Again";
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
