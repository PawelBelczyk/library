"use strict"
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, isRead) {
const book = new Book(title, author, pages, isRead);
myLibrary.push(book);
}

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

addBookToLibrary("Dune", "Frank Herbert", 600, false);
addBookToLibrary("1984", "George Orwell", 300, true);

renderLibrary();