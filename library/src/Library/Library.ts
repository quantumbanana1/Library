import {Book, IBook} from "../Book/Book";
import {DataBase} from "../DataBase/DataBase";
import {Eventing} from "../Eventing/Eventing";


export class Library {
    books: Book[];
    public db: DataBase<IBook> = new DataBase<IBook>(
        "http://localhost:3000/books",
    )
    public events: Eventing
    public completedPages: number
    public totalPages: number
    public booksAmount: number

    constructor(books: Book[] = []) {
        this.books = books;
        this.events = new Eventing();
        this.totalPages = 0;
        this.booksAmount = 0;
        this.completedPages = 0;
    }

    async populateWithBooks() {
        try {
            const books: IBook[] = await this.db.getAll()
            books.map((book: IBook) => {
                this.books.push(new Book(book));
            })
            const completedPages = this.books.reduce((accumulator, currentBook): number => {
                return accumulator + currentBook.dataBook.date.completedPages;

            }, 0);
            const booksAmount = this.books.length;
            const totalPages = this.books.reduce((accumulator, currentBook): number => {
                return accumulator + currentBook.dataBook.date.pages;

            }, 0);

            this.totalPages = totalPages;
            this.booksAmount = booksAmount;
            this.completedPages = completedPages;
            console.log(` populating is finished `);


        } catch (error) {
            console.log("Something went wrong while populating array with books")
            console.error(error);
        }


    }


    getTotalBooks() {
        return this.booksAmount


    }


    getCompletedPages(): number {
        return this.completedPages;

    }

    removeAllBooks() {
        if (this.books.length === 0) {
            console.log("No record to delete")

        } else {
            this.books.map((book: Book) => {
                book.remove()

            })
        }
    }


    addBook(root: HTMLFormElement | null) {
        if (root === null) {
            console.log("root element is null");
            return;
        }

        if (root.checkValidity()) {
            const name = document.getElementById('name') as HTMLInputElement;
            const surname = document.getElementById('surname') as HTMLInputElement;
            const title = document.getElementById('title') as HTMLInputElement;
            const pages = document.getElementById('pages') as HTMLInputElement;
            const completedPages = document.getElementById('completed_pages') as HTMLInputElement;
            const completed = document.getElementById('bookCompletion') as HTMLInputElement;

            if(pages < completedPages) {
                const message:string = "You can't have more completed pages than actual number of book's pages"
            }

            if (name && surname && title && pages && completedPages && completed) {
                const dataBook: IBook = {
                    title: title.value,
                    author: {name: name.value, surname: surname.value},
                    pages: parseInt(pages.value),
                    completedPages: parseInt(completedPages.value),
                    completed: completed.checked,
                }

                const book = new Book(dataBook)


            }


        } else {
            console.log('Incorrect input values from form');
            return;
        }

    }


    setEvent(key: string, func: () => {}) {
        return this.events.setEvent(key, func);

    }

    showBooks(element: HTMLElement) {
        if (this.books.length === 0) {
            console.log('No books to show');
            return;

        } else {
            let innerHTML = '';
            let progress = '';
            this.books.map((book) => {
                if (book.getProperty('completed')) {
                    progress = 'Read'
                } else {
                    progress='on progress'
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
                </div>`
                innerHTML += templateHTML;
                element.innerHTML = innerHTML;
                console.log('Showing books finished...');
            })
        }

    }


}