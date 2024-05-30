import { openDb } from "../../configDB.js";

export async function createTableComments() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT,
            userId INTEGER,
            userName TEXT,
            institutionId INTEGER,
            FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
        )
    `);
}

export async function addColumnInstitutionId() {
    const db = await openDb();
    try {
        await db.exec(`ALTER TABLE Comments ADD COLUMN institutionId INTEGER`);
    } catch (error) {
        if (error.message.includes("duplicate column name: institutionId")) {
            console.log("Coluna 'institutionId' já existe.");
        } else {
            console.error('Erro ao adicionar coluna institutionId:', error);
        }
    }
}

export async function addComment(params) {
    try {
        await createTableComments();
        await addColumnInstitutionId();
        const db = await openDb();
        await db.run(`INSERT INTO Comments (text, userId, userName, institutionId) VALUES (?, ?, ?, ?)`, 
            params.comment, params.userId, params.userName, params.institutionId);
        console.log('Comentário adicionado');
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }
}

export async function deleteComment(params) {
    try {
        const db = await openDb();
        await db.run(`DELETE FROM Comments WHERE id = ?`, params.id);
        console.log('Comentário deletado');
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
    }
}

export async function getComment(params) {
    try {
        const db = await openDb();
        const result = await db.get(`SELECT text, userId, userName, institutionId FROM Comments WHERE id = ?`, params.id);
        return result;
    } catch (error) {
        console.error('Erro ao obter comentário:', error);
    }
}

export async function getAllComments() {
    try {
        const db = await openDb();
        const result = await db.all(`SELECT * FROM Comments`);
        return result;
    } catch (error) {
        console.error('Erro ao obter todos os comentários:', error);
        throw error;
    }
}

export async function getCommentsByInstitution(institutionId) {
    try {
        const db = await openDb();
        const result = await db.all(`SELECT * FROM Comments WHERE institutionId = ?`, institutionId);
        console.log('Comentários para a instituição:', result);
        return result;
    } catch (error) {
        console.error('Erro ao obter comentários por instituição:', error);
        throw error;
    }
}

export async function toggleEdit(params) {
    try {
        const db = await openDb();
        await db.run(`UPDATE Comments SET text = ? WHERE id = ?`, params.comment, params.id);
        console.log('Comentário atualizado');
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
    }
}
