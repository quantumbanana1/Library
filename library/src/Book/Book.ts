import {IAuthor, CreateAuthor} from "../Author/Author";
import {Attributes} from "../Atributes/Atributes";
import {DataBase} from "../DataBase/DataBase";


export interface IBook {
    title: string
    author: IAuthor
    pages: number
    completedPages: number
    completed: boolean
    id?: number

}


export class Book {
    public db: DataBase<IBook> = new DataBase<IBook>(
        "http://localhost:3000/books",
    )

    public dataBook: Attributes<IBook>

    constructor(dataBook: IBook) {
        this.dataBook = new Attributes<IBook>(dataBook);


    }


    get getStatusPercentage(): number {
        return (this.dataBook.date.completedPages / this.dataBook.date.pages) * 100
    }


    async remove() {
        if (this.dataBook.date.id) {
            return this.db.removeItem(this.dataBook.date.id);
        } else {
            console.log("id propriety is undefined");
        }


    }

    save() {
        return this.db.save(this.dataBook.date);
    }

    get getAllProperties() {
        return this.dataBook.getAllProperties
    }

    update<K extends keyof IBook>(key: K, date: IBook[K]) {
        return this.dataBook.update(key, date)
    }

    getProperty<K extends keyof IBook>(key: K)  {
        return this.dataBook.get(key);
    }

    put(id:number, date: IBook) {
        return this.db.updateItem(id, date)

    }


}