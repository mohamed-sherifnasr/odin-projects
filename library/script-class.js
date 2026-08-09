//References
let authorElement = document.querySelector("#author");
let titleElement = document.querySelector("#title");
let pagesElement = document.querySelector("#pages");
let readElement = document.querySelector("#read");

class Book{
  //Constructor
  constructor(title, author, pages, read){
    this.title = title;
    this.author= author;
    this.pages= pages;
    this.read= read;
  }
  info(){
  console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read.": "not read yet."}`)  
  }
  toggleRead(){
  this.read ? this.read = false : this.read = true;
  }
}

class Library{
  constructor(myLibrary=[]){
    this.myLibrary = myLibrary;    
  }
  addBookToLibrary(book){
    //Unique ID
    book.id = crypto.randomUUID();
    //Store instance in array
    this.myLibrary.push(book);
  }
  removeBook(book){
    this.myLibrary = this.myLibrary.filter((obj)=> book.id != obj.id);
  }
  showBook(book){
    const card = document.createElement("ul");
    
    const title = document.createElement("li");
    title.textContent = book.title;
    card.appendChild(title);
    
    const author = document.createElement("li");
    author.textContent = book.author;
    card.appendChild(author);
    
    const pages = document.createElement("li");
    pages.textContent = book.pages;
    card.appendChild(pages);
    
    const read = document.createElement("li");
    read.textContent = `${book.read? "Read" : "Not Read"}`;
    card.appendChild(read);
    
    //buttons container
    const bcontainer = document.createElement("div");
    bcontainer.setAttribute("id", "button-container");
    
    //read button
    const toggleRead = document.createElement("button");
    toggleRead.setAttribute("id", "toggle-button");
    toggleRead.textContent = "Read";
    toggleRead.addEventListener("click", ()=>{
      book.toggleRead();
      this.showLibrary(this.myLibrary);
    })
    bcontainer.appendChild(toggleRead);
    
    //remove button
    const remove = document.createElement("button");
    remove.setAttribute("id", "remove-button");
    remove.textContent = "Remove";
    remove.addEventListener("click", ()=>{
      this.myLibrary = this.myLibrary.filter(obj => obj.id != book.id);
      this.showLibrary(this.myLibrary);
    });
    bcontainer.appendChild(remove);
    
    //Adds UUID as Data Attribute + Appends container to card
    card.setAttribute("data-id", book.id);
    card.appendChild(bcontainer);
    //
    const container = document.querySelector("#library");
    card.classList.add("card");
    container.appendChild(card);
  }
  showLibrary(arr){
    const container = document.querySelector("#library");
    container.replaceChildren();
    arr.forEach((book)=>{
      this.showBook(book);
    })
  }
}

let theLibrary = new Library();

//ADD Book
form = document.querySelector("#form");
form.addEventListener("submit", (event)=>{
  event.preventDefault();
  if (authorElement.validity.valueMissing){authorElement.setCustomValidity("Author name is Missing!"); authorElement.reportValidity();} else {authorElement.setCustomValidity("");}
  if (titleElement.validity.valueMissing){titleElement.setCustomValidity("Title is Missing!"); titleElement.reportValidity();} else {titleElement.setCustomValidity("");}
  if (pagesElement.validity.valueMissing){pagesElement.setCustomValidity("Pages number is Missing!"); pagesElement.reportValidity();} else {pagesElement.setCustomValidity("");}
  if (readElement.validity.valueMissing){readElement.setCustomValidity("read value is Missing!"); readElement.reportValidity();} else {readElement.setCustomValidity("");}

  if (!authorElement.validity.valueMissing && !titleElement.validity.valueMissing && !pagesElement.validity.valueMissing && !readElement.validity.valueMissing){
    formData = new FormData(form);
    theLibrary.addBookToLibrary(new Book(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("read")));
    theLibrary.showBook(theLibrary.myLibrary.at(-1));
    form.reset();
  }
})

theLibrary.addBookToLibrary(new Book("1984", "George Orwell", "328", false));
theLibrary.addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", "281", false));
theLibrary.addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", "310", false));


theLibrary.showLibrary(theLibrary.myLibrary);
