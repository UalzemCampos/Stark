# Stark Health Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply full visual redesign to Stark Health landing page — hybrid light/dark theme, new hero copy, 3-pillar "Como Atuamos" section, updated contact/CTA section, removed Best Life and Colombo client logos, with images from newImages/ folder.

**Architecture:** Single-page HTML/CSS/JS static site. All CSS custom properties in `:root` in style.css. No framework — vanilla IntersectionObserver for animations, EmailJS for form. Redesign is CSS-first: new CSS variables for light theme, new section classes, minimal HTML restructuring, no JS changes needed.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, EmailJS, Cloudflare Turnstile

## Global Constraints

- All new CSS must use existing CSS custom property pattern (`--color-*`, `--font-*`). New variables go in `:root`.
- Human images from `newImages/` folder must use exact filenames (with spaces and `.webp` extension).
- Fonts: Noka for headings, Switzer-Variable for body — already loaded in HTML.
- Copy text must match spec exactly — no rewording of headlines, support text, or CTAs.
- Best Life (`logosParceiros/BEST LIFE.png`) and Colombo (`logosParceiros/COLOMBO.png`) must be removed from logo carousel.
- `formulario.html` and `formulario.js` are NOT modified by this plan (separate EmailJS config task).
- Green accent: `#00b894`, Blue accent: `#0055ff`.
- Images in logo carousel use `filter: grayscale(1) brightness(1.6)` on dark bg, but on light bg they need different filter — adjust to `filter: grayscale(1) opacity(0.5)` in the new light-theme numbers section.

---
## File Structure

### Modified Files
1. **index.html** — Hero section copy/headline, Como Atuamos full replacement (3 pillars), CTA/Contato copy, logo carousel items
2. **style.css** — New CSS variables for light theme, theme class selectors, 3-pillar process section styles, hero image styles, updated contact section

### Created Files
- *(none — all changes are modifications to existing files)*

### Unchanged Files
- **script.js** — No behavioral changes needed (animations, counters, menu all work with new classes)
- **formulario.html** — Not in scope
- **formulario.js** — Not in scope
- **fonts/** — Not touched

---

### Task 1: CSS Custom Properties — Light/Hybrid Theme Variables

**Files:**
- Modify: `style.css:11-72` (the `:root` block)

- [ ] **Step 1: Add light theme color variables to `:root`**

Add new CSS variables for the light/hybrid theme after the existing dark ones. These will be activated by a `.theme-light` class or section-specific overrides:

```css
/* Light / Hybrid Theme */
--color-bg-light: #f5f5f0;
--color-surface-light: #ffffff;
--color-text-light: #1a1a2e;
--color-text-2-light: #555577;
--color-text-3-light: #8888aa;
--color-border-light: rgba(0, 0, 0, 0.07);
--color-border-2-light: rgba(0, 0, 0, 0.12);
--color-accent-green: #00b894;
--color-accent-green-glow: rgba(0, 184, 148, 0.15);
--color-accent-blue: #0055ff;
--color-accent-blue-mid: #3375ff;
--color-accent-blue-glow: rgba(0, 85, 255, 0.20);
--shadow-sm-light: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md-light: 0 8px 32px rgba(0, 0, 0, 0.08);
--shadow-lg-light: 0 20px 60px rgba(0, 0, 0, 0.10);
```

Insert after line 72 (after `--trans-spring`). Keep ALL existing dark variables untouched.

- [ ] **Step 2: Create `.theme-light` utility class**

Add at the end of the `:root` block area or right after it, a utility to switch an element to light theme:

```css
/* ─── THEME UTILITIES ─── */
.theme-light {
  --color-bg: var(--color-bg-light);
  --color-surface: var(--color-surface-light);
  --color-text: var(--color-text-light);
  --color-text-2: var(--color-text-2-light);
  --color-text-3: var(--color-text-3-light);
  --color-border: var(--color-border-light);
  --color-border-2: var(--color-border-2-light);
  --shadow-sm: var(--shadow-sm-light);
  --shadow-md: var(--shadow-md-light);
  --shadow-lg: var(--shadow-lg-light);
}

