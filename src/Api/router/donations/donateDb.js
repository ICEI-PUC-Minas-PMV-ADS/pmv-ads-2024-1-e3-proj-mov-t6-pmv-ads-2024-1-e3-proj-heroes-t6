import { openDb } from "../../configDB.js";

export async function createTableDonations() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Donations (id INTEGER PRIMARY KEY AUTOINCREMENT, campId INTEGER NOT NULL, userId INTEGER NOT NULL, name TEXT NOT NULL, donate NUMERIC NOT NULL)');
    });
}

export async function createDonations(params) {
    try {
        await createTableDonations();
        const db = await openDb();
        await db.run(`INSERT INTO Donations (campId, userId, name, donate) VALUES (?, ?, ?, ?)`, params.campid, params.userid, params.name, params.donate);
        console.log('Doação adicionada');
    } catch (error) {
        console.error('Error creating donation:', error);
    }
}

export async function getAllDonations(campId) {
    try {
        const db = await openDb();
        console.log(`Fetching donations for campId: ${campId}`);
        const result = await db.get(`SELECT SUM(donate) as totalDonations FROM Donations WHERE campId = CAST(? AS TEXT)`, [campId]);
        console.log(`Query result: ${JSON.stringify(result)}`);
        return result.totalDonations || 0;
    } catch (error) {
        console.error('Error fetching donations:', error);
        throw error;
    }
}
