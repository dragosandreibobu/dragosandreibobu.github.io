const zones = {
  board: {
    title: 'Blackboard wall',
    body: 'System architecture, graph algorithms, machine learning, rendering, infrastructure, compiler notes, simulations, and teaching methodology.',
    link: '#areas'
  },
  monitor: {
    title: 'EngineOS monitor',
    body: 'Project dashboard: repositories, live demos, research, teaching material, resume surface, blog, and contact routes.',
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
    body: 'Professional context, collaboration, teaching, research, and engineering opportunities.',
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

function openZone(key) {
  const zone = zones[key] || zones.board;
  selectZone(key);
  if (zone.link.startsWith('http')) {
    window.open(zone.link, '_blank', 'noreferrer');
    return;
  }
  document.querySelector(zone.link)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-hotspot]').forEach((button) => {
  button.addEventListener('mouseenter', () => selectZone(button.dataset.hotspot));
  button.addEventListener('focus', () => selectZone(button.dataset.hotspot));
  button.addEventListener('click', () => openZone(button.dataset.hotspot));
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
let sceneApi = null;

function setMode(enabled) {
  interactiveEnabled = Boolean(enabled);
  document.body.classList.toggle('interactive', interactiveEnabled);
  document.body.classList.toggle('static', !interactiveEnabled);

  if (toggle) {
    toggle.textContent = interactiveEnabled ? 'Interactive Mode: ON' : 'Interactive Mode: OFF';
    toggle.setAttribute('aria-pressed', String(interactiveEnabled));
  }

  localStorage.setItem('room-mode', interactiveEnabled ? 'interactive' : 'static');
  if (sceneApi) sceneApi.setInteractive(interactiveEnabled);
}

if (toggle) toggle.addEventListener('click', () => setMode(!interactiveEnabled));

setMode(interactiveEnabled);
initRoomScene();

async function initRoomScene() {
  if (!canvas || window.matchMedia('(max-width: 760px)').matches) return;

  try {
    const THREE = await import('https://unpkg.com/three@0.165.0/build/three.module.js');
    sceneApi = buildRoomScene(THREE, canvas);
    sceneApi.setInteractive(interactiveEnabled);
  } catch (error) {
    console.warn('Three.js room failed; CSS fallback remains active.', error);
    document.body.classList.add('webgl-failed');
  }
}

function buildRoomScene(THREE, canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });

  renderer.setClearColor(0x050504, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050504);
  scene.fog = new THREE.FogExp2(0x050504, 0.034);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const cameraTarget = new THREE.Vector3(0.1, 0.48, -1.62);
  const baseCamera = new THREE.Vector3(0.28, 1.42, 6.55);
  camera.position.copy(baseCamera);

  const root = new THREE.Group();
  scene.add(root);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const clickable = [];
  let hovered = null;
  let selectedHotspot = null;
  let interactive = interactiveEnabled;

  const textureCache = new Map();
  const matCache = new Map();

  function canvasTexture(key, width, height, draw) {
    if (textureCache.has(key)) return textureCache.get(key);
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    const ctx = c.getContext('2d');
    draw(ctx, width, height);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
    textureCache.set(key, texture);
    return texture;
  }

  function material(name, config) {
    if (matCache.has(name)) return matCache.get(name);
    const m = new THREE.MeshStandardMaterial(config);
    matCache.set(name, m);
    return m;
  }

  function cloneInteractiveMaterial(mat) {
    const clone = mat.clone();
    if (!clone.emissive) clone.emissive = new THREE.Color(0x000000);
    clone.userData.baseEmissive = clone.emissive.clone();
    clone.userData.baseEmissiveIntensity = clone.emissiveIntensity || 0;
    return clone;
  }

  function makeInteractive(mesh, hotspot, label) {
    mesh.userData.hotspot = hotspot;
    mesh.userData.label = label || hotspot;
    mesh.userData.baseScale = mesh.scale.clone();
    mesh.userData.targetScale = mesh.scale.clone();
    mesh.material = cloneInteractiveMaterial(mesh.material);
    clickable.push(mesh);
    return mesh;
  }

  function box(name, size, position, mat, options = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
    mesh.name = name;
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
    mesh.castShadow = options.castShadow !== false;
    mesh.receiveShadow = options.receiveShadow !== false;
    if (options.hotspot) makeInteractive(mesh, options.hotspot, options.label);
    root.add(mesh);
    return mesh;
  }

  function plane(name, size, position, mat, options = {}) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), mat);
    mesh.name = name;
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
    mesh.castShadow = options.castShadow || false;
    mesh.receiveShadow = options.receiveShadow !== false;
    if (options.hotspot) makeInteractive(mesh, options.hotspot, options.label);
    root.add(mesh);
    return mesh;
  }

  function drawNoise(ctx, width, height, opacity = 0.06) {
    const image = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < image.data.length; i += 4) {
      const value = Math.floor(Math.random() * 255);
      image.data[i] = value;
      image.data[i + 1] = value;
      image.data[i + 2] = value;
      image.data[i + 3] = Math.floor(255 * opacity);
    }
    ctx.putImageData(image, 0, 0);
  }

  function makeWoodTexture(key, base = '#3a2115') {
    return canvasTexture(key, 768, 768, (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, base);
      grad.addColorStop(0.45, '#5b3622');
      grad.addColorStop(1, '#170c07');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 220; i++) {
        const y = Math.random() * h;
        ctx.strokeStyle = i % 7 === 0 ? 'rgba(239,177,105,.2)' : 'rgba(0,0,0,.2)';
        ctx.lineWidth = Math.random() * 2.2 + 0.35;
        ctx.beginPath();
        ctx.moveTo(-50, y);
        for (let x = -50; x < w + 80; x += 32) ctx.lineTo(x, y + Math.sin(x * 0.018 + i) * 10 + Math.random() * 4);
        ctx.stroke();
      }
      for (let i = 0; i < 26; i++) {
        ctx.strokeStyle = 'rgba(255,205,150,.065)';
        ctx.beginPath();
        ctx.ellipse(Math.random() * w, Math.random() * h, Math.random() * 82 + 28, Math.random() * 16 + 5, Math.random() * 0.4, 0, Math.PI * 2);
        ctx.stroke();
      }
      drawNoise(ctx, w, h, 0.016);
    });
  }

  function makeWallTexture() {
    return canvasTexture('dark-wall-fabric', 768, 768, (ctx, w, h) => {
      ctx.fillStyle = '#15120f';
      ctx.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 9) {
        ctx.strokeStyle = y % 36 === 0 ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.012)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + Math.sin(y) * 2);
        ctx.stroke();
      }
      drawNoise(ctx, w, h, 0.02);
    });
  }

  function makeBlackboardTexture() {
    return canvasTexture('blackboard-system-map-v2', 1800, 760, (ctx, w, h) => {
      ctx.fillStyle = '#10231d';
      ctx.fillRect(0, 0, w, h);
      drawNoise(ctx, w, h, 0.04);
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#dce8dc';
      for (let x = 0; x <= w; x += w / 6) {
        ctx.beginPath();
        ctx.moveTo(x, 24);
        ctx.lineTo(x + Math.sin(x) * 4, h - 24);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const sections = [
        ['System Architecture', ['Web → API', 'Auth → CDN', 'Postgres / Redis', 'workers']],
        ['Graph Algorithms', ['G = (V,E)', 'BFS / DFS', 'Dijkstra', 'O((V+E)logV)']],
        ['Machine Learning', ['L = -Σ ylogŷ', 'θ ← θ - η∇L', 'features → model', 'bias / variance']],
        ['Rendering Pipeline', ['Model → Vertex', 'Rasterizer', 'Fragment → PostFX', 'PBR / shadows']],
        ['Infrastructure', ['Docker', 'GitHub Actions', 'Supabase', 'static deploys']],
        ['Compiler Notes', ['tokens → AST', 'IR → ASM', 'constant folding', 'dead code elim.']]
      ];

      sections.forEach((section, i) => {
        const x = i * (w / 6) + 34;
        const y = 62;
        ctx.strokeStyle = i % 2 ? 'rgba(238,213,155,.78)' : 'rgba(220,232,220,.74)';
        ctx.fillStyle = ctx.strokeStyle;
        ctx.font = '32px IBM Plex Mono, monospace';
        ctx.fillText(section[0], x, y);
        ctx.beginPath();
        ctx.moveTo(x, y + 16);
        ctx.lineTo(x + 230, y + 9 + Math.sin(i) * 3);
        ctx.stroke();
        ctx.font = '24px IBM Plex Mono, monospace';
        section[1].forEach((line, j) => ctx.fillText(line, x, y + 62 + j * 38));
      });

      ctx.strokeStyle = 'rgba(220,232,220,.68)';
      ctx.lineWidth = 2.4;
      const pts = [[0, 0], [78, -56], [160, 16], [92, 76], [220, 86], [252, -26]];
      const gx = 330;
      const gy = 330;
      pts.forEach(([x, y], idx) => {
        ctx.beginPath();
        ctx.arc(gx + x, gy + y, 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(String(idx + 1), gx + x - 6, gy + y + 7);
      });
      [[0,1],[0,3],[1,2],[1,3],[2,5],[3,4],[4,5]].forEach(([a,b]) => {
        ctx.beginPath();
        ctx.moveTo(gx + pts[a][0], gy + pts[a][1]);
        ctx.lineTo(gx + pts[b][0], gy + pts[b][1]);
        ctx.stroke();
      });

      ctx.strokeStyle = 'rgba(137,240,177,.55)';
      ctx.beginPath();
      for (let i = 0; i < 190; i++) {
        const x = 750 + i * 2.15;
        const y = 480 + Math.sin(i * 0.15) * 29 + Math.sin(i * 0.04) * 15;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(143,199,255,.5)';
      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.moveTo(1180 + i * 17, 310);
        ctx.lineTo(1260 + i * 4, 470 + Math.sin(i) * 18);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(220,232,220,.62)';
      ctx.font = '24px IBM Plex Mono, monospace';
      ctx.fillText('Teaching methodology', 1450, 405);
      ctx.fillText('scaffold → recall → project', 1410, 448);
    });
  }

  function makeScreenTexture() {
    return canvasTexture('engine-os-screen-v2', 1500, 560, (ctx, w, h) => {
      ctx.fillStyle = '#06101d';
      ctx.fillRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(w * 0.72, h * 0.25, 40, w * 0.72, h * 0.25, 640);
      glow.addColorStop(0, 'rgba(91,160,255,.28)');
      glow.addColorStop(1, 'rgba(91,160,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(143,199,255,.14)';
      ctx.strokeRect(14, 14, w - 28, h - 28);
      ctx.fillStyle = 'rgba(203,213,225,.76)';
      ctx.font = '24px IBM Plex Mono, monospace';
      ctx.fillText('▣ EngineOS   Build · Simulate · Teach · Repeat', 36, 52);
      ctx.fillText('10:24 PM', w - 160, 52);
      const titles = ['Projects', 'GitHub', 'Resume', 'Research', 'Teaching', 'Contact'];
      const cardW = (w - 108) / titles.length;
      titles.forEach((title, i) => {
        const x = 36 + i * cardW;
        ctx.fillStyle = 'rgba(255,255,255,.04)';
        ctx.fillRect(x, 92, cardW - 14, 378);
        ctx.strokeStyle = 'rgba(143,199,255,.2)';
        ctx.strokeRect(x, 92, cardW - 14, 378);
        ctx.fillStyle = '#e5edf8';
        ctx.font = '26px IBM Plex Mono, monospace';
        ctx.fillText(title, x + 18, 132);
        ctx.fillStyle = 'rgba(203,213,225,.76)';
        ctx.font = '19px IBM Plex Mono, monospace';
        ['curricula.live', 'MLCGE Lab', 'ScalpScan', 'DigitalChalk', 'OpenCV'].forEach((line, j) => ctx.fillText(line, x + 18, 182 + j * 43));
      });
    });
  }

  function makeNotebookTexture() {
    return canvasTexture('open-notebook-v2', 940, 540, (ctx, w, h) => {
      ctx.fillStyle = '#eadfbe';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(40,60,80,.16)';
      for (let x = 0; x < w; x += 34) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 34) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.fillStyle = '#16202d';
      ctx.font = '29px IBM Plex Mono, monospace';
      ctx.fillText('Dijkstra(G, w, s)', 48, 66);
      ctx.font = '21px IBM Plex Mono, monospace';
      ['for v ∈ V: dist[v] = ∞', 'Q ← priority queue', 'relax(u, v)', 'projection matrix', 'lesson → example → task'].forEach((line, i) => ctx.fillText(line, 48, 112 + i * 44));
      ctx.strokeStyle = 'rgba(20,35,55,.75)';
      ctx.beginPath(); ctx.rect(535, 80, 292, 230); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(575, 270); ctx.lineTo(690, 116); ctx.lineTo(806, 270); ctx.closePath(); ctx.stroke();
      ctx.fillStyle = 'rgba(20,35,55,.65)';
      ctx.fillText('P = perspective', 540, 365);
      drawNoise(ctx, w, h, 0.015);
    });
  }

  function makeTerminalTexture() {
    return canvasTexture('github-terminal-v2', 680, 380, (ctx, w, h) => {
      ctx.fillStyle = '#05070b';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#89f0b1';
      ctx.font = '26px IBM Plex Mono, monospace';
      ctx.fillText('> github.com/dragosandreibobu', 34, 64);
      ctx.fillStyle = '#e5edf8';
      ctx.font = '56px Inter, sans-serif';
      ctx.fillText('GITHUB', 132, 158);
      ctx.font = '25px Inter, sans-serif';
      ctx.fillStyle = 'rgba(229,237,248,.72)';
      ctx.fillText('Code, contributions,', 132, 215);
      ctx.fillText('organizations, archives.', 132, 252);
      ctx.strokeStyle = 'rgba(143,199,255,.18)';
      ctx.strokeRect(14, 14, w - 28, h - 28);
    });
  }

  const woodMaterial = material('dark-walnut', { color: 0xffffff, map: makeWoodTexture('dark-walnut-v2'), roughness: 0.74, metalness: 0.02 });
  const floorMaterial = material('floor-wood', { color: 0xffffff, map: makeWoodTexture('floor-boards-v2', '#21130c'), roughness: 0.86 });
  const wallMaterial = material('academic-wall', { color: 0xffffff, map: makeWallTexture(), roughness: 0.94 });
  const blackMaterial = material('soft-black', { color: 0x05070a, roughness: 0.7 });
  const brassMaterial = material('aged-brass', { color: 0x7d5629, roughness: 0.45, metalness: 0.55 });
  const paperMaterial = material('paper', { color: 0xffffff, map: makeNotebookTexture(), roughness: 0.9 });
  const boardMaterial = material('chalk-board', { color: 0xffffff, map: makeBlackboardTexture(), roughness: 0.97 });
  const screenTexture = makeScreenTexture();
  const screenMaterial = material('screen', {
    color: 0xffffff,
    map: screenTexture,
    roughness: 0.28,
    emissive: new THREE.Color(0x2b67ac),
    emissiveIntensity: 0.44,
    emissiveMap: screenTexture
  });
  const terminalMaterial = material('terminal-screen', { color: 0xffffff, map: makeTerminalTexture(), roughness: 0.35, emissive: new THREE.Color(0x15291e), emissiveIntensity: 0.36 });
  const leatherMaterial = material('black-leather', { color: 0x11100d, roughness: 0.64, metalness: 0.04 });
  const circuitMaterial = material('circuit', { color: 0x123222, roughness: 0.5, metalness: 0.12, emissive: 0x092214, emissiveIntensity: 0.2 });

  scene.add(new THREE.HemisphereLight(0x8fb6ff, 0x1a1008, 0.62));
  const key = new THREE.DirectionalLight(0xffd5a2, 2.15);
  key.position.set(-3.8, 5.2, 3.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 16;
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  scene.add(key);

  const monitorGlow = new THREE.PointLight(0x7bbcff, 1.6, 5.2, 1.8);
  monitorGlow.position.set(0.2, 0.45, 1.08);
  scene.add(monitorGlow);
  const lampGlow = new THREE.PointLight(0xffbd7a, 3.7, 5.8, 1.4);
  lampGlow.position.set(-3.2, 1.35, 1.15);
  scene.add(lampGlow);
  const rackGlow = new THREE.PointLight(0x2f7cff, 0.8, 3.8, 2.2);
  rackGlow.position.set(3.8, 0.4, -1.3);
  scene.add(rackGlow);

  box('floor', [10.5, 0.14, 7.2], [0, -1.35, 0.1], floorMaterial, { receiveShadow: true, castShadow: false });
  box('back-wall', [10.5, 4.7, 0.16], [0, 0.98, -3.1], wallMaterial, { receiveShadow: true, castShadow: false });
  box('left-wall', [0.16, 4.7, 7.2], [-5.25, 0.98, 0.1], wallMaterial, { receiveShadow: true, castShadow: false });
  box('right-wall', [0.16, 4.7, 7.2], [5.25, 0.98, 0.1], wallMaterial, { receiveShadow: true, castShadow: false });
  box('ceiling-shadow', [10.5, 0.12, 7.2], [0, 3.36, 0.1], material('ceiling', { color: 0x090806, roughness: 0.98 }), { castShadow: false });

  plane('blackboard-surface', [7.9, 2.38], [0, 1.62, -3.0], boardMaterial, { hotspot: 'board', label: 'Blackboard' });
  box('board-frame-top', [8.2, 0.16, 0.18], [0, 2.88, -2.92], woodMaterial, { hotspot: 'board' });
  box('board-frame-bottom', [8.2, 0.16, 0.2], [0, 0.36, -2.92], woodMaterial, { hotspot: 'board' });
  box('board-frame-left', [0.16, 2.62, 0.18], [-4.1, 1.62, -2.92], woodMaterial, { hotspot: 'board' });
  box('board-frame-right', [0.16, 2.62, 0.18], [4.1, 1.62, -2.92], woodMaterial, { hotspot: 'board' });

  box('desktop-slab', [7.6, 0.34, 2.15], [0, -0.62, -0.02], woodMaterial, { hotspot: 'notebook', label: 'Desk' });
  box('desk-front', [7.75, 0.9, 0.18], [0, -1.03, 1.12], woodMaterial, { hotspot: 'notebook' });
  box('desk-left-leg', [0.28, 1.3, 0.28], [-3.35, -1.1, -0.72], woodMaterial);
  box('desk-right-leg', [0.28, 1.3, 0.28], [3.35, -1.1, -0.72], woodMaterial);

  box('monitor-frame', [4.55, 1.38, 0.16], [0.25, 0.15, -0.74], blackMaterial, { hotspot: 'monitor', label: 'EngineOS' });
  plane('monitor-screen', [4.28, 1.12], [0.25, 0.15, -0.64], screenMaterial, { hotspot: 'monitor', label: 'EngineOS screen' });
  box('monitor-stand-neck', [0.22, 0.56, 0.16], [0.25, -0.52, -0.76], blackMaterial, { hotspot: 'monitor' });
  box('monitor-stand-base', [1.1, 0.08, 0.58], [0.25, -0.84, -0.62], blackMaterial, { hotspot: 'monitor' });

  box('open-notebook', [1.92, 0.06, 1.1], [-1.55, -0.4, 0.42], paperMaterial, { hotspot: 'notebook', label: 'Notebook', rz: -0.08 });
  box('notebook-spine', [0.08, 0.07, 1.16], [-1.55, -0.36, 0.42], blackMaterial, { hotspot: 'notebook', rz: -0.08 });
  for (let i = 0; i < 9; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.008, 8, 18), brassMaterial);
    ring.position.set(-1.55, -0.31, -0.08 + i * 0.12);
    ring.rotation.set(Math.PI / 2, 0, -0.08);
    ring.castShadow = true;
    root.add(ring);
  }

  box('keyboard', [1.75, 0.06, 0.34], [0.25, -0.38, 0.66], blackMaterial, { hotspot: 'monitor', label: 'Keyboard' });
  const keyMat = material('key-mat', { color: 0x11151c, roughness: 0.55 });
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 11; c++) {
      box(`key-${r}-${c}`, [0.105, 0.018, 0.052], [-0.39 + c * 0.13, -0.33, 0.55 + r * 0.07], keyMat, { castShadow: false, hotspot: 'monitor' });
    }
  }

  const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 16), blackMaterial.clone());
  mouse.name = 'mouse';
  mouse.position.set(1.72, -0.35, 0.62);
  mouse.scale.set(0.72, 0.22, 1.12);
  mouse.castShadow = true;
  mouse.receiveShadow = true;
  makeInteractive(mouse, 'monitor', 'Mouse');
  root.add(mouse);

  plane('github-terminal', [1.46, 0.82], [2.63, -0.32, 0.22], terminalMaterial, { rx: -Math.PI / 2.7, hotspot: 'github', label: 'GitHub terminal' });
  box('contact-card', [0.95, 0.055, 0.62], [3.28, -0.45, 0.92], material('brown-note', { color: 0xb88958, roughness: 0.8 }), { hotspot: 'contact', label: 'Contact card', rz: 0.04 });

  const bookColors = [0x4c2f22, 0x22314a, 0x5b3b27, 0x2f4933, 0x43273a];
  for (let i = 0; i < 5; i++) {
    box(`book-stack-${i}`, [1.3, 0.14, 0.54], [-3.23, -0.46 + i * 0.15, -0.36], material(`book-${i}-mat`, { color: bookColors[i], roughness: 0.65 }), { hotspot: i < 2 ? 'board' : 'notebook', label: 'Book stack', rz: 0.015 * (i - 2) });
  }

  for (let shelf = 0; shelf < 3; shelf++) {
    box(`bookshelf-plank-${shelf}`, [1.3, 0.07, 0.42], [4.34, 1.95 - shelf * 0.48, -2.15], woodMaterial, { hotspot: 'github' });
    for (let i = 0; i < 8; i++) {
      box(`shelf-book-${shelf}-${i}`, [0.095, 0.36 + Math.random() * 0.14, 0.28], [3.84 + i * 0.12, 2.13 - shelf * 0.48, -2.0], material(`shelf-book-${shelf}-${i}-mat`, { color: bookColors[(i + shelf) % bookColors.length], roughness: 0.68 }), { hotspot: 'board' });
    }
  }

  box('server-rack', [0.82, 1.42, 0.52], [4.1, 0.13, -1.52], material('rack-shell', { color: 0x070b12, roughness: 0.46, metalness: 0.38 }), { hotspot: 'github', label: 'Server rack' });
  for (let i = 0; i < 5; i++) {
    box(`rack-slot-${i}`, [0.72, 0.16, 0.04], [4.1, -0.42 + i * 0.25, -1.23], blackMaterial, { hotspot: 'github' });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 12), material(`led-${i}`, { color: 0x8fc7ff, emissive: 0x3f8cff, emissiveIntensity: 2.2 }));
    led.position.set(4.37, -0.42 + i * 0.25, -1.18);
    root.add(led);
  }

  box('circuit-board', [1.08, 0.045, 0.56], [2.22, -0.43, 0.78], circuitMaterial, { hotspot: 'monitor', label: 'Circuit board' });
  const chipMat = material('chip', { color: 0x020604, roughness: 0.5 });
  for (let i = 0; i < 18; i++) {
    box(`chip-${i}`, [0.09, 0.025, 0.06], [1.75 + Math.random() * 0.9, -0.38, 0.55 + Math.random() * 0.42], chipMat, { castShadow: false, hotspot: 'monitor' });
  }

  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.08, 32), brassMaterial.clone());
  lampBase.position.set(-3.75, -0.38, 0.28);
  lampBase.castShadow = true;
  makeInteractive(lampBase, 'notebook', 'Desk lamp');
  root.add(lampBase);

  const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.0, 18), brassMaterial.clone());
  lampStem.position.set(-3.75, 0.12, 0.28);
  lampStem.rotation.z = -0.18;
  lampStem.castShadow = true;
  makeInteractive(lampStem, 'notebook', 'Desk lamp');
  root.add(lampStem);

  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.42, 36, 1, true), material('lamp-shade', { color: 0x12100e, roughness: 0.35, metalness: 0.28 }).clone());
  shade.position.set(-3.42, 0.72, 0.45);
  shade.rotation.set(0.55, 0.05, -0.5);
  shade.castShadow = true;
  makeInteractive(shade, 'notebook', 'Desk lamp');
  root.add(shade);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.095, 24, 12), material('bulb', { color: 0xffe2a8, emissive: 0xffb66d, emissiveIntensity: 2.4 }));
  bulb.position.set(-3.33, 0.55, 0.62);
  root.add(bulb);

  box('chalk-stick', [0.46, 0.035, 0.035], [-0.88, -0.34, 0.98], material('chalk', { color: 0xe8eadf, roughness: 0.96 }), { hotspot: 'board', label: 'Chalk', rz: 0.18 });
  box('fountain-pen', [0.62, 0.035, 0.035], [0.9, -0.34, 0.99], material('pen', { color: 0x0c0c0d, roughness: 0.38, metalness: 0.45 }), { hotspot: 'notebook', label: 'Pen', rz: -0.22 });

  const hoverLight = new THREE.PointLight(0x8fc7ff, 0, 2.8, 2.0);
  scene.add(hoverLight);

  function setHovered(mesh) {
    if (hovered === mesh) return;
    if (hovered) hovered.userData.targetScale.copy(hovered.userData.baseScale);
    hovered = mesh;
    if (hovered) {
      hovered.userData.targetScale.copy(hovered.userData.baseScale).multiplyScalar(1.035);
      selectedHotspot = hovered.userData.hotspot;
      selectZone(selectedHotspot);
    }
  }

  function updatePointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function pickObject(event) {
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(clickable, false)[0]?.object || null;
  }

  canvas.addEventListener('pointermove', (event) => {
    if (!interactive) {
      setHovered(null);
      canvas.style.cursor = 'default';
      return;
    }
    const hit = pickObject(event);
    setHovered(hit);
    canvas.style.cursor = hit ? 'pointer' : 'default';
  });

  canvas.addEventListener('pointerleave', () => {
    setHovered(null);
    canvas.style.cursor = 'default';
  });

  canvas.addEventListener('click', (event) => {
    if (!interactive) return;
    const hit = pickObject(event);
    if (hit?.userData?.hotspot) openZone(hit.userData.hotspot);
  });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1), false);
    camera.aspect = Math.max(rect.width, 1) / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  let firstFrame = true;
  let drift = true;

  function animate(time) {
    const t = time * 0.001;
    if (drift && interactive) {
      camera.position.x = baseCamera.x + Math.sin(t * 0.22) * 0.065;
      camera.position.y = baseCamera.y + Math.sin(t * 0.17) * 0.028;
      camera.position.z = baseCamera.z + Math.sin(t * 0.15) * 0.075;
      root.rotation.y = Math.sin(t * 0.1) * 0.005;
    } else {
      camera.position.lerp(baseCamera, 0.035);
      root.rotation.y *= 0.96;
    }

    clickable.forEach((mesh) => {
      mesh.scale.lerp(mesh.userData.targetScale || mesh.userData.baseScale, 0.18);
      const active = mesh === hovered;
      if (mesh.material?.emissive) {
        mesh.material.emissive.lerp(active ? new THREE.Color(0x2f7cff) : mesh.material.userData.baseEmissive, 0.16);
        mesh.material.emissiveIntensity += ((active ? 0.42 : mesh.material.userData.baseEmissiveIntensity) - mesh.material.emissiveIntensity) * 0.16;
      }
    });

    if (hovered) {
      hoverLight.intensity += (1.2 - hoverLight.intensity) * 0.18;
      hoverLight.position.lerp(hovered.getWorldPosition(new THREE.Vector3()), 0.22);
    } else {
      hoverLight.intensity += (0 - hoverLight.intensity) * 0.18;
    }

    camera.lookAt(cameraTarget);
    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      document.body.classList.add('webgl-ready');
    }
    requestAnimationFrame(animate);
  }

  animate(0);

  return {
    setInteractive(enabled) {
      interactive = Boolean(enabled);
      drift = Boolean(enabled);
      if (!interactive) setHovered(null);
    }
  };
}
