(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const portrait = document.querySelector('.portrait-wrap img');
  if (portrait) {
    fetch('assets/photo.b64')
      .then((response) => {
        if (!response.ok) throw new Error('Portrait asset unavailable');
        return response.text();
      })
      .then((encoded) => {
        portrait.src = `data:image/jpeg;base64,${encoded.trim()}`;
      })
      .catch(() => {
        portrait.src = 'https://avatars.githubusercontent.com/u/239671688?v=4';
      });
  }

  document.querySelectorAll('a[href$="Guillermo-Barbeito-CV.pdf"]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(link.getAttribute('href'), { method: 'HEAD' });
        if (!response.ok) throw new Error('PDF not available');
        window.location.href = link.getAttribute('href');
      } catch (_) {
        window.location.href = 'cv.html';
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
