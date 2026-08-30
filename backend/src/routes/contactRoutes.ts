import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { handleContactSubmission } from '../controllers/contactController.js';

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limite de 10 requisições por IP a cada 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Muitas mensagens enviadas a partir deste IP. Por favor, aguarde alguns minutos antes de tentar novamente.',
  },
});

export const contactRouter = Router();

contactRouter.post('/', contactLimiter, handleContactSubmission);
