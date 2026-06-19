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
          <button class="delete-btn" data-id="${book.id}">
          Delete
          </button>

            <button class="toggle-btn" data-id="${book.id}">
            Toggle Read
            </button>
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

books.forEach((book) => {
  const restoredBook = new Book(
    book.title,
    book.author,
    book.pages,
    book.isRead
  );

  restoredBook.id = book.id;

  myLibrary.push(restoredBook);
});
}


function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);

  if (index !== -1) {
    myLibrary.splice(index, 1);
  }

  saveLibrary();
  renderLibrary();
}


document
  .getElementById("library-container")
  .addEventListener("click", (e) => {

    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;

      removeBook(id);
    }

        if (e.target.classList.contains("toggle-btn")) {
      toggleBookRead(e.target.dataset.id);
    }
  });


  Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};


function toggleBookRead(id) {
  const book = myLibrary.find(book => book.id === id);

  if (!book) return;

  book.toggleRead();

  saveLibrary();
  renderLibrary();
}

loadLibrary();
renderLibrary();