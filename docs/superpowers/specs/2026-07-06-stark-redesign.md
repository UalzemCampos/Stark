# Stark Health — Redesign Landing Page

**Data:** 2026-07-06
**Status:** Aprovado
**Cliente:** Stark Health (Consultoria em Saúde)
**Tipo:** Redesign de landing page one-page existente

---

## 1. Objetivo

Redesign completo da landing page da Stark Health para uma direção visual **híbrida** (claro/escuro), com tom mais profissional, acolhedor e orientado a ação. O cliente solicitou uma abordagem mais leve que o tema escuro atual, usando como referências visuais Conexa Saúde (fundo claro, limpo), Amil e SulAmérica (apresentação de dados).

---

## 2. Direção Visual

| Token | Atual | Novo |
|---|---|---|
| `--color-bg` | `#0a0a12` | `#f5f5f0` (seções claras) |
| `--color-bg-alt` | `#14142a` | `#0a0a12` (seções escuras) |
| `--color-text` | `#f0f0f8` | `#1a1a2e` (claro), `#f0f0f8` (escuro) |
| `--color-accent` | `#31ffb0` | `#00b894` |
| `--color-accent-alt` | `#0049ff` | `#0055ff` |
| `--color-surface` | fundo roxo escuro | `#ffffff` com sombra `rgba(0,0,0,0.06)` |
| `--font-heading` | Noka | Noka (mantém) |
| `--font-body` | Switzer-Variable | Switzer-Variable (mantém) |

**Estrutura híbrida:**

| Seção | Fundo |
|---|---|
| Hero | Escuro (`#0a0a12`) com gradiente |
| Soluções | Claro (`#f5f5f0`) |
| Como Atuamos | Claro, cards em branco com sombra |
| Números | Escuro (`#0a0a12`) com gradiente |
| CTA | Escuro com imagem de fundo |
| Contato | Claro |
| Footer | Mais escuro que as seções claras, menos que hero |

---

## 3. Hero

- **Headline principal:** "Cuidamos da saúde financeira e assistencial da sua empresa"
- **Support text:** "Reduza custos do plano de saúde sem comprometer a qualidade do cuidado. Auditoria, consultoria e gestão — tudo em um só lugar."
- **CTA primário:** "Agendar um Diagnóstico Estratégico" (link para `formulario.html`)
- **Badge:** "Diagnóstico Gratuito"
- **Imagem de fundo:** `newImages/Imagem de capa do site Stark Health.webp` (à direita, com sobreposição gradiente)
- Layout: texto à esquerda, imagem à direita (ou fundo cheio com overlay para mobile)

## 4. Soluções (seção existente)

- Manter estrutura de soluções mas com fundo claro e cards brancos
- Ajustar cores dos cards para fundo branco com borda sutil na cor de destaque
- Manter 4 soluções principais (já existentes no HTML)

## 5. Como Atuamos — 3 Pilares

Substituir estrutura atual de processos por 3 pilares de serviço:

**1. Consultoria em Saúde**
- Análise e reestruturação de rede assistencial
- Avaliação e renegociação de contratos com operadoras
- Precificação, sinistralidade e modelagem de planos

**2. Auditoria Técnica**
- Revisão analítica e auditoria de contas médicas
- Análise de glosas, sinistros e faturamento
- Governança, compliance e adequação regulatória

**3. Gestão de Saúde**
- Programas de gestão de doenças crônicas
- Promoção à saúde, bem-estar e prevenção
- Telemedicina, prontuário digital e canais de cuidado

Layout: 3 colunas no desktop, empilhado em mobile. Cada pilar com **ícone**, **título**, **subtítulo** e **lista de serviços**.
Fundo da seção claro, cards em branco com sombra suave e hover com leve elevação.

## 6. Números da Stark

- Seção de fundo escuro com gradiente e contadores
- **Área:** Auditoria Médica, Gestão de Custos, Consultoria em Saúde, Cuidado Baseado em Valor
- Manter a mesma estrutura de números animados já existente
- Atualizar com as imagens humanas (`newImages/`) como background ou elemento decorativo

## 7. Clientes

- **Remover:** Best Life e Colombo
- Manter demais logos existentes
- Manter carrossel com duplicação para scroll infinito

## 8. CTA Section

- **Headline:** "Pronto para transformar a gestão de saúde da sua empresa?"
- **Support text:** "Agende um diagnóstico estratégico gratuito e descubra como podemos reduzir seus custos com plano de saúde."
- **CTA:** "Agendar um Diagnóstico Estratégico"
- **Badge:** "Diagnóstico Gratuito"
- Fundo com imagem de contato das `newImages/` com overlay escuro

## 9. Contato / Footer

- Seção clara com informações de contato (whatsapp, instagram, linkedin)
- Footer mantendo estrutura existente com logo, navegação e contato
- Atualizar tom do texto para ser mais acolhedor e consultivo

## 10. Formulário

- Manter `formulario.html` existente (já atende ao propósito de captura de leads)
- Ajustar paleta de cores para alinhar com o novo tema hybrid (seção do formulário continua escura com gradiente como definido atualmente)
- CTA do formulário: "Agendar um Diagnóstico Estratégico"

## 11. Imagens

As 5 imagens da pasta `newImages/` serão usadas:
1. Hero cover — fundo da seção hero
2. Hero alt (mais teto) — alternativa para mobile/tablet
3. Contato — seção de CTA/contato
4. Contato alt (mais teto) — alternativa para mobile
5. Extra — uso geral (pode compor a seção de números)

---

## Próximos Passos

1. Aprovação do spec pelo usuário
2. Implementação: CSS light theme + novas seções + imagens
3. Testes de responsividade
