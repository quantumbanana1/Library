"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attributes = void 0;
class Attributes {
    constructor(date) {
        this.date = date;
    }
    get getAllProperties() {
        return this.date;
    }
    get(propName) {
        return this.date[propName];
    }
    update(propName, date) {
        this.date[propName] = date;
        console.log(`updating  ${this.date[propName]}`);
    }
}
exports.Attributes = Attributes;
