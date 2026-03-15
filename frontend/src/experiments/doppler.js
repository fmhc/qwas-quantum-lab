import * as THREE from 'three';

export class DopplerExperiment {
  constructor(canvas) {
    this.canvas = canvas;
    this.atoms = [];
    this.photons = [];
    this.laserIntensity = 0.5;
    this.clock = new THREE.Clock();

    this.init();
    this.setupControls();
  }

  init() {
    const rect = this.canvas.getBoundingClientRect();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);

    this.camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 100);
    this.camera.position.set(0, 5, 20);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createMOT();
    this.createAtoms();
    this.createLasers();
    this.createTemperatureDisplay();
    this.createControls();
    this.createLights();
  }

  createMOT() {
    // Magneto-optical trap visualization (coils)
    const coilGeometry = new THREE.TorusGeometry(8, 0.3, 8, 32);
    const coilMaterial = new THREE.MeshStandardMaterial({
      color: 0x886644,
      metalness: 0.8,
      roughness: 0.3
    });

    const coil1 = new THREE.Mesh(coilGeometry, coilMaterial);
    coil1.position.y = 3;
    coil1.rotation.x = Math.PI / 2;
    this.scene.add(coil1);

    const coil2 = new THREE.Mesh(coilGeometry, coilMaterial);
    coil2.position.y = -3;
    coil2.rotation.x = Math.PI / 2;
    this.scene.add(coil2);
  }

  createAtoms() {
    const atomGeometry = new THREE.SphereGeometry(0.15, 12, 12);

    for (let i = 0; i < 100; i++) {
      const atomMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.3
      });

      const atom = new THREE.Mesh(atomGeometry, atomMaterial);

      // Random initial position
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 5 + 3;

      atom.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      // Random velocity (thermal motion)
      atom.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        ),
        baseColor: new THREE.Color(0x00ff88)
      };

      this.atoms.push(atom);
      this.scene.add(atom);
    }
  }

  createLasers() {
    // Six counter-propagating laser beams (3 axis pairs)
    this.laserBeams = [];

    const directions = [
      { axis: 'x', pos: new THREE.Vector3(-15, 0, 0), dir: new THREE.Vector3(1, 0, 0) },
      { axis: 'x', pos: new THREE.Vector3(15, 0, 0), dir: new THREE.Vector3(-1, 0, 0) },
      { axis: 'y', pos: new THREE.Vector3(0, -10, 0), dir: new THREE.Vector3(0, 1, 0) },
      { axis: 'y', pos: new THREE.Vector3(0, 10, 0), dir: new THREE.Vector3(0, -1, 0) },
      { axis: 'z', pos: new THREE.Vector3(0, 0, -15), dir: new THREE.Vector3(0, 0, 1) },
      { axis: 'z', pos: new THREE.Vector3(0, 0, 15), dir: new THREE.Vector3(0, 0, -1) }
    ];

    directions.forEach(({ axis, pos, dir }) => {
      const laserGeometry = new THREE.CylinderGeometry(0.2, 0.2, 30, 8);
      const laserMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.3
      });

      const laser = new THREE.Mesh(laserGeometry, laserMaterial);
      laser.position.copy(pos).multiplyScalar(0.5);

      if (axis === 'x') laser.rotation.z = Math.PI / 2;
      else if (axis === 'z') laser.rotation.x = Math.PI / 2;

      laser.userData = { direction: dir.clone() };
      this.laserBeams.push(laser);
      this.scene.add(laser);

      // Laser glow
      const glowGeometry = new THREE.CylinderGeometry(0.5, 0.5, 30, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.05
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      laser.add(glow);
    });
  }

  createTemperatureDisplay() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    this.tempContext = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    this.tempSprite = new THREE.Sprite(material);
    this.tempSprite.position.set(0, -8, 0);
    this.tempSprite.scale.set(6, 3, 1);
    this.scene.add(this.tempSprite);
  }

  createControls() {
    // Create slider container
    const container = this.canvas.parentElement;

    const controlDiv = document.createElement('div');
    controlDiv.className = 'experiment-slider';
    controlDiv.style.cssText = `
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(0,0,0,0.6);
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      backdrop-filter: blur(10px);
      z-index: 10;
    `;

    controlDiv.innerHTML = `
      <label style="color: #00d4ff; font-size: 0.875rem;">Laser Intensity</label>
      <input type="range" min="0" max="100" value="50" style="width: 150px; accent-color: #00d4ff;">
      <span style="color: white; min-width: 40px;">50%</span>
    `;

    const slider = controlDiv.querySelector('input');
    const valueSpan = controlDiv.querySelector('span');

    slider.addEventListener('input', (e) => {
      this.laserIntensity = e.target.value / 100;
      valueSpan.textContent = `${e.target.value}%`;
    });

    container.appendChild(controlDiv);
    this.controlDiv = controlDiv;
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambient);

    const point = new THREE.PointLight(0x00d4ff, 1, 50);
    point.position.set(10, 10, 10);
    this.scene.add(point);
  }

  setupControls() {
    // Touch/click on canvas to trigger cooling burst
    this.canvas.addEventListener('click', () => {
      this.coolingBurst();
    });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.coolingBurst();
    }, { passive: false });
  }

  coolingBurst() {
    // Temporarily increase laser intensity
    const originalIntensity = this.laserIntensity;
    this.laserIntensity = 1;

    setTimeout(() => {
      this.laserIntensity = originalIntensity;
    }, 500);
  }

  calculateTemperature() {
    // Calculate average kinetic energy
    let totalVelocity = 0;
    for (const atom of this.atoms) {
      totalVelocity += atom.userData.velocity.length();
    }
    const avgVelocity = totalVelocity / this.atoms.length;

    // Map to temperature (microkelvin scale)
    const temp = avgVelocity * 1000;
    return Math.max(1, temp);
  }

  updateTemperatureDisplay(temp) {
    const ctx = this.tempContext;
    ctx.clearRect(0, 0, 256, 128);

    // Temperature value
    ctx.font = 'bold 28px Space Grotesk, sans-serif';
    ctx.fillStyle = temp < 50 ? '#00d4ff' : '#ffffff';
    ctx.textAlign = 'center';

    const tempStr = temp < 1000 ? `${temp.toFixed(1)} µK` : `${(temp / 1000).toFixed(2)} mK`;
    ctx.fillText(tempStr, 128, 50);

    // Label
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('Temperature', 128, 85);

    this.tempSprite.material.map.needsUpdate = true;
  }

  animate(time) {
    const delta = this.clock.getDelta();

    // Update laser beam opacity based on intensity
    for (const laser of this.laserBeams) {
      laser.material.opacity = 0.3 * this.laserIntensity;
      laser.children[0].material.opacity = 0.05 * this.laserIntensity;
    }

    // Simulate Doppler cooling
    for (const atom of this.atoms) {
      const vel = atom.userData.velocity;
      const pos = atom.position;

      // Apply cooling force from each laser beam
      for (const laser of this.laserBeams) {
        const laserDir = laser.userData.direction;

        // Doppler effect: atoms moving towards laser see blue-shifted light
        // and absorb more photons, slowing them down
        const dotProduct = vel.dot(laserDir);

        if (dotProduct < 0) {
          // Atom moving towards laser - cooling force
          const coolingForce = laserDir.clone().multiplyScalar(
            this.laserIntensity * 0.01 * Math.abs(dotProduct)
          );
          vel.add(coolingForce);
        }
      }

      // Trapping force (MOT) - push towards center
      const trapForce = pos.clone().multiplyScalar(-0.001 * this.laserIntensity);
      vel.add(trapForce);

      // Random heating (photon recoil)
      vel.add(new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      ));

      // Damping (overall friction)
      vel.multiplyScalar(0.998);

      // Update position
      pos.add(vel);

      // Boundary check - soft wall
      const maxDist = 8;
      if (pos.length() > maxDist) {
        pos.normalize().multiplyScalar(maxDist);
        vel.multiplyScalar(-0.5);
      }

      // Color based on velocity (fast = red, slow = cyan)
      const speed = vel.length();
      const t = Math.min(1, speed / 0.2);
      atom.material.color.setHSL(0.5 - t * 0.5, 1, 0.5);
      atom.material.emissive.setHSL(0.5 - t * 0.5, 1, 0.3);
    }

    // Calculate and display temperature
    const temp = this.calculateTemperature();
    this.updateTemperatureDisplay(temp);

    // Spawn photon effects occasionally
    if (Math.random() < 0.05 * this.laserIntensity) {
      this.spawnPhotonEffect();
    }

    // Update photons
    for (let i = this.photons.length - 1; i >= 0; i--) {
      const photon = this.photons[i];
      photon.position.add(photon.userData.velocity);
      photon.material.opacity -= 0.02;

      if (photon.material.opacity <= 0) {
        this.scene.remove(photon);
        this.photons.splice(i, 1);
      }
    }

    // Camera orbit
    this.camera.position.x = Math.sin(time * 0.1) * 20;
    this.camera.position.z = Math.cos(time * 0.1) * 20;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  spawnPhotonEffect() {
    const geometry = new THREE.SphereGeometry(0.05, 6, 6);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });

    const photon = new THREE.Mesh(geometry, material);

    // Start from random atom
    const atom = this.atoms[Math.floor(Math.random() * this.atoms.length)];
    photon.position.copy(atom.position);

    // Random direction
    photon.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      )
    };

    this.photons.push(photon);
    this.scene.add(photon);
  }

  onResize() {
    const rect = this.canvas.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height);
  }

  dispose() {
    if (this.controlDiv) {
      this.controlDiv.remove();
    }

    this.renderer.dispose();
    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}
