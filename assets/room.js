const zones = {
  board: {
    title: 'Blackboard wall',
    body: 'System architecture, graph algorithms, machine learning, rendering, infrastructure, compiler notes, simulations, and teaching methodology.',
    link: '#areas'
  },
  monitor: {
    title: 'EngineOS monitor',
    body: 'The project dashboard: repositories, live demos, research, teaching material, resume surface, blog, and contact routes.',
    link: '#flagships'
  },
  notebook: {
    title: 'Teaching notebook',
    body: 'Lesson plans, graph traversals, projection matrices, architecture notes, TODOs, and explanation-first engineering traces.',
    link: '#profile'
  },
  github: {
    title: 'GitHub terminal',
    body: 'Code, organizations, experiments, course archives, ML systems, graphics prototypes, and open-source-facing project history.',
    link: 'https://github.com/dragosandreibobu'
  },
  contact: {
    title: 'Contact card',
    body: 'A lightweight route for professional context, collaboration, teaching, research, and engineering opportunities.',
    link: '#orgs'
  }
};

const projects = [
  {
    name: 'curricula.live platform',
    organization: 'curricula-live',
    status: 'Active',
    summary: 'Landing and platform surfaces for a curriculum planner organized around engine, print, schools, and mobile layers.',
    repo: 'https://github.com/curricula-live/landing',
    live: 'https://curricula.live',
    tags: ['Next.js', 'React', 'TypeScript']
  },
  {
    name: 'Software sketchbook',
    organization: 'DigitalChalkLab',
    status: 'Active',
    summary: 'Unified teaching notebook for frontend components, backend routes, database schemas, and distributed systems labs.',
    repo: 'https://github.com/DigitalChalkLab/sketchbook',
    live: 'https://chalkcircuit-lab.github.io/sketchbook/',
    tags: ['HTML', 'JavaScript', 'Teaching']
  },
  {
    name: 'Machine Learning Compatible Game Engine',
    organization: 'MLCGE Lab',
    status: 'Research / Thesis',
    summary: 'Experimental graphics suite combining a C++/OpenGL rendering core, editor interface, and ML-oriented simulation hooks.',
    repo: 'https://github.com/Machine-Learning-Compatible-Game-Engine/full-suite',
    live: '',
    tags: ['C++', 'OpenGL', 'Simulation']
  },
  {
    name: 'KinectSchoolScanner',
    organization: 'Bluebird-Studio',
    status: 'Active / Research',
    summary: 'WPF Kinect v1 depth/RGB room scanner that generates colored point clouds and exports ASCII PLY files for Blender.',
    repo: 'https://github.com/Bluebird-Studio/KinectSchoolScanner',
    live: '',
    tags: ['WPF', 'Kinect', 'C#']
  },
  {
    name: 'ScalpScan Ordinal Classifier',
    organization: 'ScalpScanClassifier',
    status: 'Active / Research',
    summary: 'FastAPI backend and multi-head PyTorch neural model trained on ordinal criteria for scalp-condition classification.',
    repo: 'https://github.com/dragosandreibobu/InnovationLabs-2026-Scalp-Condition-Classifier',
    live: '',
    tags: ['PyTorch', 'FastAPI', 'ML']
  },
  {
    name: 'Predictive Demand Prediction',
    organization: 'Hyperspace-Intelligence',
    status: 'Archived / ML Competition',
    summary: 'Retail sales forecasting system using gradient-boosted trees, recursive features, and out-of-fold blending.',
    repo: 'https://github.com/Hyperspace-Intelligence/fiicode-2026-predictive-demand-prediction',
    live: '',
    tags: ['Python', 'CatBoost', 'Forecasting']
  }
];

function selectZone(key) {
  const zone = zones[key] || zones.board;
  document.getElementById('panel-title').textContent = zone.title;
  document.getElementById('panel-body').textContent = zone.body;
  const link = document.getElementById('panel-link');
  link.href = zone.link;
  link.target = zone.link.startsWith('http') ? '_blank' : '';
  link.rel = zone.link.startsWith('http') ? 'noreferrer' : '';
  document.querySelectorAll('[data-hotspot]').forEach((button) => {
    button.classList.toggle('active', button.dataset.hotspot === key);
  });
}

document.querySelectorAll('[data-hotspot]').forEach((button) => {
  button.addEventListener('click', () => selectZone(button.dataset.hotspot));
});

const projectContainer = document.getElementById('project-grid');
if (projectContainer) {
  projectContainer.innerHTML = projects.map((project) => `
    <article class="project-card">
      <div class="meta"><span>${project.status}</span><span>${project.organization}</span></div>
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <div class="meta">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <div class="project-links">
        <a href="${project.repo}" target="_blank" rel="noreferrer">Code Repository</a>
        ${project.live ? `<a class="primary" href="${project.live}" target="_blank" rel="noreferrer">Live Demo</a>` : ''}
      </div>
    </article>
  `).join('');
}

