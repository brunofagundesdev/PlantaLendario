function validateName(name, { testNumber = true } = {}) {
    if (typeof name !== 'string') return false;

    name = name.trim();

    let isValid = true;
    if (testNumber) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
        isValid = regex.test(name);
    }

    return isValid;

}

export {
    validateName
}