interface IEventing {
    [key:string]: (()=>{})[],


}


export class Eventing {


    constructor(public events: IEventing = {}) {

    }

    setEvent(name: string, func: () => {}): void {
        console.log(this.events)
        if (this.events[name] === undefined) {
            this.events[name] = [func];
        }
        else {
            this.events[name].push(func);
            console.log('success ???3')
        }


    }

    triggerEvent(funcName:string) {
        console.log('ocochidz');
        const functions = this.events[funcName];
        for (let func of functions) {
            console.log(func);
        }



    }

}