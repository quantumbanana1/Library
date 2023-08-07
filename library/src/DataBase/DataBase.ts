import {Attributes} from "../Atributes/Atributes";


export class DataBase<T> {

    constructor(public url: string) {
    }


    async save(data: T) {
        if (data === undefined || data === null) {
            throw new Error("failed to save item")
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)

        }
        try {

            const response = await fetch(this.url, requestOptions);
            if (!response.ok) {
                console.log('Failed to upload an item to the database');

            }
            console.log("successfully saved to the database.");

        } catch (error) {
            console.error("Error while saving an item", error.message);


        }

    }

    async getAll() {

        try {
            const response = await fetch(this.url)
            if (!response.ok) {
                console.log("Connection failure");
                throw new Error("Failed to fetch items from the database.");
            }
            const items = await response.json().then((books) => {
                return books
            })
            return items;


        } catch (error) {
            console.error(error.message)
        }


    }

    async updateItem(id: number, newData: T) {
        const response = await fetch(this.url + `/${id}`);
        try {
            if (!response.ok) {
                throw new Error("Failure occurred while updating")

            }
            const requestOptions = {
                method: "PUT", // or "PATCH" depending on your API
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            };


            const item = response.json()
            console.log(`Successfully updated ${item}`)


        } catch (error) {
            console.error(error.message)

        }

    }


    async removeItem(id: number) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(this.url + `/${id}`, requestOptions);
        try {
            if (!response.ok) {
                console.log("failure")
                throw new Error("Failure occurred while deleting")

            }


            console.log(`Successfully deleted  item with id:${id}`)


        } catch (error: any) {
            console.error(error);

        }


    }

}