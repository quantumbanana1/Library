"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eventing = void 0;
class Eventing {
    constructor(events = {}) {
        this.events = events;
    }
    setEvent(name, func) {
        console.log(this.events);
        if (this.events[name] === undefined) {
            this.events[name] = [func];
        }
        else {
            this.events[name].push(func);
            console.log('success ???3');
        }
    }
    triggerEvent(funcName) {
        console.log('ocochidz');
        const functions = this.events[funcName];
        for (let func of functions) {
            console.log(func);
        }
    }
}
exports.Eventing = Eventing;
