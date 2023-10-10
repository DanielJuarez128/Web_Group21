const urlAPI = 'https://v2.jokeapi.dev/joke/Any?lang=es';
let buttonJoke = null;
let createJoke = null;
let content = null;

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
    if(jokeapi.Type === "single"){
        let content = `
            <p> ${jokeapi.Text[0]} </p>
        `;
    }else if(jokeapi.Type === "twopart"){
        let content = `
            <p> ${jokeapi.Text[0]} </p>
            <p> ${jokeapi.Text[1]} </p>
        `;
    }
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
        return{
            Type: info.type,
            Text: [
                info.joke
            ]
        };
    }else if(info.type === "twopart"){
        return {
            Type: info.type,
            Text: [
                info.setup,
                info.delivery
            ]
        };
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