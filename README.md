<div align="center">

# STRUCX · Structural Systems
### Plataforma de Engenharia Estrutural de Alta Performance & Modelagem Computacional

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
[![GitHub_Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

<br />

**Engenharia de precisão para megaestruturas, infraestrutura pesada e geometrias complexas.**  
Soluções estruturais racionais com modelagem não-linear, simulação FEA acelerada por GPU e backend de mensagens com telemetria e envio de e-mails em tempo real.

[Visão Geral](#visao-geral) • [Recursos Técnicos](#recursos-tecnicos--arquitetura) • [Docker & Nginx](#docker--nginx) • [CI/CD](#cicd--github-actions) • [Instalação](#instalacao-e-execucao-local) • [Contato](#desenvolvedor)

</div>

---

## Visão Geral

A **StrucX** é uma aplicação web completa (Frontend e Backend) voltada para construtoras, incorporadoras e escritórios de engenharia que demandam cálculos estruturais de alta complexidade. 

O projeto combina uma estética editorial inspirada em estúdios internacionais de arquitetura (como Heatherwick Studio e Thornton Tomasetti) com um sistema avançado de animação 3D acelerado por GPU e uma API de mensageria com envio automatizado de e-mails e persistência à prova de falhas.

---

## Recursos Técnicos & Arquitetura

### 1. Motor de Sequência 3D com Rolagem Interativa (Canvas Image Sequence)
- **Zero Latência de Decodificação:** Em vez de usar a tag de vídeo convencional (sujeita a atrasos de seek na CPU), a animação do capacete 3D utiliza elemento Canvas 2D acelerado por hardware.
- **Ultra-Densidade de Quadros:** Sequência de 1.155 frames transparentes em WebP de alta fidelidade (`frame_0001.webp` até `frame_1155.webp`).
- **Física de Inércia Contínua (LERP):** Loop desacoplado em `requestAnimationFrame` com interpolação linear elástica, sincronizado via GSAP ScrollTrigger.
- **Cobertura Responsiva Full-Bleed:** Enquadramento proporcional que preenche a viewport em qualquer proporção de tela (desktop, tablet e mobile).

### 2. Carrossel Horizontal Pinado no Centro com GSAP
- **Fixação no Centro Vertical (`start: 'center center'`):** A seção de serviços congela suavemente no meio da viewport.
- **Timeline de 3 Fases com Buffer de Entrada:**
  1. *Buffer de Entrada:* Pausa estática para absorção visual do título e dos primeiros cards sem trancos.
  2. *Translação Horizontal Orgânica:* Deslocamento lateral com aceleração e desaceleração gradual.
  3. *Buffer de Saída:* Assentamento final antes de liberar a rolagem vertical da página.
- **Otimização na GPU:** Camada de composição com `transform: translate3d(0, 0, 0)`, `will-change: transform` e eliminação de gargalos de repintura de tela.

### 3. Design System & Superfícies de Vidro Fosco (Glassmorphism)
- **Header e Footer Translúcidos:** Superfícies uniformes com `backdrop-blur-lg`, bordas refinadas e sombras sutis consistentes em todas as rotas.
- **Identidade Tipográfica:** Tipografia geométrica Montserrat Alternates e Montserrat para títulos combinada com Roboto Condensed para métricas e especificações técnicas.

---

## Docker & Nginx

O projeto conta com conteinerização completa em múltiplos estágios (*Multi-Stage Builds*) para máxima performance e segurança em produção:

- **Frontend Container (Nginx Alpine):**
  - Servidor web otimizado servindo os arquivos estáticos compilados da SPA.
  - Compressão Gzip ativada para HTML, CSS, JavaScript e SVG.
  - Headers de cache de longo prazo (`Cache-Control: immutable, max-age=31536000`) para bundles e frames WebP.
  - Proxy reverso automático encaminhando requisições `/api/` para o container do backend.
  - Cabeçalhos de segurança (*X-Frame-Options*, *X-Content-Type-Options*, *Referrer-Policy*).
- **Backend Container (Node.js Alpine):**
  - Ambiente de execução leve com usuário não-root (*strucxuser*).
  - Volume persistente mapeado para `/app/leads` garantindo integridade dos dados.
- **Orquestração com Docker Compose:**
  - Inicialização conjunta de frontend e backend em rede isolada bridge.

```bash
# Inicializar todos os serviços em produção
docker compose up -d --build
```

---

## CI/CD · GitHub Actions

O fluxo de integração e entrega contínua está configurado em `.github/workflows/ci-cd.yml`:

1. **Validação do Frontend:** Checagem de tipagem TypeScript e compilação do bundle de produção com Vite.
2. **Validação do Backend:** Checagem de tipagem e compilação do servidor TypeScript.
3. **Build & Verificação Docker:** Construção automatizada das imagens de container para garantir integridade antes do deploy.

---

## Estrutura do Projeto

```text
strucx/
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # Pipeline de CI/CD para GitHub Actions
├── frontend/
│   ├── public/
│   │   ├── frames/             # 1.155 quadros WebP da animação 3D
│   │   ├── icons/              # Vetores SVG e ativos
│   │   ├── videos/             # Clipes de simulação em alta resolução
│   │   └── strucx-icon.svg     # Logotipo oficial
│   ├── src/
│   │   ├── components/         # Componentes React (Hero, Scroller 3D, Serviços Pinned, Vídeo, Layout)
│   │   ├── pages/              # Rotas da aplicação (Home, Soluções, Projetos, Tech, Sobre, Contato)
│   │   └── index.css           # Configurações de tipografia e Tailwind CSS
│   ├── nginx.conf              # Configuração Nginx com Proxy /api e Caching
│   ├── Dockerfile              # Multi-Stage Build do Frontend
│   └── vite.config.ts          # Configuração Vite com proxy
├── backend/
│   ├── src/
│   │   ├── controllers/        # Controladores de rotas e validação de leads
│   │   ├── routes/             # Endpoints com Rate Limiting
│   │   ├── services/           # Serviço de e-mail (Nodemailer + Persistência)
│   │   ├── templates/          # Templates responsivos HTML
│   │   └── server.ts           # Inicialização do servidor Express
│   ├── Dockerfile              # Multi-Stage Build do Backend
│   ├── leads/                  # Armazenamento auditado de leads em JSON
│   └── .env.example            # Variáveis de ambiente e SMTP
├── docker-compose.yml          # Orquestração de containers para produção
└── README.md                   # Documentação oficial
```

---

## Instalação e Execução Local

### Pré-requisitos
- Node.js
- Docker e Docker Compose (para execução em container)
- npm, pnpm ou yarn

### Execução via Docker Compose (Recomendado)
```bash
git clone https://github.com/murilofsouzaa/strucx.git
cd strucx
docker compose up -d --build
```
*Acesse em `http://localhost`.*

### Execução Manual / Desenvolvimento

1. **Configurar e Executar o Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
   *Backend disponível em `http://localhost:3001`.*

2. **Configurar e Executar o Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   *Frontend disponível em `http://localhost:5173`.*

---

## Desenvolvedor

<div align="left">

**Murilo Souza** — Engenharia Front-end & Soluções Web Interativas

- **Email:** [onemurilo@gmail.com](mailto:onemurilo@gmail.com)
- **WhatsApp:** [(33) 99902-6628](https://wa.me/5533999026628)
- **GitHub:** [@murilofsouzaa](https://github.com/murilofsouzaa)
- **LinkedIn:** [linkedin.com/in/murilofsouzaa](https://www.linkedin.com/in/murilofsouzaa)

</div>

---

## Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para obter mais informações.
