const campoNome = document.getElementById('nome');
const url = 'http://localhost:3000/';
const rota = "users";

fetch(url + rota)
.then(res => res.json())
.then(data =>{  
    console.log(data)
    campoNome.innerHTML = data.nome;
});