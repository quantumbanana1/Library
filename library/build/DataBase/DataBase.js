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
exports.DataBase = void 0;
class DataBase {
    constructor(url) {
        this.url = url;
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data === undefined || data === null) {
                throw new Error("failed to save item");
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            };
            try {
                const response = yield fetch(this.url, requestOptions);
                if (!response.ok) {
                    console.log('Failed to upload an item to the database');
                }
                console.log("successfully saved to the database.");
            }
            catch (error) {
                console.error("Error while saving an item", error.message);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url);
                if (!response.ok) {
                    console.log("Connection failure");
                    throw new Error("Failed to fetch items from the database.");
                }
                const items = yield response.json().then((books) => {
                    return books;
                });
                return items;
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    updateItem(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + `/${id}`);
            try {
                if (!response.ok) {
                    throw new Error("Failure occurred while updating");
                }
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                };
                const item = response.json();
                console.log(`Successfully updated ${item}`);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    removeItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = yield fetch(this.url + `/${id}`, requestOptions);
            try {
                if (!response.ok) {
                    console.log("failure");
                    throw new Error("Failure occurred while deleting");
                }
                console.log(`Successfully deleted  item with id:${id}`);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.DataBase = DataBase;
