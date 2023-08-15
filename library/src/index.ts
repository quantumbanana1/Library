import {Attributes} from "./Atributes/Atributes";
import {Library} from "./Library/Library";

const toggleButton = document.getElementById('togglerCheckbox');
const slide = document.getElementsByClassName('slide-in');
const listOfBooks = document.getElementsByClassName('grid-books');
const form: HTMLFormElement = document.getElementById('commentform');
const formButton = document.getElementById('submit');
const gridList = document.getElementById('grid-books')
const mainBox = document.getElementById('main');
const bottomContainer = document.getElementById('bottomContainer')
const container = document.getElementById('container');
mainBox.style.height = `${gridList.clientHeight}px`;
const element: HTMLElement = document.querySelector('.slide-in.from-right');
const submitButton = document.getElementById('submit');
const booksAmount = document.getElementById('books-amount');
const booksCompleted = document.getElementById('books-completed');
const pagesCompleted = document.getElementById('pages-amount-info');
const deleteBttn = document.getElementById('deleteBtn')


import {Book, IBook} from "./Book/Book";
import {DataBase} from "./DataBase/DataBase";

if (toggleButton && gridList && element && bottomContainer && deleteBttn) {
    toggleButton.addEventListener('change', function () {
        if (this.checked) {
            slide[0].classList.add('show');
            gridList.classList.remove('active')
            // deleteBttn.classList.add('hide');
            if (gridList.clientHeight < bottomContainer.clientHeight) {
                element.style.height = `${bottomContainer.clientHeight + 150}px` // Set the height you want
                element.style.width = `${bottomContainer.clientWidth / 2}px`

            } else {
                element.style.height = `${gridList.clientHeight + 150}px` // Set the height you want
                element.style.width = `${gridList.clientWidth / 2}px`  // Set the width you want
            }


        } else {
            element.style.height = `${0}px` // Set the height you want
            element.style.width = `${0}px`
            slide[0].classList.remove('show');
            // deleteBttn.classList.remove('hide');
            if (gridList) {
                gridList.classList.add('active');
            }

        }

    })

}


let library: Library;

if (form && gridList) {
    library = new Library([], form, gridList);
    if (library) {
        library.populateWithBooks().then(() => {


                booksAmount.innerHTML = `${library.getTotalBooks}`
                booksCompleted.innerHTML = `${library.getBooksCompleted}`
                pagesCompleted.innerHTML = `${library.getCompletedPages}`

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
                        })
                        if (deleteBttn) {
                            deleteBttn.addEventListener('click', () => {
                                library.removeAllBooks();
                            });
                        }


                    } else {
                        console.log('no form or mainBox to adjust.')
                    }


                } else {
                    console.log('Grid list is undefined');
                }

            }
        )


    }
}


// library.populateWithBooks().then(() => {
//     if (library.books.length === 0) {
//         setTimeout(() => {
//             return;
//         }, 300)
//
//     }


// library.events.triggerEvent('addingBook');
// book1.save();
// library.showBooks(gridList);library.removeAllBooks();


// });















