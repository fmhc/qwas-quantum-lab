# AGENT BRIEF: QWAS Quantum Lab — Full-Stack Build

## Mission
Build a complete, production-ready interactive quantum research experience website called **QWAS** (Quantum Wave Amplification & Sensing) — the public face of a new independent research company focused on quantum experiments.

## What to Build
A stunning Three.js-based interactive website with:
1. **5 Interactive Quantum Experiment Visualizations** (Three.js/WebGL)
2. **Blog-style Experiment Explanations** with links to real research papers
3. **CTA section** for funding interest / collaboration (PocketBase backend)
4. **Mobile-first, stunning UX** using proven libs
5. **Full Docker Compose** stack

## Tech Stack (REQUIRED)
- **Frontend:** Vite + Three.js (r160+), GSAP for animations, Lenis for smooth scroll
- **Backend/DB:** PocketBase (Go, single binary — perfect for Docker)
- **Reverse Proxy:** Nginx (in Docker Compose)
- **No framework overhead** — vanilla JS + Three.js only (fast, no React/Vue bloat)

## The 5 Experiments (from research content provided)

### Exp 1: Anti-Stokes Fluorescence 🔵
- Yb³⁺-dotiertes ZBLAN-Glas kühlt sich ab wenn mit 980nm Laser bestrahlt
- Visualisierung: Photon absorbieren + höherenergetischen Photon emittieren, Netto-Energieabfuhr
- Three.js: Particle system, glowing photon absorption animation

### Exp 2: Doppler Cooling ❄️  
- Photonendruck bremst Atome → kühlt bis µK (Nobelpreis 1997)
- Visualisierung: Atome werden durch gegenläufige Laserstrahlen verlangsamt
- Three.js: Atom cloud simulation, velocity arrows, temperature gauge

### Exp 3: Optical Tweezers 🔬
- Fokussierter Laser fängt Mikropartikel ein (Nobelpreis 2018 - Arthur Ashkin)
- Visualisierung: Interaktiv! User kann Partikel mit Mouse ziehen
- Three.js: Particle trapped in laser focus, drag interaction

### Exp 4: Cavity Optomechanics ⚛️
- Photonendruck in Resonator koppelt an mechanischen Oszillator → Kühlung bis Quantengrundzustand
- Visualisierung: Schwebende Membran zwischen Spiegeln, phonon visualization
- Three.js: Oscillating membrane with phonon quanta visualization

### Exp 5: Quantum Sensing (Magnetometer) 🧭
- NV-Zentren in Diamant als hochpräzise Magnetfeld-Sensoren
- Anwendung: Medizin, Navigation, Geophysik
- Three.js: Crystal lattice with NV center, magnetic field lines visualization

## CTA / Funding Section
PocketBase collection `interest_signups`:
- name, email, organization, message, interest_type (funding/collaboration/learn)
- Simple form that POSTs to PocketBase REST API
- Animated thank you state

## Routing & Pages
Single Page App with smooth scroll sections:
1. `/` Hero (Three.js fullscreen particle universe)
2. `#experiments` — 5 experiment cards, click to expand Three.js viz
3. `#research` — Blog cards with real ArXiv/Nature links
4. `#contact` — CTA form (PocketBase)

## Research Links to Include (real papers)
- Anti-Stokes: "Laser Cooling of Solids" - Nature 2019 DOI:10.1038/s41586-019-1445-3
- Doppler: Chu, Cohen-Tannoudji, Phillips - Nobel 1997 - Physics Nobel website
- Optical Tweezers: Ashkin 2018 Nobel - Physics Nobel website
- Cavity Optomechanics: Aspelmeyer et al. Rev.Mod.Phys. 86, 1391 (2014)
- Quantum Sensing: Degen et al. Rev.Mod.Phys. 89, 035002 (2017)
- Hamburg local: DESY https://www.desy.de/research/photon_science/index_eng.html
- UHH Institut für Laserphysik: https://www.physik.uni-hamburg.de/en/ilp.html

## Docker Compose (docker-compose.yml)
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    # Nginx serving Vite build
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    volumes:
      - pb_data:/pb/pb_data
      - ./pocketbase/pb_migrations:/pb/pb_migrations
  nginx:
    image: nginx:alpine
    # Reverse proxy: / → frontend, /api → pocketbase:8090
volumes:
  pb_data:
```

## File Structure
```
/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.js          # Three.js setup, scroll controller
│       ├── experiments/
│       │   ├── antistokes.js
│       │   ├── doppler.js
│       │   ├── tweezers.js
│       │   ├── optomechanics.js
│       │   └── sensing.js
│       ├── ui/
│       │   ├── hero.js
│       │   ├── experiments-section.js
│       │   ├── research-section.js
│       │   └── cta-section.js
│       └── style.css        # Dark, quantum aesthetic
├── pocketbase/
│   ├── Dockerfile
│   └── pb_migrations/
│       └── 001_init.js      # Create interest_signups collection
└── nginx/
    └── nginx.conf
```

## Visual Design Direction
- **Dark theme:** Deep space black (#0a0a0f), quantum blue (#00d4ff), energy gold (#ffd700)
- **Typography:** Space Grotesk (headings), Inter (body) — both from Google Fonts
- **Particles:** Floating quantum particles in background (Three.js Points)
- **Cards:** Glassmorphism with subtle glow borders
- **Animations:** GSAP ScrollTrigger reveals, smooth transitions
- **Hero:** "We are cooling the future" tagline, fullscreen Three.js quantum visualization

## Deployment Config
The site will be deployed as:
- Domain: `qwas.callthe.dev`
- Coolify server: `152.53.179.226`
- Coolify API Token: `21|8131ef3edf1a94cfcf10135db6f9fb6efe105516e9229bedcb19688da06a801639964d740317bdc5`
- GitLab repo: `http://t480.fritz.box:8929/root/qwas-quantum-lab.git`
- GitLab token: `glpat-vjqVBTaRHhi3oMsr7UMH3m86MQp1OjEH.01.0w02lra1k`

## Quality Requirements
- Mobile-first (320px → 4K)
- Core Web Vitals: LCP < 2.5s
- Three.js experiments must work on mobile (touch events)
- PocketBase CORS configured for qwas.callthe.dev
- nginx gzip compression enabled
- All 5 experiment visualizations must be INTERACTIVE (not just animations)

## When Done
1. git add -A && git commit -m "feat: initial QWAS quantum lab" && git push -u origin main
2. Run: openclaw system event --text "Done: QWAS Quantum Lab built and pushed to GitLab. Three.js + PocketBase + Docker Compose. Ready for Coolify deploy." --mode now
