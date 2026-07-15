(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const linkedinUrl = 'https://www.linkedin.com/in/guillermo-barbeito-040632340/';

  const activeLanguage = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';
  const assetPrefix = activeLanguage === 'en' ? '../' : '';
  const translations = {
    es: {
      linkedinAria: 'Ver el perfil de Guillermo Barbeito en LinkedIn',
      linkedinSchemaWarning: 'No se pudo actualizar el perfil de LinkedIn en los datos estructurados.',
      writingIntro: 'Novela inédita y escritura para pantalla. Manuscritos, desarrollo narrativo y proyectos de ficción.',
      machineCoverLabel: 'INÉDITA',
      machineKicker: 'NOVELA INÉDITA / MANUSCRITO COMPLETO',
      machineDescription: 'Novela de ciencia ficción inédita. El manuscrito completo fue presentado a varios concursos literarios durante 2026; la obra no ha sido publicada.',
      machineTags: ['CIENCIA FICCIÓN', 'INÉDITA', 'MANUSCRITO COMPLETO', 'CONCURSOS 2026'],
      autoplayBlocked: 'El primer cuadro permanece visible si el navegador bloquea el autoplay.'
    },
    en: {
      linkedinAria: 'View Guillermo Barbeito’s LinkedIn profile',
      linkedinSchemaWarning: 'LinkedIn profile could not be updated in structured data.',
      writingIntro: 'Unpublished fiction and screenwriting. Manuscripts, narrative development and fiction projects.',
      machineCoverLabel: 'UNPUBLISHED',
      machineKicker: 'UNPUBLISHED NOVEL / COMPLETE MANUSCRIPT',
      machineDescription: 'An unpublished science-fiction novel. The complete manuscript was submitted to several literary competitions during 2026; the work has not been published.',
      machineTags: ['SCIENCE FICTION', 'UNPUBLISHED', 'COMPLETE MANUSCRIPT', '2026 COMPETITIONS'],
      autoplayBlocked: 'The first frame remains visible if the browser blocks autoplay.'
    }
  };
  const t = translations[activeLanguage];

  document.querySelectorAll('[data-language-option]').forEach((link) => {
    link.addEventListener('click', () => {
      const language = link.dataset.languageOption;
      if (language === 'es' || language === 'en') {
        try { window.localStorage.setItem('portfolio-language', language); } catch (error) {}
      }
    });
  });

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
    linkedinLink.setAttribute('aria-label', t.linkedinAria);
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
      console.warn(t.linkedinSchemaWarning, error);
    }
  }

  const installCodeBackground = () => {
    if (document.querySelector('.code-background')) return;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = `${assetPrefix}code-background.css`;
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
      ['status', '> COMPILING CREATIVE SYSTEMS'],
      ['code', 'for (const frame of footage) stabilize(frame);'],
      ['status', '> ESTABLISHING SECURE UPLINK'],
      ['accent', 'FIREWALL BYPASSED'],
      ['code', 'matrix.route.override("studio-b");'],
      ['dim', 'zero-day payload armed'],
      ['status', '> PARSING TIMELINE DATA'],
      ['code', 'audioBus.normalize({ target: -14 });'],
      ['accent', 'ENCRYPTION CRACKED'],
      ['code', 'await render("picture_lock");'],
      ['dim', 'satellite relay synchronized'],
      ['status', '> INJECTING PATCH'],
      ['code', 'ssh operator@production-node'],
      ['accent', 'TRACE TERMINATED'],
      ['code', 'cache.flush(); signal.restore();']
    ];

    const positions = [
      { left: '2%', top: '10%', width: '29rem', opacity: '.46', delay: 60 },
      { left: '35%', top: '8%', width: '27rem', opacity: '.34', delay: 190 },
      { left: '70%', top: '14%', width: '27rem', opacity: '.4', delay: 340 },
      { left: '7%', top: '29%', width: '25rem', opacity: '.32', delay: 470 },
      { left: '47%', top: '31%', width: '31rem', opacity: '.43', delay: 610 },
      { left: '78%', top: '40%', width: '24rem', opacity: '.46', delay: 760 },
      { left: '20%', top: '52%', width: '30rem', opacity: '.36', delay: 900 },
      { left: '58%', top: '58%', width: '28rem', opacity: '.4', delay: 1030 },
      { left: '3%', top: '70%', width: '28rem', opacity: '.37', delay: 1160 },
      { left: '37%', top: '79%', width: '30rem', opacity: '.33', delay: 1290 },
      { left: '73%', top: '84%', width: '26rem', opacity: '.45', delay: 1420 }
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
          window.setTimeout(typeNextCharacter, randomBetween(16, 34));
          return;
        }

        window.setTimeout(() => {
          fragment.classList.remove('is-visible');

          window.setTimeout(() => {
            const nextPhraseIndex = phraseIndex + 5 + slotIndex;
            window.setTimeout(
              () => startTypingCycle(fragment, textNode, slotIndex, nextPhraseIndex),
              randomBetween(260, 850)
            );
          }, 280);
        }, randomBetween(1350, 2700));
      };

      window.setTimeout(typeNextCharacter, randomBetween(40, 160));
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
        <source src="${assetPrefix}ntdqiasa_video_v5_web.mp4" type="video/mp4">
      </video>
      <div class="project-video-overlay" aria-hidden="true"></div>
      <span class="project-number">A-01</span>
    `;

    const projectVideo = projectArt.querySelector('.project-feature-video');
    if (projectVideo && !prefersReduced) {
      projectVideo.autoplay = true;
      projectVideo.play().catch(() => {
        if (activeLanguage === 'es') console.info(t.autoplayBlocked);
      });
    }
  }

  const writingSection = document.querySelector('#escritura');
  if (writingSection) {
    const terranovaCover = writingSection.querySelector('.writing-card-cover-terranova');
    const terranovaCard = terranovaCover?.closest('.writing-card');
    if (terranovaCard) terranovaCard.remove();

    const sectionIntro = writingSection.querySelector('.section-heading > p');
    if (sectionIntro) {
      sectionIntro.textContent = t.writingIntro;
    }

    const machineCard = writingSection.querySelector('.writing-card-primary');
    if (machineCard) {
      const coverLabel = machineCard.querySelector('.writing-card-cover span');
      const coverIndex = machineCard.querySelector('.writing-card-cover i');
      const kicker = machineCard.querySelector('.project-kicker');
      const description = machineCard.querySelector('.writing-card-copy > p');
      const tags = machineCard.querySelector('.tech-tags');

      if (coverLabel) coverLabel.textContent = t.machineCoverLabel;
      if (coverIndex) coverIndex.textContent = '01';
      if (kicker) kicker.textContent = t.machineKicker;
      if (description) {
        description.textContent = t.machineDescription;
      }
      if (tags) {
        tags.innerHTML = t.machineTags.map((tag) => `<span>${tag}</span>`).join('');
      }
    }

    const screenCard = writingSection.querySelector('.writing-card-cover-screen')?.closest('.writing-card');
    const screenIndex = screenCard?.querySelector('.writing-card-cover i');
    if (screenIndex) screenIndex.textContent = '02';

    const writingStyles = document.createElement('style');
    writingStyles.textContent = `
      #escritura .writing-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      @media (max-width: 1050px) and (min-width: 821px) {
        #escritura .writing-card-primary { grid-column: auto; display: block; }
        #escritura .writing-card-primary .writing-card-cover {
          border-right: 0;
          border-bottom: 1px solid var(--line);
        }
      }
      @media (max-width: 820px) {
        #escritura .writing-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(writingStyles);
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