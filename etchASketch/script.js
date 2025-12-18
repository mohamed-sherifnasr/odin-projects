//Variables
let reset = document.querySelector("#generateGrid");
let sides = 16;
//let color = document.querySelector("#color");

//Functions
let initializeGrid = function (){
  let rem = document.querySelector(".container")
  document.body.removeChild(rem);
  let container = document.createElement("div");
  sides = document.querySelector("#sides").value; 
  document.documentElement.style.setProperty("--basis", `calc(${100/sides}% - 1px)`);
  generateGrid(container);
}

let generateGrid = function(container){
  for (let i = 0; i < sides; i++){
    for (let j = 0; j < sides; j++){
      let element = document.createElement("div");
      element.dataset.opacity = 0;
      element.classList.add("visible");
      element.addEventListener("mouseover", ()=> {
      //element.style.backgroundColor = color.value;
      element.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)},
      ${Math.floor(Math.random()*256)},
      ${Math.floor(Math.random()*256)})`;
      element.dataset.opacity = Math.min(parseFloat(element.dataset.opacity) + 0.1,1);
      element.style.opacity = element.dataset.opacity;
      });
      container.appendChild(element);
      
    }
  }
  container.classList.add("container");
  document.body.appendChild(container);
}

//Flow
reset.addEventListener("click", initializeGrid);