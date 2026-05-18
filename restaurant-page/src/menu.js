export default function loadMenu(){
    //Create Elements
    let fragment = document.createDocumentFragment();

    let content = document.querySelector('#content');

    let header = document.createElement('p');

    let listContainer = document.createElement('ul');

    let item1 = document.createElement('li');
    let itemDescription1 = document.createElement('p');

    let item2 = document.createElement('li');
    let itemDescription2 = document.createElement('p');

    let item3 = document.createElement('li');
    let itemDescription3 = document.createElement('p');

    //Text Content
    header.textContent = "The Cuts";

    item1.textContent = "Dry-Aged Tomahawk — $120";
    itemDescription1.textContent = "32oz bone-in ribeye, seared over split hickory, finished with smoked sea salt.";

    item2.textContent = "Filet Mignon — $54";
    itemDescription2.textContent = "8oz center-cut tenderloin, flame-broiled, served with roasted bone marrow butter.";

    item3.textContent = "Smoked Beef Belly — $38";
    itemDescription3.textContent = "Crispy heritage beef, applewood smoked, glazed with a dark maple-bourbon reduction.";

    //Style
    header.classList.add('menu-header');
    listContainer.classList.add('menu-container');
    
    //Flow
    item1.append(itemDescription1);
    item2.append(itemDescription2);
    item3.append(itemDescription3);

    listContainer.append(item1, item2, item3);

    fragment.append(header, listContainer);

    content.append(fragment);
}