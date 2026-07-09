/* ===================================================
   STARK HEALTH — JavaScript
   Animations, Scroll Effects, Counters
   =================================================== */

'use strict';

// ─── DOM READY ───
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
  initActiveNav();
  setCurrentYear();
});


// ═══════════════════════════════════════
// HEADER — Scroll behavior
// ═══════════════════════════════════════
function initHeader() {
  const header = document.getElementById('header');
  const logo = document.getElementById('headerLogo');
  if (!header) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 60;

    header.classList.toggle('scrolled', scrolled);

    if (logo) {
      logo.src = scrolled ? 'logos/logoUse.png' : 'logos/logoUse2.png';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}


// ═══════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('navMenu');
  if (!toggle || !nav) return;

  const navLinks = nav.querySelectorAll('.header__nav-link');

  const openMenu = () => {
    nav.classList.add('mobile-open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    nav.classList.remove('mobile-open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
}


// ═══════════════════════════════════════
// SCROLL ANIMATIONS — Intersection Observer
// ═══════════════════════════════════════
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);

        setTimeout(() => {
          el.classList.add('in-view');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


// ═══════════════════════════════════════
// COUNTERS — Animated number counting
// ═══════════════════════════════════════
function initCounters() {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const counter  = el.querySelector('.counter');
    if (!counter) return;

    const duration  = 2000;
    const startTime = performance.now();

    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const update = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOut(progress) * target);

      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach(stat => observer.observe(stat));
}


// ═══════════════════════════════════════
// SMOOTH SCROLL — Native with offset for fixed header
// ═══════════════════════════════════════
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  const headerH = 80;

  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


// ═══════════════════════════════════════
// ACTIVE NAV — Highlight current section
// ═══════════════════════════════════════
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-80px 0px -35% 0px'
  });

  sections.forEach(section => observer.observe(section));
}


// ═══════════════════════════════════════
// CURRENT YEAR
// ═══════════════════════════════════════
function setCurrentYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}


// ═══════════════════════════════════════
// PARALLAX — Subtle hero glow movement
// ═══════════════════════════════════════
(function initParallax() {
  const glow1 = document.querySelector('.hero__bg-glow--1');
  const glow2 = document.querySelector('.hero__bg-glow--2');

  if (!glow1 || !glow2) return;

  let lastX = 0;
  let lastY = 0;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    // Smooth lerp
    lastX += (dx - lastX) * 0.05;
    lastY += (dy - lastY) * 0.05;

    const moveX = lastX * 30;
    const moveY = lastY * 20;

    glow1.style.transform = `translate(${moveX}px, ${moveY}px)`;
    glow2.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
  }, { passive: true });
})();


// ═══════════════════════════════════════
// CARD TILT — Subtle 3D hover on solution cards
// ═══════════════════════════════════════
(function initCardTilt() {
  const cards = document.querySelectorAll('.solution-card, .numbers__stat');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) * 5;

      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
})();


// ═══════════════════════════════════════
// HERO STAT BADGE — Typing animation
// ═══════════════════════════════════════
(function initHeroAnimations() {
  // Stagger hero elements on load
  const heroElements = document.querySelectorAll('.hero [data-animate]');
  
  setTimeout(() => {
    heroElements.forEach((el, i) => {
      const delay = parseInt(el.dataset.delay || i * 100, 10);
      setTimeout(() => {
        el.classList.add('in-view');
      }, delay);
    });
  }, 200);
})();