.theme-light .solution-card,
.theme-light .process__step {
  background: var(--color-surface-light);
  border-color: var(--color-border-light);
}
```

- [ ] **Step 3: Commit CSS variable changes**

Run: `git add style.css`
Run: `git commit -m "feat: add light/hybrid theme CSS variables"`


### Task 2: CSS — Green Accent Update

**Files:**
- Modify: `style.css` — update `--color-green` and `--color-blue` values

- [ ] **Step 1: Update accent color values in `:root`**

Replace the existing green and blue accent values:

old_string: `--color-green: #31ffb0;` → new_string: `--color-green: #00b894;`
old_string: `--color-blue: #0049ff;` → new_string: `--color-blue: #0055ff;`

- [ ] **Step 2: Update all `#31ffb0` references to `#00b894`**

These are in section-badge, hero__badge, nav-link hover effects, and the solutions section. They use `var(--color-green)` already — no change needed.

But check inline references:
The `#31ffb0` in `--grad-green-blue` at line 39: `--grad-green-blue: #31ffb0;` → change to `--grad-green-blue: #00b894;`
The `#31ffb0` in `--grad-text` at line 42: `--grad-text: #31ffb0;` → change to `--grad-text: #00b894;`
The `31ffb0` in `.section-badge` border color (line 248): `rgba(49, 255, 176, 0.3)` → use `rgba(0, 184, 148, 0.3)` and similar for all `rgba(49, 255, 176` — replace ALL instances where the second value is `255` as part of `#31ffb0` rgb equivalent.

Instead of manual replacements, use replace_all on the file. There are 3 patterns to replace:
1. `rgba(49, 255, 176` → `rgba(0, 184, 148` (5 occurrences in style.css)
2. `#31ffb0` → `#00b894` (3 occurrences in style.css)
3. `31ffb0` → `00b894` (1 occurrence in `--grad-green-blue`)

Use the Edit tool with replace_all for each pattern.

- [ ] **Step 3: Commit color changes**

Run: `git add style.css`
Run: `git commit -m "feat: update brand accent colors to new palette"`


### Task 3: Hero Section — New Copy and Image

**Files:**
- Modify: `index.html` lines 108-200

- [ ] **Step 1: Replace hero headline and subtitle**

Replace the hero badge text, title, and both subtitle paragraphs with the new copy:

Change `Inteligência Médica Estratégica` badge to `Diagnóstico Gratuito`.

Replace the hero title (lines 123-127):
```html
<h1 id="hero-title" class="hero__title" data-animate="fade-up" data-delay="200">
  Cuidamos da saúde financeira e<br />
  assistencial da <span class="gradient-text">sua empresa</span>
</h1>
```

Replace both subtitle paragraphs (lines 129-137) with one:
```html
<p class="hero__subtitle" data-animate="fade-up" data-delay="350">
  Reduza custos do plano de saúde sem comprometer a qualidade do cuidado. Auditoria, consultoria e gestão — tudo em um só lugar.
</p>
```

- [ ] **Step 2: Replace badge dot color**

Change `background: var(--color-green);` inside `.hero__badge-dot` — will automatically pick up `#00b894` from the variable. No change needed.

- [ ] **Step 3: Update hero CTA buttons**

Primary CTA link (line 140-143): change href and text:
```html
<a href="formulario.html" class="btn btn--primary btn--lg" id="cta-hero-primary">
  Agendar um Diagnóstico Estratégico
</a>
```

