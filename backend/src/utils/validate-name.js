function validateName(name) {
    if (typeof name !== 'string') {
        return false;
    }
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    return regex.test(name.trim());

}

export {
    validateName
}