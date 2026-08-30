export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  timestamp?: string;
  ip?: string;
}

export function getAdminNotificationHtml(data: ContactEmailPayload): string {
  const formattedDate = data.timestamp || new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 24px; border-bottom: 3px solid #0284c7; }
    .brand { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .brand span { color: #0284c7; }
    .tagline { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .content { padding: 32px 24px; }
    .title { font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    .info-table td.label { font-weight: 600; color: #64748b; width: 30%; text-transform: uppercase; font-size: 11px; }
    .info-table td.value { font-weight: 500; color: #0f172a; }
    .message-box { background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 4px; margin-top: 8px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .footer { background: #f8fafc; padding: 16px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">MURILO SOUZA · <span>WEB DEV</span></div>
      <div class="tagline">Novo Pedido de Orçamento de Site / Projeto Web</div>
    </div>
    <div class="content">
      <h2 class="title">Novo Contato para Criação de Site</h2>
      <table class="info-table">
        <tr>
          <td class="label">Cliente / Nome:</td>
          <td class="value"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td class="label">E-mail:</td>
          <td class="value"><a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a></td>
        </tr>
        ${data.phone ? `
        <tr>
          <td class="label">WhatsApp:</td>
          <td class="value"><a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="color: #25D366; text-decoration: none;">${data.phone}</a></td>
        </tr>` : ''}
        <tr>
          <td class="label">Data/Hora:</td>
          <td class="value">${formattedDate}</td>
        </tr>
      </table>

      <div style="font-weight: 600; font-size: 12px; text-transform: uppercase; color: #64748b; margin-top: 16px;">Sobre o Site / Demanda:</div>
      <div class="message-box">${data.message}</div>
    </div>
    <div class="footer">
      Murilo Souza · Desenvolvimento Web & Interfaces de Alta Performance · <a href="mailto:onemurilo@gmail.com" style="color: #0284c7; text-decoration: none;">onemurilo@gmail.com</a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function getClientConfirmationHtml(data: ContactEmailPayload): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 28px 24px; border-bottom: 3px solid #0284c7; text-align: center; }
    .brand { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .brand span { color: #0284c7; }
    .content { padding: 36px 28px; }
    .title { font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px; }
    .paragraph { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 16px; }
    .cta-box { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px; padding: 18px; margin: 24px 0; text-align: center; }
    .cta-title { font-size: 13px; font-weight: 700; color: #0369a1; text-transform: uppercase; margin-bottom: 6px; }
    .btn-wa { display: inline-block; background: #25D366; color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 10px 20px; border-radius: 4px; text-decoration: none; margin-top: 8px; }
    .footer { background: #f8fafc; padding: 20px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">MURILO SOUZA · <span>WEB DEV</span></div>
      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">Desenvolvimento Web & Criação de Sites</div>
    </div>
    <div class="content">
      <h2 class="title">Olá, ${data.name}!</h2>
      <p class="paragraph">
        Confirmamos o recebimento da sua mensagem para criação de site e projetos digitais.
      </p>
      <p class="paragraph">
        Estou revisando as especificações enviadas e entrarei em contato no endereço <strong>${data.email}</strong> com a proposta técnica e de prazos em até 24 horas úteis.
      </p>

      <div class="cta-box">
        <div class="cta-title">Quer conversar agora mesmo?</div>
        <p style="font-size: 12px; color: #0284c7; margin: 0 0 10px 0;">Você também pode falar diretamente pelo WhatsApp para alinharmos ideias rapidamente.</p>
        <a href="https://wa.me/5533999026628?text=Ol%C3%A1!%20Enviei%20uma%20mensagem%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto." class="btn-wa">Abrir Conversa no WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      Murilo Souza · Frontend Engineer & Web Development · Todos os direitos reservados.
    </div>
  </div>
</body>
</html>
  `.trim();
}
