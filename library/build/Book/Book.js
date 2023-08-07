"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const Atributes_1 = require("../Atributes/Atributes");
const DataBase_1 = require("../DataBase/DataBase");
class Book {
    constructor(dataBook) {
        this.db = new DataBase_1.DataBase("http://localhost:3000/books");
        this.dataBook = new Atributes_1.Attributes(dataBook);
    }
    get getStatusPercentage() {
        return (this.dataBook.date.completedPages / this.dataBook.date.pages) * 100;
    }
    remove() {
        if (this.dataBook.date.id) {
            return this.db.removeItem(this.dataBook.date.id);
        }
        else {
            console.log("id propriety is undefined");
        }
    }
    save() {
        return this.db.save(this.dataBook.date);
    }
    get getAllProperties() {
        return this.dataBook.getAllProperties;
    }
    update(key, date) {
        return this.dataBook.update(key, date);
    }
    getProperty(key) {
        return this.dataBook.get(key);
    }
}
exports.Book = Book;
