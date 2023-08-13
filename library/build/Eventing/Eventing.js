"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eventing = void 0;
class Eventing {
    constructor(events = {}) {
        this.events = events;
    }
    setEvent(name, func) {
        console.log(this.events);
        if (!this.events[name]) {
            this.events[name] = [func];
            console.log('yey');
        }
        else {
            this.events[name].push(func);
            console.log(`${name} event function  is properly set.`);
        }
    }
    triggerEvent(funcName) {
        const functions = this.events[funcName];
        console.log(functions);
        if (functions) {
            for (let func of functions) {
                func();
            }
        }
        else {
            console.log('Function is undefined in even compount Library.');
        }
    }
}
exports.Eventing = Eventing;
