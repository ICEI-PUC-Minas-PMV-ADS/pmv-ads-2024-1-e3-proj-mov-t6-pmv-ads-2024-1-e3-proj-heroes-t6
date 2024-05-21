import express from 'express';
import {createCamp, updateCamp, deleteCamp, getCamp, getAllCamp} from './campDb.js';
import cors from 'cors';

const routerCamp = express.Router();

// Rota - criar campanha
routerCamp.post('/createCamp', cors(), (req, res) => {
  createCamp(req.body)
  res.json(req.body)
});

// Rota para ataualizar campanha
routerCamp.post('/updateCamp', cors(), (req, res) => {
  updateCamp(req.body)
  res.json('result');
});

// Rota para deletar campanha
routerCamp.post('/deleteCamp', cors(), (req, res) => {
  deleteCamp(req.body)
  res.json('result');
});

// Rota para puxar dados das campanhas
routerCamp.get('/getCamp', cors(), (req, res) => {
  getCamp(req.body)
  .then(result => {
      res.json(result);
  })
});

// Rota para puxar todos os dados das campanhas

routerCamp.get('/getAllCamp', cors(), async (req, res) => {
  try {
      const result = await getAllCamp();
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar campanhas.' });
  }
});

  export {routerCamp}