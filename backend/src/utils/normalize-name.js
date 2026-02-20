function normalizeName(name, { trim = true, accentuation = false, duplicatedSpaces = false, lowerCase = false } = {}) {

    if (trim) name = name.trim();
    if (!accentuation) name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!duplicatedSpaces) while (name.includes("  ")) name = name.replaceAll("  ", " ");
    if (lowerCase) name = name.toLowerCase(); 

    return name;

}

export {
    normalizeName
}