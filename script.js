/* ======================================================================
   Back Advocacia · script.js
   Vanilla ES6, sem framework. IntersectionObserver para tudo de scroll.
   Padrão AG5: mutex mídia + balão WA Lumina + form validation + cookie LGPD
   ====================================================================== */

(function(){
  'use strict';

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ----------- ANO RODAPÉ ----------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------- TOPBAR SCROLLED STATE ----------- */
  const topbar = $('#topbar');
  if (topbar){
    const setTopbar = () => {
      if (window.scrollY > 20) topbar.classList.add('is-scrolled');
      else topbar.classList.remove('is-scrolled');
    };
    setTopbar();
    window.addEventListener('scroll', setTopbar, { passive: true });
  }

  /* ----------- MOBILE NAV ----------- */
  const navToggle = $('#nav-toggle');
  const nav = $('.nav');
  if (navToggle && nav){
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------- HERO ANIMATIONS ON LOAD ----------- */
  window.addEventListener('load', () => {
    $$('[data-anim]').forEach(el => el.classList.add('is-in'));
  });

  /* ----------- REVEAL ON SCROLL (IntersectionObserver) ----------- */
  const revealSelectors = [
    '.section__title', '.section__eyebrow', '.section__title--display',
    '.impact__card', '.zigzag__inner', '.manifesto__text',
    '.sandra__text', '.faq__item', '.local__grid', '.cta-form__grid',
    '.sandra__stats', '.sandra__meta'
  ];
  $$(revealSelectors.join(',')).forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ----------- SANDRA PHOTO STICKY ZOOM ----------- */
  const sandraPhoto = $('.sandra__photo');
  if (sandraPhoto){
    const ioSandra = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) sandraPhoto.classList.add('is-in');
        else sandraPhoto.classList.remove('is-in');
      });
    }, { threshold: 0.3 });
    ioSandra.observe(sandraPhoto);
  }

  /* ----------- FAQ ACORDEÃO EXCLUSIVO ----------- */
  const faqItems = $$('.faq__item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open){
        faqItems.forEach(other => { if (other !== item) other.open = false; });
      }
    });
  });

  /* ----------- SMOOTH ANCHOR (com offset do topbar) ----------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '#main') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ----------- FORM VALIDATION ES6 ----------- */
  const form = $('#contact-form');
  if (form){
    const fNome     = $('#f-nome');
    const fTelefone = $('#f-telefone');
    const fEmail    = $('#f-email');
    const fArea     = $('#f-area');
    const fMsg      = $('#f-msg');
    const fLgpd     = $('#f-lgpd');
    const success   = $('#form-success');

    const telRegex   = /^(\+?55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const setError = (input, errEl, msg) => {
      const field = input.closest('.field');
      if (msg){
        field.classList.add('is-invalid');
        errEl.textContent = msg;
        return false;
      } else {
        field.classList.remove('is-invalid');
        errEl.textContent = '';
        return true;
      }
    };

    // Máscara leve de telefone
    fTelefone.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      e.target.value = v;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      ok &= setError(fNome,     $('#err-nome'),     fNome.value.trim().length >= 3 ? '' : 'Informe seu nome completo.');
      ok &= setError(fTelefone, $('#err-telefone'), telRegex.test(fTelefone.value) ? '' : 'Telefone inválido. Ex: (21) 98000-0000.');
      ok &= setError(fEmail,    $('#err-email'),    emailRegex.test(fEmail.value) ? '' : 'E-mail inválido.');
      ok &= setError(fArea,     $('#err-area'),     fArea.value ? '' : 'Selecione a área de interesse.');
      ok &= setError(fMsg,      $('#err-msg'),      fMsg.value.trim().length >= 10 ? '' : 'Conte um pouco mais sobre o seu caso.');

      if (!fLgpd.checked){
        alert('Para enviar, você precisa autorizar o contato conforme a Política de Privacidade.');
        ok = false;
      }
      if (!ok) return;

      // Encaminhamento via WhatsApp (sem backend, apropriado pra LP estática)
      const msg = `Olá Dra. Sandra, vim pelo site.%0A%0A` +
                  `*Nome:* ${encodeURIComponent(fNome.value)}%0A` +
                  `*Telefone:* ${encodeURIComponent(fTelefone.value)}%0A` +
                  `*E-mail:* ${encodeURIComponent(fEmail.value)}%0A` +
                  `*Área:* ${encodeURIComponent(fArea.value)}%0A%0A` +
                  `${encodeURIComponent(fMsg.value)}`;
      window.open(`https://wa.me/5521980326008?text=${msg}`, '_blank', 'noopener');

      success.hidden = false;
      form.reset();
      setTimeout(() => { success.hidden = true; }, 8000);
    });
  }

  /* ----------- COOKIE BANNER LGPD ----------- */
  const cookieEl = $('#cookie');
  const cookieAccept = $('#cookie-accept');
  const cookieDecline = $('#cookie-decline');
  const reopenCookie = $('#reopen-cookie');
  const COOKIE_KEY = 'back-advocacia-cookie-consent';

  const openCookie = () => {
    cookieEl.classList.add('is-open');
    cookieEl.setAttribute('aria-hidden', 'false');
  };
  const closeCookie = (decision) => {
    cookieEl.classList.remove('is-open');
    cookieEl.setAttribute('aria-hidden', 'true');
    try { localStorage.setItem(COOKIE_KEY, decision); } catch(_){}
  };

  try {
    if (!localStorage.getItem(COOKIE_KEY)) setTimeout(openCookie, 1800);
  } catch(_){ setTimeout(openCookie, 1800); }

  if (cookieAccept)  cookieAccept.addEventListener('click', () => closeCookie('accepted'));
  if (cookieDecline) cookieDecline.addEventListener('click', () => closeCookie('declined'));
  if (reopenCookie)  reopenCookie.addEventListener('click', openCookie);

})();

