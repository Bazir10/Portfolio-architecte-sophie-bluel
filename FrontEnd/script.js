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
        </figure>
        `


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


fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then(categories => {

    var filters = document.getElementById("filters");
    //filters = filters[0]
    console.log(categories)
    filters.innerHTML=``
    for (let categ of categories) {
        filters.innerHTML += `

        <div>${categ.name}</div>
        `
//ajouter addEventListener

var filters = document.querySelector('filters')

filters.addEventListener('click', )
}
})






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
