export default function loadContact(){
    //Create Elements
    let fragment = document.createDocumentFragment();

    let content = document.querySelector('#content');

    let listContainer = document.createElement('ul');

    let header = document.createElement('p');
    let address = document.createElement('li');
    let hours = document.createElement('li');
    let phone = document.createElement('li');

    //Text Content
    header.textContent = "Reservations & Hours";
    address.textContent = "104 Timber & Hearth Way, Downtown District";
    hours.textContent = "Tuesday – Sunday: 5:00 PM – 11:00 PM (Closed Mondays)";
    phone.textContent = "(555) 234-beef";

    //Style
    listContainer.classList.add('menu-container');
    header.classList.add('menu-header')

    //Flow
    listContainer.append(address, hours, phone);

    fragment.append(header, listContainer);

    content.append(fragment);
}