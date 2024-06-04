import { openDb } from "../../configDB.js";

export async function createTableCamp() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Camps (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, value NUMERIC NOT NULL, company TEXT NOT NULL, pix TEXT NOT NULL, userId INTEGER, FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE)');
    });
}

export async function createCamp(params) {
    try {
        await createTableCamp();
        const db = await openDb();
        await db.run(`INSERT INTO Camps (title, subtitle, description, value, company, pix, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`, params.title, params.subtitle, params.description, params.value, params.company, params.pix, params.userId);
        console.log('Campanha adicionada');
    } catch (error) {
        console.error('Error creating camp:', error);
    }
}

export async function updateCamp(params) {
    try {
        await createTableCamp();
        const db = await openDb();
        await db.run(`UPDATE Camps SET title = ?, subtitle = ?, description = ?, value = ?, company = ?, pix = ?, userId = ? WHERE id = ?`, params.title, params.subtitle, params.description, params.value, params.company, params.pix, params.userId, params.campid);
        console.log('Campanha atualizada');
    } catch (error) {
        console.error('Error updating camp:', error);
    }
}

export async function deleteCamp(params) {
    try {
        await createTableCamp();
        const db = await openDb();
        await db.run(`DELETE FROM Camps WHERE id = ?`, params.campid);
        console.log('Campanha deletada');
    } catch (error) {
        console.error('Error deleting camp:', error);
    }
}

export async function getCamp(params) {
    try {
        await createTableCamp();
        const db = await openDb();
        const result = await db.get(`SELECT title, subtitle, description, value, company, pix, userId FROM Camps WHERE id = ?`, params.campid);
        return result;
    } catch (error) {
        console.error('Error fetching camp:', error);
    }
}

export async function getAllCamp() {
    try {
        await createTableCamp();
        const db = await openDb();
        const result = await db.all(`SELECT * FROM Camps`);
        return result;
    } catch (error) {
        console.error('Error fetching camps:', error);
        throw error;
    }
}
