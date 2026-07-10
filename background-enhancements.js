(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const phrases = [
    ['status', '> INDEXING STORY ENGINE'],
    ['code', 'scene.objective = "raise the stakes";'],
    ['dim', '// resolving continuity conflict...'],
    ['accent', 'ACCESS GRANTED'],
    ['code', 'timeline.lock({ video: true, audio: false });'],
    ['status', '> ANALYZING NARRATIVE VECTOR'],
    ['code', 'const cut = selectBestTake(scene_12);'],
    ['dim', 'remote node detected: UY-MVD-04'],
    ['accent', 'SECURE CHANNEL OPEN'],
    ['code', 'story.beat[3].pressure += 1;'],
    ['status', '> SYNCHRONIZING CAMERAS'],
    ['code', 'backup.verify({ copies: 3, hash: "sha256" });'],
    ['dim', '// rebuilding waveform...'],
    ['accent', 'SIGNAL ACQUIRED'],
    ['code', 'production.solve(problem, constraints);'],
    ['status', '> LOADING FINAL DRAFT'],
    ['code', 'writer.room.commit("version_17");'],
    ['dim', 'packet loss: 0.002%'],
    ['accent', 'SYSTEM ONLINE'],
    ['code', 'await exportMaster({ codec: "prores" });'],
    ['status', '> MAPPING AUDIENCE SIGNALS'],
    ['code', 'stream.chat.filter(noise).keep(signal);'],
    ['dim', '// checking production route...'],
    ['accent', 'UPLINK STABLE'],
    ['code', 'idea.prototype.render();'],
    ['status', '> VERIFYING GOLDEN TRIANGLE'],
    ['code', 'sourceHash === masterHash && masterHash === backupHash'],
    ['dim', 'render farm temperature: nominal'],
    ['accent', 'OVERRIDE ACCEPTED'],
    ['code', 'cutToBlack({ at: "00:42:17:08" });'],
    ['status', '> OPENING STORY PORT'],
    ['code', 'pitch.transmit({ receiver: "festival" });'],
    ['dim', '// waiting for human decision...'],
    ['accent', 'AUTH TOKEN VERIFIED'],
    ['code', 'continuity.check(scene_08);'],
    ['status', '> BUILDING PRODUCTION MAP'],
    ['code', 'crew.assign({ role: "camera", unit: "A" });'],
    ['dim', 'storage array: healthy'],
    ['accent', 'HANDSHAKE ACCEPTED'],
    ['code', 'storyboard.frame(24).approve();'],
    ['status', '> RENDERING FINAL SEQUENCE'],
    ['code', 'audio.sync({ fps: 24, sampleRate: 48000 });']
  ];

  const positions = [
    { left: '16%', top: '15%', width: '29rem', opacity: '.34', delay: 40 },
    { left: '58%', top: '19%', width: '28rem', opacity: '.39', delay: 150 },
    { left: '24%', top: '33%', width: '31rem', opacity: '.36', delay: 260 },
    { left: '61%', top: '50%', width: '29rem', opacity: '.41', delay: 370 },
    { left: '6%', top: '59%', width: '27rem', opacity: '.35', delay: 480 },
    { left: '31%', top: '75%', width: '30rem', opacity: '.38', delay: 590 },
    { left: '63%', top: '88%', width: '27rem', opacity: '.4', delay: 700 }
  ];

  const randomBetween = (minimum, maximum) => (
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
  );

  const waitForBackground = (attempt = 0) => {
    const background = document.querySelector('.code-background');
    if (!background) {
      if (attempt < 20) window.setTimeout(() => waitForBackground(attempt + 1), 50);
      return;
    }

    const startTypingCycle = (fragment, textNode, slotIndex, phraseIndex) => {
      const [kind, phrase] = phrases[phraseIndex % phrases.length];
      fragment.className = `code-fragment code-fragment-${kind} code-fragment-extra`;
      textNode.textContent = '';
      textNode.dataset.text = phrase;

      window.requestAnimationFrame(() => fragment.classList.add('is-visible'));

      let characterIndex = 0;
      const typeNextCharacter = () => {
        textNode.textContent = phrase.slice(0, characterIndex + 1);
        characterIndex += 1;

        if (characterIndex < phrase.length) {
          window.setTimeout(typeNextCharacter, randomBetween(12, 27));
          return;
        }

        window.setTimeout(() => {
          fragment.classList.remove('is-visible');
          window.setTimeout(
            () => startTypingCycle(fragment, textNode, slotIndex, phraseIndex + 5 + slotIndex),
            randomBetween(100, 420)
          );
        }, randomBetween(1100, 2200));
      };

      window.setTimeout(typeNextCharacter, randomBetween(20, 100));
    };

    positions.forEach((position, slotIndex) => {
      const fragment = document.createElement('div');
      fragment.className = 'code-fragment code-fragment-extra';
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

      const firstPhraseIndex = (slotIndex * 6) % phrases.length;
      if (prefersReduced) {
        const [kind, phrase] = phrases[firstPhraseIndex];
        fragment.className = `code-fragment code-fragment-${kind} code-fragment-extra is-visible`;
        textNode.textContent = phrase;
        textNode.dataset.text = phrase;
      } else {
        window.setTimeout(
          () => startTypingCycle(fragment, textNode, slotIndex, firstPhraseIndex),
          position.delay
        );
      }
    });

    if (!prefersReduced) {
      const scheduleGlitch = () => {
        window.setTimeout(() => {
          const visibleFragments = Array.from(
            background.querySelectorAll('.code-fragment.is-visible')
          ).filter((fragment) => fragment.offsetParent !== null);

          if (visibleFragments.length > 0 && Math.random() < .78) {
            const fragment = visibleFragments[randomBetween(0, visibleFragments.length - 1)];
            const textNode = fragment.querySelector('.code-fragment-text');
            if (textNode?.textContent) {
              textNode.dataset.text = textNode.textContent;
              fragment.classList.add('is-glitching');
              window.setTimeout(
                () => fragment.classList.remove('is-glitching'),
                randomBetween(110, 210)
              );
            }
          }

          scheduleGlitch();
        }, randomBetween(1600, 3900));
      };

      scheduleGlitch();
    }
  };

  waitForBackground();
})();
