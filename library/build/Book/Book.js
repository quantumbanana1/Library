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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataBook.date.id) {
                return this.db.removeItem(this.dataBook.date.id);
            }
            else {
                console.log("id propriety is undefined");
            }
        });
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
    put(id, date) {
        return this.db.updateItem(id, date);
    }
}
exports.Book = Book;