Secondary CTA (line 144-146): keep as is (points to #solucoes, text "Conhecer Soluções").

- [ ] **Step 4: Add hero image background**

Replace the hero visual section (the card stack, lines 150-193) with the human image. The layout should be text on left, image on right.

Replace the entire `.hero__visual` div:
```html
<div class="hero__visual" data-animate="fade-left" data-delay="300" aria-hidden="true">
  <div class="hero__image-wrapper">
    <img src="newImages/Imagem de capa do site Stark Health.webp" alt="" class="hero__image" />
    <div class="hero__image-overlay"></div>
  </div>
</div>
```

- [ ] **Step 5: Add CSS for hero image**

Add to style.css after `.hero__visual` styles (after line 872):

```css
.hero__image-wrapper {
  position: relative;
  width: 100%;
  max-width: 520px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 10, 18, 0.4) 0%, transparent 60%);
  pointer-events: none;
}

@media (max-width: 1023px) {
  .hero__image-wrapper {
    max-width: 100%;
    max-height: 400px;
  }
  
  .hero__image {
    height: 300px;
    object-fit: cover;
  }
}
```

- [ ] **Step 6: Update hero layout for new grid**

The hero already uses `grid-template-columns: 1.15fr 0.85fr` on desktop — fine for text+image. Reduce gap to `40px` on desktop (line 730).

- [ ] **Step 7: Commit hero changes**

Run: `git add index.html style.css`
Run: `git commit -m "feat: update hero section with new copy and human image"`


### Task 4: Como Atuamos — 3 Pillars Restructure

**Files:**
- Modify: `index.html` lines 314-437 (entire #como-atuamos section)
- Modify: `style.css` lines 1192-1329 (entire .process section styles)

- [ ] **Step 1: Replace HTML for the #como-atuamos section**

Replace everything from `<section id="como-atuamos" class="process"...` to the closing `</section>` at line 438 with the new 3-pillar structure:

```html
<section id="como-atuamos" class="process" aria-labelledby="process-title">
  <div class="process__bg" aria-hidden="true"></div>

  <div class="container">
    <div class="section-header" data-animate="fade-up">
      <div class="section-badge">Como Atuamos</div>
      <h2 id="process-title" class="section-title">
        Três pilores que transformam<br />
        a gestão da sua <span class="gradient-text">saúde corporativa</span>
      </h2>
      <p class="section-subtitle">
        Unimos inteligência médica, análise técnica e gestão especializada<br />
        para criar uma estrutura sólida de apoio à sua empresa.
      </p>
    </div>

    <div class="pillars__grid" role="list">

      <article class="pillar-card" data-animate="fade-up" data-delay="0" role="listitem">
        <div class="pillar-card__header">
          <div class="pillar-card__icon" aria-hidden="true">
            <img src="icons/VERDE/MÉDICO.png" alt="" class="icon-img" style="width:28px;height:28px" />
          </div>
          <h3 class="pillar-card__title">Consultoria em Saúde</h3>
        </div>
        <ul class="pillar-card__list">
          <li class="pillar-card__item">Análise e reestruturação de rede assistencial</li>
          <li class="pillar-card__item">Avaliação e renegociação de contratos com operadoras</li>
          <li class="pillar-card__item">Precificação, sinistralidade e modelagem de planos</li>
        </ul>
        <div class="pillar-card__bar" aria-hidden="true"></div>
      </article>

      <article class="pillar-card pillar-card--featured" data-animate="fade-up" data-delay="100" role="listitem">
        <div class="pillar-card__header">
          <div class="pillar-card__icon" aria-hidden="true">
            <img src="icons/VERDE/AUDITORIA.png" alt="" class="icon-img" style="width:28px;height:28px" />
          </div>
          <h3 class="pillar-card__title">Auditoria Técnica</h3>
        </div>
        <ul class="pillar-card__list">
          <li class="pillar-card__item">Revisão analítica e auditoria de contas médicas</li>
          <li class="pillar-card__item">Análise de glosas, sinistros e faturamento</li>
          <li class="pillar-card__item">Governança, compliance e adequação regulatória</li>
        </ul>
        <div class="pillar-card__bar" aria-hidden="true"></div>
      </article>

      <article class="pillar-card" data-animate="fade-up" data-delay="200" role="listitem">
        <div class="pillar-card__header">
          <div class="pillar-card__icon" aria-hidden="true">
            <img src="icons/VERDE/SAÚDE.png" alt="" class="icon-img" style="width:28px;height:28px" />
          </div>
          <h3 class="pillar-card__title">Gestão de Saúde</h3>
        </div>
        <ul class="pillar-card__list">
          <li class="pillar-card__item">Programas de gestão de doenças crônicas</li>
          <li class="pillar-card__item">Promoção à saúde, bem-estar e prevenção</li>
          <li class="pillar-card__item">Telemedicina, prontuário digital e canais de cuidado</li>
        </ul>
        <div class="pillar-card__bar" aria-hidden="true"></div>
      </article>

    </div>

    <div class="pillars__cta" data-animate="fade-up" data-delay="300">
      <a href="https://wa.me/5511989102784?text=Olá!%20Quero%20saber%20mais%20sobre%20como%20a%20Stark%20Health%20atua." target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg">
        Falar com um Especialista
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace CSS for .process section with new pillar styles**

Replace all CSS from `/* ─── COMO ATUAMOS ─── */` (line 1189) through the end of `.process__step-desc` (line 1329) with the new pillar card styles:

```css
/* ═══════════════════════════════════════════
   COMO ATUAMOS — 3 PILARES
═══════════════════════════════════════════ */
.process {
  padding: var(--section-py) 0;
  position: relative;
  background: var(--color-bg-light);
  overflow: hidden;
}

.process__bg {
  position: absolute;
  top: -200px;
  right: -200px;
  width: 700px;
  height: 700px;
  background: rgba(0, 184, 148, 0.06);
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

.process .section-title {
  color: var(--color-text-light);
}

.process .section-subtitle {
  color: var(--color-text-2-light);
}

/* Pillars Grid */
.pillars__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .pillars__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pillar-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: 36px 28px;
  position: relative;
  overflow: hidden;
  transition: transform var(--trans-slow), box-shadow var(--trans-slow), border-color var(--trans-slow);
  cursor: default;
  box-shadow: var(--shadow-sm-light);
}

.pillar-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md-light);
  border-color: rgba(0, 184, 148, 0.2);
}

