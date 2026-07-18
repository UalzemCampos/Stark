# Pillar Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB‑SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task‑by‑task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the three existing pillar cards with the new item lists you supplied and add a fourth “Concierge em Saúde” card that matches the visual style and responsive layout of the others.

**Architecture:** The landing page is a static HTML site with CSS‑grid layout for the pillars. All changes are confined to `index.html` (the markup) and a tiny icon asset copy. No JavaScript changes are required.

**Tech Stack:** HTML, CSS (custom variables), Git.

## Global Constraints
- Do not alter existing CSS classes or theme variables.
- Preserve the existing responsive grid (`.pillars__grid`) – it already handles up to four columns via `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`.
- Keep the same lead‑paragraph (“Para …”) style for all pillar cards.
- Icon for the new card must be `iconesUsar/VERDE/CONCIERGE.png`.

---

### Task 1: Replace Consultoria em Saúde list items

**Files:**
- Modify: `publicarVercel/Stark/index.html:291-299`

- [ ] **Step 1: Write the failing test** – No automated test needed for static HTML. Create a manual visual‑verification checklist (see Task 5).
- [ ] **Step 2: Run test to verify it fails** – Open `index.html` in a browser and confirm the old list is still present.
- [ ] **Step 3: Write minimal implementation** – Replace the `<ul class="pillar-card__list">` block inside the Consultoria card with:
```html
<ul class="pillar-card__list">
  <li class="pillar-card__item">Apoio Técnico para RH</li>
  <li class="pillar-card__item">Análise detalhada e ações estratégicas</li>
  <li class="pillar-card__item">Comitês de Saúde</li>
  <li class="pillar-card__item">Responsável Médico</li>
  <li class="pillar-card__item">Comitê Médico</li>
  <li class="pillar-card__item">Estudos de Utilização e Sinistralidade</li>
</ul>
```
- [ ] **Step 4: Run test to verify it passes** – Reload the page; the Consultoria card now shows the six new items.
- [ ] **Step 5: Commit**
```bash
git add index.html
git commit -m "feat: update Consultoria pillar list per spec"
```

### Task 2: Replace Auditoria Técnica list items

**Files:**
- Modify: `publicarVercel/Stark/index.html:307-315`

- Follow the same 5‑step pattern, replacing the list with:
```html
<ul class="pillar-card__list">
  <li class="pillar-card__item">Regulação Compartilhada</li>
  <li class="pillar-card__item">Opinião Médica</li>
  <li class="pillar-card__item">Auditoria de Contas</li>
</ul>
```
Commit with message `feat: update Auditoria pillar list per spec`.

### Task 3: Replace Gestão de Saúde list items

**Files:**
- Modify: `publicarVercel/Stark/index.html:326-334`

- Replace the list with:
```html
<ul class="pillar-card__list">
  <li class="pillar-card__item">Promoção de Saúde</li>
  <li class="pillar-card__item">Mapeamento de Saúde</li>
  <li class="pillar-card__item">Campanhas de Saúde</li>
  <li class="pillar-card__item">Calendário de Saúde</li>
  <li class="pillar-card__item">Marketing em Saúde</li>
  <li class="pillar-card__item">Migração / Implantação</li>
</ul>
```
Commit with message `feat: update Gestão pillar list per spec`.

### Task 4: Add Concierge em Saúde card (fourth pillar)

**Files:**
- Insert a new `<article class="pillar-card" …>` block after the third card (before the closing `</div>` of `.pillars__grid`).

- HTML to add:
```html
<article class="pillar-card" data-animate="fade-up" data-delay="300" role="listitem">
  <div class="pillar-card__header">
    <div class="pillar-card__icon" aria-hidden="true">
      <img src="iconesUsar/VERDE/CONCIERGE.png" alt="" class="icon-img" style="width:28px;height:28px" />
    </div>
    <h3 class="pillar-card__title">Concierge em Saúde</h3>
  </div>
  <p class="pillar-card__lead">Para atender demandas com prioridade e suporte especializado.</p>
  <ul class="pillar-card__list">
    <li class="pillar-card__item">Acolhimento Técnico</li>
    <li class="pillar-card__item">Busca de Rede Credenciada Especializada</li>
    <li class="pillar-card__item">Interlocução</li>
    <li class="pillar-card__item">Prioridade de Análise</li>
  </ul>
  <div class="pillar-card__bar" aria-hidden="true"></div>
</article>
```
- Follow the same 5‑step pattern, committing with `feat: add Concierge pillar card with new icon`.

### Task 5: Manual visual verification & responsive testing

**Files:** None (runtime verification).
- [ ] **Step 1: Verify desktop layout** – Open `index.html` in a browser at ≥ 1024 px width. Confirm a four‑column grid, equal card height, and no overflow.
- [ ] **Step 2: Verify tablet layout** – Resize to ~768 px width. Expect three columns (the new card may wrap to the next row). Ensure spacing looks consistent.
- [ ] **Step 3: Verify mobile layout** – Resize to ≤ 480 px width. Cards should stack vertically, each occupying full width. Confirm text is readable and icons remain visible.
- [ ] **Step 4: Verify icon appears** – Ensure the `CONCIERGE.png` icon loads (no broken image). If missing, copy the file to the correct path (`iconesUsar/VERDE/CONCIERGE.png`).
- [ ] **Step 5: Commit verification note (optional)**
```bash
echo "Manual visual verification passed on $(date)" >> verification.log
git add verification.log
git commit -m "docs: add manual visual verification notes"
```

### Task 6: Push changes to remote (if a remote branch is used)

- [ ] **Step 1: Ensure branch is up‑to‑date**
```bash
git fetch origin
git checkout main
git pull
```
- [ ] **Step 2: Push**
```bash
git push origin main
```
- [ ] **Step 3: Verify CI (if any)** – Watch GitHub Actions (or other CI) for a green status.
- [ ] **Step 4: Create PR (optional)** – If you prefer a PR workflow, run:
```bash
gh pr create --title "feat: update pillar cards and add Concierge" \
  --body "Updates pillar content per 2026‑07‑17 design spec. Adds new Concierge card with icon." \
  --base main
```

---

## Self‑Review Checklist
1. **Spec coverage:** Updated lists for Consultoria, Auditoria, Gestão – ✅; Added Concierge card – ✅.
2. **No placeholders:** All steps contain concrete code or commands.
3. **Scope:** Limited to markup changes; no unrelated refactoring – ✅.

---

**Plan saved to:** `docs/superpowers/plans/2026-07-17-pillar-updates.md`

**Execution options:**
1. **Subagent‑Driven (recommended)** – dispatch a fresh subagent for each task, review after each commit.
2. **Inline Execution** – run the tasks sequentially in this session.

Which approach would you like to use?