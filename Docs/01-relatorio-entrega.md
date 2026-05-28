# 📄 Relatório de Entrega v2 — Back Advocacia

**Cliente:** Sandra Back · Back Advocacia
**Categoria DNA:** Advocacia (segundo projeto da categoria, após Pierre Silva)
**Slug AG5:** `back-advocacia`
**Data:** 28/05/2026 — refatoração completa seguindo dossiê v2

---

## ✅ Arquivos entregues

| Arquivo | Função |
|---|---|
| `index.html` | LP com 11 seções obrigatórias da instrução AG5 |
| `style.css` | Sistema visual completo (paleta cliente + tipografia da logo) |
| `script.js` | Vanilla ES6 — IntersectionObserver, form validation, balão WA, cookie LGPD |
| `politica-de-privacidade.html` | Conformidade LGPD |
| `termos.html` | Conformidade Provimento 205/2021 CFOAB |
| `robots.txt` | Indexação SEO |
| `sitemap.xml` | Sitemap completo (3 URLs) |
| `_headers` | Cache + security headers Cloudflare Pages |
| `_redirects` | Apex→www + http→https |
| `Docs/00-dossie-criacao-site.md` | Dossiê estruturado completo (instrução AG5) |
| `Docs/01-relatorio-entrega.md` | Este arquivo |
| `Docs/Falta no esquema/falta-adicionar.md` | Pendências para cobrar da cliente |

---

## 🧱 11 seções obrigatórias da instrução AG5 (todas presentes)

| # | Seção | Variação escolhida |
|---|---|---|
| 1 | Navbar | Sticky com blur + CTA destacado + hamburger mobile |
| 2 | Hero | **Split assimétrico 55/45** com clip-path diagonal |
| 3 | Alto impacto: dor e solução | Cards contrastantes (paper × navy) |
| 4 | Serviços / Áreas | **Zig-zag alternado** com frames champagne |
| 5 | Encantamento (manifesto) | Citação serif sobre fundo navy |
| 6 | Sobre / Credenciais | **Split 50/50 com foto fixada (sticky)** |
| 7 | Depoimentos | **Carrossel fade + nota Google** (em pending até cliente fornecer reviews) |
| 8 | FAQ | Acordeão exclusivo (5 perguntas) |
| 9 | Localização | Endereço + Google Maps embed + botão "Como chegar" + contatos + redes |
| 10 | CTA + Formulário | Form com validação ES6 real, encaminha por WhatsApp |
| 11 | Rodapé + Créditos | 4 colunas + legal + crédito **AG5** em champagne |

**Extras AG5 aplicados:**
- ✅ Barra animada horizontal de keywords (marquee navy)
- ✅ Espaço para bloco Google Reviews (logo oficial + cards) — ativado quando vier dados

---

## 🎨 Sistema visual

**Paleta da cliente (não AG5 maison):**

```
navy        #0a1628    texto, footer, manifesto, CTA primário
navy-deep   #050d1c    rodapé bottom
champ       #c8a76c    acento dourado da logo
champ-2     #b48a4b    hover, links
ivory       #f6f1e8    fundo geral premium
paper       #ffffff    cards
ink         #2a3550    texto de corpo
```

**Tipografia:**
- **Cormorant Garamond** (display, serif clássica, 500/600 + itálico)
- **Inter** (corpo, 300/400/500/600)

Ambas decorrem da tipografia da logo "BACK ADVOCACIA".

---

## ⚙️ Animações implementadas (do breakdown)

| Elemento | Transformação | Duração | Easing | Trigger |
|---|---|---|---|---|
| Topbar | box-shadow on/off | 350ms | cubic-bezier(.2,.7,.2,1) | scrollY > 20 |
| Hero h1 | opacity 0→1 + translateY(20→0) | 900ms | cubic-bezier(.2,.7,.2,1) | load + delay 250ms |
| Hero lede | mesmo h1 | 900ms | mesmo | load + delay 400ms |
| Hero CTA | mesmo | 900ms | mesmo | load + delay 550ms |
| Hero seal | mesmo | 900ms | mesmo | load + delay 700ms |
| Hero imagem | mesmo | 900ms | mesmo | load + delay 150ms |
| Marquee | translateX 0→-50% | 38s linear infinite | — | sempre |
| Cards impact/zigzag/etc | opacity + translateY | 800ms | cubic-bezier(.2,.7,.2,1) | IO threshold 0.12 |
| Foto Sandra | scale(1→1.02) | 1500ms linear | — | IO threshold 0.3 |
| FAQ summary | rotate(0→45°) | 350ms ease | — | open |
| WA FAB | opacity + scale(.6→1) | 400ms | cubic-bezier(.2,.9,.3,1.4) | scrollY > 80 ou timer 8s |
| WA balão | opacity + translateY + scale | 500ms | cubic-bezier(.2,.9,.3,1.2) | timer 15s pós-FAB |
| Typing dots | translateY oscilante | 1200ms ease-in-out | — | balão aberto |
| Mensagem balão | opacity 0→1 | 500ms ease | — | 2500ms pós-balão |
| Badge "1" | scale 0→1 | 350ms | cubic-bezier(.2,.9,.3,1.6) | 2000ms pós-close |
| Cookie banner | translateY(140%→0) | 500ms | cubic-bezier(.2,.7,.2,1) | 1800ms pós-load se sem consent |

