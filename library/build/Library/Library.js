"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
const Book_1 = require("../Book/Book");
const DataBase_1 = require("../DataBase/DataBase");
const Eventing_1 = require("../Eventing/Eventing");
const booksAmount = document.getElementById('books-amount');
const booksCompleted = document.getElementById('books-completed');
const pagesCompleted = document.getElementById('pages-amount-info');
const name = document.getElementById('name-edit');
const surname = document.getElementById('surname-edit');
const title = document.getElementById('title-edit');
const pages = document.getElementById('pages-edit');
const completedPages = document.getElementById('completed_pages-edit');
const bookCompletion = document.getElementById('bookCompletion-edit');
const idPut = document.getElementById('bookId'); // ID book for editing.
class HTMLElementForm {
}
class Library {
    constructor(books = [], elementForm, outputElement) {
        this.db = new DataBase_1.DataBase("http://localhost:3000/books");
        this.books = books;
        this.events = new Eventing_1.Eventing();
        this.totalPages = 0;
        this.booksAmount = 0;
        this.completedPages = 0;
        this.booksCompleted = 0;
        this.events.setEvent('addingBook', () => {
            this.showBooks(outputElement);
            this.updatePanel();
        });
        this.events.setEvent('deletingBook', () => {
            console.log('Triggering deletinBook event...');
            this.showBooks(outputElement);
            this.updatePanel();
        });
        this.events.setEvent('restoreEditForm', () => {
            name.value = '';
            surname.value = '';
            title.value = '';
            pages.value = '';
            completedPages.value = '';
            bookCompletion.checked = false;
        });
        this.events.setEvent('bookEditing', () => {
            this.populateWithBooks().then(() => {
                this.showBooks(outputElement);
                this.updatePanel();
            });
        });
    }
    populateWithBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.books = [];
                const books = yield this.db.getAll();
                if (books.length === 0) {
                    this.restoreToDefault();
                    return;
                }
                books.map((book) => {
                    this.books.push(new Book_1.Book(book));
                });
                const completedPages = this.books.reduce((accumulator, currentBook) => {
                    return accumulator + currentBook.dataBook.date.completedPages;
                }, 0);
                const booksAmount = this.books.length;
                const totalPages = this.books.reduce((accumulator, currentBook) => {
                    return accumulator + currentBook.dataBook.date.pages;
                }, 0);
                const completedBooks = this.books.reduce((accumulator, currentBook) => {
                    let counter = 0;
                    if (currentBook.dataBook.date.completed) {
                        counter++;
                    }
                    return accumulator + counter;
                }, 0);
                this.totalPages = totalPages;
                this.booksAmount = booksAmount;
                this.completedPages = completedPages;
                this.booksCompleted = completedBooks;
                console.log(` populating is finished `);
            }
            catch (error) {
                console.log("Something went wrong while populating array with books");
                console.error(error);
            }
        });
    }
    get getTotalBooks() {
        return this.booksAmount;
    }
    get getBooksCompleted() {
        return this.booksCompleted;
    }
    get getCompletedPages() {
        return this.completedPages;
    }
    removeAllBooks() {
        this.populateWithBooks().then(() => {
            if (this.books.length === 0) {
                console.log("No record to delete");
            }
            else {
                this.books.map((book) => __awaiter(this, void 0, void 0, function* () {
                    yield book.remove();
                    yield this.populateWithBooks();
                    this.triggerEvent('deletingBook');
                }));
            }
        });
    }
    addBook(root) {
        return __awaiter(this, void 0, void 0, function* () {
            if (root === null) {
                console.log("root element is null");
                return;
            }
            else {
                if (root.checkValidity()) {
                    const name = document.getElementById('name');
                    const surname = document.getElementById('surname');
                    const title = document.getElementById('title');
                    const pages = document.getElementById('pages');
                    const completedPages = document.getElementById('completed_pages');
                    const completed = document.getElementById('bookCompletion');
                    const bookButton = document.getElementById('submit');
                    if (pages < completedPages) {
                        alert("You can't have more completed pages than actual number of book's pages");
                        pages.value = '';
                    }
                    if (parseInt(pages.value) < 0 || parseInt(completedPages.value) < 0) {
                        alert('negative pages are invalid.');
                        if (parseInt(pages.value) < 0) {
                            pages.value = '';
                        }
                        if (parseInt(completedPages.value) < 0) {
                            completedPages.value = '';
                        }
                        return;
                    }
                    if (parseInt(pages.value) === parseInt(completedPages.value)) {
                        completed.checked = true;
                    }
                    if (parseInt(pages.value) > parseInt(completedPages.value)) {
                        completed.checked = false;
                    }
                    if (name && surname && title && pages && completedPages && completed && bookButton) {
                        const dataBook = {
                            title: title.value,
                            author: { name: name.value, surname: surname.value },
                            pages: parseInt(pages.value),
                            completedPages: parseInt(completedPages.value),
                            completed: completed.checked,
                        };
                        const book = new Book_1.Book(dataBook);
                        book.save().then(() => __awaiter(this, void 0, void 0, function* () {
                            yield this.populateWithBooks().then(() => {
                                this.triggerEvent('addingBook');
                            });
                        }));
                    }
                }
                else {
                    console.log('Incorrect input values from form');
                    return;
                }
            }
        });
    }
    setEvent(key, func) {
        return this.events.setEvent(key, func);
    }
    triggerEvent(funcName) {
        return this.events.triggerEvent(funcName);
    }
    showBooks(element) {
        if (!element) {
            console.log('Root element is undefined');
            return;
        }
        element.innerHTML = '';
        if (this.books.length !== 0) {
            let progress = '';
            this.books.forEach((book) => {
                if (book.getProperty('completed')) {
                    progress = 'Read';
                }
                else {
                    progress = 'On progress';
                }
                const author = book.getProperty('author');
                const div = document.createElement('div');
                div.classList.add(`book`);
                div.classList.add(`${book.getProperty("id")}`);
                const bookId = book.getProperty('id');
                const isCompleted = book.getProperty('completed');
                const templateHTML = `
            <div id="titleMenu">Title: <span>${book.getProperty('title')}</span></div>
            <div id="authorMenu">Author: <span>${author.name} ${author.surname}</span></div>
            <div id="pages-amount">Pages: <span>${book.getProperty('pages')}</span></div>
            <div id="Gcompleted_pages">Completed Pages: <span>${book.getProperty('completedPages')}</span></div>
            <div id="buttonsMenu">
                <button id="dlt-btn${book.getProperty('id')}">Delete</button>
                <button id="edit-btn${book.getProperty('id')}">Edit</button>
                <button id="completion-btn${book.getProperty('id')}">Read</button>
            </div>
            <div id="status"><span id="barProgress${bookId}">${progress}</span><span>${book.getStatusPercentage.toFixed(0)}%</span></div>`;
                div.innerHTML = templateHTML;
                element.appendChild(div);
                const buttonDlt = document.getElementById(`dlt-btn${bookId}`);
                const buttonCompletion = document.getElementById(`completion-btn${bookId}`);
                const buttonEdit = document.getElementById(`edit-btn${bookId}`);
                if (buttonDlt && buttonCompletion && buttonEdit) {
                    buttonDlt.addEventListener('click', () => {
                        book.remove().then(() => {
                            this.populateWithBooks().then(() => {
                                this.triggerEvent('deletingBook');
                                this.updatePanel();
                            });
                        });
                    });
                    buttonCompletion.addEventListener('click', () => {
                        const barProgress = document.getElementById(`barProgress${bookId}`);
                        const id = bookId;
                        if (book.getProperty('completed')) {
                            book.update('completed', false);
                            if (barProgress) {
                                barProgress.innerHTML = 'On progress';
                                this.db.updateItem(id, book.dataBook.date).then(() => {
                                    console.log(book.dataBook.date);
                                    console.log('yolo');
                                    this.triggerEvent('bookEditing');
                                });
                            }
                        }
                        else {
                            book.update('completed', true);
                            if (barProgress) {
                                barProgress.innerHTML = 'read';
                                this.db.updateItem(id, book.dataBook.date).then(() => {
                                    console.log(book.dataBook.date);
                                    console.log('yolo');
                                    this.triggerEvent('bookEditing');
                                });
                            }
                        }
                    });
                    buttonEdit.addEventListener('click', () => {
                        const bodyElement = document.body;
                        // const child = document.createElement('div');
                        // child.classList.add('editContainer');
                        // child.innerHTML = templateFormEdit;
                        // bodyElement.appendChild(child);
                        const editForm = document.getElementsByClassName('editContainer')[0];
                        // editForm.classList.remove('unactive');
                        editForm.style.height = `${window.innerHeight}px`;
                        editForm.style.width = `${window.innerWidth}px`;
                        // editForm.innerHTML = templateFormEdit;
                        editForm.classList.add('show');
                        idPut.value = `${bookId}`;
                        name.value = `${author.name}`;
                        surname.value = `${author.surname}`;
                        title.value = `${book.getProperty('title')}`;
                        pages.value = `${book.getProperty('pages')}`;
                        completedPages.value = `${book.getProperty('completedPages')}`;
                        bookCompletion.checked = isCompleted;
                    });
                }
            });
        }
        else {
            if (this.books.length === 0) {
                element.innerHTML = '';
            }
        }
    }
    editBook(root) {
        return __awaiter(this, void 0, void 0, function* () {
            if (root === null) {
                console.log("root element is null");
                return;
            }
            else {
                if (root.checkValidity()) {
                    const id = parseInt(idPut.value);
                    const bookTitle = title.value;
                    const author = { name: name.value, surname: surname.value };
                    const bookPages = parseInt(pages.value);
                    const bookCompletedPages = parseInt(completedPages.value);
                    let completed = bookCompletion.checked;
                    if (bookCompletedPages > bookPages) {
                        alert('completed pages are greater than actual book pages!');
                        pages.value = '';
                        completedPages.value = '';
                        return;
                    }
                    if (bookCompletedPages < 0 || bookPages < 0) {
                        alert('Negative numbers are not allowed :(');
                        pages.value = '';
                        completedPages.value = '';
                        return;
                    }
                    if (bookPages === 0) {
                        alert('Books that have 0 pages are quick to read, right?');
                        pages.value = '';
                    }
                    if (bookPages === bookCompletedPages) {
                        completed = true;
                    }
                    if (bookPages > bookCompletedPages) {
                        completed = false;
                    }
                    const dataBook = yield this.db.get(id).then((book) => {
                        return book;
                    });
                    const newDataBook = {
                        title: bookTitle,
                        author: author,
                        pages: bookPages,
                        completedPages: bookCompletedPages,
                        completed: completed
                    };
                    console.log(newDataBook);
                    if (dataBook == newDataBook) {
                        console.log('Items are the same. Updating is stopped...');
                        return;
                    }
                    else {
                        yield this.db.updateItem(id, newDataBook);
                        this.triggerEvent('bookEditing');
                        this.triggerEvent('restoreEditForm');
                    }
                }
            }
        });
    }
    restoreToDefault() {
        this.totalPages = 0;
        this.booksAmount = 0;
        this.completedPages = 0;
        this.booksCompleted = 0;
    }
    updatePanel() {
        if (booksAmount && booksCompleted && pagesCompleted) {
            booksAmount.innerHTML = `${this.getTotalBooks}`;
            booksCompleted.innerHTML = `${this.getBooksCompleted}`;
            pagesCompleted.innerHTML = `${this.getCompletedPages}`;
        }
    }
}
exports.Library = Library;
