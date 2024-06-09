import express from 'express';
import axios from 'axios';
const routerUser = express.Router();
import jwt from 'jsonwebtoken';
import { createUser, loginUser, User, updateUser, deleteUser, updateUserRecovery } from './userDb.js';
import cors from 'cors'; 

const SECRET_KEY = 'j8tqIstNhVNWQuDIM6640719fb2d16';

// Rota de cadastro
routerUser.post('/signup', async  (req, res) => {
  const idUser = await createUser(req.body)
  
  if (idUser != 'Email já está registrado'){
    await axios.post('http://localhost:3000/users', {
      id: idUser,
      email: req.body.email,
      secretquestion: req.body.secretquestion
    })
  }
  res.json({'statuscode': 200, "Id do usuario": idUser})
});

routerUser.post('/recoverpassword', async  (req, res) => {
  const recover = await axios.get('http://localhost:3000/users')
  const userData = recover.data;
  const recoveryUser = req.body

  const userEmail = userData.length > 0 ? userData[0].email : 'Nenhum usuário encontrado';
  const userSecretQuestion = userData.length > 0 ? userData[0].secretquestion : 'Nenhum usuário encontrado';
  const userId = userData.length > 0 ? userData[0].id : 'Nenhum usuário encontrado';

  if(recoveryUser.email === userEmail && recoveryUser.secretquestion === userSecretQuestion) {
    updateUserRecovery(recoveryUser.password, userId)
    res.json( { message: 'Alteração feita com sucesso' } );
  }else {res.json( { message: 'Email ou palavra de recuperação incorretos' } );}

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