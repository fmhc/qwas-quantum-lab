import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { createHero } from './ui/hero.js';
import { createExperimentsSection } from './ui/experiments-section.js';
import { createResearchSection } from './ui/research-section.js';
import { createCTASection } from './ui/cta-section.js';

import { AntiStokesExperiment } from './experiments/antistokes.js';
import { DopplerExperiment } from './experiments/doppler.js';
import { TweezersExperiment } from './experiments/tweezers.js';
import { OptomechanicsExperiment } from './experiments/optomechanics.js';
import { SensingExperiment } from './experiments/sensing.js';

gsap.registerPlugin(ScrollTrigger);

class QuantumLab {
  constructor() {
    this.canvas = document.getElementById('quantum-canvas');
    this.experimentCanvas = document.getElementById('experiment-canvas');
    this.modal = document.getElementById('experiment-modal');
    this.currentExperiment = null;
    this.experiments = {
      antistokes: AntiStokesExperiment,
      doppler: DopplerExperiment,
      tweezers: TweezersExperiment,
      optomechanics: OptomechanicsExperiment,
      sensing: SensingExperiment
    };

    this.init();
  }

  init() {
    this.setupLenis();
    this.setupBackgroundScene();
    this.setupUI();
    this.setupModal();
    this.setupNav();
    this.setupAnimations();
    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  setupLenis() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  setupBackgroundScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createParticles();
    this.createQuantumWaves();
  }

  createParticles() {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPrimary = new THREE.Color(0x00d4ff);
    const colorSecondary = new THREE.Color(0x7c3aed);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      const mixRatio = Math.random();
      const color = colorPrimary.clone().lerp(colorSecondary, mixRatio);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;

        void main() {
          vColor = color;
          vec3 pos = position;

          pos.y += sin(uTime * 0.5 + position.x * 0.05) * 2.0;
          pos.x += cos(uTime * 0.3 + position.z * 0.05) * 1.5;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.6;

          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createQuantumWaves() {
    const geometry = new THREE.PlaneGeometry(200, 200, 100, 100);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x00d4ff) }
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float wave1 = sin(pos.x * 0.05 + uTime) * 2.0;
          float wave2 = sin(pos.y * 0.08 + uTime * 0.8) * 1.5;
          float wave3 = sin((pos.x + pos.y) * 0.03 + uTime * 0.5) * 3.0;

          pos.z = wave1 + wave2 + wave3;
          vElevation = pos.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          float alpha = (vElevation + 5.0) / 10.0 * 0.15;
          alpha = clamp(alpha, 0.0, 0.2);

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: true
    });

    this.waves = new THREE.Mesh(geometry, material);
    this.waves.rotation.x = -Math.PI / 2;
    this.waves.position.y = -30;
    this.scene.add(this.waves);
  }

  setupUI() {
    createHero();
    createExperimentsSection(this.openExperiment.bind(this));
    createResearchSection();
    createCTASection();
  }

  setupModal() {
    const closeBtn = this.modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.closeModal());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  setupNav() {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.nav-menu');

    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('menu-open');
      });
    });

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
      } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
      }
      lastScroll = currentScroll;
    });
  }

  setupAnimations() {
    gsap.from('.hero-line', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out'
    });

    gsap.from('.hero-subtitle, .hero-description', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    });

    gsap.from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: 'power3.out'
    });

    ScrollTrigger.batch('.experiment-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });
      },
      start: 'top 85%',
      once: true
    });

    ScrollTrigger.batch('.research-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      },
      start: 'top 85%',
      once: true
    });

    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 70%',
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }

  openExperiment(experimentId) {
    const experimentData = this.getExperimentData(experimentId);
    if (!experimentData) return;

    this.modal.querySelector('.modal-title').textContent = experimentData.title;
    this.modal.querySelector('.modal-description').textContent = experimentData.description;
    this.modal.querySelector('.modal-hint').textContent = experimentData.hint;

    this.modal.classList.add('active');
    this.lenis.stop();

    requestAnimationFrame(() => {
      const ExperimentClass = this.experiments[experimentId];
      if (ExperimentClass) {
        this.currentExperiment = new ExperimentClass(this.experimentCanvas);
      }
    });
  }

  closeModal() {
    this.modal.classList.remove('active');
    this.lenis.start();

    if (this.currentExperiment) {
      this.currentExperiment.dispose();
      this.currentExperiment = null;
    }
  }

  getExperimentData(id) {
    const experiments = {
      antistokes: {
        title: 'Anti-Stokes Fluorescence Cooling',
        description: 'Yb3+ ions in ZBLAN glass absorb 980nm photons and emit higher-energy photons, causing net energy removal and cooling.',
        hint: 'Watch photons being absorbed and re-emitted at higher energies'
      },
      doppler: {
        title: 'Doppler Cooling',
        description: 'Counter-propagating laser beams slow atoms through photon momentum transfer, cooling them to microkelvin temperatures.',
        hint: 'Use the slider to adjust laser intensity and watch atoms cool'
      },
      tweezers: {
        title: 'Optical Tweezers',
        description: 'A focused laser beam traps microparticles using radiation pressure gradient forces. Nobel Prize 2018 - Arthur Ashkin.',
        hint: 'Drag the particle with your mouse or finger!'
      },
      optomechanics: {
        title: 'Cavity Optomechanics',
        description: 'Photon pressure in an optical cavity couples to a mechanical oscillator, enabling cooling to the quantum ground state.',
        hint: 'Observe phonons coupling with the oscillating membrane'
      },
      sensing: {
        title: 'NV Center Magnetometry',
        description: 'Nitrogen-vacancy centers in diamond act as atomic-scale magnetic field sensors with nanometer resolution.',
        hint: 'Move your cursor to change the magnetic field direction'
      }
    };
    return experiments[id];
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.particles.material.uniforms) {
      this.particles.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }

    if (this.currentExperiment) {
      this.currentExperiment.onResize();
    }
  }

  animate() {
    const time = performance.now() * 0.001;

    if (this.particles.material.uniforms) {
      this.particles.material.uniforms.uTime.value = time;
    }
    if (this.waves.material.uniforms) {
      this.waves.material.uniforms.uTime.value = time;
    }

    this.particles.rotation.y = time * 0.02;
    this.camera.position.x = Math.sin(time * 0.1) * 2;
    this.camera.position.y = Math.cos(time * 0.15) * 1;

    this.renderer.render(this.scene, this.camera);

    if (this.currentExperiment) {
      this.currentExperiment.animate(time);
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new QuantumLab();
});
