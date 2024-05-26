import express from 'express';
import bodyParser from 'body-parser';
import { routerUser} from "./router/user/user.js";
import {createTable} from './router/user/userDb.js'
import { routerCamp } from './router/campaigns/camp.js';
import {createTableCamp} from './router/campaigns/campDb.js'
import { routerDonate } from './router/donations/donate.js';
import { createTableDonations } from './router/donations/donateDb.js';
import AuthenticateToken from './middlewares/autentication.js';
import {createTableComments} from './router/commentsCards/comments_CardsDb.js'
import {createTableInstituicao} from './router/instituicao/instituicaoDB.js'
import {routerComment} from './router/commentsCards/comments_cards.js'
import {routerInstituicao} from './router/instituicao/instituicao.js'

import {routerCommentHeroes} from './router/commentHeroes/commentHeroes.js'
import {createTableCommentsHeroes} from './router/commentHeroes/commentHeroesDB.js'

const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use(routerUser);
app.use(routerCamp);
app.use(routerDonate);
app.use(routerComment);
app.use(routerInstituicao);
app.use(routerCommentHeroes);

createTable()
createTableCamp()
createTableDonations()
createTableComments()
createTableInstituicao()
createTableCommentsHeroes()

// Rota protegida
app.get('/', AuthenticateToken, (req, res) => {
  res.json({ userId: req.userId, message: 'Perfil do usuário' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});