import express from 'express';
import { addInstituicao, deleteInstituicao, getInstituicao, getAllInstituicoes, updateInstituicao } from './instituicaoDB.js';
import cors from 'cors';

const routerInstituicao = express.Router();

// Rota - adicionar instituição
routerInstituicao.post('/addInstituicao', cors(), async (req, res) => {
    try {
        await addInstituicao(req.body);
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar instituição.' });
    }
});

// Rota para atualizar instituição
routerInstituicao.post('/updateInstituicao', cors(), async (req, res) => {
    try {
        await updateInstituicao(req.body);
        res.json('Instituição atualizada');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar instituição.' });
    }
});

// Rota para deletar instituição
routerInstituicao.post('/deleteInstituicao', cors(), async (req, res) => {
    try {
        await deleteInstituicao(req.body);
        res.json('Instituição deletada');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar instituição.' });
    }
});

// Rota para puxar uma instituição específica
routerInstituicao.get('/getInstituicao', cors(), async (req, res) => {
    try {
        const result = await getInstituicao(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter instituição.' });
    }
});

// Rota para puxar todas as instituições
routerInstituicao.get('/getAllInstituicoes', cors(), async (req, res) => {
    try {
        const result = await getAllInstituicoes();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar instituições.' });
    }
});

export { routerInstituicao };
