function validateSerial(num) {
    num = Number(num);
    return Number.isInteger(num) && num > 0;
}

export {
    validateSerial
}