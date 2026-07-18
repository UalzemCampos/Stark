# Pillar Updates Design (2026-07-17)

## Goal
Replace the content of the three existing pillar cards with the new item lists you supplied, and add a fourth **Concierge em Saúde** card that uses the same visual style and responsive layout as the others.

## Updated pillar content

| Pillar (title) | Lead subtitle (kept) | New list items |
|---|---|---|
| **Consultoria em Saúde** | “Para otimizar seus recursos.” | • Apoio Técnico para RH  
• Análise detalhada e ações estratégicas  
• Comitês de Saúde  
• Responsável Médico  
• Comitê Médico  
• Estudos de Utilização e Sinistralidade |
| **Auditoria Técnica** | “Para a sustentabilidade do seu plano.” | • Regulação Compartilhada  
• Opinião Médica  
• Auditoria de Contas |
| **Gestão de Saúde** | “Para cuidar dos seus colaboradores.” | • Promoção de Saúde  
• Mapeamento de Saúde  
• Campanhas de Saúde  
• Calendário de Saúde  
• Marketing em Saúde  
• Migração / Implantação |
| **Concierge em Saúde** *(new)* | “Para atender demandas com prioridade e suporte especializado.” | • Acolhimento Técnico  
• Busca de Rede Credenciada Especializada  
• Interlocução  
• Prioridade de Análise |

All cards keep the same class structure (`pillar-card`), icon size, and the “Para …” lead paragraph.

## Visual/layout details
- **Icon** – use `iconesUsar/VERDE/CONCIERGE.png`.
- **Order** – the new card will be the fourth column, placed after “Gestão de Saúde”.
- **Responsive grid** – keep the existing `<div class="pillars__grid" role="list">` but allow up to four columns on wider screens. Example CSS snippet:
```css
.pillars__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```
This automatically shows 1‑2 columns on mobile, 3 columns on tablet, and 4 columns on desktop.
- **Styling** – no changes to colors, padding, or shadow; the new card inherits the same CSS rules as the other `.pillar-card` elements.

## Implementation approach (recommended)
| Option | Description | Pros | Cons |
|---|---|---|---|
| **A. Direct HTML edit** (recommended) | Edit `index.html`‑ the `<article class="pillar-card">` blocks to replace the `<ul class="pillar-card__list">` content and duplicate the block for the new concierge card. | • Simple, low‑risk change  
• Matches current static implementation  
• No extra JavaScript needed | • Manual maintenance if the list ever changes again |
| **B. Data‑driven component** | Move the pillar data into a JSON‑like JS array and render cards with a small script (e.g., using a templating snippet). | • Future‑proof for frequent content changes  
• Centralised data | • Adds JavaScript complexity  
• Requires additional build steps |
| **C. Partial component reuse** | Create a reusable `<section>` component (e.g., with a server‑side include or a custom HTML component) and import it. | • Cleaner markup, easier reuse elsewhere | • Needs tooling support that the current project does not use |

**Recommendation:** Option A – a direct HTML edit – because the site is a static landing page and the pillar content changes are infrequent. The CSS grid already handles responsiveness, so only the markup needs updating.

## Next steps
1. Write the implementation plan (will be generated via the `writing-plans` skill).
2. Apply the HTML changes, test responsiveness, and commit.
```
