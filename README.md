# Soul Blues Barbearia

Site institucional da **Soul Blues Barbearia**, no Setor Campinas, em Goiânia (GO). Apresenta os serviços, os planos de assinatura, o aplicativo de agendamento, a galeria de trabalhos e a localização, e leva o visitante a agendar pelo app ou pelo WhatsApp.

**Site no ar:** [soulbluesbarbearia.netlify.app](https://soulbluesbarbearia.netlify.app/)

## Tecnologias

- [React 19](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) para desenvolvimento e build
- [Tailwind CSS v4](https://tailwindcss.com/), com tokens de cor, tipografia e raio definidos em `src/index.css`
- [GSAP 3](https://gsap.com/) (ScrollTrigger, SplitText e Flip) para as animações
- [Lucide](https://lucide.dev/) para os ícones
- Fonte [Archivo](https://fonts.google.com/specimen/Archivo), via Google Fonts
- Hospedagem na [Netlify](https://www.netlify.com/)

## Funcionalidades

- **Página inicial** com as seções:
  - Hero
  - Experiência
  - Manifesto
  - Serviços (com abas por categoria)
  - Clube de assinatura
  - Aplicativo
  - Avaliações
  - Galeria
  - Localização
  - Chamadas para agendamento
- **Página de planos** (`/planos`) com:
  - cards por categoria
  - tabela comparativa de benefícios, em tabela no desktop e em lista no celular
  - glossário de termos
  - perguntas frequentes em acordeão
- **Agendamento** por uma janela com links para o app (iOS e Android) e para o WhatsApp. No celular, uma barra fixa com o botão "Agendar" aparece ao rolar a página.
- **Galeria** com filtros por categoria, reorganizados com animação, e visualizador em tela cheia que aceita navegação pelo teclado.
- **Animações:**
  - preloader
  - entrada do hero
  - títulos revelados linha a linha
  - cards e imagens que surgem ao rolar
  - parallax no desktop
  - botões magnéticos
  - contador animado de avaliações

  Todas são desativadas quando o sistema pede movimento reduzido.
- **Layout responsivo** de 390 px até telas ultrawide.
- **SEO:** metadados Open Graph e Twitter, e dados estruturados Schema.org (`HairSalon`) com endereço, horários e avaliações.

## Estrutura

```
├── index.html            # HTML base, metadados e dados estruturados
├── public/
│   ├── favicon.png
│   └── images/           # Fotos (ambiente, barba, cortes) e marca
└── src/
    ├── main.tsx          # Ponto de entrada
    ├── App.tsx           # Composição das seções e rota /planos
    ├── index.css         # Tema do Tailwind (cores, fontes, raios, sombras)
    ├── animations/       # Hooks e funções GSAP compartilhados
    ├── components/       # Uma seção ou peça de interface por arquivo
    ├── pages/            # PlansPage (/planos)
    ├── data/business.ts  # Conteúdo: contatos, horários, serviços, galeria, planos
    └── utils/            # Navegação entre rotas e classes de botão
```

Textos, telefones, horários, serviços, fotos da galeria e preços dos planos ficam em `src/data/business.ts`. Para mudar algum desses dados, edite esse arquivo.

## Como rodar localmente

**Pré-requisito:** Node.js 20.19 ou mais recente.

```bash
# 1. Clone o repositório
git clone https://github.com/mgluz1/soul-blues-barbearia.git
cd soul-blues-barbearia

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O site abre em [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando           | O que faz                                         |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento na porta 3000         |
| `npm run build`   | Gera a versão de produção em `dist/`              |
| `npm run preview` | Serve localmente o build gerado em `dist/`        |
| `npm run lint`    | Verifica os tipos com o TypeScript (`tsc --noEmit`) |

## Deploy

O `netlify.toml` já está configurado: a Netlify roda `npm run build` e publica a pasta `dist/`. Basta conectar o repositório a um site na Netlify.

## Contato da barbearia

- **Endereço:** Rua José Hermano, 1191, Setor Campinas, Goiânia (GO), CEP 74515-030
- **Telefone / WhatsApp:** (62) 99184-7578
- **Horários:**
  - Segunda a sexta: 9h às 19h30
  - Sábado: 9h às 17h
  - Domingo: fechado
- **Instagram:** [@soulbluesbarbearia](https://www.instagram.com/soulbluesbarbearia/)
