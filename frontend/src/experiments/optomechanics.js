import * as THREE from 'three';

export class OptomechanicsExperiment {
  constructor(canvas) {
    this.canvas = canvas;
    this.phonons = [];
    this.photons = [];
    this.clock = new THREE.Clock();
    this.oscillationAmplitude = 1;

    this.init();
  }

  init() {
    const rect = this.canvas.getBoundingClientRect();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);

    this.camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 100);
    this.camera.position.set(0, 3, 15);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createCavity();
    this.createMembrane();
    this.createPhononsSystem();
    this.createPhotonField();
    this.createLights();
    this.createInfoDisplay();
  }

  createCavity() {
    // Left mirror
    const mirrorGeom = new THREE.BoxGeometry(0.3, 6, 4);
    const mirrorMaterial = new THREE.MeshStandardMaterial({
      color: 0x8888ff,
      metalness: 0.95,
      roughness: 0.05
    });

    this.leftMirror = new THREE.Mesh(mirrorGeom, mirrorMaterial);
    this.leftMirror.position.x = -6;
    this.scene.add(this.leftMirror);

    // Right mirror
    this.rightMirror = new THREE.Mesh(mirrorGeom, mirrorMaterial.clone());
    this.rightMirror.position.x = 6;
    this.scene.add(this.rightMirror);

    // Cavity boundaries (subtle lines)
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-6, 3, 0),
      new THREE.Vector3(6, 3, 0)
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.3
    });
    const topLine = new THREE.Line(lineGeom, lineMaterial);
    this.scene.add(topLine);

    const bottomLine = topLine.clone();
    bottomLine.position.y = -6;
    this.scene.add(bottomLine);
  }

  createMembrane() {
    // Mechanical oscillator (membrane)
    const membraneGeom = new THREE.PlaneGeometry(4, 4, 32, 32);
    const membraneMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      metalness: 0.3,
      roughness: 0.4,
      clearcoat: 0.5
    });

    this.membrane = new THREE.Mesh(membraneGeom, membraneMaterial);
    this.membrane.rotation.y = Math.PI / 2;
    this.membrane.userData = {
      basePositionX: 0,
      velocity: 0,
      displacement: 0
    };
    this.scene.add(this.membrane);

    // Membrane frame
    const frameGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.2, 4.2, 4.2));
    const frameMaterial = new THREE.LineBasicMaterial({ color: 0x666666 });
    const frame = new THREE.LineSegments(frameGeom, frameMaterial);
    frame.rotation.y = Math.PI / 2;
    this.membrane.add(frame);

    // Support springs (visual)
    this.createSprings();
  }

  createSprings() {
    const springMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });

    [-2, 2].forEach(y => {
      [-2, 2].forEach(z => {
        const points = [];
        const coils = 8;
        const radius = 0.2;

        for (let i = 0; i <= coils * 20; i++) {
          const t = i / (coils * 20);
          const x = -3 + t * 3;
          const angle = t * coils * Math.PI * 2;
          points.push(new THREE.Vector3(
            x,
            y + Math.sin(angle) * radius,
            z + Math.cos(angle) * radius
          ));
        }

        const springGeom = new THREE.BufferGeometry().setFromPoints(points);
        const spring = new THREE.Line(springGeom, springMaterial);
        this.scene.add(spring);
      });
    });
  }

  createPhononsSystem() {
    // Phonon visualization particles
    const phononGeom = new THREE.SphereGeometry(0.1, 8, 8);
    const phononMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < 30; i++) {
      const phonon = new THREE.Mesh(phononGeom, phononMaterial.clone());
      phonon.userData = {
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 2 + 1,
        yOffset: (Math.random() - 0.5) * 3,
        zOffset: (Math.random() - 0.5) * 3,
        active: false
      };
      phonon.visible = false;
      this.phonons.push(phonon);
      this.scene.add(phonon);
    }
  }

  createPhotonField() {
    // Standing wave photons in cavity
    const photonGeom = new THREE.SphereGeometry(0.08, 8, 8);
    const photonMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < 50; i++) {
      const photon = new THREE.Mesh(photonGeom, photonMaterial.clone());
      photon.userData = {
        baseX: (Math.random() - 0.5) * 10,
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 0.5 + 0.2
      };
      photon.position.y = (Math.random() - 0.5) * 4;
      photon.position.z = (Math.random() - 0.5) * 3;
      this.photons.push(photon);
      this.scene.add(photon);
    }
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambient);

    const point1 = new THREE.PointLight(0x00d4ff, 0.8, 30);
    point1.position.set(0, 5, 10);
    this.scene.add(point1);

    const point2 = new THREE.PointLight(0xff4444, 0.5, 30);
    point2.position.set(-5, 0, 5);
    this.scene.add(point2);
  }

  createInfoDisplay() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    this.infoContext = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    this.infoSprite = new THREE.Sprite(material);
    this.infoSprite.position.set(0, -5, 0);
    this.infoSprite.scale.set(6, 3, 1);
    this.scene.add(this.infoSprite);
  }

  updateInfoDisplay(phononsActive, displacement) {
    const ctx = this.infoContext;
    ctx.clearRect(0, 0, 256, 128);

    // Phonon count
    ctx.font = 'bold 24px Space Grotesk, sans-serif';
    ctx.fillStyle = '#ffaa00';
    ctx.textAlign = 'center';
    ctx.fillText(`n = ${phononsActive}`, 128, 35);

    // Label
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('Phonon Number', 128, 55);

    // Displacement
    ctx.font = '16px Space Grotesk, sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText(`x = ${displacement.toFixed(3)} nm`, 128, 90);

    this.infoSprite.material.map.needsUpdate = true;
  }

  animate(time) {
    const delta = this.clock.getDelta();

    // Membrane oscillation (harmonic motion)
    const omega = 3; // Angular frequency
    const displacement = Math.sin(time * omega) * this.oscillationAmplitude;
    this.membrane.position.x = displacement;
    this.membrane.userData.displacement = displacement;

    // Membrane deformation
    const positions = this.membrane.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const z = positions.getZ(i);

      // Wave pattern on membrane
      const wave = Math.sin(y * 2 + time * omega) * Math.sin(z * 2 + time * omega) * 0.1;
      positions.setX(i, wave);
    }
    positions.needsUpdate = true;

    // Phonon excitation based on velocity
    const velocity = Math.cos(time * omega) * omega * this.oscillationAmplitude;
    const energy = Math.abs(velocity);

    // Activate phonons based on energy
    let activeCount = 0;
    for (let i = 0; i < this.phonons.length; i++) {
      const phonon = this.phonons[i];
      const threshold = i / this.phonons.length;

      if (energy > threshold * 3) {
        phonon.visible = true;
        phonon.userData.active = true;
        activeCount++;

        // Phonon orbit around membrane
        const data = phonon.userData;
        data.angle += data.speed * delta;

        phonon.position.x = displacement + Math.cos(data.angle) * data.radius * 0.5;
        phonon.position.y = data.yOffset + Math.sin(data.angle * 2) * 0.3;
        phonon.position.z = data.zOffset + Math.sin(data.angle) * data.radius * 0.5;

        // Pulse effect
        const pulse = 0.8 + Math.sin(time * 10 + i) * 0.2;
        phonon.material.opacity = energy * 0.3 * pulse;
      } else {
        phonon.visible = false;
        phonon.userData.active = false;
      }
    }

    // Photon radiation pressure effect
    for (const photon of this.photons) {
      const data = photon.userData;

      // Standing wave pattern
      const standingWave = Math.sin(photon.position.x * 0.5 + time * 5);
      photon.material.opacity = 0.3 + standingWave * 0.3;

      // Photons bunch near membrane when it moves
      const attraction = displacement * 0.1;
      photon.position.x = data.baseX + Math.sin(time * 3 + data.phase) * data.amplitude + attraction;
    }

    // Cooling effect visualization (amplitude decay over time)
    this.oscillationAmplitude = 1 + Math.sin(time * 0.2) * 0.3;

    // Update display
    this.updateInfoDisplay(activeCount, Math.abs(displacement * 100));

    // Slight camera movement
    this.camera.position.x = Math.sin(time * 0.3) * 2;
    this.camera.lookAt(0, 0, 0);

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
