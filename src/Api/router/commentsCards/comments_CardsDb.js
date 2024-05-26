import { openDb } from "../../configDB.js";

export async function createTableComments() {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Comments(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE)');
}

export async function addComment(params) {
    try {
        await createTableComments();
        const db = await openDb();
        await db.run(`INSERT INTO Comments (text, userId) VALUES (?, ?)`, params.comment, params.userId);
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
        const result = await db.get(`SELECT text, userId FROM Comments WHERE id = ?`, params.id);
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

export async function toggleEdit(params) {
    try {
        const db = await openDb();
        await db.run(`UPDATE Comments SET text = ? WHERE id = ?`, params.comment, params.id);
        console.log('Comentário atualizado');
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
    }
}
