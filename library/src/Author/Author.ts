export interface IAuthor {
    name: string
    surname: string
}


export function CreateAuthor(name:string, surname:string): IAuthor {
    return {
        name:name,
        surname:surname
    }


}

// export class Author implements IAuthor {
//     name: string;
//     surname: string
//
//     constructor(name:string, surname:string) {
//         this.name = name;
//         this.surname = surname;
//     }
//
// }