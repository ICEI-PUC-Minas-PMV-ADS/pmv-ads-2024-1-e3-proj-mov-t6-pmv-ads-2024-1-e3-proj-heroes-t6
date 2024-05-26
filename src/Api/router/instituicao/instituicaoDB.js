import { openDb } from "../../configDB.js";

export async function createTableInstituicao() {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Instituicoes(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)');
}

export async function addInstituicao(params) {
    try {
        await createTableInstituicao();
        const db = await openDb();
        await db.run(`INSERT INTO Instituicoes (name, description) VALUES (?, ?)`, params.name, params.description);
        console.log('Instituição adicionada');
    } catch (error) {
        console.error('Erro ao adicionar instituição:', error);
    }
}

export async function deleteInstituicao(params) {
    try {
        const db = await openDb();
        await db.run(`DELETE FROM Instituicoes WHERE id = ?`, params.id);
        console.log('Instituição deletada');
    } catch (error) {
        console.error('Erro ao deletar instituição:', error);
    }
}

export async function getInstituicao(params) {
    try {
        const db = await openDb();
        const result = await db.get(`SELECT name, description FROM Instituicoes WHERE id = ?`, params.id);
        return result;
    } catch (error) {
        console.error('Erro ao obter instituição:', error);
    }
}

export async function getAllInstituicoes() {
    try {
        const db = await openDb();
        const result = await db.all(`SELECT * FROM Instituicoes`);
        return result;
    } catch (error) {
        console.error('Erro ao obter todas as instituições:', error);
        throw error;
    }
}

export async function updateInstituicao(params) {
    try {
        const db = await openDb();
        await db.run(`UPDATE Instituicoes SET name = ?, description = ? WHERE id = ?`, params.name, params.description, params.id);
        console.log('Instituição atualizada');
    } catch (error) {
        console.error('Erro ao atualizar instituição:', error);
    }
}
