const experiments = [
  {
    id: 'antistokes',
    icon: '🔵',
    title: 'Anti-Stokes Fluorescence',
    description: 'Yb3+ doped ZBLAN glass cools when irradiated with a 980nm laser. Photons are absorbed and re-emitted at higher energies, removing thermal energy.',
    tag: 'Optical Cooling'
  },
  {
    id: 'doppler',
    icon: '❄️',
    title: 'Doppler Cooling',
    description: 'Counter-propagating laser beams slow atoms through photon momentum transfer. Nobel Prize 1997 - Chu, Cohen-Tannoudji, Phillips.',
    tag: 'Laser Cooling'
  },
  {
    id: 'tweezers',
    icon: '🔬',
    title: 'Optical Tweezers',
    description: 'A focused laser traps microparticles using radiation pressure. Nobel Prize 2018 - Arthur Ashkin. Try dragging the particle!',
    tag: 'Interactive'
  },
  {
    id: 'optomechanics',
    icon: '⚛️',
    title: 'Cavity Optomechanics',
    description: 'Photon pressure in a resonator couples to a mechanical oscillator, enabling cooling to the quantum ground state.',
    tag: 'Quantum Mechanics'
  },
  {
    id: 'sensing',
    icon: '🧭',
    title: 'NV Magnetometry',
    description: 'Nitrogen-vacancy centers in diamond detect magnetic fields with atomic precision. Applications in medicine, navigation, and geophysics.',
    tag: 'Quantum Sensing'
  }
];

export function createExperimentsSection(onExperimentClick) {
  const grid = document.getElementById('experiments-grid');
  if (!grid) return;

  experiments.forEach(exp => {
    const card = document.createElement('div');
    card.className = 'experiment-card';
    card.setAttribute('data-experiment', exp.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open ${exp.title} experiment`);

    card.innerHTML = `
      <div class="experiment-icon">${exp.icon}</div>
      <h3 class="experiment-title">${exp.title}</h3>
      <p class="experiment-description">${exp.description}</p>
      <span class="experiment-tag">${exp.tag}</span>
    `;

    // Click handler
    card.addEventListener('click', () => {
      onExperimentClick(exp.id);
    });

    // Keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onExperimentClick(exp.id);
      }
    });

    // Touch feedback for mobile
    card.addEventListener('touchstart', () => {
      card.style.transform = 'scale(0.98)';
    }, { passive: true });

    card.addEventListener('touchend', () => {
      card.style.transform = '';
    }, { passive: true });

    grid.appendChild(card);
  });
}
