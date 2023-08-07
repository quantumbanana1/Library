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
class Library {
    constructor(books = []) {
        this.db = new DataBase_1.DataBase("http://localhost:3000/books");
        this.books = books;
        this.events = new Eventing_1.Eventing();
        this.totalPages = 0;
        this.booksAmount = 0;
        this.completedPages = 0;
    }
    populateWithBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.db.getAll();
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
                this.totalPages = totalPages;
                this.booksAmount = booksAmount;
                this.completedPages = completedPages;
                console.log(` populating is finished `);
            }
            catch (error) {
                console.log("Something went wrong while populating array with books");
                console.error(error);
            }
        });
    }
    getTotalBooks() {
        return this.booksAmount;
    }
    getCompletedPages() {
        return this.completedPages;
    }
    removeAllBooks() {
        if (this.books.length === 0) {
            console.log("No record to delete");
        }
        else {
            this.books.map((book) => {
                book.remove();
            });
        }
    }
    addBook(root) {
        if (root === null) {
            console.log("root element is null");
            return;
        }
        if (root.checkValidity()) {
            const name = document.getElementById('name');
            const surname = document.getElementById('surname');
            const title = document.getElementById('title');
            const pages = document.getElementById('pages');
            const completedPages = document.getElementById('completed_pages');
            const completed = document.getElementById('bookCompletion');
            if (pages < completedPages) {
                const message = "You can't have more completed pages than actual number of book's pages";
            }
            if (name && surname && title && pages && completedPages && completed) {
                const dataBook = {
                    title: title.value,
                    author: { name: name.value, surname: surname.value },
                    pages: parseInt(pages.value),
                    completedPages: parseInt(completedPages.value),
                    completed: completed.checked,
                };
                const book = new Book_1.Book(dataBook);
            }
        }
        else {
            console.log('Incorrect input values from form');
            return;
        }
    }
    setEvent(key, func) {
        return this.events.setEvent(key, func);
    }
    showBooks(element) {
        if (this.books.length === 0) {
            console.log('No books to show');
            return;
        }
        else {
            let innerHTML = '';
            let progress = '';
            this.books.map((book) => {
                if (book.getProperty('completed')) {
                    progress = 'Read';
                }
                else {
                    progress = 'on progress';
                }
                const author = book.getProperty('author');
                const templateHTML = `<div class="book">
                    <div id="titleMenu">Title: <span>${book.getProperty('title')}</span></div>
                    <div id="authorMenu">Author: <span>${author.name} ${author.surname}</span></div>
                    <div id="Pages">Pages: <span>${book.getProperty('pages')}</span></div>
                    <div id="completed_pages">Complited Pages: <span>${book.getProperty('completedPages')}</span></div>
                    <div id="buttonsMenu">
                        <button>Delete</button>
                        <button>Edit</button>
                        <button>Read</button>
                    </div>
                    <div id="status">${progress}</div>
                </div>`;
                innerHTML += templateHTML;
                element.innerHTML = innerHTML;
                console.log('Showing books finished...');
            });
        }
    }
}
exports.Library = Library;
