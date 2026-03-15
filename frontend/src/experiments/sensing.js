import * as THREE from 'three';

export class SensingExperiment {
  constructor(canvas) {
    this.canvas = canvas;
    this.fieldLines = [];
    this.mouse = new THREE.Vector2(0, 0);
    this.clock = new THREE.Clock();

    this.init();
    this.setupInteraction();
  }

  init() {
    const rect = this.canvas.getBoundingClientRect();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);

    this.camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 100);
    this.camera.position.set(0, 0, 20);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createDiamond();
    this.createNVCenter();
    this.createMagneticFieldLines();
    this.createLights();
    this.createSensorDisplay();
  }

  createDiamond() {
    // Diamond crystal structure
    const diamondGeom = new THREE.OctahedronGeometry(5, 0);
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      metalness: 0,
      transmission: 0.9,
      thickness: 2,
      clearcoat: 1,
      clearcoatRoughness: 0
    });

    this.diamond = new THREE.Mesh(diamondGeom, diamondMaterial);
    this.scene.add(this.diamond);

    // Diamond edges
    const edges = new THREE.EdgesGeometry(diamondGeom);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.4
    });
    const wireframe = new THREE.LineSegments(edges, edgeMaterial);
    this.diamond.add(wireframe);

    // Crystal lattice points
    this.createLattice();
  }

  createLattice() {
    const latticeGeom = new THREE.SphereGeometry(0.08, 8, 8);
    const carbonMaterial = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.4
    });

    // Create face-centered cubic lattice
    const spacing = 1.5;
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -2; z <= 2; z++) {
          // Check if inside diamond
          const pos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);
          if (pos.length() < 4) {
            const atom = new THREE.Mesh(latticeGeom, carbonMaterial);
            atom.position.copy(pos);
            this.scene.add(atom);
          }
        }
      }
    }
  }

  createNVCenter() {
    // NV center group
    this.nvCenter = new THREE.Group();

    // Nitrogen atom (blue)
    const nitrogenGeom = new THREE.SphereGeometry(0.25, 16, 16);
    const nitrogenMaterial = new THREE.MeshStandardMaterial({
      color: 0x3333ff,
      emissive: 0x3333ff,
      emissiveIntensity: 0.5
    });
    const nitrogen = new THREE.Mesh(nitrogenGeom, nitrogenMaterial);
    nitrogen.position.set(0.3, 0.3, 0);
    this.nvCenter.add(nitrogen);

    // Vacancy (glowing void)
    const vacancyGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const vacancyMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.6
    });
    this.vacancy = new THREE.Mesh(vacancyGeom, vacancyMaterial);
    this.vacancy.position.set(-0.3, -0.3, 0);
    this.nvCenter.add(this.vacancy);

    // NV axis (spin direction indicator)
    const axisGeom = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
    const axisMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6
    });
    this.nvAxis = new THREE.Mesh(axisGeom, axisMaterial);
    this.nvCenter.add(this.nvAxis);

    // Glow around NV center
    const glowGeom = new THREE.SphereGeometry(0.8, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.15
    });
    const glow = new THREE.Mesh(glowGeom, glowMaterial);
    this.nvCenter.add(glow);

    this.scene.add(this.nvCenter);
  }

  createMagneticFieldLines() {
    // Create curved field lines
    const numLines = 12;

    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(angle) * 8, -8, Math.sin(angle) * 3),
        new THREE.Vector3(Math.cos(angle) * 4, -3, Math.sin(angle) * 2),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle + Math.PI) * 4, 3, Math.sin(angle + Math.PI) * 2),
        new THREE.Vector3(Math.cos(angle + Math.PI) * 8, 8, Math.sin(angle + Math.PI) * 3)
      ]);

      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.3
      });

      const line = new THREE.Line(geometry, material);
      line.userData = {
        curve: curve,
        phase: i / numLines * Math.PI * 2,
        originalPoints: points.map(p => p.clone())
      };

      this.fieldLines.push(line);
      this.scene.add(line);
    }

    // Field direction arrow
    this.fieldArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -6, 0),
      3,
      0xff4444,
      0.5,
      0.3
    );
    this.scene.add(this.fieldArrow);
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambient);

    const point1 = new THREE.PointLight(0x00ff00, 0.8, 30);
    point1.position.set(5, 5, 5);
    this.scene.add(point1);

    const point2 = new THREE.PointLight(0x00d4ff, 0.5, 30);
    point2.position.set(-5, -5, 5);
    this.scene.add(point2);
  }

  createSensorDisplay() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    this.displayContext = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    this.displaySprite = new THREE.Sprite(material);
    this.displaySprite.position.set(0, -9, 0);
    this.displaySprite.scale.set(8, 4, 1);
    this.scene.add(this.displaySprite);
  }

  updateSensorDisplay(fieldStrength, fieldAngle) {
    const ctx = this.displayContext;
    ctx.clearRect(0, 0, 256, 128);

    // Field strength
    ctx.font = 'bold 24px Space Grotesk, sans-serif';
    ctx.fillStyle = '#ff4444';
    ctx.textAlign = 'center';
    ctx.fillText(`B = ${fieldStrength.toFixed(1)} mT`, 128, 35);

    // Resonance frequency shift
    const freqShift = fieldStrength * 2.8; // Gyromagnetic ratio
    ctx.font = '18px Space Grotesk, sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText(`Δf = ${freqShift.toFixed(1)} MHz`, 128, 65);

    // Label
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('NV Center Magnetometry', 128, 95);

    this.displaySprite.material.map.needsUpdate = true;
  }

  setupInteraction() {
    // Mouse move to control field direction
    this.canvas.addEventListener('mousemove', (e) => this.onPointerMove(e));
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.onPointerMove(e.touches[0]);
    }, { passive: false });
  }

  onPointerMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  animate(time) {
    const delta = this.clock.getDelta();

    // Calculate field direction from mouse
    const fieldDirection = new THREE.Vector3(
      this.mouse.x,
      this.mouse.y * 0.5 + 0.5,
      0.3
    ).normalize();

    // Update field arrow
    this.fieldArrow.setDirection(fieldDirection);

    // Calculate field strength (based on mouse distance from center)
    const fieldStrength = Math.sqrt(this.mouse.x ** 2 + this.mouse.y ** 2) * 50;

    // Update field lines based on direction
    for (const line of this.fieldLines) {
      const positions = line.geometry.attributes.position;
      const original = line.userData.originalPoints;

      for (let i = 0; i < original.length; i++) {
        const t = i / (original.length - 1);
        const point = original[i].clone();

        // Bend field lines based on mouse position
        point.x += this.mouse.x * 3 * Math.sin(t * Math.PI);
        point.z += this.mouse.y * 2 * Math.sin(t * Math.PI);

        // Animate along field lines
        const flow = Math.sin(time * 3 - t * 10 + line.userData.phase) * 0.2;
        point.y += flow;

        positions.setXYZ(i, point.x, point.y, point.z);
      }

      positions.needsUpdate = true;

      // Pulsing opacity
      line.material.opacity = 0.2 + Math.sin(time * 2 + line.userData.phase) * 0.1;
    }

    // NV center response to field
    const nvResponse = fieldDirection.clone();

    // Rotate NV axis to align with field
    this.nvAxis.lookAt(nvResponse.multiplyScalar(5));
    this.nvAxis.rotateX(Math.PI / 2);

    // Vacancy fluorescence intensity depends on alignment
    const alignment = Math.abs(fieldDirection.dot(new THREE.Vector3(0.7, 0.7, 0).normalize()));
    this.vacancy.material.opacity = 0.3 + alignment * 0.5;
    this.vacancy.scale.setScalar(0.8 + alignment * 0.4);

    // Pulse effect
    const pulse = 1 + Math.sin(time * 5) * 0.1;
    this.vacancy.scale.multiplyScalar(pulse);

    // Diamond slow rotation
    this.diamond.rotation.y = time * 0.1;
    this.diamond.rotation.x = Math.sin(time * 0.15) * 0.1;

    // Update sensor display
    this.updateSensorDisplay(fieldStrength, Math.atan2(this.mouse.y, this.mouse.x));

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
