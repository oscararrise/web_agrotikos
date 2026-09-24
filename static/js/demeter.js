(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const buildDataCloud = () => {
    const cloud = document.querySelector('.data-cloud');
    if (!cloud) return;
    cloud.setAttribute('aria-hidden', 'true');
  };

  const initSignals = () => {
    if (reducedMotion || !window.gsap) return;
    const paths = document.querySelectorAll('.data-path');
    const signals = document.querySelectorAll('.signal');
    paths.forEach((path, index) => {
      const signal = signals[index];
      if (!signal || typeof path.getTotalLength !== 'function') return;
      const length = path.getTotalLength();
      const state = { progress: 0 };
      gsap.to(state, {
        progress: 1,
        duration: 3.5 + index * .45,
        repeat: -1,
        delay: index * .55,
        ease: 'none',
        onUpdate: () => {
          const point = path.getPointAtLength(length * state.progress);
          signal.setAttribute('cx', point.x);
          signal.setAttribute('cy', point.y);
        }
      });
    });
  };

  const initGisControls = () => {
    const gis = document.querySelector('[data-gis]');
    if (!gis) return;
    const overlay = gis.querySelector('.ndvi-overlay');
    const sensors = gis.querySelectorAll('.gis-sensor');
    gis.querySelectorAll('.gis-controls button').forEach((button) => {
      button.addEventListener('click', () => {
        gis.querySelectorAll('.gis-controls button').forEach((b) => b.classList.remove('is-active'));
        button.classList.add('is-active');
        const label = button.textContent.trim();
        if (label === 'NDVI') overlay.style.opacity = '.9';
        if (label === 'RGB') overlay.style.opacity = '.22';
        if (label === 'SENSORES') sensors.forEach((sensor) => sensor.animate([{ transform:'scale(1)' }, { transform:'scale(1.35)' }, { transform:'scale(1)' }], { duration:550 }));
      });
    });
  };

  const initAnimals = () => {
    const card = document.getElementById('animalCard');
    if (!card) return;
    const profiles = {
      '024': ['NORMAL', '04.712 / -74.041', '18 SEC AGO'],
      '031': ['ACTIVE', '04.709 / -74.038', '24 SEC AGO'],
      '018': ['RESTING', '04.715 / -74.047', '31 SEC AGO'],
      '042': ['NORMAL', '04.718 / -74.035', '15 SEC AGO'],
      '057': ['ACTIVE', '04.706 / -74.044', '22 SEC AGO']
    };
    document.querySelectorAll('[data-animal]').forEach((animal) => {
      animal.addEventListener('click', () => {
        const id = animal.dataset.animal;
        const profile = profiles[id];
        if (!profile) return;
        card.innerHTML = `<span>ANIMAL ${id}</span><strong>ACTIVITY · ${profile[0]}</strong><div><small>LOCATION</small><b>${profile[1]}</b></div><div><small>LAST UPDATE</small><b>${profile[2]}</b></div>`;
      });
    });
  };

  const init = () => {
    buildDataCloud();
    initGisControls();
    initAnimals();
    window.addEventListener('load', initSignals, { once: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
