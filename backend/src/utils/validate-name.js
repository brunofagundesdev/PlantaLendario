function validateName(name) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    return regex.test(name.trim());

}

export {
    validateName
}