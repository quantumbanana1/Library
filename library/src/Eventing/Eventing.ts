interface IEventing {
    [key:string]: (()=>{})[],


}


export class Eventing {


    constructor(public events: IEventing = {}) {

    }

    setEvent(name: string, func: () =>{}): void {
        console.log(this.events)
        if (!this.events[name]) {
            this.events[name] = [func];
            console.log('yey')
        }
        else {
            this.events[name].push(func);
            console.log(`${name} event function  is properly set.`)
        }


    }

    triggerEvent(funcName:string) {


        const functions = this.events[funcName];
        console.log(functions);

        if (functions) {
            for (let func of functions) {
                func();
            }

        } else {
            console.log('Function is undefined in even compount Library.');
        }



    }

}