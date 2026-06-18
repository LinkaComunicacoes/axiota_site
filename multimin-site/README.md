# Axiōta Animal Health — Site Institucional

Site institucional da **Axiōta Animal Health**, marca guarda-chuva dos produtos **Multimin® 90** e **Lactipro®**.

---

## Estrutura do Projeto

```
multimin-site/
├── index.html               # Home — carrossel hero, produtos, cenários, CTA
├── sobre.html               # Sobre a Axiōta
├── multimin-90.html         # Página do produto Multimin® 90
├── lactipro.html            # Página do produto Lactipro®
├── casos-de-sucesso.html    # Casos de sucesso (Fribal, JBS, Barcelona FIV)
├── representantes.html      # Mapa SVG do Brasil com representantes por estado
├── contato.html             # Formulário de contato
├── css/
│   ├── global.css           # Estilos globais compartilhados
│   └── pages/               # CSS específico por página
├── fotos/                   # Imagens e assets visuais
└── README.md
```

---

## Stack Técnica

- **HTML5** puro, sem framework ou build step
- **Tailwind CSS** via CDN com configuração inline (`tailwind.config`)
- **Material Symbols Outlined** para ícones (via Google Fonts CDN)
- **Google Fonts** — Inter (body) + fonte display
- Sem dependências de npm, Webpack ou qualquer bundler

---

## Design System

### Cores principais

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#0c2965` | Azul navy — cor principal |
| `harvest-gold` | `#93CAFF` | Azul claro — destaque/accent |
| `clinical-white` | `#F8FAFB` | Fundo claro |
| `on-surface-variant` | `#4A5568` | Textos secundários |

### Tipografia

- **Body:** Inter (sans-serif)
- **Display/Títulos:** fonte display bold, `font-black` com `letter-spacing: -0.02em`

### Componentes recorrentes

- **Navbar** (`#navbar`): fixa, branca sobre o hero; vira azul navy com corte diagonal branco ao rolar além do hero
- **Hero carrossel** (`#hero`): 3 slides — banner full, Multimin® 90 (texto esq + produto dir), Lactipro® (texto esq + produto dir)
- **Cards de produto:** `rounded-2xl`, borda `outline-variant`, sombra leve
- **CTA final:** overlay `bg-primary/90` sobre imagem de fazenda
- **Footer:** fundo `bg-primary`, logo invertida, ícones sociais SVG inline
- **Botão WhatsApp:** fixo `bottom-6 right-6`, z-50

---

## Páginas

### `index.html` — Home
- **Carrossel hero** com 3 slides em track deslizante (`translateX`)
  - Slide 1: banner `banner produtos multimin 90 + lactipro.png`, texto à esquerda
  - Slide 2: fundo `#0c2965`, texto esq, imagem `produto multimin 90 sem fundo.png` à direita
  - Slide 3: fundo `#00304c`, texto esq, imagem `produto lacttipro.png` à direita
- Dots de navegação + avanço automático a cada 5s
- Seção **Portfólio** com cards dos dois produtos
- Seção **Cenários** com cards de Confinamento e Engorda / Leite e Genética
- CTA final com fundo `fazenda 1.jpeg`

### `sobre.html` — Sobre a Axiōta
- Hero com overlay `bg-primary/85` sobre `fazenda 1.jpeg`
- Descrição da empresa, stats (2+ produtos, sem antibióticos, Global)

### `multimin-90.html` — Multimin® 90
- Hero split: texto esq + imagem produto dir, fundo `bg-primary`
- Seções: Por que escolher · Como funciona (Zn/Cu/Mn/Se) · Tabela de dosagem · CTA

### `lactipro.html` — Lactipro®
- Mesma estrutura do Multimin® 90
- Seção Aplicação com 3 cards de cenário + caixa de aviso

### `casos-de-sucesso.html` — Casos de Sucesso
- 3 estudos: Fribal · JBS/Fazenda Conforto · Barcelona FIV da Badajós
- Destaque especial: "71,10 kg/dia — Recorde Mundial" (Barcelona)

### `representantes.html` — Representantes
- Mapa SVG inline do Brasil com estados ativos destacados
- Estados com representantes: MT, MS, GO, SP, AL
- Hover interativo via JS (`hoverState` / `unhoverState`)
- Sidebar com lista de representantes por região

---

## Assets (`fotos/`)

| Arquivo | Uso |
|---|---|
| `logo_axiota.png` | Logo principal + favicon |
| `banner produtos multimin 90 + lactipro.png` | Hero — slide 1 |
| `produto multimin 90 sem fundo.png` | Hero — slide 2, página Multimin® 90 |
| `produto lacttipro.png` | Hero — slide 3, página Lactipro® |
| `rebanho nelore 1.jpeg` | Card Confinamento e Engorda |
| `rebanho nelore 2.jpeg` | Card Leite e Genética |
| `fazenda 1.jpeg` | Hero de páginas internas + CTA |
| `minerais.jpeg` / `minerais 2.jpg` / `minerais 3.jpg` | Seção Como Funciona |

---

## Navbar — Comportamento de Scroll

```
Dentro do hero  →  fundo branco sólido
Além do hero    →  fundo azul navy (#0c2965) com painel branco diagonal à esquerda do logo
```

O painel branco usa `clip-path: polygon(0 0, 100% 0, calc(100% - 32px) 100%, 0 100%)` com `width: 360px`.

---

## Como rodar localmente

Basta abrir qualquer `.html` diretamente no navegador — não há build step.

Para evitar problemas de CORS com fontes/imagens em alguns browsers, use um servidor local simples:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Acesse `http://localhost:8080`.

---

## Contato / Redes

- Instagram · LinkedIn · YouTube — links no footer de cada página
- WhatsApp: botão flutuante em todas as páginas
