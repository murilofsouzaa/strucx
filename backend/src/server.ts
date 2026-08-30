import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { contactRouter } from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares Globais
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rota de Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'StrucX Backend Services',
    timestamp: new Date().toISOString(),
  });
});

// Rotas de Contato e E-mail
app.use('/api/contact', contactRouter);

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 StrucX Backend iniciado com sucesso!`);
  console.log(`📡 Porta: http://localhost:${PORT}`);
  console.log(`📩 Rota de Contato: POST http://localhost:${PORT}/api/contact`);
  console.log(`🩺 Health Check: GET http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
