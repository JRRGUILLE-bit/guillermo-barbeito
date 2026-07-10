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

  const installCodeBackground = () => {
    if (document.querySelector('.code-background')) return;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'code-background.css';
    document.head.appendChild(stylesheet);

    const phrases = [
      ['status', '> READING REPOSITORY'],
      ['code', 'const signal = await locate("MONTEVIDEO");'],
      ['dim', '// scanning production pipeline...'],
      ['accent', 'ACCESS GRANTED'],
      ['code', 'git diff --staged'],
      ['status', '> GENERATING PATCH'],
      ['code', 'renderQueue.push("final_cut_v7");'],
      ['dim', 'uplink latency: 12ms'],
      ['code', 'if (deadline < 48h) ship();'],
      ['accent', 'HANDSHAKE ACCEPTED'],
      ['code', 'camera.feed.locked = true;'],
      ['status', '> RUNNING CHECKS'],
      ['dim', 'decrypting scene_06.mov'],
      ['code', 'checksum(source) === checksum(copy)'],
      ['accent', 'SYSTEM ONLINE'],
      ['code', 'trace.route("production-grid");'],
      ['dim', '// enhancing frame...'],
      ['status', '> VIEWING DIFF'],
      ['code', 'sudo make it_cinematic'],
      ['accent', 'AUTH TOKEN VERIFIED'],
      ['code', 'mixdown.complete = true;'],
      ['dim', 'tracking target... locked'],
      ['status', '> READY FOR REVIEW'],
      ['code', 'deploy({ branch: "main" });'],
      ['accent', 'NO SIGNAL LOST'],
      ['dim', 'operator: GB / channel: A'],
      ['code', 'while (idea) { build(); test(); }'],
      ['status', '> COMPILING CREATIVE SYSTEMS']
    ];

    const positions = [
      { left: '3%', top: '13%', width: '29rem', opacity: '.46', delay: 250 },
      { left: '67%', top: '11%', width: '27rem', opacity: '.38', delay: 1550 },
      { left: '8%', top: '39%', width: '25rem', opacity: '.32', delay: 2850 },
      { left: '55%', top: '34%', width: '31rem', opacity: '.42', delay: 900 },
      { left: '73%', top: '61%', width: '24rem', opacity: '.48', delay: 3650 },
      { left: '16%', top: '73%', width: '30rem', opacity: '.36', delay: 2100 },
      { left: '44%', top: '84%', width: '28rem', opacity: '.3', delay: 4450 }
    ];

    const background = document.createElement('div');
    background.className = 'code-background';
    background.setAttribute('aria-hidden', 'true');

    const randomBetween = (minimum, maximum) => (
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    );

    const startTypingCycle = (fragment, textNode, slotIndex, phraseIndex) => {
      const [kind, phrase] = phrases[phraseIndex % phrases.length];
      fragment.className = `code-fragment code-fragment-${kind}`;
      textNode.textContent = '';

      window.requestAnimationFrame(() => fragment.classList.add('is-visible'));

      let characterIndex = 0;
      const typeNextCharacter = () => {
        textNode.textContent = phrase.slice(0, characterIndex + 1);
        characterIndex += 1;

        if (characterIndex < phrase.length) {
          window.setTimeout(typeNextCharacter, randomBetween(28, 58));
          return;
        }

        window.setTimeout(() => {
          fragment.classList.remove('is-visible');

          window.setTimeout(() => {
            const nextPhraseIndex = phraseIndex + 3 + slotIndex;
            window.setTimeout(
              () => startTypingCycle(fragment, textNode, slotIndex, nextPhraseIndex),
              randomBetween(900, 2600)
            );
          }, 480);
        }, randomBetween(2200, 4300));
      };

      window.setTimeout(typeNextCharacter, randomBetween(120, 420));
    };

    positions.forEach((position, slotIndex) => {
      const fragment = document.createElement('div');
      fragment.className = 'code-fragment';
      fragment.style.setProperty('--fragment-left', position.left);
      fragment.style.setProperty('--fragment-top', position.top);
      fragment.style.setProperty('--fragment-width', position.width);
      fragment.style.setProperty('--fragment-opacity', position.opacity);

      const textNode = document.createElement('span');
      textNode.className = 'code-fragment-text';

      const cursor = document.createElement('i');
      cursor.className = 'code-cursor';

      fragment.append(textNode, cursor);
      background.appendChild(fragment);

      const firstPhraseIndex = (slotIndex * 4) % phrases.length;
      if (prefersReduced) {
        const [kind, phrase] = phrases[firstPhraseIndex];
        fragment.className = `code-fragment code-fragment-${kind} is-visible`;
        textNode.textContent = phrase;
      } else {
        window.setTimeout(
          () => startTypingCycle(fragment, textNode, slotIndex, firstPhraseIndex),
          position.delay
        );
      }
    });

    document.body.prepend(background);
  };

  installCodeBackground();

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    if (!heroVisual.querySelector('.camera-hud')) {
      const cameraHud = document.createElement('div');
      cameraHud.className = 'camera-hud';
      cameraHud.setAttribute('aria-hidden', 'true');
      cameraHud.innerHTML = `
        <div class="camera-safe-frame"></div>
        <div class="camera-grid"></div>
        <div class="camera-corners">
          <i class="camera-corner camera-corner-tl"></i>
          <i class="camera-corner camera-corner-tr"></i>
          <i class="camera-corner camera-corner-bl"></i>
          <i class="camera-corner camera-corner-br"></i>
        </div>
      `;
      heroVisual.appendChild(cameraHud);
    }

    const recLabel = heroVisual.querySelector('.frame-label-bottom');
    if (recLabel) {
      recLabel.innerHTML = '<span class="rec-indicator"><i></i> REC</span><span>ISO 800 / 24 FPS</span>';
    }

    const timecode = heroVisual.querySelector('.timecode');
    if (timecode) {
      timecode.setAttribute('aria-hidden', 'true');

      if (!prefersReduced) {
        const fps = 24;
        const startFrames = (((4 * 60) + 27) * 60 * fps) + 18;
        let startTimestamp;
        let lastRenderedFrame = -1;

        const formatTimecode = (totalFrames) => {
          const frames = totalFrames % fps;
          const totalSeconds = Math.floor(totalFrames / fps);
          const seconds = totalSeconds % 60;
          const totalMinutes = Math.floor(totalSeconds / 60);
          const minutes = totalMinutes % 60;
          const hours = Math.floor(totalMinutes / 60) % 24;
          return [hours, minutes, seconds, frames]
            .map((value) => String(value).padStart(2, '0'))
            .join(':');
        };

        const updateTimecode = (timestamp) => {
          if (startTimestamp === undefined) startTimestamp = timestamp;
          const elapsedFrames = Math.floor(((timestamp - startTimestamp) / 1000) * fps);
          const currentFrame = startFrames + elapsedFrames;

          if (currentFrame !== lastRenderedFrame) {
            timecode.textContent = formatTimecode(currentFrame);
            lastRenderedFrame = currentFrame;
          }

          window.requestAnimationFrame(updateTimecode);
        };

        window.requestAnimationFrame(updateTimecode);
      }
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
