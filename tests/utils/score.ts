import connection from "../../src/database";

async function vote () {
    await connection.query('UPDATE songs SET score = 15 WHERE id = 1')
    await connection.query('UPDATE songs SET score = 40 WHERE id = 2')
    await connection.query('UPDATE songs SET score = 25 WHERE id = 3')
}

export { vote }