import "./style.css";
import initialLoad from "./load.js";
import loadMenu from "./menu.js";
import loadContact from "./contact.js";

initialLoad();

let erase = function(){
    let content = document.querySelector('#content');
    content.replaceChildren('');
}

let nav = document.querySelector('nav');

nav.addEventListener("click", (e)=>{
    if (e.target.textContent == "Menu"){
        erase();
        loadMenu();
    } else if (e.target.textContent == "Home"){
        erase();
        initialLoad();
    } else if (e.target.textContent == "Contact"){
        erase();
        loadContact();
    }
})