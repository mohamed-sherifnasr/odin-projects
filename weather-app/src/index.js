//Document Nodes
const mainSearchBtn = document.getElementById("mainSearchBtn");
const form = document.getElementById("mainSearchContainer");
const searchSVG = document.getElementById("searchSVG");

//Helper Functions
let fahrToCelsius = function(deg){
    return (deg - 32 * (5/9)).toFixed();
}

//UI Component functions
let renderHeader = function(){
    const header = document.createElement('header');
    const logo = document.createElement("h2");
    const searchContainer = document.createElement('form');
    const searchBar = document.createElement('input');
    const searchBtn = document.createElement('button');
    const cloneSearchSVG = searchSVG.cloneNode(true);

    logo.textContent = "Weather App";
    
    header.classList.add("headerContainer");

    searchBtn.append(cloneSearchSVG);
    searchContainer.append(searchBar, searchBtn);
    header.append(logo, searchContainer);
    return header;
}

//Main Renderer
let renderResult = function (data){
    let p = document.createElement("p");
    p.textContent = JSON.stringify(data);
    let header = renderHeader();
    document.body.replaceChildren(header);
    document.body.style.alignItems = "flex-start";
}


//Search Button (Main Trigger for the Fetch)
mainSearchBtn.addEventListener("click", async(e)=>{
    e.preventDefault();
    let city = new FormData(form).get("search");

    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}}?key=VD6KDW2MS5Z3366THPX3UUF5T`);

    let data = await response.json();

    renderResult(data);
})