import { Request, Response } from 'express';
import { emailService } from '../services/emailService.js';
import { ContactEmailPayload } from '../templates/emailTemplates.js';

export async function handleContactSubmission(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, message, phone, service } = req.body;

    // 1. Validações de Entrada
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({
        success: false,
        error: 'O nome é obrigatório e deve ter no mínimo 2 caracteres.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      res.status(400).json({
        success: false,
        error: 'Informe um endereço de e-mail válido.',
      });
      return;
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      res.status(400).json({
        success: false,
        error: 'A mensagem é obrigatória e deve ter no mínimo 5 caracteres.',
      });
      return;
    }

    // 2. Extração de Metadados
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Desconhecido';
    
    const payload: ContactEmailPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      phone: phone ? String(phone).trim() : undefined,
      service: service ? String(service).trim() : undefined,
      ip,
      timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    };

    // 3. Envio de E-mail
    const result = await emailService.sendContactEmail(payload);

    res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      data: {
        messageId: result.messageId,
        mode: result.mode,
        previewUrl: result.previewUrl,
      },
    });
  } catch (error: any) {
    console.error('[ContactController] Erro ao processar mensagem:', error);
    res.status(500).json({
      success: false,
      error: 'Ocorreu um erro interno ao enviar sua mensagem. Tente novamente mais tarde ou use o WhatsApp direto.',
    });
  }
}