.pillar-card--featured {
  border-color: rgba(0, 184, 148, 0.2);
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.pillar-card__header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.pillar-card__icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: rgba(0, 184, 148, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform var(--trans-base), background var(--trans-base);
}

.pillar-card:hover .pillar-card__icon {
  background: rgba(0, 184, 148, 0.2);
  transform: scale(1.05);
}

.pillar-card__title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-light);
  line-height: 1.3;
}

.pillar-card__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.pillar-card__item {
  font-size: 0.88rem;
  color: var(--color-text-2-light);
  line-height: 1.6;
  padding-left: 18px;
  position: relative;
}

.pillar-card__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-green);
  opacity: 0.6;
}

.pillar-card__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: var(--color-accent-green);
  border-radius: 0 0 0 var(--radius-lg);
  transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.pillar-card:hover .pillar-card__bar {
  width: 100%;
}

/* Pillars CTA */
.pillars__cta {
  text-align: center;
  margin-top: 48px;
}
```

- [ ] **Step 3: Commit pillars changes**

Run: `git add index.html style.css`
Run: `git commit -m "feat: restructure Como Atuamos into 3 pillars"`


### Task 5: Solutions Section — Light Theme

**Files:**
- Modify: `style.css` lines 1060-1186 (`.solutions` section)

- [ ] **Step 1: Convert solutions section to light background**

Replace the solutions section background and card colors for light theme:

Change `background: var(--color-bg-2);` (line 1066) to `background: var(--color-bg-light);`

Change `.solution-card` background (line 1109-1110):
```css
background: var(--color-surface-light);
border: 1px solid var(--color-border-light);
```

Change `.solution-card__title` color (line 1163): `color: var(--color-text-light);`
Change `.solution-card__desc` color (line 1169): `color: var(--color-text-2-light);`

Change `.solutions__callout` color (line 1083): `color: var(--color-accent-green);`

- [ ] **Step 2: Adjust solutions box-shadow for light bg**

Change the hover box-shadow to use light shadows:
```css
.solution-card:hover {
  transform: translateY(-6px);
  border-color: rgba(0, 184, 148, 0.2);
  box-shadow: var(--shadow-md-light);
}
```

- [ ] **Step 3: Commit solutions light theme**

Run: `git add style.css`
Run: `git commit -m "feat: convert solutions section to light theme"`


### Task 6: CTA/Contact Section — New Copy and Image

**Files:**
- Modify: `index.html` lines 538-597 (entire #contato section)

- [ ] **Step 1: Replace CTA section copy and add image background**

Replace the cta-section content block (lines 544-594) with new copy and image:

```html
<div class="cta-section__inner" data-animate="fade-up">
  <div class="section-badge">Diagnóstico Gratuito</div>
  <h2 id="cta-title" class="cta-section__title">
    Pronto para transformar a gestão de saúde<br />
    da <span class="gradient-text">sua empresa</span>?
  </h2>
  <p class="cta-section__subtitle">
    Agende um diagnóstico estratégico gratuito e descubra como podemos reduzir seus custos com plano de saúde.
  </p>

  <a href="formulario.html" class="btn btn--primary btn--xl" id="cta-final">
    Agendar um Diagnóstico Estratégico
  </a>

  <div class="cta-section__contacts" role="list" aria-label="Informações de contato da Stark Health">
    <a href="https://wa.me/5511989102784" target="_blank" rel="noopener noreferrer" class="contact-item"
      id="contact-whatsapp" role="listitem">
      <div class="contact-item__icon contact-item__icon--green" aria-hidden="true">
        <img src="icons/VERDE/WHATSAPP.png" alt="" class="icon-img" style="width:24px;height:24px" />
      </div>
      <div>
        <div class="contact-item__label">WhatsApp</div>
        <div class="contact-item__value">(11) 98910-2784</div>
      </div>
    </a>

    <a href="https://instagram.com/starkhealthconsultoria" target="_blank" rel="noopener noreferrer"
      class="contact-item" id="contact-instagram" role="listitem">
      <div class="contact-item__icon contact-item__icon--green" aria-hidden="true">
        <img src="icons/VERDE/INSTAGRAM.png" alt="" class="icon-img" style="width:24px;height:24px" />
      </div>
      <div>
        <div class="contact-item__label">Instagram</div>
        <div class="contact-item__value">@starkhealthconsultoria</div>
      </div>
    </a>

    <a href="https://linkedin.com/company/stark-health" target="_blank" rel="noopener noreferrer"
      class="contact-item" id="contact-linkedin" role="listitem">
      <div class="contact-item__icon contact-item__icon--green" aria-hidden="true">
        <img src="icons/VERDE/LINKEDIN.png" alt="" class="icon-img" style="width:24px;height:24px" />
      </div>
      <div>
        <div class="contact-item__label">LinkedIn</div>
        <div class="contact-item__value">Stark Health</div>
      </div>
    </a>
  </div>
