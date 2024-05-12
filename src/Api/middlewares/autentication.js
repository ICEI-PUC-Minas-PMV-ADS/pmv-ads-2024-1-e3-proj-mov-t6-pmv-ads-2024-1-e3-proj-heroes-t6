import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../router/user/user.js';

// Função para verificar e extrair o token JWT dos cabeçalhos de autorização
export default function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token JWT não fornecido' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token JWT inválido' });
      }
      req.userId = decoded.userId;
      next();
    });
  }