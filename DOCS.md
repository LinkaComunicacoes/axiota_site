# Documentação Técnica — Axiōta Animal Health Site

> Última atualização: 2026-06-25  
> Stack: HTML5 + Tailwind CSS CDN + Vanilla JS puro (sem build step)

---

## Índice

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Estrutura de Arquivos](#2-estrutura-de-arquivos)
3. [Design System](#3-design-system)
4. [JavaScript — Módulos e Responsabilidades](#4-javascript--módulos-e-responsabilidades)
5. [CSS — Camadas e Convenções](#5-css--camadas-e-convenções)
6. [Sistema de Responsividade](#6-sistema-de-responsividade)
7. [Componentes Reutilizáveis](#7-componentes-reutilizáveis)
8. [Páginas e Seções](#8-páginas-e-seções)
9. [Assets — Imagens e Vídeos](#9-assets--imagens-e-vídeos)
10. [Performance](#10-performance)
11. [Guia de Manutenção](#11-guia-de-manutenção)
12. [Armadilhas Conhecidas](#12-armadilhas-conhecidas)

---

## 1. Visão Geral da Arquitetura

O projeto é um **site estático multi-página** (MPA) sem etapa de build, sem bundler e sem framework. Toda a lógica reside em Vanilla JS e os estilos utilitários são gerados em tempo de execução pelo Tailwind CSS CDN.

```
Browser
  ├── Tailwind CDN (JIT runtime — gera CSS a partir das classes no DOM)
  ├── Google Fonts (Hanken Grotesk, Inter, JetBrains Mono)
  ├── Material Symbols Outlined
  ├── css/global.css  ← estilos customizados globais
  ├── css/pages/*.css ← overrides por página
  └── js/*.js         ← lógica vanilla (IIFEs independentes)
```

### Decisões de Arquitetura

| Decisão | Razão |
|---|---|
| Sem build step | Simplicidade de deploy; qualquer servidor estático funciona |
| Tailwind CDN | Evita configuração de toolchain; suficiente para sites de conteúdo |
| IIFE para cada módulo JS | Evita poluição do escopo global; cada arquivo é autocontido |
| `components.js` injeta nav/footer | Reutilização sem SSI ou template engine |
| CSS por página em `css/pages/` | Isola overrides, evita colisão de seletores |

> **Atenção:** O Tailwind CDN escaneia o DOM em runtime. Classes geradas programaticamente via JS (string concatenation) **não são detectadas** — devem existir como strings literais no HTML ou ser adicionadas via `style` inline.

---

## 2. Estrutura de Arquivos

```
axiotasite/
├── index.html                  ← Página principal (carrossel hero)
├── multimin-90.html            ← Produto Multimin® 90
├── lactipro.html               ← Produto Lactipro®
├── sobre.html
├── casos-de-sucesso.html
├── representantes.html
├── contato.html
├── orcamento.html
├── microminerais.html
├── momentos-que-importam.html
├── stress-oxidativo.html
├── testemunhos.html
├── trabalhos-tecnicos.html
├── informacoes-tecnicas.html
├── avisos-legais.html
├── politica-de-privacidade.html
├── politica-de-cookies.html
│
├── js/
│   ├── config.js       ← tailwind.config (deve carregar ANTES do CDN)
│   ├── device.js       ← window.DeviceType (breakpoint detection)
│   ├── components.js   ← injeta navbar, footer, FAB WhatsApp
│   ├── carousel.js     ← hero carousel (só index.html)
│   ├── animations.js   ← scroll-reveal via IntersectionObserver
│   └── navbar.js       ← arquivo vazio (compatibilidade retroativa)
│
├── css/
│   ├── global.css          ← estilos globais, keyframes, utilitários
│   └── pages/
│       ├── index.css       ← hero carousel + glass-panel
│       ├── multimin-90.css ← overrides da página do produto
│       ├── lactipro.css    ← (quase vazio — extensões futuras aqui)
│       └── *.css           ← demais páginas
│
├── fotos/                  ← todas as imagens do site
├── videos/                 ← vídeos MP4 locais
├── data/
│   └── representantes.json ← dados dos representantes (lidos por JS)
│
├── ajustes/                ← pasta de trabalho (NÃO é servida em prod)
└── multimin-site/          ← cópia legada (NÃO está em uso ativo)
```

### Ordem de carregamento dos scripts (todas as páginas)

```html
<!-- HEAD — bloqueantes, ordem importa -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script src="js/config.js"></script>  <!-- define tailwind.config antes do 1º scan -->

<!-- FIM DO BODY — não bloqueantes -->
<script src="js/device.js"></script>      <!-- 1º: detecta dispositivo -->
<script src="js/components.js"></script>  <!-- 2º: injeta nav/footer (usa DeviceType) -->
<script src="js/carousel.js"></script>    <!-- só em index.html (usa DeviceType) -->
<script src="js/animations.js" defer></script>  <!-- por último, com defer -->
```

> **Invariante crítica:** `config.js` **deve** vir imediatamente após o CDN do Tailwind. Se trocar a ordem, `tailwind.config` não existe quando o Tailwind escaneia o DOM e as cores/fontes customizadas são perdidas.

---

## 3. Design System

### Paleta de Cores

Definida em `js/config.js` como extensão do Tailwind. Use sempre as classes utilitárias — nunca valores hex diretamente no CSS de componentes.

| Token | Classe Tailwind | Hex | Uso |
|---|---|---|---|
| Primary | `text-primary` / `bg-primary` | `#0c2965` | Navy — cor dominante |
| Primary container | `bg-primary-container` | `#28407c` | Fundo de cards escuros |
| Background | `bg-background` | `#f8f9ff` | Fundo da página |
| Surface container low | `bg-surface-container-low` | `#eff4ff` | Cards e painéis |
| Surface container | `bg-surface-container` | `#e5eeff` | Cards elevados |
| On surface variant | `text-on-surface-variant` | `#444650` | Textos secundários |
| Outline variant | `border-outline-variant` | `#c5c6d1` | Bordas sutis |
| Harvest Gold (accent) | `text-harvest-gold` | `#93CAFF` | Destaques, labels |
| Scientific Blue | `bg-scientific-blue` | `#28407C` | Hover primário |

> **Nota:** O token `harvest-gold` foi nomeado antes da paleta ser ajustada para azul — o valor real é azul claro `#93CAFF`, não dourado. Manter o nome por compatibilidade.

### Tipografia

| Família | Variável Tailwind | Pesos disponíveis | Uso |
|---|---|---|---|
| Hanken Grotesk | `font-display` / `font-headline` | 400–900 | Títulos, CTAs |
| Inter | `font-body` | 400–600 | Corpo de texto |
| JetBrains Mono | `font-mono` | 400–500 | Labels, badges, counters |

**Escala tipográfica customizada:**

```
display-xl  → 64px / lh 72px / fw 800
display-lg  → 48px / lh 56px / fw 700
headline-lg → 32px / lh 40px / fw 600
headline-md → 24px / lh 32px / fw 500
body-lg     → 18px / lh 28px / fw 400
body-md     → 16px / lh 24px / fw 400  ← padrão do body
label-sm    → 12px / lh 16px / fw 500
button      → 14px / lh 20px / fw 600
```

### Breakpoints

Herdados do Tailwind default (não customizados):

| Prefixo | Viewport | Contexto |
|---|---|---|
| *(sem prefixo)* | 0px+ | Mobile first |
| `md:` | 768px+ | Tablet/Desktop |
| `lg:` | 1024px+ | Desktop largo |

`window.DeviceType` (em `device.js`) usa os mesmos valores: `< 768` = mobile, `768–1023` = tablet, `>= 1024` = desktop.

---

## 4. JavaScript — Módulos e Responsabilidades

### `js/config.js` — Configuração do Tailwind

**Responsabilidade única:** Definir `tailwind.config` antes do CDN escanear o DOM.

Não contém lógica. Não deve ser modificado sem revisar o impacto em **todas as 17 páginas**. Alterar uma cor aqui muda o site inteiro.

```js
// Padrão para adicionar nova cor:
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "nova-cor": "#xxxxxx",  // adicione aqui
      }
    }
  }
}
```

---

### `js/device.js` — Detecção de Dispositivo

Expõe `window.DeviceType` com três propriedades e um sistema de callbacks.

```js
// API pública:
window.DeviceType.isMobile    // boolean
window.DeviceType.isTablet    // boolean
window.DeviceType.isDesktop   // boolean
window.DeviceType.onChange(callback)  // dispara só ao mudar de tipo

// Classes no <body> sincronizadas automaticamente:
// .is-mobile | .is-tablet | .is-desktop
```

**Como funciona:** Ouve `resize` com `{ passive: true }`. Compara o tipo anterior com o atual — só chama os callbacks se o tipo realmente mudou (não a cada pixel). Isso evita rebuilds desnecessários do carrossel.

---

### `js/components.js` — Navbar, Footer e WhatsApp FAB

Injeta HTML completo em `#site-nav` e `#site-footer`. Toda alteração de design da navbar e do footer é feita **aqui** — propaga para todas as páginas automaticamente.

**Estrutura da navbar split (após scroll além do hero):**

```
<nav #navbar>
  <div #nav-bg-split>          ← container do efeito diagonal
    <div fundo navy>           ← lado esquerdo (logo)
    <div #nav-split-white>     ← lado direito (links) com clip-path
  </div>
  <div #nav-inner>
    <a logo>
    <div #nav-center-links>    ← visível só ≥768px
    <div botões direita>
      <a #nav-rep-btn>         ← "Representantes" — visível só ≥768px
      <button #hamburger>      ← visível só <768px
  </div>
</nav>
```

**Como o split diagonal é calculado:**
```js
// Em updateSplitClip():
var cutX = logoRect.left + logoRect.width * 1.4;
// clipPath: polygon(0 0, cutX+20px 0, cutX 100%, 0 100%)
// O "+20px" cria a inclinação da diagonal
```

Para **ajustar a largura do painel navy** (lado do logo), altere o multiplicador `1.4`.  
Para **ajustar o ângulo da diagonal**, altere `SKEW_PX = 20`.

**Menu mobile:**
- Drawer `#mobile-menu`: `width: 272px`, `transform: translateX(100%)` → `translateX(0)`
- Overlay `#menu-overlay`: `z-index: 199`, navbar é `z-index: 50`
- Ambos só existem em `<768px` (controlado por media query Tailwind `md:hidden`)

**Para alterar links da navbar:**
1. Função `navLink(href, label)` — links desktop
2. Função `mobileNavLink(href, label)` — links mobile (drawer)
3. Dropdown "Produtos": HTML inline no template literal `NAV_HTML`

---

### `js/carousel.js` — Hero Carousel (apenas `index.html`)

Array `SLIDES` define os 3 slides:
```js
var SLIDES = [
  { image: "fotos/...", imageMobile: "fotos/...", label: "...", title: "...", body: "..." },
  // ...
];
```

**Para adicionar/remover um slide:** edite o array `SLIDES`. O carrossel se adapta automaticamente ao `SLIDES.length`.

**Dois layouts distintos construídos por JS:**

| Layout | Condição | Estrutura |
|---|---|---|
| Desktop | `!isMobile` | `position: absolute` com `background-image: cover` + texto sobreposto |
| Mobile | `isMobile` | `flex-direction: column` — bloco texto navy acima + `<img>` abaixo |

**Ciclo de vida:**
1. `initCarousel()` — constrói o DOM do carrossel
2. `render(0, true)` — renderiza o primeiro slide sem animação
3. `startTimer()` — dispara `goTo()` a cada `DURATION = 5500ms`
4. `window.DeviceType.onChange()` — chama `initCarousel()` novamente se o tipo mudar (ex: rotacionar tablet)

**Barra de progresso:** usa `requestAnimationFrame` duplo para garantir que a transição CSS dispare após o reset de `width: 0%`.

---

### `js/animations.js` — Scroll Reveal

Observa todos os `[data-reveal]`. Quando 5% do elemento entra na viewport (com 120px de antecipação), adiciona `.is-visible`.

**Atributos disponíveis:**
```html
data-reveal           → fade up (padrão)
data-reveal="left"    → slide da esquerda
data-reveal="right"   → slide da direita
data-reveal="scale"   → zoom in
data-delay="200"      → delay em ms (padrão: índice × 80ms)
```

**CSS correspondente em `global.css`:**
```css
[data-reveal]          { opacity: 0; transform: translateY(24px); }
[data-reveal="left"]   { transform: translateX(-24px); opacity: 0; }
[data-reveal="right"]  { transform: translateX(24px);  opacity: 0; }
[data-reveal="scale"]  { transform: scale(0.95);       opacity: 0; }
[data-reveal].is-visible { opacity: 1; transform: none; }
```

**Para ajustar quando os elementos aparecem:** altere `rootMargin` em `animations.js`.  
- Valor positivo → antecipa (aparece antes de entrar na tela)  
- Valor negativo → atrasa (só aparece quando já está visível)

---

## 5. CSS — Camadas e Convenções

### Hierarquia de especificidade (mais fraco → mais forte)

```
1. Tailwind utilitários (gerados pelo CDN)
2. css/global.css (componentes globais customizados)
3. css/pages/*.css (overrides por página)
4. Inline styles (style="...") — usado em animações JS e valores dinâmicos
```

> Inline styles são usados intencionalmente no JS para valores calculados dinamicamente (clip-path, posição do carrossel). Para valores estáticos, **prefira classes Tailwind**.

### Animações globais (`global.css`)

| Keyframe | Uso |
|---|---|
| `ticker` | Marquee do ticker de notícias |
| `float` | Ícones flutuantes decorativos |
| `shimmer` | Botão com gradiente animado |
| `pulse-ring` | Anel pulsante decorativo |

### Hero produto — responsividade mobile

Páginas `multimin-90.html` e `lactipro.html` usam a classe `.hero-product` para o layout mobile empilhado. Implementado em `global.css`:

```
Desktop: section position:relative, imagem como background-image cover
Mobile:  section flex-column
           order 1: .hero-product-content (texto, fundo #0c2965)
           order 2: .hero-product-bg (imagem, background-size: 220% auto, right center)
```

**Para ajustar o zoom da imagem no mobile:** altere `background-size: 220% auto` em `.hero-product-bg` dentro do `@media (max-width: 767px)`.

---

## 6. Sistema de Responsividade

### Estratégia geral

- **Mobile-first:** o CSS base cobre mobile; modificadores `md:` e `lg:` adicionam estilos para telas maiores
- **Breakpoint principal:** `768px` (prefixo `md:`)
- **Tailwind classes** controlam layout, espaçamento e visibilidade
- **JS `DeviceType`** controla comportamentos que não podem ser feitos só com CSS (rebuild do carrossel, exibição de elementos calculados)

### Pontos de ajuste responsivo por componente

| Componente | Arquivo | Como ajustar |
|---|---|---|
| Hero carousel desktop | `css/pages/index.css` | `#hero { height: 78vh }` |
| Hero carousel mobile | `css/pages/index.css` | `#hero-mobile-imgwrap { height: calc(54svh - 4rem) }` |
| Hero produto mobile | `css/global.css` | `.hero-product-bg { background-size: 220% auto }` |
| Grid de vídeos | `multimin-90.html` | Classe `grid md:grid-cols-2` |
| Navbar split | `js/components.js` | `SKEW_PX = 20`, multiplicador `1.4` |
| Menu mobile largura | `js/components.js` | `width: 272px` no template `#mobile-menu` |

---

## 7. Componentes Reutilizáveis

### Card padrão com hover lift
```html
<div class="card-lift bg-surface-container-low p-8 rounded-2xl border border-outline-variant">
  <!-- conteúdo -->
</div>
```
CSS em `global.css`: `translateY(-5px)` + sombra no hover.

### Badge / Label monospace
```html
<span class="inline-block text-xs font-mono uppercase tracking-widest text-primary/50 mb-4">
  Texto do Label
</span>
```

### Seção com título padronizado
```html
<section class="py-20 md:py-28 px-5 md:px-16 bg-white" data-reveal>
  <div class="max-w-[1280px] mx-auto">
    <div class="mb-12 text-center">
      <span class="inline-block text-xs font-mono uppercase tracking-widest text-primary/50 mb-4">Label</span>
      <h2 class="font-display text-3xl md:text-4xl font-black text-primary">Título</h2>
      <div class="mt-3 w-16 h-1 bg-primary rounded-full mx-auto"></div>
    </div>
    <!-- conteúdo -->
  </div>
</section>
```

### Vídeo responsivo 16:9
```html
<div class="relative rounded-2xl overflow-hidden" style="padding-bottom:56.25%;">
  <video
    src="videos/arquivo.mp4"
    controls
    preload="none"
    style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;">
  </video>
</div>
```
O truque `padding-bottom: 56.25%` (= 9/16 × 100%) cria o container 16:9 responsivo. O vídeo é posicionado absolutamente dentro.

### CTA Final (padrão entre páginas)
```html
<section class="relative overflow-hidden py-24 px-5 md:px-16 text-center">
  <div class="absolute inset-0 bg-cover bg-center" style="background-image:url('fotos/banner de fazenda.jpg');"></div>
  <div class="absolute inset-0 bg-primary/90"></div>
  <div class="relative z-10 max-w-3xl mx-auto" data-reveal>
    <!-- título + CTA button -->
  </div>
</section>
```

---

## 8. Páginas e Seções

### `index.html` — Página principal

| Seção | Seletor/ID | Notas |
|---|---|---|
| Hero carousel | `#hero` → `#hero-carousel` | Construído 100% por `carousel.js` |
| Ticker | `.ticker-wrap` | Marquee CSS, conteúdo hardcoded no HTML |
| Produtos | `section` (cards) | Links para multimin-90.html e lactipro.html |
| Momentos | `section` (grid 3) | Links para páginas internas |
| Casos de sucesso preview | `section` | Link para casos-de-sucesso.html |
| CTA Final | `section` | Background `banner de fazenda.jpg` |

### `multimin-90.html` — Produto Multimin® 90

Ordem das seções:
1. **Hero** — `.hero-product` com `banner-4-novo.png`
2. **Benefícios** — grid 3 cards (navy bg)
3. **Como funciona** — 4 minerais (Zn, Cu, Mn, Se) com chips coloridos
4. **Quando os microminerais mais importam** — grid de cenários
5. **Dosagem e Administração** — protocolo prático
6. **Segurança** — caixa amber com avisos legais
7. **Vídeos** — grid 2×2 com 4 MP4 locais
8. **Referências** — 17 referências bibliográficas
9. **CTA Final**

### `lactipro.html` — Produto Lactipro®

Ordem das seções:
1. **Hero** — `.hero-product` com `banner-5-novo.png`
2. **Benefícios** — grid 3 cards (navy bg)
3. **Como funciona** — passos numerados (01, 02, 03)
4. **Vídeo** — seção única com `videos/lactipro.mp4`
5. **Aplicação** — Dosagem e Administração
6. **Referências** — referências bibliográficas
7. **CTA Final**

### Páginas secundárias (padrão comum)

Todas seguem o mesmo template de `<head>`. Scripts carregados no fim do body:
```html
<script src="js/device.js"></script>
<script src="js/components.js"></script>
<script src="js/animations.js" defer></script>
```
Nenhuma inclui `carousel.js` (exclusivo do `index.html`).

---

## 9. Assets — Imagens e Vídeos

### Imagens — Convenção de nomenclatura

| Padrão | Exemplo | Uso |
|---|---|---|
| `banner-N-novo.png` | `banner-4-novo.png` | Banners desktop revisados |
| `banner-N-mobile.png` | `banner-4-mobile.png` | Versões mobile do carrossel |
| `produto *.png` | `produto multimin 90.png` | Fotos de produto |
| `*.jpeg / *.jpg` | `confinamento.jpeg` | Fotos de cenário/fazenda |

**Banners ativos no carrossel (carousel.js):**
```
Slide 1: banner-produtos-multimin90-lactipro.png / banner-1-mobile.png
Slide 2: banner-4-novo.png                      / banner-4-mobile.png
Slide 3: banner-5-novo.png                      / banner-5-mobile.png
```

**Para trocar um banner:** edite o array `SLIDES` em `carousel.js`. Coloque o novo arquivo em `fotos/`.

### Vídeos — Regras

- Formato: **MP4 apenas** (melhor compatibilidade cross-browser)
- Todos usam `preload="none"` — não impactam carregamento inicial
- `object-fit: cover` — não distorce independente da proporção
- Pasta: `videos/`
- Nomenclatura: `produto-descricao-kebab-case.mp4`

**Limite de tamanho no GitHub:** 100MB por arquivo (hard limit). Arquivos acima de 50MB geram aviso. Atualmente `lactipro.mp4` tem 96MB — próximo do limite. Se crescer, migrar para Git LFS ou CDN externo.

---

## 10. Performance

### Técnicas implementadas

| Técnica | Onde | Impacto |
|---|---|---|
| `preconnect` para Google Fonts e Tailwind CDN | `<head>` de todas as páginas | Reduz latência DNS/TLS |
| `loading="lazy"` em imagens abaixo do fold | Todas as páginas | Evita download de imagens fora da viewport |
| `preload="none"` em vídeos | `multimin-90.html`, `lactipro.html` | Não baixa vídeo até o usuário apertar play |
| IntersectionObserver `rootMargin: 120px` | `animations.js` | Pré-carrega animações antes de ficarem visíveis |
| IIFEs sem dependências externas | Todos os `.js` | Sem overhead de módulos ou bundler |

### Gargalos conhecidos

| Gargalo | Causa | Mitigação possível |
|---|---|---|
| Tailwind CDN bloqueante | `<script>` síncrono no `<head>` necessário para `config.js` | Migrar para Tailwind CLI (gera CSS estático) |
| Dois requests Google Fonts | APIs separadas para fontes e Material Symbols | Combinar ou usar `font-display: optional` |
| Vídeos grandes no repositório | Git não foi projetado para binários grandes | Git LFS ou hospedar em CDN/Cloudflare R2 |
| Tailwind JIT em runtime | Escaneia o DOM inteiro no carregamento | Migrar para build step com PurgeCSS |

---

## 11. Guia de Manutenção

### Adicionar uma nova página

1. Copie o `<head>` de uma página existente (ex: `sobre.html`)
2. Ajuste `<title>` e `<meta name="description">`
3. Crie `css/pages/nome-da-pagina.css` e referencie no `<head>`
4. Adicione `<div id="site-nav"></div>` antes do `<main>`
5. Adicione `<div id="site-footer"></div>` depois do `</main>`
6. Carregue os scripts no fim do body:
   ```html
   <script src="js/device.js"></script>
   <script src="js/components.js"></script>
   <script src="js/animations.js" defer></script>
   ```
7. Adicione o link à navbar em `js/components.js` (funções `navLink` e `mobileNavLink`)

### Adicionar um novo slide ao carrossel

```js
// js/carousel.js — array SLIDES
var SLIDES = [
  // ...slides existentes...
  {
    image: "fotos/banner-novo-desktop.png",
    imageMobile: "fotos/banner-novo-mobile.png",
    label: "Label do Badge",
    title: "Título do slide",
    body: "Texto descritivo do slide.",
  },
];
```

O carrossel e os dots se adaptam automaticamente.

### Alterar cor da marca

1. `js/config.js` — altere o token de cor (ex: `"primary": "#novo-hex"`)
2. Verifique se há valores hardcoded no CSS/HTML (ex: `#0c2965` e `#93CAFF` aparecem em inline styles)
3. Atualize os inline styles nos heroes de produto e no `components.js`

Busca rápida por valores hardcoded:
```
grep -r "#0c2965" C:\axiotasite\*.html C:\axiotasite\js\ C:\axiotasite\css\
```

### Atualizar o vídeo do Lactipro

```html
<!-- lactipro.html — seção VÍDEO -->
<video src="videos/lactipro.mp4" ...>
<!-- Substitua o arquivo em videos/ com o mesmo nome, ou altere o src -->
```

### Atualizar vídeos do Multimin

Os 4 vídeos estão na seção `<!-- VÍDEOS -->` do `multimin-90.html`, em um grid `md:grid-cols-2`. Cada card tem a estrutura do componente [Vídeo responsivo 16:9](#vídeo-responsivo-169).

### Ajustar comportamento do hero produto no mobile

Em `css/global.css`, bloco `@media (max-width: 767px)` — classe `.hero-product-bg`:

```css
background-size: 220% auto;        /* zoom — aumentar = mais zoom, corta mais da esq */
background-position: right center; /* âncora — alterar para percentual ex: "80% center" */
height: calc(54svh - 4rem);       /* altura do bloco de imagem */
```

### Adicionar nova animação de entrada

Use os atributos `data-reveal` no elemento HTML:
```html
<div data-reveal="left" data-delay="200">Conteúdo</div>
```
Variantes disponíveis: sem valor (up), `left`, `right`, `scale`.

---

## 12. Armadilhas Conhecidas

### 1. Classes Tailwind geradas dinamicamente não funcionam

❌ **Errado:**
```js
var color = "primary";
el.className = "text-" + color;  // Tailwind não detecta "text-primary" aqui
```
✅ **Correto:** Use strings literais no HTML ou `style` inline para valores dinâmicos.

### 2. Ordem dos scripts no `<head>` é crítica

`config.js` define `tailwind.config` que o CDN lê durante a inicialização. Se invertidos, as cores e fontes customizadas não são aplicadas. A ordem correta é:
```html
<script src="https://cdn.tailwindcss.com..."></script>  <!-- 1º -->
<script src="js/config.js"></script>                    <!-- 2º, imediatamente após -->
```

### 3. `multimin-site/` é legado — não edite

A pasta `multimin-site/` é uma cópia antiga do site. Edições nela **não afetam** o site em produção. Toda manutenção deve ser feita nos arquivos da **raiz**.

### 4. `.gitignore` está corrompido

O arquivo `.gitignore` contém apenas `nul` e `div` (output de comando Windows capturado acidentalmente). Arquivos sensíveis ou temporários não estão protegidos. Recomenda-se recriar com:
```
ajustes/
multimin-site/
*.log
.DS_Store
Thumbs.db
```

### 5. Vídeo `lactipro.mp4` próximo do limite do GitHub

Com 96MB, está próximo do limite de 100MB por arquivo do GitHub. Se o arquivo for substituído por uma versão maior, o push falhará. Opções:
- Comprimir o vídeo (H.265/HEVC) antes de commitar
- Migrar vídeos para Git LFS: `git lfs track "*.mp4"`
- Hospedar em CDN externo e referenciar por URL

### 6. `navbar.js` existe mas está vazio

O arquivo `js/navbar.js` existe apenas para compatibilidade retroativa. Toda a lógica da navbar está em `components.js`. Não inclua `navbar.js` em novas páginas.

### 7. `data-reveal` em elementos com `display: none` inicial

Elementos com `display: none` não são observados corretamente pelo IntersectionObserver. Se precisar esconder e revelar um elemento, use `opacity: 0` + `visibility: hidden` em vez de `display: none`.

### 8. Fontes mobile do hero produto usam `!important`

Em `css/global.css`, os overrides mobile do `.hero-product-h1` e `.hero-product-p` usam `!important` para sobrepor inline styles do HTML. Ao alterar o tamanho da fonte no hero produto, verifique tanto o inline style (desktop) quanto o CSS media query (mobile).

---

*Documentação gerada em 2026-06-25. Manter atualizada a cada mudança estrutural no projeto.*
