import * as THREE from 'three';

export class AntiStokesExperiment {
  constructor(canvas) {
    this.canvas = canvas;
    this.photons = [];
    this.emittedPhotons = [];
    this.ions = [];
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    const rect = this.canvas.getBoundingClientRect();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);

    this.camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 100);
    this.camera.position.set(0, 0, 15);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createCrystal();
    this.createIons();
    this.createLaser();
    this.createLights();
    this.createTemperatureGauge();

    this.temperature = 300;
    this.targetTemperature = 300;
  }

  createCrystal() {
    // ZBLAN glass crystal
    const geometry = new THREE.BoxGeometry(6, 4, 4);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0,
      transmission: 0.8,
      thickness: 2
    });

    this.crystal = new THREE.Mesh(geometry, material);
    this.scene.add(this.crystal);

    // Crystal edges
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.5
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    this.crystal.add(wireframe);
  }

  createIons() {
    // Yb3+ ions inside crystal
    const ionGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const ionMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.5
    });

    for (let i = 0; i < 20; i++) {
      const ion = new THREE.Mesh(ionGeometry, ionMaterial.clone());
      ion.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      );
      ion.userData = {
        basePos: ion.position.clone(),
        phase: Math.random() * Math.PI * 2,
        excited: false,
        excitedTime: 0
      };
      this.ions.push(ion);
      this.scene.add(ion);
    }
  }

  createLaser() {
    // Incoming 980nm laser beam (red/infrared represented as red)
    const laserGeometry = new THREE.CylinderGeometry(0.1, 0.1, 20, 8);
    const laserMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3333,
      transparent: true,
      opacity: 0.6
    });

    this.laser = new THREE.Mesh(laserGeometry, laserMaterial);
    this.laser.rotation.z = Math.PI / 2;
    this.laser.position.x = -10;
    this.scene.add(this.laser);

    // Laser glow
    const glowGeometry = new THREE.CylinderGeometry(0.3, 0.3, 20, 8);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3333,
      transparent: true,
      opacity: 0.1
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.laser.add(glow);
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambient);

    const point = new THREE.PointLight(0x00d4ff, 1, 30);
    point.position.set(5, 5, 5);
    this.scene.add(point);
  }

  createTemperatureGauge() {
    // Temperature display as floating text geometry
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    this.tempContext = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    this.tempSprite = new THREE.Sprite(material);
    this.tempSprite.position.set(0, -4, 0);
    this.tempSprite.scale.set(4, 1, 1);
    this.scene.add(this.tempSprite);

    this.updateTemperatureDisplay();
  }

  updateTemperatureDisplay() {
    const ctx = this.tempContext;
    ctx.clearRect(0, 0, 256, 64);

    ctx.font = 'bold 32px Space Grotesk, sans-serif';
    ctx.fillStyle = this.temperature < 200 ? '#00d4ff' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(this.temperature)}K`, 128, 42);

    this.tempSprite.material.map.needsUpdate = true;
  }

  spawnPhoton() {
    // Incoming photon (980nm - red)
    const photonGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const photonMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.9
    });

    const photon = new THREE.Mesh(photonGeometry, photonMaterial);
    photon.position.set(-12, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    photon.userData = {
      velocity: new THREE.Vector3(0.15, 0, 0),
      absorbed: false
    };

    this.photons.push(photon);
    this.scene.add(photon);
  }

  emitHigherEnergyPhoton(position) {
    // Emitted photon (higher energy - blue/violet)
    const photonGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const photonMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9
    });

    const photon = new THREE.Mesh(photonGeometry, photonMaterial);
    photon.position.copy(position);

    const angle = Math.random() * Math.PI * 2;
    const elevation = (Math.random() - 0.5) * Math.PI;
    photon.userData = {
      velocity: new THREE.Vector3(
        Math.cos(angle) * Math.cos(elevation) * 0.2,
        Math.sin(elevation) * 0.2,
        Math.sin(angle) * Math.cos(elevation) * 0.2
      ),
      age: 0
    };

    this.emittedPhotons.push(photon);
    this.scene.add(photon);

    // Cooling effect
    this.targetTemperature = Math.max(50, this.targetTemperature - 2);
  }

  animate(time) {
    const delta = this.clock.getDelta();

    // Spawn incoming photons
    if (Math.random() < 0.1) {
      this.spawnPhoton();
    }

    // Update incoming photons
    for (let i = this.photons.length - 1; i >= 0; i--) {
      const photon = this.photons[i];
      photon.position.add(photon.userData.velocity);

      // Check collision with ions
      if (!photon.userData.absorbed) {
        for (const ion of this.ions) {
          if (photon.position.distanceTo(ion.position) < 0.3 && !ion.userData.excited) {
            // Absorb photon
            photon.userData.absorbed = true;
            ion.userData.excited = true;
            ion.userData.excitedTime = time;
            ion.material.emissiveIntensity = 2;
            ion.material.color.setHex(0xffff00);

            this.scene.remove(photon);
            this.photons.splice(i, 1);
            break;
          }
        }
      }

      // Remove photons that exit
      if (photon.position.x > 15) {
        this.scene.remove(photon);
        this.photons.splice(i, 1);
      }
    }

    // Update excited ions
    for (const ion of this.ions) {
      // Thermal vibration
      const vibration = (this.temperature / 300) * 0.1;
      ion.position.x = ion.userData.basePos.x + Math.sin(time * 10 + ion.userData.phase) * vibration;
      ion.position.y = ion.userData.basePos.y + Math.cos(time * 12 + ion.userData.phase) * vibration;

      if (ion.userData.excited && time - ion.userData.excitedTime > 0.3) {
        // Emit higher energy photon (anti-Stokes)
        this.emitHigherEnergyPhoton(ion.position.clone());
        ion.userData.excited = false;
        ion.material.emissiveIntensity = 0.5;
        ion.material.color.setHex(0x00ff88);
      }
    }

    // Update emitted photons
    for (let i = this.emittedPhotons.length - 1; i >= 0; i--) {
      const photon = this.emittedPhotons[i];
      photon.position.add(photon.userData.velocity);
      photon.userData.age += delta;

      // Fade out
      photon.material.opacity = Math.max(0, 0.9 - photon.userData.age);

      if (photon.userData.age > 2 || photon.position.length() > 20) {
        this.scene.remove(photon);
        this.emittedPhotons.splice(i, 1);
      }
    }

    // Update temperature
    this.temperature += (this.targetTemperature - this.temperature) * 0.02;

    // Temperature slowly rises without cooling
    if (this.emittedPhotons.length === 0) {
      this.targetTemperature = Math.min(300, this.targetTemperature + 0.5);
    }

    this.updateTemperatureDisplay();

    // Rotate crystal slightly
    this.crystal.rotation.y = Math.sin(time * 0.5) * 0.1;

    // Laser animation
    this.laser.position.x = -5 + Math.sin(time * 2) * 0.1;

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const rect = this.canvas.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height);
  }

  dispose() {
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
