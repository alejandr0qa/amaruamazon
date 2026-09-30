/**
 * SUMAK KAWSAY – main.js
 * Interactividad, animaciones, pasarela de pago
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== LOADER ========== */
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initParticles();
  }, 2200);

  /* ========== NAVBAR SCROLL ========== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ========== HAMBURGER MENU ========== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ========== SCROLL REVEAL ========== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ========== PARTICLES ========== */
  function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.setProperty('--dur', (4 + Math.random() * 8) + 's');
      p.style.setProperty('--delay', (Math.random() * 6) + 's');
      p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
      container.appendChild(p);
    }
  }

  /* ========== GALLERY LIGHTBOX ========== */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const galItems = document.querySelectorAll('.gal-item img');
  let currentIdx = 0;
  const imgSrcs = Array.from(galItems).map(i => i.src);

  function openLightbox(idx) {
    currentIdx = idx;
    lbImg.src = imgSrcs[idx];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function nextImg() { openLightbox((currentIdx + 1) % imgSrcs.length); }
  function prevImg() { openLightbox((currentIdx - 1 + imgSrcs.length) % imgSrcs.length); }

  galItems.forEach((img, idx) => img.parentElement.addEventListener('click', () => openLightbox(idx)));
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-next').addEventListener('click', nextImg);
  document.getElementById('lightbox-prev').addEventListener('click', prevImg);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
  });

  /* ========== TESTIMONIALS SLIDER ========== */
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let testIdx = 0;
  let testTimer;

  function showTestimonial(idx) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    testimonials[idx].classList.add('active');
    dots[idx].classList.add('active');
    testIdx = idx;
  }

  function startTestAutoplay() {
    testTimer = setInterval(() => {
      showTestimonial((testIdx + 1) % testimonials.length);
    }, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(testTimer);
      showTestimonial(parseInt(dot.getAttribute('data-idx')));
      startTestAutoplay();
    });
  });
  startTestAutoplay();

  /* ========== PRICE ESTIMATOR ========== */
  const prices = {
    fullday:  { label: 'Full Day',           perPerson: 200 },
    aventura: { label: 'Aventura Profunda',  perPerson: 320 },
    mixto:    { label: 'Mixto',              perPerson: 260 },
    custom:   { label: 'Personalizado',      perPerson: 300 },
  };

  function updateEstimator() {
    const pkg = document.getElementById('f_package').value;
    const ppl = parseInt(document.getElementById('f_people').value) || 1;
    const info = prices[pkg] || prices.fullday;
    const total = info.perPerson * ppl;
    const deposit = Math.round(total * 0.3);

    document.getElementById('pe_pkg').textContent = info.label;
    document.getElementById('pe_ppl').textContent = ppl;
    document.getElementById('pe_price').textContent = 'USD $' + total;
    document.getElementById('pay_amount').textContent = 'USD $' + deposit;
  }

  document.getElementById('f_package').addEventListener('change', updateEstimator);
  document.getElementById('f_people').addEventListener('input', updateEstimator);
  updateEstimator();

  /* ========== PACKAGE CARDS -> SELECT FORM ========== */
  document.querySelectorAll('[data-package]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkg = btn.getAttribute('data-package');
      const map = { 'Full Day': 'fullday', 'Aventura Profunda': 'aventura', 'Mixto': 'mixto' };
      if (map[pkg]) {
        document.getElementById('f_package').value = map[pkg];
        updateEstimator();
      }
    });
  });

  /* ========== PAYMENT FLOW ========== */
  const proceedBtn = document.getElementById('proceedPayment');
  const stepContact = document.getElementById('step-contact');
  const stepMethod  = document.getElementById('step-method');
  const stepConfirm = document.getElementById('step-confirm');

  function showStep(step) {
    [stepContact, stepMethod, stepConfirm].forEach(s => s.classList.remove('active'));
    step.classList.add('active');
    step.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function validateForm() {
    const name  = document.getElementById('f_name').value.trim();
    const email = document.getElementById('f_email').value.trim();
    const date  = document.getElementById('f_date').value;

    // Update checklist
    document.getElementById('check-name').classList.toggle('done', name.length > 2);
    document.getElementById('check-email').classList.toggle('done', email.includes('@'));
    document.getElementById('check-pkg').classList.add('done');
    document.getElementById('check-date').classList.toggle('done', date !== '');

    return name.length > 2 && email.includes('@');
  }

  proceedBtn.addEventListener('click', () => {
    if (validateForm()) {
      showStep(stepMethod);
    } else {
      proceedBtn.classList.add('shake');
      setTimeout(() => proceedBtn.classList.remove('shake'), 600);
      // Highlight missing fields
      const name = document.getElementById('f_name');
      const email = document.getElementById('f_email');
      if (!name.value.trim()) name.focus();
      else if (!email.value.includes('@')) email.focus();
    }
  });

  /* ========== PAYMENT METHODS SWITCH ========== */
  const methodBtns = document.querySelectorAll('.pay-method-btn');
  const cardForm    = document.getElementById('cardForm');
  const paypalForm  = document.getElementById('paypalForm');
  const pseForm     = document.getElementById('pseForm');
  const cashForm    = document.getElementById('cashForm');

  methodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      methodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const method = btn.getAttribute('data-method');
      cardForm.style.display   = method === 'card'   ? 'flex' : 'none';
      paypalForm.style.display = method === 'paypal' ? 'flex' : 'none';
      pseForm.style.display    = method === 'pse'    ? 'flex' : 'none';
      cashForm.style.display   = method === 'cash'   ? 'flex' : 'none';
    });
  });

  /* ========== CARD INPUT FORMATTING ========== */
  const cardNumberInput = document.getElementById('card_number');
  const cardNameInput   = document.getElementById('card_name');
  const cardExpInput    = document.getElementById('card_exp');
  const dispNumber = document.getElementById('disp_number');
  const dispHolder = document.getElementById('disp_holder');
  const dispExp    = document.getElementById('disp_exp');

  cardNumberInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    v = v.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = v;
    dispNumber.textContent = v || '•••• •••• •••• ••••';
  });
  cardNameInput.addEventListener('input', (e) => {
    dispHolder.textContent = e.target.value.toUpperCase() || 'NOMBRE TITULAR';
  });
  cardExpInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
    dispExp.textContent = v || 'MM/AA';
  });

  /* ========== PAY NOW BUTTON ========== */
  document.getElementById('payNowBtn').addEventListener('click', () => {
    const num = document.getElementById('card_number').value.replace(/\s/g,'');
    const name = document.getElementById('card_name').value.trim();
    const exp  = document.getElementById('card_exp').value;
    const cvv  = document.getElementById('card_cvv').value;

    if (num.length < 16 || !name || exp.length < 5 || cvv.length < 3) {
      showNotification('⚠️ Por favor completa todos los datos de la tarjeta', 'error');
      return;
    }
    processPayment();
  });

  document.getElementById('paypalBtn').addEventListener('click', processPayment);
  document.getElementById('pseBtn').addEventListener('click', processPayment);
  document.getElementById('cashBtn').addEventListener('click', () => {
    showConfirmation('cash');
  });

  function processPayment() {
    const payBtn = document.getElementById('payNowBtn');
    payBtn.innerHTML = '<span class="spinner">⏳</span> Procesando...';
    payBtn.disabled = true;

    setTimeout(() => {
      showConfirmation('card');
    }, 2500);
  }

  function showConfirmation(method) {
    const name  = document.getElementById('f_name').value.trim();
    const email = document.getElementById('f_email').value.trim();
    const pkg   = document.getElementById('f_package');
    const pkgLabel = pkg.options[pkg.selectedIndex].text;
    const date  = document.getElementById('f_date').value;
    const people = document.getElementById('f_people').value;

    const details = document.getElementById('confirmDetails');
    const t = window.translations[window.applyTranslations ? currentLang : 'es'];

    details.innerHTML = `
      <div>👤 ${name}</div>
      <div>✉️ ${email}</div>
      <div>🌿 ${pkgLabel} · ${people} persona${people > 1 ? 's' : ''}</div>
      <div>📅 ${date || '—'}</div>
      <div>💰 ${method === 'cash' ? 'Pago en destino' : 'Depósito pagado ✓'}</div>
    `;

    showStep(stepConfirm);
    launchConfetti();
    showNotification('🎉 ¡Reserva confirmada! Revisa tu email.', 'success');
  }

  /* ========== NOTIFICATION TOAST ========== */
  function showNotification(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
      background:${type === 'success' ? 'var(--green-vivid)' : type === 'error' ? '#c0392b' : 'var(--glass)'};
      color:#fff; padding:14px 28px; border-radius:40px;
      font-size:0.9rem; font-weight:600; z-index:9999;
      box-shadow:0 8px 32px rgba(0,0,0,0.4);
      animation:fadeUp 0.4s ease forwards;
      font-family:var(--font-body);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 4000);
  }

  /* ========== CONFETTI ========== */
  function launchConfetti() {
    const colors = ['#5dde7a','#c9a84c','#2e8b57','#f5a623','#fff'];
    for (let i = 0; i < 80; i++) {
      const c = document.createElement('div');
      c.style.cssText = `
        position:fixed;
        left:${Math.random() * 100}vw;
        top:-10px;
        width:${6 + Math.random() * 8}px;
        height:${6 + Math.random() * 8}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        z-index:9999;
        pointer-events:none;
        animation: confettiFall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 1}s forwards;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }

    if (!document.querySelector('#confettiStyle')) {
      const style = document.createElement('style');
      style.id = 'confettiStyle';
      style.textContent = `
        @keyframes confettiFall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .shake {
          animation: shake 0.6s ease !important;
        }
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ========== SOUND AMBIENT TOGGLE ========== */
  const soundBtn  = document.getElementById('soundBtn');
  const soundIcon = document.getElementById('soundIcon');
  let soundPlaying = false;

  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  function createJungleSound() {
    const nodes = [];
    // Generate soft ambient sound with oscillators
    [110, 220, 330, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i < 2 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      gain.gain.value = i < 2 ? 0.02 : 0.005;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      nodes.push({ osc, gain });
    });
    return nodes;
  }

  let soundNodes = null;
  soundBtn.addEventListener('click', () => {
    if (!soundPlaying) {
      if (ctx.state === 'suspended') ctx.resume();
      soundNodes = createJungleSound();
      soundIcon.textContent = '🔊';
      soundPlaying = true;
    } else {
      soundNodes?.forEach(({ osc, gain }) => {
        gain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
        setTimeout(() => osc.stop(), 500);
      });
      soundNodes = null;
      soundIcon.textContent = '🔇';
      soundPlaying = false;
    }
  });

  /* ========== SMOOTH SCROLL NAV ========== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ========== PARALLAX HERO ========== */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1.08) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });

  /* ========== COUNTER ANIMATION ========== */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        let current = 0;
        const step = num / 40;
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          el.textContent = Math.floor(current) + suffix;
          if (current >= num) clearInterval(timer);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  /* ========== CURRENT DATE MIN ========== */
  const dateInput = document.getElementById('f_date');
  if (dateInput) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  console.log('%c🌿 Sumak Kawsay – Espíritu de la Selva', 'font-size:1.2rem;color:#5dde7a;font-weight:bold;');
  console.log('%c«Armonía entre los seres humanos, la comunidad y la Madre Tierra»', 'color:#c9a84c;font-style:italic;');
});
