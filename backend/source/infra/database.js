import postgres from "postgres";
const database = postgres(process.env.DATABASE_URL, { ssl: "require" });

database.buildQuery = function (criteria, separator = "and") {
    const entries = Object.entries(criteria);

    if (!entries.length) {
        throw new Error("Critérios de busca vazios");
    }

    let where = null;

    for (const [key, value] of entries) {
        const condition = this`${this(key)} = ${value}`;

        where = where 
            ? this`${where} ${separator} ${condition}`
            : condition;
    }

    return where;
};

export { database };