</div>
```

- [ ] **Step 2: Add contact image as background**

Add an image background to the CTA section. Replace the existing `.cta-section__bg` div:

```html
<div class="cta-section__bg" aria-hidden="true">
  <img src="newImages/Imagem de contato do site Stark Health .webp" alt="" class="cta-section__bg-image" />
  <div class="cta-section__bg-overlay"></div>
</div>
```

- [ ] **Step 3: Add CSS for contact background image**

Add to the `.cta-section__bg` and related selectors in style.css (around line 1582):

```css
.cta-section__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.cta-section__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cta-section__bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 18, 0.65);
}
```

- [ ] **Step 4: Update contact-item icon colors for dark bg**

The contact section is on a dark background, so the contact items should use the existing dark-theme icon styles with the new green accent. The CSS already has `.contact-item__icon--green` using `var(--color-green)` which now resolves to `#00b894`. 

Change `.contact-item__icon--green` background from `rgba(49, 255, 176, 0.15)` to `rgba(0, 184, 148, 0.15)` — already handled by the color variable replacement if using `var()`. Check line 1676-1679 and update:

```css
.contact-item__icon--green {
  background: rgba(0, 184, 148, 0.15);
  color: var(--color-green);
}
```

Also update contact-item background for dark section to use the appropriate dark surface color:
```css
.contact-item {
  background: var(--color-surface);
}
```
(Line 1655 already uses `var(--grad-card)` — change to `var(--color-surface)` which is `#14142a`)

- [ ] **Step 5: Commit CTA changes**

Run: `git add index.html style.css`
Run: `git commit -m "feat: update CTA section with new copy and contact image"`


