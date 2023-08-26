"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Library_1 = require("./Library/Library");
const toggleButton = document.getElementById('togglerCheckbox');
const slide = document.getElementsByClassName('slide-in');
const listOfBooks = document.getElementsByClassName('grid-books');
const form = document.getElementById('commentform');
const formEdit = document.getElementById('commentform-edit');
const formButton = document.getElementById('submit');
const gridList = document.getElementById('grid-books');
const mainBox = document.getElementById('main');
const bottomContainer = document.getElementById('bottomContainer');
const container = document.getElementById('container');
mainBox.style.height = `${gridList.clientHeight}px`;
const element = document.querySelector('.slide-in.from-right');
const submitButton = document.getElementById('submit');
const booksAmount = document.getElementById('books-amount');
const booksCompleted = document.getElementById('books-completed');
const pagesCompleted = document.getElementById('pages-amount-info');
const deleteBttn = document.getElementById('deleteBtn');
const editForm = document.getElementById('commentform-edit');
const editExitBtn = document.getElementById('exitBtn');
const editFormContainer = document.getElementsByClassName('editContainer')[0];
if (toggleButton && gridList && element && bottomContainer && deleteBttn) {
    toggleButton.addEventListener('change', function () {
        if (this.checked) {
            slide[0].classList.add('show');
            gridList.classList.remove('active');
            // deleteBttn.classList.add('hide');
            if (gridList.clientHeight < bottomContainer.clientHeight) {
                element.style.height = `${bottomContainer.clientHeight + 150}px`; // Set the height you want
                element.style.width = `${bottomContainer.clientWidth / 2}px`;
            }
            else {
                element.style.height = `${gridList.clientHeight + 150}px`; // Set the height you want
                element.style.width = `${gridList.clientWidth / 2}px`; // Set the width you want
            }
        }
        else {
            element.style.height = `${0}px`; // Set the height you want
            element.style.width = `${0}px`;
            slide[0].classList.remove('show');
            // deleteBttn.classList.remove('hide');
            if (gridList) {
                gridList.classList.add('active');
            }
        }
    });
}
let library;
if (form && gridList) {
    library = new Library_1.Library([], form, gridList);
    if (library) {
        library.populateWithBooks().then(() => {
            booksAmount.innerHTML = `${library.getTotalBooks}`;
            booksCompleted.innerHTML = `${library.getBooksCompleted}`;
            pagesCompleted.innerHTML = `${library.getCompletedPages}`;
            if (gridList) {
                library.showBooks(gridList);
                mainBox.style.height = `${gridList.clientHeight}px`;
                if (form && mainBox) {
                    form.addEventListener('submit', (event) => {
                        event.preventDefault();
                        library.addBook(form).then(() => {
                            console.log('New book is adding...');
                            mainBox.style.height = `${gridList.clientHeight}px`;
                            // @ts-ignore
                            if (mainBox.style.height !== gridList.clientHeight) {
                                mainBox.style.height = `${gridList.clientHeight + 270}px`;
                            }
                        });
                    });
                    editForm.addEventListener('submit', (event) => {
                        event.preventDefault();
                        library.editBook(editForm);
                    });
                    if (editExitBtn) {
                        editExitBtn.addEventListener('click', () => {
                            editFormContainer.classList.remove('show');
                            library.triggerEvent('restoreEditForm');
                        });
                    }
                    if (deleteBttn) {
                        deleteBttn.addEventListener('click', () => {
                            library.removeAllBooks();
                        });
                    }
                }
                else {
                    console.log('no form or mainBox to adjust.');
                }
            }
            else {
                console.log('Grid list is undefined');
            }
        });
    }
}
