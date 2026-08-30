<div align="center">

# STRUCX · Structural Systems
### Plataforma de Engenharia Estrutural de Alta Performance & Modelagem Computacional

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-240FPS_WebP-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)](https://ffmpeg.org/)

<br />

**Engenharia de precisão para megaestruturas, infraestrutura pesada e geometrias complexas.**  
Soluções estruturais racionais com modelagem não-linear, simulação FEA acelerada por GPU e coordenação BIM 5D.

[Explorar Demonstração](#-visão-geral) • [Recursos Técnicos](#-recursos-técnicos--arquitetura) • [Instalação](#-instalação-e-execução-local) • [Contato](#-desenvolvedor)

</div>

---

## 🏗️ Visão Geral

A **StrucX** é uma aplicação web institucional e técnica voltada para construtoras, incorporadoras e escritórios de engenharia que demandam cálculos estruturais de alta complexidade. 

O projeto combina uma estética editorial inspirada em grandes estúdios internacionais de arquitetura (como *Heatherwick Studio* e *Thornton Tomasetti*) com um sistema avançado de animação interativa impulsionado por GPU.

---

## ⚡ Recursos Técnicos & Arquitetura

### 1. Motor de Sequência 3D com Rolagem Interativa (*Canvas Image Sequence*)
- **Zero Latência de Decodificação:** Em vez de usar a tag `<video>` convencional (que sofre gargalos severos de seek na CPU/GPU), a animação do capacete 3D utiliza um elemento `<canvas>` 2D acelerado por hardware.
- **Ultra-Densidade de Quadros (240 FPS):** Sequência de **1.155 frames** transparentes em WebP de alta fidelidade (`frame_0001.webp` até `frame_1155.webp`).
- **Física de Inércia Contínua (LERP):** Loop desacoplado em `requestAnimationFrame` com interpolação linear elástica (`current += diff * 0.065`), sincronizado via **GSAP ScrollTrigger**.
- **Cobertura Responsiva Full-Bleed:** Enquadramento proporcional inteligente que preenche 100% da viewport em qualquer proporção de tela (desktop, tablet e mobile).

### 2. Carrossel Horizontal Pinado com GSAP ScrollTrigger
- **Fixação no Centro Vertical (`start: 'center center'`):** A seção de serviços congela suavemente no meio da viewport.
- **Timeline de 3 Fases com Buffer de Entrada:**
  1. *Buffer de Entrada:* Pausa estática para absorção visual do título e dos primeiros cards sem trancos.
  2. *Translação Horizontal Orgânica:* Deslocamento lateral com aceleração e desaceleração suave (`power1.inOut`, `scrub: 1.2`).
  3. *Buffer de Saída:* Assentamento final antes de liberar a rolagem vertical da página.
- **Otimização 60/120 FPS na GPU:** Camada de composição forçada com `transform: translate3d(0, 0, 0)`, `will-change: transform` e eliminação de *layout/paint thrashing*.

### 3. Design System & Superfícies de Vidro Fosco (*Glassmorphism*)
- **Header & Footer Translúcidos:** Superfícies uniformes com `backdrop-blur-lg`, bordas refinadas e sombras sutis consistentes em todas as rotas ([`/`](#), [`/solucoes`](#), [`/projetos`](#), [`/tecnologia`](#), [`/sobre`](#), [`/contato`](#)).
- **Identidade Tipográfica Rigorosa:** Tipografia geométrica `Montserrat Alternates` e `Montserrat` para títulos combinada com `Roboto Condensed` para métricas e tags técnicas.
- **Portfólio Editorial Clean:** Apresentação de obras com imagens limpas em proporção 4:3, metadados consolidados em uma linha (`Localização · Ano · Categoria`) e ausência de ruídos visuais sobre as fotos.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/) (Build ultrarrápido com Hot Module Replacement)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações & Scroll:** [GSAP 3](https://greensock.com/gsap/) + [ScrollTrigger Plugin](https://greensock.com/scrolltrigger/) & [Framer Motion](https://www.framer.com/motion/)
- **Roteamento:** [React Router DOM v7](https://reactrouter.com/)
- **Ícones:** [Phosphor Icons](https://phosphoricons.com/)

### Processamento de Mídia & Otimização
- **FFmpeg:** Extração de quadros em 240 FPS, remoção de fundo e compressão leve em WebP com alpha channel.

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
│   │   ├── assets/             # Imagens e ilustrações
│   │   ├── components/
│   │   │   ├── home/           # Componentes da Homepage (Hero, Scroller 3D, Serviços Pinned, CTA)
│   │   │   └── layout/         # Layout global, Navbar Glass, Footer Glass, WhatsApp Button
│   │   ├── data/               # Mock datasets de serviços, projetos e métricas
│   │   ├── pages/              # Rotas da aplicação (Home, Soluções, Projetos, Tech, Sobre, Contato)
│   │   ├── index.css           # Configurações de tipografia e base do Tailwind CSS
│   │   └── main.tsx            # Ponto de entrada React
│   ├── package.json
│   └── vite.config.ts
├── backend/                    # Scaffolding de serviços de backend
├── video/                      # Vídeos fonte originais em alta resolução
└── README.md                   # Documentação técnica do repositório
```

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- **Node.js:** Versão 18.0 ou superior
- **npm** ou **yarn** / **pnpm**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/murilofsouzaa/strucx.git
   cd strucx/frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação em [http://localhost:5173](http://localhost:5173).

4. **Gerar Build de Produção:**
   ```bash
   npm run build
   ```

5. **Visualizar o Build de Produção Localmente:**
   ```bash
   npm run preview
   ```

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

<div align="center">
  <sub>Desenvolvido com excelência técnica para projetos de engenharia estrutural.</sub>
</div>
