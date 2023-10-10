const urlAPI = 'https://v2.jokeapi.dev/joke/Any?lang=es';
let buttonJoke = null;
let createJoke = null;

const bindElements = () => {
    buttonJoke = document.querySelector("#api");
    createJoke = document.querySelector("#joke");
}

const setFormListener = () => {
    buttonJoke.addEventListener("submit", async (e) => {
        e.preventDefault();
        const _joke = await fetchJoke();    
        if(!_joke) {
            return;
        }
        renderJoke(_joke);
    });
}

const addJoke = (jokeapi) => {
    const content = `<p> ${jokeapi.Text} </p>`;
    const _article = document.createElement("article");
    _article.innerHTML = content;
    return _article;
}  

const fetchJoke = async () => {
    try {
        const response = await fetch(urlAPI, { 
            method: "GET"
        });  
        if(response.ok) {
            const _data = await response.json();
            const newJoke = castResponse(_data);
            return newJoke;
        }
        switch(response.status) {
            case 404: 
            alert("No encontrado"); 
            break;
            default:
            alert("Desconocido");
        }
    } catch (error) {
        alert("Falle :c");
    }
}

const castResponse = (info) => {
    if(info.type === "single"){
        return [
            info.joke
        ];
    }else if(info.type === "twopart"){
        return [
            info.setup,
            info.delivery
        ];
    }
}

const renderJoke = (_j) => {
    createJoke.innerHTML = "";
    createJoke.appendChild(addJoke(_j));
}

const main = () => {
    bindElements();
    setFormListener();
}
window.onload = main;