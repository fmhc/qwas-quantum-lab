const papers = [
  {
    category: 'Optical Cooling',
    title: 'Laser Cooling of Solids to Cryogenic Temperatures',
    authors: 'Seletskiy et al.',
    journal: 'Nature Physics, 2010',
    link: 'https://doi.org/10.1038/nphys1605',
    description: 'Demonstration of laser cooling in solids using anti-Stokes fluorescence.'
  },
  {
    category: 'Nobel Prize 1997',
    title: 'Laser Cooling and Trapping of Neutral Atoms',
    authors: 'Chu, Cohen-Tannoudji, Phillips',
    journal: 'Nobel Prize in Physics 1997',
    link: 'https://www.nobelprize.org/prizes/physics/1997/summary/',
    description: 'Development of methods to cool and trap atoms with laser light.'
  },
  {
    category: 'Nobel Prize 2018',
    title: 'Optical Tweezers and their Application to Biological Systems',
    authors: 'Arthur Ashkin',
    journal: 'Nobel Prize in Physics 2018',
    link: 'https://www.nobelprize.org/prizes/physics/2018/ashkin/facts/',
    description: 'For the optical tweezers and their application to biological systems.'
  },
  {
    category: 'Cavity Optomechanics',
    title: 'Cavity Optomechanics: Back-Action at the Mesoscale',
    authors: 'Aspelmeyer, Kippenberg, Marquardt',
    journal: 'Rev. Mod. Phys. 86, 1391 (2014)',
    link: 'https://doi.org/10.1103/RevModPhys.86.1391',
    description: 'Comprehensive review of optomechanical systems and quantum control.'
  },
  {
    category: 'Quantum Sensing',
    title: 'Quantum Sensing',
    authors: 'Degen, Reinhard, Cappellaro',
    journal: 'Rev. Mod. Phys. 89, 035002 (2017)',
    link: 'https://doi.org/10.1103/RevModPhys.89.035002',
    description: 'Review of quantum sensing using atomic and solid-state spin systems.'
  },
  {
    category: 'Hamburg Research',
    title: 'DESY Photon Science',
    authors: 'Deutsches Elektronen-Synchrotron',
    journal: 'Research Facility',
    link: 'https://www.desy.de/research/photon_science/index_eng.html',
    description: 'World-leading photon science research with brilliant X-ray sources.'
  }
];

export function createResearchSection() {
  const grid = document.getElementById('research-grid');
  if (!grid) return;

  papers.forEach(paper => {
    const card = document.createElement('article');
    card.className = 'research-card';

    card.innerHTML = `
      <span class="research-category">${paper.category}</span>
      <h3 class="research-title">${paper.title}</h3>
      <p class="research-authors">${paper.authors} - ${paper.journal}</p>
      <a href="${paper.link}" target="_blank" rel="noopener noreferrer" class="research-link">
        Read Paper
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 17L17 7M17 7H7M17 7V17"/>
        </svg>
      </a>
    `;

    grid.appendChild(card);
  });
}
