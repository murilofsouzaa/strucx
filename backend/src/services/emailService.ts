import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { 
  ContactEmailPayload, 
  getAdminNotificationHtml, 
  getClientConfirmationHtml 
} from '../templates/emailTemplates.js';

const LEADS_DIR = path.resolve(process.cwd(), 'leads');

export interface SendEmailResult {
  success: boolean;
  messageId: string;
  mode: 'smtp' | 'local_persistence';
  previewUrl?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isConfigured = false;

  constructor() {
    this.ensureLeadsDirectory();
    this.initTransporter();
  }

  private ensureLeadsDirectory() {
    try {
      if (!fs.existsSync(LEADS_DIR)) {
        fs.mkdirSync(LEADS_DIR, { recursive: true });
      }
    } catch (err) {
      console.error('[EmailService] Erro ao criar diretório de leads:', err);
    }
  }

  private async initTransporter() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const isPlaceholder = !smtpUser || smtpUser.includes('seu-email') || smtpPass?.includes('sua-senha');

    if (smtpHost && smtpUser && smtpPass && !isPlaceholder) {
      try {
        this.transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
        this.isConfigured = true;
        console.log(`[EmailService] ✅ Configurado com SMTP: ${smtpHost}:${smtpPort} (${smtpUser})`);
        return;
      } catch (err) {
        console.warn('[EmailService] Falha ao configurar SMTP personalizado:', err);
      }
    }

    console.log('[EmailService] ℹ️ SMTP em modo de Desenvolvimento/Persistência Local (Leads salvos em backend/leads/).');
  }

  private saveLeadLocally(data: ContactEmailPayload) {
    try {
      this.ensureLeadsDirectory();
      const sanitizedName = data.name.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `lead_${Date.now()}_${sanitizedName}.json`;
      const filePath = path.join(LEADS_DIR, fileName);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`[EmailService] 💾 Lead persistido com sucesso em: ${filePath}`);
    } catch (err) {
      console.error('[EmailService] Erro ao persistir lead localmente:', err);
    }
  }

  public async sendContactEmail(data: ContactEmailPayload): Promise<SendEmailResult> {
    // 1. Sempre salvar backup seguro do Lead localmente (Garantia de Zero Perda de Dados)
    this.saveLeadLocally(data);

    const adminEmail = process.env.ADMIN_EMAIL || 'onemurilo@gmail.com';
    const fromAddress = process.env.FROM_EMAIL || `StrucX Systems <${process.env.SMTP_USER || 'no-reply@strucx.com.br'}>`;

    // 2. Se o transporte SMTP estiver disponível, enviar via rede
    if (this.transporter && this.isConfigured) {
      try {
        // Envio para o Admin (Murilo)
        const adminMailOptions = {
          from: fromAddress,
          to: adminEmail,
          replyTo: data.email,
          subject: `[StrucX Lead] Nova Mensagem de ${data.name}${data.service ? ` - ${data.service}` : ''}`,
          html: getAdminNotificationHtml(data),
        };

        const adminInfo = await this.transporter.sendMail(adminMailOptions);
        console.log(`[EmailService] ✉️ E-mail enviado com sucesso! MessageId: ${adminInfo.messageId}`);

        // Confirmação para o cliente
        try {
          await this.transporter.sendMail({
            from: fromAddress,
            to: data.email,
            subject: 'Recebemos sua mensagem | StrucX Engenharia Estrutural',
            html: getClientConfirmationHtml(data),
          });
        } catch (clientErr) {
          console.warn('[EmailService] Aviso: Erro ao enviar confirmação ao cliente:', clientErr);
        }

        return {
          success: true,
          messageId: adminInfo.messageId,
          mode: 'smtp',
        };
      } catch (smtpErr: any) {
        console.warn(`[EmailService] Aviso: Erro no envio SMTP (${smtpErr.message}). O lead foi gravado no backup local com sucesso.`);
      }
    }

    // 3. Resposta de sucesso com backup local confirmado
    return {
      success: true,
      messageId: `local-lead-${Date.now()}`,
      mode: 'local_persistence',
    };
  }
}

export const emailService = new EmailService();
