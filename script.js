(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const linkedinUrl = 'https://www.linkedin.com/in/guillermo-barbeito-040632340/';

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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  const contactActions = document.querySelector('.contact-actions');
  if (contactActions && !contactActions.querySelector('[data-linkedin]')) {
    const linkedinLink = document.createElement('a');
    linkedinLink.className = 'contact-line';
    linkedinLink.href = linkedinUrl;
    linkedinLink.target = '_blank';
    linkedinLink.rel = 'noopener noreferrer';
    linkedinLink.dataset.linkedin = 'true';
    linkedinLink.setAttribute('aria-label', 'Ver el perfil de Guillermo Barbeito en LinkedIn');
    linkedinLink.innerHTML = '<span>LINKEDIN</span><strong>Guillermo Barbeito</strong><i>↗</i>';

    const githubLink = Array.from(contactActions.querySelectorAll('.contact-line'))
      .find((link) => link.href.includes('github.com'));

    if (githubLink) {
      githubLink.insertAdjacentElement('afterend', linkedinLink);
    } else {
      contactActions.appendChild(linkedinLink);
    }
  }

  const personSchema = document.querySelector('script[type="application/ld+json"]');
  if (personSchema) {
    try {
      const structuredData = JSON.parse(personSchema.textContent);
      const sameAs = Array.isArray(structuredData.sameAs) ? structuredData.sameAs : [];
      if (!sameAs.includes(linkedinUrl)) sameAs.push(linkedinUrl);
      structuredData.sameAs = sameAs;
      personSchema.textContent = JSON.stringify(structuredData, null, 2);
    } catch (error) {
      console.warn('No se pudo actualizar el perfil de LinkedIn en los datos estructurados.', error);
    }
  }

  const projectArt = document.querySelector('.project-feature-art');
  if (projectArt) {
    const videoStyles = document.createElement('style');
    videoStyles.textContent = `
      .project-feature-art.has-project-video::before { display: none; }
      .project-feature-art.has-project-video { background: #08090b; }
      .project-feature-video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      .project-video-overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(8,9,11,.08) 45%, rgba(8,9,11,.35) 100%),
          linear-gradient(90deg, rgba(218,59,50,.08), transparent 42%);
      }
      .project-feature-art.has-project-video .project-number {
        z-index: 2;
        text-shadow: 0 1px 8px rgba(0,0,0,.85);
      }
    `;
    document.head.appendChild(videoStyles);

    projectArt.classList.add('has-project-video');
    projectArt.innerHTML = `
      <video class="project-feature-video" muted loop playsinline preload="metadata" aria-hidden="true" tabindex="-1">
        <source src="ntdqiasa_video_v5_web.mp4" type="video/mp4">
      </video>
      <div class="project-video-overlay" aria-hidden="true"></div>
      <span class="project-number">A-01</span>
    `;

    const projectVideo = projectArt.querySelector('.project-feature-video');
    if (projectVideo && !prefersReduced) {
      projectVideo.autoplay = true;
      projectVideo.play().catch(() => {
        // El primer cuadro permanece visible si el navegador bloquea el autoplay.
      });
    }
  }

  const revealItems = document.querySelectorAll('.reveal');

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