**Respect motion:** `@media (prefers-reduced-motion: reduce)` desliga tudo.

---

## 🔍 SEO técnico (completo)

- ✅ Title 79 chars
- ✅ Description 174 chars
- ✅ Keywords focadas em advogado Leblon + tributarista
- ✅ Canonical em **HTTPS** (corrigido)
- ✅ Open Graph completo (incluindo width/height/alt)
- ✅ Twitter Card summary_large_image
- ✅ Schema JSON-LD com 4 entidades: LegalService + WebSite + WebPage + FAQPage
- ✅ `alternateName` fórmula AG5: `Advogado Leblon RJ - Back Advocacia | Direito Tributário | Direito Empresarial`
- ✅ 7 serviços no `hasOfferCatalog`
- ✅ `geo` com coordenadas reais do Leblon
- ✅ `areaServed` com Leblon + 4 bairros + Nova Iguaçu + Brasil
- ✅ `openingHoursSpecification` com sexta diferenciada (15h30)
- ✅ `founder` com Sandra + especialização
- ✅ `email`, `telephone`, `contactPoint`, `priceRange`, `foundingDate`
- ✅ `robots.txt` + `sitemap.xml` + `_headers` + `_redirects`
- ✅ Preload da imagem hero + dns-prefetch wa.me + preconnect fonts
- ✅ `width/height` em todas as imagens (anti-CLS)
- ✅ `loading="lazy"` + `fetchpriority="high"` corretos

---

## 🔒 LGPD / Conformidade OAB

- ✅ Banner de cookies com Accept/Decline persistente em localStorage
- ✅ `politica-de-privacidade.html` completa (LGPD 13.709/2018 + sigilo profissional)
- ✅ `termos.html` com Provimento 205/2021 CFOAB explicitamente citado
- ✅ Checkbox LGPD obrigatório no formulário
- ✅ Botão "Gerenciar Cookies" no rodapé
- ✅ Selo de conformidade Provimento 205/2021 no footer

---

## ✅ 10 critérios de finalização AG5 (re-aplicados)

- [x] Respiro — padding 120px desktop, 80px mobile
- [x] Mobile-first — breakpoints 560, 720, 820, 960
- [x] Minimalista + premium — 2 fontes, 7 cores, ornamento mínimo
- [x] Maiúscula cirúrgica — só em eyebrows, tags, CTAs (~8% do texto)
- [x] Enquadramento de pessoa — `object-position: center 22-28%` no hero/sandra
- [x] Mutex mídia — pré-instalado no script.js
- [x] Copy anti-IA — zero em-dash, voz da Sandra ("de-di-ca-do") usada literal
- [x] CTA não-óbvio — "Falar com a Dra. Sandra", "Quero orientação", "Conversar sobre minha empresa"
- [x] Animação contida — IntersectionObserver com threshold limpo, zero parallax bruto
- [x] Hierarquia única — uma `<h1>`, `<h2>` por seção, semântica clara

---

## 🚫 Diretrizes anti-genérico (aplicadas)

- ❌ Hero centralizado fundo escuro texto branco → ✅ Split assimétrico com imagem clip-path
- ❌ Fade-up igual em tudo → ✅ Hero stagger por delay + zig-zag entra alternado por lado + sandra com scale sticky
- ❌ Azul + branco + cinza → ✅ Navy profundo + champagne + ivory premium
- ❌ 3 colunas ícone + título + texto → ✅ Zig-zag com 2 blocos contrastantes + lista bulletada com hífen champagne (não ponto-ícone)

---

## ❗ Pendências críticas (cobrar da cliente em 1 mensagem)

Detalhadas em `Docs/Falta no esquema/falta-adicionar.md`. Resumo:

1. **OAB/RJ** da Sandra (Provimento 205/2021)
2. **CNPJ + razão social** (legalName)
3. **Link Google Business Profile** (aggregateRating + carrossel reviews)
4. **Confirmação e-mail** (`contato@back.adv.br` foi extraído do site antigo)
5. **IDs tracking** (manter `GTM-PKBKMRG` + Clarity `ly1328cuhs` do site antigo?)
6. **3-5 fotos** adicionais do escritório + retrato isolado
7. **Decisão Compliance** (área que estava no site antigo, omitida no briefing)

---

## 🚀 Deploy

```bash
# Cloudflare Pages
projeto: back-advocacia
build command: (vazio, site estático)
output: /
domínio: back-advocacia.ag5agencia.site

# Hostinger DNS
CNAME: back-advocacia → back-advocacia.pages.dev
overwrite: false
```

**Validar pós-deploy:**
- https://validator.schema.org/ (com URL do site)
- https://search.google.com/test/rich-results
- `/psi-audit` para PageSpeed online
