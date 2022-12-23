const addBook = document.querySelector(".addBookBtn");
const submitBook = document.querySelector(".submitBook");
const bookForm = document.querySelector(".bookForm");
const remove = document.querySelector(".remove");

const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const readChecked = document.querySelector(".readChecked");
const bookContainer = document.querySelector(".bookContainer");

let isAddingBook = false;
let myLibrary = [];

addBook.addEventListener("click", openAddBookWindow);
submitBook.addEventListener("click", addBookToLibrary);

function Book(title, author, pages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary() {
    for (let book of myLibrary) {
        if (book.title === bookTitle.value) {            
            bookTitle.className = "inputs errorInput";
            setTimeout(() => { bookTitle.className = "inputs"; }, 500);
            return;
        }
    }
    
    myLibrary.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, readChecked.checked));
    updateLibrary();
    openAddBookWindow();
    clearInput();
}

function openAddBookWindow() {
    if (!isAddingBook) {
        bookForm.style.visibility = "visible";
        isAddingBook = true;
        bookContainer.style.filter = "blur(10px)";
    } else {
        bookForm.style.visibility = "hidden";
        isAddingBook = false;
        bookContainer.style.filter = "blur(0px)";
    }
}

function clearInput() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
}

function updateLibrary() {
    let index = myLibrary.length - 1;

    let newCard = document.createElement("div");
    newCard.className = "card";
    bookContainer.appendChild(newCard);

    let title = document.createElement("h3");
    title.className = "cardTitle";
    title.textContent = `Title: ${myLibrary[index].title}`;
    newCard.appendChild(title);

    let author = document.createElement("h3");
    author.className = "cardAuthor";
    author.textContent = `Author: ${myLibrary[index].author}`;
    newCard.appendChild(author);

    let pages = document.createElement("h3");
    pages.className = "cardPages";
    pages.textContent = `Total pages: ${myLibrary[index].pages}`;
    newCard.appendChild(pages);

    /* Buttons */

    let readBtnAdd = document.createElement("button");
    readBtnAdd.className = "readBtn";
    readBtnAdd.textContent = "Read";

    checkRead(readBtnAdd);

    readBtnAdd.addEventListener("click", () => {
        if (readChecked.checked) {
            readChecked.checked = false;
            checkRead(readBtnAdd);
        } else {
            readChecked.checked = true;
            checkRead(readBtnAdd);
        }
    });

    newCard.appendChild(readBtnAdd);

    let removeBtnAdd = document.createElement("button");
    removeBtnAdd.className = "remove";
    removeBtnAdd.textContent = "Remove Book";

    removeBtnAdd.addEventListener("click", () => {
        newCard.remove(this);
    });

    newCard.appendChild(removeBtnAdd);
}

function checkRead(myBtn) {
    if (readChecked.checked) {
        myBtn.style.backgroundColor = "lightgreen";
        myBtn.textContent = "Read";
    } else {
        myBtn.style.backgroundColor = "red";
        myBtn.textContent = "Not Read";
    }
}
