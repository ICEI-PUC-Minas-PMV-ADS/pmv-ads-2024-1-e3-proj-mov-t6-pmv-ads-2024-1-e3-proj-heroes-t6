import express from 'express';
import { addComment, deleteComment, getComment, getAllComments, toggleEdit } from './comments_CardsDb.js';
import cors from 'cors';

const routerComment = express.Router();

// Rota - adicionar comentário
routerComment.post('/addComment', cors(), async (req, res) => {
    try {
        await addComment(req.body);
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar comentário.' });
    }
});

// Rota para atualizar comentário
routerComment.post('/updateComment', cors(), async (req, res) => {
    try {
        await toggleEdit(req.body);
        res.json('Comentário atualizado');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar comentário.' });
    }
});

// Rota para deletar comentário
routerComment.post('/deleteComment', cors(), async (req, res) => {
    try {
        await deleteComment(req.body);
        res.json('Comentário deletado');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar comentário.' });
    }
});

// Rota para puxar um comentário específico
routerComment.get('/getComment', cors(), async (req, res) => {
    try {
        const result = await getComment(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter comentário.' });
    }
});

// Rota para puxar todos os comentários
routerComment.get('/getAllComments', cors(), async (req, res) => {
    try {
        const result = await getAllComments();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar comentários.' });
    }
});

export { routerComment };
