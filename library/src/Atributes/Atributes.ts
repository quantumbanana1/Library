export class Attributes<T> {


    constructor(public date: T) {
    }

    get getAllProperties(): T {
        return this.date;
    }

    get(propName: keyof T): T[keyof T] {
        return this.date[propName];

    }

    update<K extends keyof T>(propName: K, date: T[K]): void {
        this.date[propName] = date;
        console.log(`updating  ${this.date[propName]}`)
    }


}