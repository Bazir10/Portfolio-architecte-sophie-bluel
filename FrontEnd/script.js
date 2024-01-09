
fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(works => {

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
