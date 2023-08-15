import {Book, IBook} from "../Book/Book";
import {DataBase} from "../DataBase/DataBase";
import {Eventing} from "../Eventing/Eventing";


class HTMLElementForm {
}

export class Library {
    books: Book[];
    public db: DataBase<IBook> = new DataBase<IBook>(
        "http://localhost:3000/books",
    )
    public events: Eventing
    public completedPages: number
    public totalPages: number
    public booksAmount: number
    public booksCompleted: number

    constructor(books: Book[] = [], elementForm: HTMLElementForm,outputElement:HTMLElement) {
        this.books = books;
        this.events = new Eventing();
        this.totalPages = 0;
        this.booksAmount = 0;
        this.completedPages = 0;
        this.booksCompleted = 0;
        this.events.setEvent('addingBook', () => {
            this.showBooks(outputElement)
        })
        this.events.setEvent('deletingBook', () => {
            this.showBooks(outputElement);
        })

    }

    async populateWithBooks() {
        try {
            this.books = [];
            const books: IBook[] = await this.db.getAll()
            if (books.length === 0) {
                this.restoreToDefault();
                return;
            }
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

            const completedBooks = this.books.reduce((accumulator:number, currentBook:Book):number => {
                let counter = 0;
                if (currentBook.dataBook.date.completed) {
                    counter++;
                }
                return accumulator + counter;
            },0)

            this.totalPages = totalPages;
            this.booksAmount = booksAmount;
            this.completedPages = completedPages;
            this.booksCompleted = completedBooks;
            console.log(` populating is finished `);


        } catch (error) {
            console.log("Something went wrong while populating array with books")
            console.error(error);
        }


    }


    get getTotalBooks():number {
        return this.booksAmount


    }

    get getBooksCompleted(): number {
        return this.booksCompleted;

    }


    get getCompletedPages(): number {
        return this.completedPages;

    }

        removeAllBooks() {
         this.populateWithBooks().then(() => {
            if (this.books.length === 0) {
                console.log("No record to delete")

            } else {
                this.books.map(async (book: Book) => {
                    await book.remove();
                    await this.populateWithBooks();
                    this.triggerEvent('deletingBook')

                })
            }

        })

    }

    async addBook(root: HTMLFormElement) {


        if (root === null) {
            console.log("root element is null");
            return;
        } else {


            if (root.checkValidity()) {
                const name = document.getElementById('name') as HTMLInputElement;
                const surname = document.getElementById('surname') as HTMLInputElement;
                const title = document.getElementById('title') as HTMLInputElement;
                const pages = document.getElementById('pages') as HTMLInputElement;
                const completedPages = document.getElementById('completed_pages') as HTMLInputElement;
                const completed = document.getElementById('bookCompletion') as HTMLInputElement;
                const bookButton = document.getElementById('submit');

                if (pages < completedPages) {
                    const message: string = "You can't have more completed pages than actual number of book's pages"
                }

                if (name && surname && title && pages && completedPages && completed && bookButton) {
                    const dataBook: IBook = {
                        title: title.value,
                        author: {name: name.value, surname: surname.value},
                        pages: parseInt(pages.value),
                        completedPages: parseInt(completedPages.value),
                        completed: completed.checked,
                    }

                    const book = new Book(dataBook)
                    book.save().then(async () => {
                        console.log('saving xdxdxd...')
                        await this.populateWithBooks().then(() => {
                            this.triggerEvent('addingBook')
                        });
                    });


                }


            } else {
                console.log('Incorrect input values from form');
                return;
            }

        }
    }


    setEvent(key: string, func: () => {}) {
        return this.events.setEvent(key, func);

    }

    triggerEvent(funcName: string) {
        return this.events.triggerEvent(funcName);

    }

    showBooks(element: HTMLElement) {
        if (!element) {
            console.log('Root element is undefined');
            return;
        }
        element.innerHTML = ''





        if (this.books.length !== 0) {
            let progress = '';
            this.books.forEach((book: Book) => {

                if (book.getProperty('completed')) {
                    progress = 'Read';
                } else {
                    progress = 'On progress';
                }

                const author = book.getProperty('author');
                const div = document.createElement('div');
                div.classList.add(`book`);
                div.classList.add(`${book.getProperty("id")}`)
                3
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

        } else {
            if (this.books.length === 0 ) {
                element.innerHTML = '';
            }
        }


    }


    restoreToDefault():void {
        this.totalPages = 0
        this.booksAmount = 0
        this.completedPages = 0
        this.booksCompleted = 0

    }

}