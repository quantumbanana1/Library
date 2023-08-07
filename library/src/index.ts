import {Attributes} from "./Atributes/Atributes";
import {Library} from "./Library/Library";

const toggleButton = document.getElementById('togglerCheckbox');
const slide = document.getElementsByClassName('slide-in');
const listOfBooks = document.getElementsByClassName('grid-books');
const form = document.getElementById('commentform');
const formButton = document.getElementById('submit');
const gridList = document.getElementById('grid-books')
const mainBox = document.getElementById('main');
const bottomContainer = document.getElementById('bottomContainer')
const container = document.getElementById('container');
mainBox.style.height = `${gridList.clientHeight}px`;
const element = document.querySelector('.slide-in.from-right');


// Add the desired height and width



console.log(form);
import {Book, IBook} from "./Book/Book";
import {DataBase} from "./DataBase/DataBase";

toggleButton.addEventListener('change', function () {
    if (this.checked) {
        slide[0].classList.add('show');
        gridList.classList.remove('active')
        if (gridList.clientHeight < bottomContainer.clientHeight) {
            element.style.height = `${bottomContainer.clientHeight+150}px` // Set the height you want
            element.style.width = `${bottomContainer.clientWidth/2}px`

        } else {
            element.style.height = `${gridList.clientHeight + 150}px` // Set the height you want
            element.style.width = `${gridList.clientWidth / 2}px`  // Set the width you want
        }


    } else {
        element.style.height = `${0}px` // Set the height you want
        element.style.width = `${0}px`
        slide[0].classList.remove('show');
        gridList.classList.add('active');
    }

})

const library = new Library();
library.populateWithBooks().then(() => {
    if (library.books.length === 0) {
        setTimeout(() => {
            return;
        }, 300)

    }
    console.log(library.books);
    const book1 = new Book({
            title: "Wichura",
            author: {name: "Jacek", surname: "Zimniak"},
            completed: false,
            completedPages: 120,
            pages: 450,
        }
    );

    library.setEvent("addingBook", ()=> {
        this.showbooks(gridList);

    })

    library.events.triggerEvent('addingBook');
    book1.save();
    library.showBooks(gridList);


});















