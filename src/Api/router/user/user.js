import express from 'express';
const routerUser = express.Router();
import jwt from 'jsonwebtoken';
import { createUser, loginUser, User, updateUser, deleteUser } from './userDb.js';
import cors from 'cors'; 

const SECRET_KEY = 'j8tqIstNhVNWQuDIM6640719fb2d16';

// Rota de cadastro
routerUser.post('/signup', (req, res) => {
  createUser(req.body)
  //deleteTable()
  res.json({'statuscode': 200})
});

// Rota de login
routerUser.post('/login', cors(), (req, res) => {
  loginUser(req.body)
  .then(result => {
    // Gerar token JWT
    if (result !== undefined){
      const token = jwt.sign({ userId: result.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {res.json('Email ou senha incorretos')}
  })
});

// Rota para puchar dados do usuário
routerUser.post('/user', cors(), (req, res) => {
  User(req.body)
  .then(result => {
      res.json(result);
  })
});

// Rota para ataualizar usuario
routerUser.post('/updateUser', cors(), (req, res) => {
  updateUser(req.body)
  res.json('result');
});

// Rota para deletar usuario
routerUser.post('/delUser', cors(), (req, res) => {
  deleteUser(req.body)
  res.json('result');
});


  export {routerUser, SECRET_KEY}