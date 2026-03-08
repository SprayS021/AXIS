/* ── script.js — AXIS FiveM Website ── */

// ── Navbar scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Mobile menu toggle ──
const toggle    = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  const spans = toggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ── Reveal on scroll ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Slight stagger for children in the same parent
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── AXIS logo: show fallback if image fails to load ──
const axisImg = document.querySelector('.axis-logo-img');
const axisLogoFallback = document.getElementById('axisLogoFallback');

if (axisImg) {
  axisImg.addEventListener('load', () => {
    if (axisLogoFallback) axisLogoFallback.style.display = 'none';
  });
  axisImg.addEventListener('error', () => {
    axisImg.style.display = 'none';
    if (axisLogoFallback) axisLogoFallback.style.display = 'flex';
  });
  // If already loaded (cached)
  if (axisImg.complete && axisImg.naturalWidth > 0) {
    if (axisLogoFallback) axisLogoFallback.style.display = 'none';
  }
}

// ── Parallax glow on hero ──
document.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.axis-glow');
  if (!glow) return;
  const xFactor = (e.clientX / window.innerWidth  - 0.5) * 20;
  const yFactor = (e.clientY / window.innerHeight - 0.5) * 20;
  glow.style.transform = `translate(calc(-50% + ${xFactor}px), calc(-50% + ${yFactor}px))`;
}, { passive: true });

// ── Trigger initial reveal for hero (above fold) ──
document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
  setTimeout(() => el.classList.add('revealed'), 200 + i * 150);
});