const toggle = document.getElementById('toggle-room');
const canvas = document.getElementById('room-canvas');
let interactiveEnabled = localStorage.getItem('room-mode') !== 'static';
let started = false;

function setMode(enabled) {
  interactiveEnabled = enabled;
  document.body.classList.toggle('static', !enabled);
  if (toggle) {
    toggle.textContent = enabled ? 'Interactive Mode: ON' : 'Interactive Mode: OFF';
    toggle.setAttribute('aria-pressed', String(enabled));
  }
  localStorage.setItem('room-mode', enabled ? 'interactive' : 'static');
  if (enabled && !started && window.matchMedia('(min-width: 761px)').matches) start3D();
}

if (toggle) {
  toggle.addEventListener('click', () => setMode(!interactiveEnabled));
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !interactiveEnabled) {
  setMode(false);
} else if (window.matchMedia('(min-width: 761px)').matches) {
  setMode(true);
}

async function start3D() {
  if (!canvas || started) return;
  started = true;

  try {
    const THREE = await import('https://unpkg.com/three@0.165.0/build/three.module.js');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050504, 8, 15);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.45, 7.2);

    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight(0x8fa6bd, 0.72));
    const lamp = new THREE.PointLight(0xffc47c, 2.4, 8);
    lamp.position.set(-3.0, 2.6, 2.2);
    scene.add(lamp);
    const screenGlow = new THREE.PointLight(0x63a8ff, 1.8, 7);
    screenGlow.position.set(0, 0.35, 1.1);
    scene.add(screenGlow);

    const clickable = [];

    function material(color, roughness = 0.76) {
      return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.04 });
    }

    function box(name, size, pos, color, hotspot = null, roughness = 0.76) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(color, roughness));
      mesh.name = name;
      mesh.position.set(...pos);
      if (hotspot) {
        mesh.userData.hotspot = hotspot;
        clickable.push(mesh);
      }
      group.add(mesh);
      return mesh;
    }

    box('floor', [8.8, 0.12, 6.5], [0, -1.36, 0], 0x3f2618);
    box('back wall', [8.8, 4.5, 0.12], [0, 0.9, -3.25], 0x101b17);
    box('blackboard', [7.9, 2.65, 0.08], [0, 1.65, -3.16], 0x102820, 'board');
    box('desk', [7.4, 0.32, 2.1], [0, -0.72, -0.05], 0x7a4b30);
    box('monitor shell', [4.65, 1.45, 0.12], [0.35, 0.12, -0.9], 0x05070a, 'monitor');
    box('screen', [4.35, 1.18, 0.04], [0.35, 0.13, -0.81], 0x0a1f35, 'monitor');
    box('notebook', [1.75, 0.08, 1.05], [-1.75, -0.5, 0.26], 0xd9c48e, 'notebook');
    box('keyboard', [1.75, 0.06, 0.34], [0.25, -0.5, 0.48], 0x07090d);
    box('mouse', [0.45, 0.12, 0.72], [1.65, -0.46, 0.45], 0x111820);
    box('github terminal', [1.28, 0.75, 0.08], [2.55, -0.38, 0.08], 0x06080b, 'github');
    box('contact card', [0.9, 0.58, 0.06], [3.18, -0.65, 0.86], 0xb88a58, 'contact');
    box('server rack', [0.78, 1.35, 0.52], [3.9, 0.05, -1.65], 0x070b12, 'github');
    box('lamp shade', [0.82, 0.25, 0.52], [-3.65, 0.6, -0.85], 0x222222);
    box('book stack', [1.15, 0.5, 0.68], [-3.05, -0.42, -0.1], 0x4f2f20);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function resize() {
      const rect = canvas.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
      renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1), false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    }

    function updatePointer(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    canvas.addEventListener('click', (event) => {
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(clickable, false)[0];
      if (hit?.object?.userData?.hotspot) selectZone(hit.object.userData.hotspot);
    });

    canvas.addEventListener('pointermove', (event) => {
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      canvas.style.cursor = raycaster.intersectObjects(clickable, false)[0] ? 'pointer' : 'default';
    });

    window.addEventListener('resize', resize);
    resize();
    canvas.classList.add('ready');

    function animate(time) {
      if (!interactiveEnabled) return;
      group.rotation.y = Math.sin(time * 0.00032) * 0.026;
      group.rotation.x = Math.sin(time * 0.00021) * 0.006;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate(0);
  } catch (error) {
    console.warn('WebGL room enhancement failed; static room remains available.', error);
    setMode(false);
  }
}
