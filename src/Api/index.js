import express from 'express';
import bodyParser from 'body-parser';
import { routerUser} from "./router/user/user.js";
import {createTable} from './router/user/userDb.js'
import { routerCamp } from './router/campaigns/camp.js';
import {createTableCamp} from './router/campaigns/campDb.js'
import { routerDonate } from './router/donations/donate.js';
import { createTableDonations } from './router/donations/donateDb.js';
import AuthenticateToken from './middlewares/autentication.js';

const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use(routerUser);
app.use(routerCamp);
app.use(routerDonate);

createTable()
createTableCamp()
createTableDonations()

// Rota protegida
app.get('/', AuthenticateToken, (req, res) => {
  res.json({ userId: req.userId, message: 'Perfil do usuário' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
