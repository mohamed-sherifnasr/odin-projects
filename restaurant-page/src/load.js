export default function initialLoad() {
    //Create Elements
    let content = document.querySelector('#content');
    let fragment = document.createDocumentFragment();
    let header = document.createElement('p');
    let description = document.createElement('p');
    //Style
    content.classList.add('isActive');
    header.classList.add('header');
    description.classList.add('description');
    //Text Content
    header.textContent = "Restaurant Page";
    description.textContent = "Honoring the flame, the wood, and the cut. Experience artisan steakhouse dining redefined through prime, dry-aged steaks seared to absolute perfection over open embers. Your table is waiting."
    //Flow
    fragment.append(header, description);
    content.appendChild(fragment);
}