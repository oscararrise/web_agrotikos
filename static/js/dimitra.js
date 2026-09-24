(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateAlongPaths = (pathSelector, dotSelector, baseDuration = 3.6) => {
    if (reducedMotion || !window.gsap) return;
    const paths = document.querySelectorAll(pathSelector);
    const dots = document.querySelectorAll(dotSelector);
    paths.forEach((path, index) => {
      const dot = dots[index];
      if (!dot || typeof path.getTotalLength !== 'function') return;
      const length = path.getTotalLength();
      const state = { progress: 0 };
      gsap.to(state, {
        progress: 1,
        duration: baseDuration + index * .42,
        delay: index * .34,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          const point = path.getPointAtLength(length * state.progress);
          dot.setAttribute('cx', point.x);
          dot.setAttribute('cy', point.y);
        }
      });
    });
  };

  const initHero = () => {
    animateAlongPaths('.data-path', '.signal', 3.5);
    if (reducedMotion || !window.gsap) return;

    gsap.to('.hero-radar--a', { rotation:360, duration:14, repeat:-1, ease:'none' });
    gsap.to('.hero-radar--b', { rotation:-360, duration:18, repeat:-1, ease:'none' });

    gsap.utils.toArray('.hero-kpi').forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 ? 8 : -8,
        duration: 2.5 + index * .35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    gsap.to('.hero-telemetry', {
      y: -5,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  };

  const initDimitraOrbit = () => {
    animateAlongPaths('.sector-path', '.sector-signal', 4.3);
    if (reducedMotion || !window.gsap) return;

    gsap.utils.toArray('.telemetry-chip').forEach((chip, index) => {
      gsap.to(chip, {
        y: index % 2 ? 9 : -9,
        x: index % 3 === 0 ? 5 : -4,
        duration: 2.8 + index * .3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    gsap.utils.toArray('.sector-node').forEach((node, index) => {
      gsap.to(node, {
        y: index % 2 ? 5 : -5,
        duration: 3.4 + index * .18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    gsap.to('.orbit-glow', {
      scale: 1.12,
      opacity: .68,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.fromTo('.orbit-core--advanced', {
      boxShadow: '0 0 55px rgba(80,208,128,.07), inset 0 0 45px rgba(137,240,181,.04)'
    }, {
      boxShadow: '0 0 125px rgba(80,208,128,.19), inset 0 0 58px rgba(137,240,181,.08)',
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.from('.telemetry-chip, .orbit-data-strip', {
      opacity: 0,
      scale: .92,
      y: 14,
      stagger: .08,
      duration: .75,
      ease: 'power3.out',
      scrollTrigger: window.ScrollTrigger ? {
        trigger: '.sector-orbit--advanced',
        start: 'top 72%'
      } : undefined
    });
  };

  const init = () => {
    if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    initHero();
    initDimitraOrbit();
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();