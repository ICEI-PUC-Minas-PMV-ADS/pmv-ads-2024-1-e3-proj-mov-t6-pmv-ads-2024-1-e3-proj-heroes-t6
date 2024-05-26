import { openDb } from "../../configDB.js";

export async function createTableCommentsHeroes() {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS CommentsHeroes(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, userId INTEGER, stars INTEGER, FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE)');
}

export async function addCommentHeroes(params) {
    try {
        await createTableCommentsHeroes();
        const db = await openDb();
        await db.run(`INSERT INTO CommentsHeroes (text, userId, stars) VALUES (?, ?, ?)`, [params.comment, params.userId, params.stars]);
        console.log('Comentário adicionado');
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }
}

export async function deleteCommentHeroes(params) {
    try {
        const db = await openDb();
        await db.run(`DELETE FROM CommentsHeroes WHERE id = ?`, params.id);
        console.log('Comentário deletado');
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
    }
}

export async function getCommentHeroes(params) {
    try {
        const db = await openDb();
        const result = await db.get(`SELECT text, userId, stars FROM CommentsHeroes WHERE id = ?`, params.id);
        return result;
    } catch (error) {
        console.error('Erro ao obter comentário:', error);
    }
}

export async function getAllCommentsHeroes() {
    try {
        const db = await openDb();
        const result = await db.all(`SELECT * FROM CommentsHeroes`);
        return result;
    } catch (error) {
        console.error('Erro ao obter todos os comentários:', error);
        throw error;
    }
}

export async function updateCommentHeroes(params) {
    try {
        const db = await openDb();
        await db.run(`UPDATE CommentsHeroes SET text = ?, stars = ? WHERE id = ?`, [params.comment, params.stars, params.id]);
        console.log('Comentário atualizado');
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
    }
}
