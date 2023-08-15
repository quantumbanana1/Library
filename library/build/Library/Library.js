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
        });
        this.events.setEvent('deletingBook', () => {
            this.showBooks(outputElement);
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
                        const message = "You can't have more completed pages than actual number of book's pages";
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
                            console.log('saving xdxdxd...');
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
                3;
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
            <div id="status"><span>${progress}</span><span>${book.getStatusPercentage.toFixed(0)}%</span></div>`;
                div.innerHTML = templateHTML;
                element.appendChild(div);
            });
        }
        else {
            if (this.books.length === 0) {
                element.innerHTML = '';
            }
        }
    }
    restoreToDefault() {
        this.totalPages = 0;
        this.booksAmount = 0;
        this.completedPages = 0;
        this.booksCompleted = 0;
    }
}
exports.Library = Library;
