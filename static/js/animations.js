(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fallbackReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  };

  const init = () => {
    if (reducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    if (!window.gsap || !window.ScrollTrigger) {
      fallbackReveal();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: .95,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      });
    });

    gsap.to('.hero-copy', {
      yPercent: 12,
      opacity: .55,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    gsap.to('.hero-system', {
      yPercent: 8,
      scale: .96,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    gsap.utils.toArray('[data-float]').forEach((node, index) => {
      gsap.to(node, { y: index % 2 ? 12 : -12, duration: 2.6 + index * .25, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    });

    const observerSteps = gsap.utils.toArray('.observer-step');
    observerSteps.forEach((step, index) => {
      ScrollTrigger.create({
        trigger: '.field-observer',
        start: `${18 + index * 12}% center`,
        end: `${30 + index * 12}% center`,
        onEnter: () => observerSteps.forEach((s, i) => s.classList.toggle('is-active', i === index)),
        onEnterBack: () => observerSteps.forEach((s, i) => s.classList.toggle('is-active', i === index))
      });
    });

    gsap.fromTo('.ndvi-overlay', { opacity: .05 }, {
      opacity: .7,
      scrollTrigger: { trigger: '.agri-gis', start: 'top 70%', end: 'bottom 35%', scrub: true }
    });

    gsap.to('.virtual-fence', {
      strokeDashoffset: -100,
      duration: 6,
      repeat: -1,
      ease: 'none'
    });

    gsap.utils.toArray('.animal-dot').forEach((animal, index) => {
      gsap.to(animal, {
        x: 9 + index * 2,
        y: index % 2 ? 8 : -7,
        duration: 3.2 + index * .3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    });

    gsap.utils.toArray('.stack-item').forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 58%',
        end: 'bottom 42%',
        onToggle: ({ isActive }) => {
          if (!isActive) return;
          document.querySelectorAll('.stack-item').forEach((entry) => entry.classList.remove('is-active'));
          item.classList.add('is-active');
          document.querySelector('.stack-core')?.setAttribute('data-layer', item.dataset.stack || '');
        }
      });
    });

    gsap.from('.sector-node', {
      scale: .75,
      opacity: 0,
      stagger: .09,
      duration: .7,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.sector-orbit', start: 'top 72%' }
    });

    gsap.from('.product-window', {
      y: 70,
      scale: .96,
      opacity: 0,
      duration: 1.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.product-window', start: 'top 82%' }
    });

    gsap.fromTo('.chart-line', { strokeDasharray: 900, strokeDashoffset: 900 }, {
      strokeDashoffset: 0,
      duration: 1.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.dashboard-chart', start: 'top 80%' }
    });

    gsap.to('.manifesto-dots', {
      opacity: .62,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: { trigger: '.final-manifesto', start: 'top bottom', end: 'center center', scrub: true }
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
