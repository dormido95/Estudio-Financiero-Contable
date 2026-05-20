/* =========================================================
   ESTUDIOS · Interacciones livianas
   ========================================================= */

(() => {
  'use strict';

  /* ---- Scroll reveal con IntersectionObserver ---- */
  const revealTargets = document.querySelectorAll(
    '.service, .team__card, .method__step, .hero__stats li, .about__quote, .about__text p'
  );

  if (revealTargets.length && 'IntersectionObserver' in window) {
    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const delay = (i % 6) * 60; // escalonado por grupo visible
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }, delay);
          io.unobserve(target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach((el) => io.observe(el));
  }

  /* ---- Topbar: cambio sutil al scrollear ---- */
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const onScroll = () => {
      if (window.scrollY > 30) {
        topbar.style.borderBottomColor = 'var(--line)';
        topbar.style.boxShadow = '0 1px 0 rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04)';
      } else {
        topbar.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Landing: precarga al hover para entrada instantánea ---- */
  const sides = document.querySelectorAll('.side');
  sides.forEach((side) => {
    let prefetched = false;
    side.addEventListener('mouseenter', () => {
      if (prefetched) return;
      const href = side.getAttribute('href');
      if (!href) return;
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
      prefetched = true;
    });
  });

  /* ---- Cursor magnético sutil en el switch del topbar ---- */
  const switchBtn = document.querySelector('.topbar__switch');
  if (switchBtn && window.matchMedia('(hover: hover)').matches) {
    switchBtn.addEventListener('mousemove', (e) => {
      const rect = switchBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      switchBtn.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
    });
    switchBtn.addEventListener('mouseleave', () => {
      switchBtn.style.transform = '';
    });
  }

})();
