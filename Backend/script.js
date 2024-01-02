const { response } = require("express");

fetch("http://localhost:5678/api/") 
.then(response => response.json())
.then(reponse2 => console.log(reponse2))