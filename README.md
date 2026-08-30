<div align="center">

# STRUCX · Structural Systems
### Plataforma de Engenharia Estrutural de Alta Performance & Modelagem Computacional

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP-007ACC?style=for-the-badge&logo=mail.ru&logoColor=white)](https://nodemailer.com/)
[![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

<br />

**Engenharia de precisão para megaestruturas, infraestrutura pesada e geometrias complexas.**  
Soluções estruturais racionais com modelagem não-linear, simulação FEA acelerada por GPU e backend de mensagens com telemetria e envio de e-mails em tempo real.

[Visão Geral](#-visão-geral) • [Recursos Técnicos](#-recursos-técnicos--arquitetura) • [Serviço de E-mail (Backend)](#-serviço-de-e-mail--api-backend) • [Instalação](#-instalação-e-execução-local) • [Contato](#-desenvolvedor)

</div>

---

## 🏗️ Visão Geral

A **StrucX** é uma aplicação web completa (Frontend + Backend) voltada para construtoras, incorporadoras e escritórios de engenharia que demandam cálculos estruturais de alta complexidade. 

O projeto combina uma estética editorial inspirada em estúdios internacionais de arquitetura (*Heatherwick Studio* e *Thornton Tomasetti*) com um sistema avançado de animação 3D acelerado por GPU e uma API de mensageria com envio automatizado de e-mails e persistência à prova de falhas.

---

## ⚡ Recursos Técnicos & Arquitetura

### 1. Motor de Sequência 3D com Rolagem Interativa (*Canvas Image Sequence*)
- **Zero Latência de Decodificação:** Em vez de usar a tag `<video>` convencional (que sofre gargalos de seek na CPU), a animação do capacete 3D utiliza `<canvas>` 2D acelerado por hardware.
- **Ultra-Densidade de Quadros (240 FPS):** Sequência de **1.155 frames** transparentes em WebP de alta fidelidade (`frame_0001.webp` até `frame_1155.webp`).
- **Física de Inércia Contínua (LERP):** Loop desacoplado em `requestAnimationFrame` com interpolação linear elástica (`current += diff * 0.065`), sincronizado via **GSAP ScrollTrigger**.
- **Cobertura Responsiva Full-Bleed:** Enquadramento proporcional inteligente que preenche 100% da viewport em qualquer proporção de tela (desktop, tablet e mobile).

### 2. Carrossel Horizontal Pinado no Centro com GSAP
- **Fixação no Centro Vertical (`start: 'center center'`):** A seção de serviços congela suavemente no meio exato da viewport.
- **Timeline de 3 Fases com Buffer de Entrada:**
  1. *Buffer de Entrada:* Pausa estática para absorção visual do título e dos primeiros cards sem trancos.
  2. *Translação Horizontal Orgânica:* Deslocamento lateral com aceleração e desaceleração suave (`power1.inOut`, `scrub: 1.2`).
  3. *Buffer de Saída:* Assentamento final antes de liberar a rolagem vertical da página.
- **Otimização na GPU:** Camada de composição forçada com `transform: translate3d(0, 0, 0)`, `will-change: transform` e eliminação de *layout/paint thrashing*.

### 3. Design System & Superfícies de Vidro Fosco (*Glassmorphism*)
- **Header & Footer Translúcidos:** Superfícies uniformes com `backdrop-blur-lg`, bordas refinadas e sombras sutis consistentes em todas as rotas.
- **Identidade Tipográfica Rigorosa:** Tipografia geométrica `Montserrat Alternates` e `Montserrat` para títulos combinada com `Roboto Condensed` para métricas e tags técnicas.

---

## 📩 Serviço de E-mail & API Backend

O backend Node.js / Express oferece um pipeline completo para recepção de leads e propostas técnicas:

- **Envio Duplo Transacional via Nodemailer:**
  1. *Notificação Imediata para o Engenheiro (`ADMIN_EMAIL`):* Contendo nome, e-mail, telefone, serviço de interesse, mensagem, data/hora e IP.
  2. *Confirmação Automática para o Cliente:* E-mail institucional de confirmação com link direto para o WhatsApp da equipe.
- **Proteção Anti-Spam (Rate Limiting):** Proteção com `express-rate-limit` limitando envios excessivos por IP.
- **Garantia de Zero Perda de Dados (Backup Local Automático):** Todo lead recebido é auditado e gravado como arquivo `.json` em `backend/leads/`, garantindo que nenhuma mensagem seja perdida mesmo em oscilações do provedor SMTP.
- **Suporte Multi-Provedor:** Compatível com Gmail App Passwords, Resend, SendGrid, Amazon SES, Mailgun ou qualquer servidor SMTP padrão.

---

## 📁 Estrutura do Projeto

```text
strucx/
├── frontend/
│   ├── public/
│   │   ├── frames/             # 1.155 quadros WebP da animação 3D (240 FPS)
│   │   ├── icons/              # Vetores SVG e ativos
│   │   └── strucx-icon.svg     # Logotipo oficial
│   ├── src/
│   │   ├── components/         # Componentes React (Hero, Scroller 3D, Serviços Pinned, Layout, Navbar, Footer)
│   │   ├── pages/              # Rotas da aplicação (Home, Soluções, Projetos, Tech, Sobre, Contato)
│   │   └── index.css           # Configurações de tipografia e Tailwind CSS
│   ├── package.json
│   └── vite.config.ts          # Configuração Vite com proxy para /api
├── backend/
│   ├── src/
│   │   ├── controllers/        # Controladores de rotas e validação de leads
│   │   ├── routes/             # Definição de endpoints com Rate Limiting
│   │   ├── services/           # Serviço de e-mail (Nodemailer + Persistência)
│   │   ├── templates/          # Templates responsivos HTML para admin e cliente
│   │   └── server.ts           # Inicialização do servidor Express
│   ├── leads/                  # Armazenamento auditado de leads em JSON
│   ├── .env.example            # Variáveis de ambiente e SMTP
│   └── package.json
└── README.md                   # Documentação oficial
```

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- **Node.js:** Versão 18.0 ou superior
- **npm** ou **pnpm** / **yarn**

### 1. Clonar o Repositório
```bash
git clone https://github.com/murilofsouzaa/strucx.git
cd strucx
```

### 2. Configurar e Executar o Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
*O servidor backend iniciará em `http://localhost:3001`.*

### 3. Configurar e Executar o Frontend
```bash
cd ../frontend
npm install
npm run dev
```
*Acesse a aplicação em `http://localhost:5173`.*

---

## 👤 Desenvolvedor

<div align="left">

**Murilo Souza** — Engenharia Front-end & Soluções Web Interativas

- **Email:** [onemurilo@gmail.com](mailto:onemurilo@gmail.com)
- **WhatsApp:** [(33) 99902-6628](https://wa.me/5533999026628)
- **GitHub:** [@murilofsouzaa](https://github.com/murilofsouzaa)
- **LinkedIn:** [linkedin.com/in/murilofsouzaa](https://www.linkedin.com/in/murilofsouzaa)

</div>

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para obter mais informações.
