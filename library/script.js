let myLibrary = [];

function Book(title, author, pages, read){
  //Constructor
  this.title = title;
  this.author= author;
  this.pages= pages;
  this.read= read;
}

//Shared Book Functions
Book.prototype.info = function(){
  console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "read.": "not read yet."}`)
}

Book.prototype.toggleRead = function(){
  this.read ? this.read = false : this.read = true;
}

//Script Functions
//Creates Instance + UUID + Store in Array
function addBookToLibrary(title, author, pages, read){
  //Creates an instance with argument
  const book1 = new Book(title, author, pages, read)
  //Unique ID
  book1.id = crypto.randomUUID();
  //Store instance in array
  myLibrary.push(book1);
}

// Remove Book
function removeBook(book){
  myLibrary = myLibrary.filter((obj)=> book.id != obj.id);
}

//Display Books function
function showBook(book){
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
    showLibrary(myLibrary);
  })
  bcontainer.appendChild(toggleRead);
  
  //remove button
  const remove = document.createElement("button");
  remove.setAttribute("id", "remove-button");
  remove.textContent = "Remove";
  remove.addEventListener("click", ()=>{
    myLibrary = myLibrary.filter(obj => obj.id != book.id);
    showLibrary(myLibrary);
  });
  bcontainer.appendChild(remove);
  
  //Adds UUID as Data Attribute + Append container to card
  card.setAttribute("data-id", book.id);
  card.appendChild(bcontainer);
  //
  const container = document.querySelector("#library");
  card.classList.add("card");
  container.appendChild(card);
}

//Loops over Books and Show them on the screen
function showLibrary(arr){
  const container = document.querySelector("#library");
  container.replaceChildren();
  arr.forEach((book)=>{
    showBook(book);
  })
}

//ADD Book
form = document.querySelector("#form");
form.addEventListener("submit", (event)=>{
  event.preventDefault();
  formData = new FormData(form);
  addBookToLibrary(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("read"));
  showBook(myLibrary.at(-1));
  form.reset();
})

addBookToLibrary("1984", "George Orwell", "328", false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", false);


showLibrary(myLibrary);

