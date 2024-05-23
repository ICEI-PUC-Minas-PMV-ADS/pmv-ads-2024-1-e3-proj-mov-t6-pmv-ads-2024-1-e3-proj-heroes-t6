import express from 'express';
import {createDonations, getAllDonations} from './donateDb.js';
import cors from 'cors';

const routerDonate = express.Router();

// Rota - Criar Doações
routerDonate.post('/createDonations', cors(), (req, res) => {
  createDonations(req.body)
  res.json(req.body)
});

// Rota para puxar todas as Doações
routerDonate.get('/getAllDonations', cors(), async (req, res) => {
  const { campId } = req.query;  // Obtém o campId dos parâmetros da consulta
  console.log(`Received campId: ${campId}`);
  try {
      const totalDonations = await getAllDonations(campId);
      console.log(`Total donations to send: ${totalDonations}`); 
      res.json({ totalDonations });
  } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar doações.' });
  }
});

  export {routerDonate}
