# Changelog de Ajustes — Axiōta Site BR

> Formato: `[DATA] TAREFA N — Descrição — Arquivo(s) alterado(s)`

---

## 2026-06-24

### T5 — Quadros de Absorção (3 cards) corrigidos
- **Arquivo:** `multimin-90.html` — seção BENEFÍCIOS
- Card 1: "100% de Garantia de Entrega" → "Redução do Estresse Oxidativo" + subtexto das enzimas antioxidantes
- Card 2: "pico em apenas 24 horas" → "Absorção em no máximo 8 a 10 horas após a aplicação"
- Card 3: texto ajustado para terminar em "...derrubando a morbidade e mortalidade do seu rebanho."

### T7 — Seção "Dosagem e Administração" removida
- **Arquivo:** `multimin-90.html` — seção DOSAGEM (linhas 131–172)
- Conteúdo removido: tabela de dosagem + box "Recomendação de Uso Estratégico"
- Pendência registrada em `pendencias.md`

### T6 — Seção CENÁRIOS reestruturada
- **Arquivo:** `index.html` — seção CENÁRIOS / Aplicações
- Adicionada categoria "Nascimento e Reprodução"
- Corrigidos links: CORTE/CONFINAMENTO → `multimin-90.html`, LEITE → `lactipro.html`
- Imagens: pendentes (aguardando cliente)

### T8 — Página de Representantes migrada para lista com filtro
- **Arquivo:** `representantes.html` — removido sistema de cards flip
- **Arquivo novo:** `data/representantes.json` — dados estruturados (14 representantes, 5 estados)
- Implementado: filtro por estado via JS puro, lista mobile-first, escalável para 100+
