function normalizeName(name) {
    return name.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll("  ", " ");
}

export {
    normalizeName
}