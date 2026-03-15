import * as THREE from 'three';

export class TweezersExperiment {
  constructor(canvas) {
    this.canvas = canvas;
    this.isDragging = false;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.clock = new THREE.Clock();

    this.init();
    this.setupInteraction();
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

    this.createLaserBeam();
    this.createParticle();
    this.createForceVisualization();
    this.createMicroscope();
    this.createLights();
  }

  createLaserBeam() {
    // Focused laser beam (cone shape)
    const beamGroup = new THREE.Group();

    // Upper cone (converging)
    const upperConeGeom = new THREE.ConeGeometry(3, 8, 32, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const upperCone = new THREE.Mesh(upperConeGeom, beamMaterial);
    upperCone.position.y = 4;
    upperCone.rotation.x = Math.PI;
    beamGroup.add(upperCone);

    // Lower cone (diverging)
    const lowerCone = new THREE.Mesh(upperConeGeom, beamMaterial.clone());
    lowerCone.position.y = -4;
    beamGroup.add(lowerCone);

    // Focal point glow
    const focusGeom = new THREE.SphereGeometry(0.5, 16, 16);
    const focusMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.4
    });
    this.focalPoint = new THREE.Mesh(focusGeom, focusMaterial);
    beamGroup.add(this.focalPoint);

    // Inner bright core
    const coreGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaaaa,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeom, coreMaterial);
    this.focalPoint.add(core);

    this.laserBeam = beamGroup;
    this.scene.add(beamGroup);
  }

  createParticle() {
    // Trapped microparticle
    const particleGeom = new THREE.SphereGeometry(0.4, 32, 32);
    const particleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.9,
      roughness: 0.1,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });

    this.particle = new THREE.Mesh(particleGeom, particleMaterial);
    this.particle.userData = {
      velocity: new THREE.Vector3(),
      targetPosition: new THREE.Vector3(),
      isTrapped: true
    };
    this.scene.add(this.particle);

    // Particle glow
    const glowGeom = new THREE.SphereGeometry(0.5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.2
    });
    const glow = new THREE.Mesh(glowGeom, glowMaterial);
    this.particle.add(glow);
  }

  createForceVisualization() {
    // Gradient force arrows
    this.forceArrows = [];

    const arrowHelper = (dir, origin, length, color) => {
      const arrow = new THREE.ArrowHelper(dir, origin, length, color, 0.3, 0.15);
      arrow.visible = false;
      this.scene.add(arrow);
      return arrow;
    };

    // Create arrows pointing towards focal point
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * 2;
      const y = Math.sin(angle) * 2;

      const dir = new THREE.Vector3(-x, -y, 0).normalize();
      const origin = new THREE.Vector3(x, y, 0);

      this.forceArrows.push(arrowHelper(dir, origin, 1, 0x00d4ff));
    }
  }

  createMicroscope() {
    // Microscope objective lens
    const lensGeom = new THREE.CylinderGeometry(1.5, 2, 2, 32);
    const lensMaterial = new THREE.MeshStandardMaterial({
      color: 0x333344,
      metalness: 0.8,
      roughness: 0.2
    });

    const lens = new THREE.Mesh(lensGeom, lensMaterial);
    lens.position.y = 9;
    this.scene.add(lens);

    // Lens interior
    const interiorGeom = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32);
    const interiorMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.9
    });
    const interior = new THREE.Mesh(interiorGeom, interiorMaterial);
    interior.position.y = 8;
    this.scene.add(interior);
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambient);

    const point1 = new THREE.PointLight(0x00d4ff, 0.8, 30);
    point1.position.set(5, 5, 5);
    this.scene.add(point1);

    const point2 = new THREE.PointLight(0xff4444, 0.5, 30);
    point2.position.set(-5, 0, 5);
    this.scene.add(point2);
  }

  setupInteraction() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.onPointerDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.onPointerMove(e));
    this.canvas.addEventListener('mouseup', () => this.onPointerUp());
    this.canvas.addEventListener('mouseleave', () => this.onPointerUp());

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.onPointerDown(e.touches[0]);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.onPointerMove(e.touches[0]);
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => this.onPointerUp());
  }

  onPointerDown(event) {
    this.updateMouse(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObject(this.particle);

    if (intersects.length > 0) {
      this.isDragging = true;
      this.particle.userData.isTrapped = false;

      // Visual feedback
      this.particle.material.emissive = new THREE.Color(0x00d4ff);
      this.particle.material.emissiveIntensity = 0.5;

      // Show force arrows
      this.forceArrows.forEach(arrow => arrow.visible = true);
    }
  }

  onPointerMove(event) {
    this.updateMouse(event);

    if (this.isDragging) {
      // Convert mouse to 3D position
      const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
      vector.unproject(this.camera);

      const dir = vector.sub(this.camera.position).normalize();
      const distance = -this.camera.position.z / dir.z;
      const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

      // Clamp position
      pos.x = THREE.MathUtils.clamp(pos.x, -5, 5);
      pos.y = THREE.MathUtils.clamp(pos.y, -4, 4);
      pos.z = 0;

      this.particle.userData.targetPosition.copy(pos);

      // Update force arrows
      this.updateForceArrows(pos);
    }
  }

  onPointerUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.particle.userData.isTrapped = true;
      this.particle.material.emissiveIntensity = 0;

      // Hide force arrows
      this.forceArrows.forEach(arrow => arrow.visible = false);
    }
  }

  updateMouse(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  updateForceArrows(particlePos) {
    const focalPos = this.focalPoint.position;

    for (let i = 0; i < this.forceArrows.length; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const offset = new THREE.Vector3(
        Math.cos(angle) * 1.5,
        Math.sin(angle) * 1.5,
        0
      );

      const arrowOrigin = particlePos.clone().add(offset);
      const dir = focalPos.clone().sub(arrowOrigin).normalize();

      this.forceArrows[i].position.copy(arrowOrigin);
      this.forceArrows[i].setDirection(dir);

      // Arrow length based on distance from focal point
      const distance = particlePos.distanceTo(focalPos);
      const length = Math.min(2, distance * 0.5);
      this.forceArrows[i].setLength(length, 0.3, 0.15);
    }
  }

  animate(time) {
    const delta = this.clock.getDelta();
    const particle = this.particle;
    const pos = particle.position;
    const vel = particle.userData.velocity;
    const focalPos = this.focalPoint.position;

    if (this.isDragging) {
      // Move towards target (dragged position)
      const target = particle.userData.targetPosition;
      vel.add(target.clone().sub(pos).multiplyScalar(0.1));
    } else if (particle.userData.isTrapped) {
      // Trapping force (gradient force towards focal point)
      const trapForce = focalPos.clone().sub(pos).multiplyScalar(0.05);
      vel.add(trapForce);

      // Scattering force (slight push in laser direction)
      vel.y -= 0.001;

      // Brownian motion
      vel.add(new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      ));
    }

    // Damping
    vel.multiplyScalar(0.92);

    // Update position
    pos.add(vel);

    // Boundary constraints
    const maxDist = 6;
    if (pos.length() > maxDist) {
      pos.normalize().multiplyScalar(maxDist);
      vel.multiplyScalar(-0.3);
    }

    // Focal point intensity based on distance
    const distance = pos.distanceTo(focalPos);
    this.focalPoint.material.opacity = 0.4 + Math.max(0, 0.4 - distance * 0.1);

    // Particle wobble when trapped
    if (particle.userData.isTrapped && !this.isDragging) {
      const wobble = 0.02;
      particle.rotation.x = Math.sin(time * 5) * wobble;
      particle.rotation.y = Math.cos(time * 4) * wobble;
    }

    // Laser beam pulse
    const pulse = 0.95 + Math.sin(time * 3) * 0.05;
    this.laserBeam.children[0].scale.set(pulse, 1, pulse);
    this.laserBeam.children[1].scale.set(pulse, 1, pulse);

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
