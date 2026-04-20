import AppError from "../errors/app.error.js";

export default class CaseTransform {
    static camelToSnake(obj) {
        if (typeof obj !== "object") {
            return obj;
        }
        const newObj = {};
        for (const key in obj) {
            const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            newObj[snakeKey] = obj[key];
        }
        return newObj;
    }

    static snakeToCamel(obj) {
        if (typeof obj !== "object") {
            return obj;
        }
        const newObj = {};
        for (const key in obj) {
            const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            newObj[camelKey] = obj[key];
        }
        return newObj;
    }
    
    static snakeToCamelArray(array) {
        if (typeof array !== "array") {
            return array;
        }
        array.forEach((value, index, normalizedArray) => {
            normalizedArray[index] = this.snakeToCamel(array[index]);
        });
        return array;
    }
}