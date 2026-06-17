"use strict"
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const myLibrary = [];
 

function renderLibrary() {
    const container = document.getElementById("library-container");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        card.innerHTML = ` 
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <p>Status: ${book.isRead ? "READ": "Not Read"}</p>
        `;
        container.appendChild(card);
    });

}

 

const dialog = document.getElementById("book-dialog");
const openBtn = document.getElementById("open-dialog");
const closeBtn = document.getElementById("close-dialog");

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

const form = document.getElementById("book-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);
 renderLibrary();
  form.reset();
  dialog.close();
});

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);

  saveLibrary();
}

function loadLibrary() {
  myLibrary.length = 0;

  const savedBooks = localStorage.getItem("library");

  if (!savedBooks) return;

  const books = JSON.parse(savedBooks);

  books.forEach((book) => myLibrary.push(book));
}

loadLibrary();
renderLibrary();