/* ──────────────────────────────────────────────
   WHATSAPP PREMIUM — Balão flutuante (AG5 V4)

   Timeline:
     • t=0s  → usuário chega na 3ª seção (#dor) → botão verde aparece imediatamente
     • t=25s → balão sobe ("digitando..." por 2.5s → mensagem real)
     • t=40s → balão some automaticamente (visível por 15s)

   Modo Compliance (advocacia — OAB Provimento 205/2021): sem badge de notificação.
─────────────────────────────────────────────── */
(function initWaPremium() {
  const MODO_COMPLIANCE = true; // advocacia = nicho rigoroso → SEM badge

  const bubble        = document.getElementById('wa-message-bubble');
  const typing        = document.getElementById('wa-typing');
  const realMessage   = document.getElementById('wa-real-message');
  const badge         = document.getElementById('wa-notification');
  const closeBtn      = document.getElementById('wa-close-btn');
  const mainBtn       = document.getElementById('wa-main-btn');
  const targetSection = document.getElementById('dor');

  if (!bubble || !typing || !realMessage || !closeBtn || !mainBtn || !targetSection) return;

  const DELAY_BALAO            = 25000;
  const DURATION_TYPING        = 2500;
  const DURATION_BALAO_VISIVEL = 15000;
  const DELAY_BADGE_APOS_SUMIR = 5000;

  let triggered = false;
  let autoHideTimer = null;
  let badgeTimer = null;
  let userClosed = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;

        mainBtn.classList.add('visible');

        setTimeout(() => {
          if (userClosed) return;
          bubble.classList.add('show');

          setTimeout(() => {
            if (userClosed) return;
            typing.classList.add('is-hidden');
            realMessage.classList.add('is-visible');
            requestAnimationFrame(() => realMessage.classList.add('is-in'));
          }, DURATION_TYPING);

          autoHideTimer = setTimeout(() => {
            if (userClosed) return;
            bubble.classList.remove('show');

            if (!MODO_COMPLIANCE && badge) {
              badgeTimer = setTimeout(() => {
                if (userClosed) return;
                badge.classList.add('show');
              }, DELAY_BADGE_APOS_SUMIR);
            }
          }, DURATION_BALAO_VISIVEL);
        }, DELAY_BALAO);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(targetSection);

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    userClosed = true;
    bubble.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
    if (!MODO_COMPLIANCE && badge) {
      setTimeout(() => { badge.classList.add('show'); }, DELAY_BADGE_APOS_SUMIR);
    }
  });

  mainBtn.addEventListener('click', () => {
    bubble.classList.remove('show');
    if (badge) badge.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
  });
})();