### Task 7: Logo Carousel — Remove Best Life and Colombo

**Files:**
- Modify: `index.html` lines 507-525

- [ ] **Step 1: Remove Best Life and Colombo from logo list**

Remove the two `<div class="logo-item">` lines for Best Life and Colombo in both the visible list AND the duplicate set:

Remove line 513: `<div class="logo-item"><img src="logosParceiros/BEST LIFE.png" alt="Best Life" /></div>`
Remove line 515: `<div class="logo-item"><img src="logosParceiros/COLOMBO.png" alt="Colombo" /></div>`

Remove the duplicate lines:
Line 523: `<div class="logo-item" aria-hidden="true"><img src="logosParceiros/BEST LIFE.png" alt="Best Life" /></div>`
Line 525: `<div class="logo-item" aria-hidden="true"><img src="logosParceiros/COLOMBO.png" alt="Colombo" /></div>`

Also update the `aria-label` on `.logos-carousel` (line 504) to remove "Best Life" and "Colombo":
```
Empresas que confiam na Stark
```
Change the aria-label from `"Logos de clientes: BB Tecnologia e Serviços, SESI, SENAI, Ampla Saúde, NeoSector, Fidelitas, Best Life, Solution Consultoria, Colombo"` to `"Logos de clientes: BB Tecnologia e Serviços, SESI, SENAI, Ampla Saúde, NeoSector, Fidelitas, Solution Consultoria"`.

- [ ] **Step 2: Update logo filters for light background**

The numbers section is now dark (unchanged), so logo items remain on dark bg and use existing `filter: grayscale(1) brightness(1.6) opacity(0.7)`. No filter change needed.

- [ ] **Step 3: Commit logo changes**

Run: `git add index.html`
Run: `git commit -m "fix: remove Best Life and Colombo from client logos"`


### Task 8: Numbers Section — Image Integration

**Files:**
- Modify: `index.html` lines 444-531
- Modify: `style.css` lines 1335-1569

- [ ] **Step 1: Add extra image to numbers section background**

Add the extra image as a subtle background element. Insert within the `.numbers` section, after the `.numbers__bg-glow` div:

```html
<div class="numbers__image" aria-hidden="true">
  <img src="newImages/Imagem extra para uso no site Stark Health.webp" alt="" />
  <div class="numbers__image-overlay"></div>
</div>
```

- [ ] **Step 2: Add CSS for numbers background image**

Add after the `.numbers__bg-glow` styles (after line 1353):

```css
.numbers__image {
  position: absolute;
  right: 0;
  top: 0;
  width: 40%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.15;
}

.numbers__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.numbers__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to left, transparent 0%, var(--color-bg) 70%);
}
```

- [ ] **Step 3: Numbers section stays dark theme**

Keep `background: var(--color-bg);` in `.numbers` — the numbers section remains dark as per spec. No color changes needed.

- [ ] **Step 4: Commit numbers changes**

Run: `git add index.html style.css`
Run: `git commit -m "feat: add background image to numbers section"`


### Task 9: Footer and Remaining Cleanup

**Files:**
- Modify: `index.html` footer links (update href="#hero" to keep working with new sections)

- [ ] **Step 1: Verify footer href anchors**

The footer links use `#solucoes`, `#como-atuamos`, `#numeros`, `#contato` — these section IDs are unchanged, so the footer nav works without changes.

- [ ] **Step 2: Verify WhatsApp floating button**

The WhatsApp float button uses the same phone number — unchanged. Verify the link still works. No changes needed.

- [ ] **Step 3: Update nav dropdown link text**

In `formulario.html` header, the nav links point to `index.html#solucoes`, etc. — these still work since section IDs are preserved. No changes needed.

- [ ] **Step 4: Test all links work**

Run: open `index.html` in browser. Verify:
- Nav links jump to correct sections
- "Agendar um Diagnóstico Estratégico" button links to `formulario.html`
- WhatsApp buttons open correct number
- Contact links work

- [ ] **Step 5: Commit remaining changes**

Run: `git add index.html`
Run: `git commit -m "chore: final cleanup after redesign"`
