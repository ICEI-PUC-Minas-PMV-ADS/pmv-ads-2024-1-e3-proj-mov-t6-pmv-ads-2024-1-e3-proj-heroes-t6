import { openDb } from "../../configDB.js";

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)');
    });
}

export async function createUser(params) {
    try {
        await createTable();
        const db = await openDb();
        await db.run(`INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`, params.name, params.email, params.password);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export async function deleteUser(params) {
    try {
        const db = await openDb();
        await db.run(`DELETE FROM Users WHERE id = ?`, params.userid);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export async function loginUser(params) {
    try {
        await createTable();
        const db = await openDb();
        let result = await db.get(`SELECT id, email, password FROM Users WHERE email=? AND password=?`, params.email, params.password);
        if (result !== undefined) {
            return result
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
}


export async function updateUser(params) {
    try {
        const db = await openDb();
        if (params.password === ''){
            await db.run(`UPDATE Users SET name = ?, email = ? WHERE id = ?`, params.name, params.email, params.userid);
        } else {
            await db.run(`UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?`, params.name, params.email, params.password, params.userid);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export async function User(params) {
    try {
        const db = await openDb();
        let result = await db.get(`SELECT name, email, password FROM Users WHERE id=?`, params.userid);
        return result
    } catch (error) {
        console.error('Error creating user:', error);
    }
}
