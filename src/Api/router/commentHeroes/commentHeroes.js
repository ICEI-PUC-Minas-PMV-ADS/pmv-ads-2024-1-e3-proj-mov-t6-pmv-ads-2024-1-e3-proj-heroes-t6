import express from 'express';
import { addCommentHeroes, deleteCommentHeroes, getCommentHeroes, getAllCommentsHeroes, updateCommentHeroes } from './commentHeroesDB.js';
import cors from 'cors';

const routerCommentHeroes = express.Router();

// Rota - adicionar comentário
routerCommentHeroes.post('/addCommentHeroes', cors(), async (req, res) => {
    try {
        await addCommentHeroes(req.body);
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar comentário em hero.' });
    }
});

// Rota para atualizar comentário
routerCommentHeroes.post('/updateCommentHeroes', cors(), async (req, res) => {
    try {
        await updateCommentHeroes(req.body);
        res.json('Comentário atualizado em heroes');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar comentário em hero.' });
    }
});

// Rota para deletar comentário
routerCommentHeroes.post('/deleteCommentHeroes', cors(), async (req, res) => {
    try {
        await deleteCommentHeroes(req.body);
        res.json('Comentário deletado em heroes');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar comentário em heroes.' });
    }
});

// Rota para puxar um comentário específico
routerCommentHeroes.get('/getCommentHeroes', cors(), async (req, res) => {
    try {
        const result = await getCommentHeroes(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter comentário em hero.' });
    }
});

// Rota para puxar todos os comentários
routerCommentHeroes.get('/getAllCommentsHeroes', cors(), async (req, res) => {
    try {
        const result = await getAllCommentsHeroes();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar comentários em hero.' });
    }
});

export { routerCommentHeroes };
