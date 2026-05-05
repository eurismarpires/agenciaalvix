/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- Mobile menu ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- Reveal on scroll ---- */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ---- Portfolio filter ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.display = match ? '' : 'none';
      item.style.animation = match ? 'fadeIn 0.4s ease forwards' : '';
    });
  });
});

/* ---- Testimonials slider ---- */
const track = document.getElementById('testimonialTrack');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
const dotsContainer = document.getElementById('sliderDots');
let current = 0;

function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Depoimento ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  });
}

function goTo(index) {
  current = (index + cards.length) % cards.length;
  if (!track) return;
  track.style.transform = `translateX(-${current * 100}%)`;
  track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
  track.style.display = 'flex';
  dotsContainer && dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

if (track && cards.length) {
  track.style.display = 'flex';
  track.querySelectorAll('.testimonial-card').forEach(c => {
    c.style.minWidth = '100%';
  });
  buildDots();
  document.getElementById('prevBtn')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn')?.addEventListener('click', () => goTo(current + 1));

  // Auto-play
  let autoPlay = setInterval(() => goTo(current + 1), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goTo(current + 1), 5000);
  });
}

/* ---- Contact form ---- */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    setTimeout(() => {
      successMsg.hidden = false;
      form.reset();
      submitBtn.textContent = 'Enviar mensagem';
      submitBtn.disabled = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
  });
}

/* ---- Smooth active nav link ---- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = scrollY >= top && scrollY < top + height ? 'var(--gold)' : '';
    }
  });
});
