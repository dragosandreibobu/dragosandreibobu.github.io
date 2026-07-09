const zones = {
  board: {
    title: 'Blackboard wall',
    body: 'A readable knowledge wall for systems, graphs, machine learning, rendering, infrastructure, compilers, simulation, and teaching notes.',
    link: '#areas'
  },
  'board-systems': {
    title: 'Blackboard · Systems',
    body: 'Architecture notes: web surfaces, API layers, auth, persistence, queues, workers, and deployment boundaries.',
    link: '#areas'
  },
  'board-graphs': {
    title: 'Blackboard · Graphs',
    body: 'Graph thinking: BFS, DFS, Dijkstra, prerequisite chains, knowledge graphs, and route finding.',
    link: '#areas'
  },
  'board-ml': {
    title: 'Blackboard · Machine learning',
    body: 'ML notes: features, models, ordinal heads, forecasting, evaluation, and simulation hooks.',
    link: '#flagships'
  },
  'board-rendering': {
    title: 'Blackboard · Rendering',
    body: 'Graphics notes: model transforms, shader flow, rasterization, post-processing, cameras, and PBR thinking.',
    link: '#flagships'
  },
  'board-infra': {
    title: 'Blackboard · Infrastructure',
    body: 'Infrastructure notes: GitHub Pages, CI, static deploys, Supabase, Render, and project operating workflows.',
    link: '#orgs'
  },
  'board-compilers': {
    title: 'Blackboard · Compilers',
    body: 'Compiler notes: tokens, ASTs, IR, assembly, constant folding, and dead-code elimination.',
    link: '#areas'
  },
  monitor: {
    title: 'EngineOS monitor',
    body: 'Modern project dashboard with repositories, live demos, research, teaching material, resume surface, blog, and contact routes.',
    link: '#flagships'
  },
  'monitor-projects': {
    title: 'EngineOS · Projects',
    body: 'Flagship projects exposed as modern dashboard cards with status, stack, live links, and source routes.',
    link: '#flagships'
  },
  'monitor-map': {
    title: 'EngineOS · System map',
    body: 'A map of project relationships across curriculum tools, engine work, AI/ML, graphics, and teaching systems.',
    link: '#areas'
  },
  'notebook-algorithm': {
    title: 'Notebook · Algorithm page',
    body: 'Algorithm walkthroughs, pseudocode, graph traversal notes, and problem-solving traces.',
    link: '#areas'
  },
  'notebook-teaching': {
    title: 'Notebook · Teaching page',
    body: 'Lesson flow, scaffolding, examples, exercises, assessment, and classroom-ready explanations.',
    link: '#profile'
  },
  keyboard: {
    title: 'Desktop · Keyboard',
    body: 'Coding, editing, debugging, writing, and fast iteration across project repositories.',
    link: '#flagships'
  },
  circuit: {
    title: 'Desktop · Circuit board',
    body: 'Hardware-adjacent experiments, Kinect work, sensors, computer vision, and technical interfaces.',
    link: '#areas'
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
  },
  'book-rendering': {
    title: 'Book · Real-time rendering',
    body: 'Graphics, OpenGL, rendering loops, shaders, transformations, and visual software experiments.',
    link: '#flagships'
  },
  'book-graphs': {
    title: 'Book · Graph algorithms',
    body: 'Knowledge graphs, shortest paths, curriculum prerequisites, and algorithmic thinking.',
    link: '#areas'
  },
  'book-systems': {
    title: 'Book · Distributed systems',
    body: 'Backends, infrastructure, services, APIs, deployment, and system integration.',
    link: '#areas'
  },
  'book-ml': {
    title: 'Book · Machine learning',
    body: 'Forecasting, classifiers, ordinal models, computer vision, and applied machine learning systems.',
    link: '#flagships'
  }
};

const projects = [
  { name: 'curricula.live platform', organization: 'curricula-live', status: 'Active', summary: 'Landing and platform surfaces for a curriculum planner organized around engine, print, schools, and mobile layers.', repo: 'https://github.com/curricula-live/landing', live: 'https://curricula.live', tags: ['Next.js', 'React', 'TypeScript'] },
  { name: 'Software sketchbook', organization: 'DigitalChalkLab', status: 'Active', summary: 'Unified teaching notebook for frontend components, backend routes, database schemas, and distributed systems labs.', repo: 'https://github.com/DigitalChalkLab/sketchbook', live: 'https://chalkcircuit-lab.github.io/sketchbook/', tags: ['HTML', 'JavaScript', 'Teaching'] },
  { name: 'Machine Learning Compatible Game Engine', organization: 'MLCGE Lab', status: 'Research / Thesis', summary: 'Experimental graphics suite combining a C++/OpenGL rendering core, editor interface, and ML-oriented simulation hooks.', repo: 'https://github.com/Machine-Learning-Compatible-Game-Engine/full-suite', live: '', tags: ['C++', 'OpenGL', 'Simulation'] },
  { name: 'KinectSchoolScanner', organization: 'Bluebird-Studio', status: 'Active / Research', summary: 'WPF Kinect v1 depth/RGB room scanner that generates colored point clouds and exports ASCII PLY files for Blender.', repo: 'https://github.com/Bluebird-Studio/KinectSchoolScanner', live: '', tags: ['WPF', 'Kinect', 'C#'] },
  { name: 'ScalpScan Ordinal Classifier', organization: 'ScalpScanClassifier', status: 'Active / Research', summary: 'FastAPI backend and multi-head PyTorch neural model trained on ordinal criteria for scalp-condition classification.', repo: 'https://github.com/dragosandreibobu/InnovationLabs-2026-Scalp-Condition-Classifier', live: '', tags: ['PyTorch', 'FastAPI', 'ML'] },
  { name: 'Predictive Demand Prediction', organization: 'Hyperspace-Intelligence', status: 'Archived / ML Competition', summary: 'Retail sales forecasting system using gradient-boosted trees, recursive features, and out-of-fold blending.', repo: 'https://github.com/Hyperspace-Intelligence/fiicode-2026-predictive-demand-prediction', live: '', tags: ['Python', 'CatBoost', 'Forecasting'] }
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
    button.classList.toggle('active', key === button.dataset.hotspot || key.startsWith(button.dataset.hotspot));
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
  const frame = canvas.closest('.scene-frame') || canvas;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setClearColor(0x050504, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050504);
  scene.fog = new THREE.FogExp2(0x050504, 0.015);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  const cameraTarget = new THREE.Vector3(0.08, 0.58, -1.8);
  const baseCamera = new THREE.Vector3(0.1, 1.32, 6.32);
  camera.position.copy(baseCamera);

  const root = new THREE.Group();
  scene.add(root);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const hitboxes = [];
  const zoneVisuals = new Map();
  const highlightPlanes = new Map();
  const textureCache = new Map();
  const matCache = new Map();
  let hoveredZone = null;
  let interactive = interactiveEnabled;

  function addZoneVisual(zone, mesh) {
    if (!zone) return mesh;
    mesh.userData.hotspot = zone;
    mesh.userData.baseScale = mesh.scale.clone();
    if (!Array.isArray(mesh.material) && mesh.material?.clone) {
      mesh.material = mesh.material.clone();
      if (!mesh.material.emissive) mesh.material.emissive = new THREE.Color(0x000000);
      mesh.material.userData.baseEmissive = mesh.material.emissive.clone();
      mesh.material.userData.baseEmissiveIntensity = mesh.material.emissiveIntensity || 0;
    }
    if (!zoneVisuals.has(zone)) zoneVisuals.set(zone, []);
    zoneVisuals.get(zone).push(mesh);
    return mesh;
  }

  function canvasTexture(key, width, height, draw, crisp = false) {
    if (textureCache.has(key)) return textureCache.get(key);
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    const ctx = c.getContext('2d');
    draw(ctx, width, height);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    if (crisp) {
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
    }
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

  function box(name, size, position, mat, options = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
    mesh.name = name;
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
    mesh.castShadow = options.castShadow !== false;
    mesh.receiveShadow = options.receiveShadow !== false;
    addZoneVisual(options.hotspot, mesh);
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
    addZoneVisual(options.hotspot, mesh);
    root.add(mesh);
    return mesh;
  }

  const hitboxMaterial = new THREE.MeshBasicMaterial({ color: 0x8fc7ff, transparent: true, opacity: 0, depthWrite: false });
  function hitbox(name, size, position, zone, options = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), hitboxMaterial);
    mesh.name = `hitbox-${name}`;
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
    mesh.userData.hotspot = zone;
    mesh.renderOrder = 99;
    root.add(mesh);
    hitboxes.push(mesh);
    return mesh;
  }

  function highlight(name, size, position, zone, options = {}) {
    const mat = new THREE.MeshBasicMaterial({ color: options.color || 0x8fc7ff, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
    const mesh = plane(`highlight-${name}`, size, position, mat, { rx: options.rx, ry: options.ry, rz: options.rz });
    mesh.renderOrder = 18;
    highlightPlanes.set(zone, mesh);
    return mesh;
  }

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function makeWoodTexture(key, base = '#321b0f') {
    return canvasTexture(key, 1536, 1536, (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, base);
      grad.addColorStop(0.5, '#53321f');
      grad.addColorStop(1, '#160b06');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 110; i++) {
        const y = Math.random() * h;
        ctx.strokeStyle = i % 6 === 0 ? 'rgba(231,155,88,.12)' : 'rgba(0,0,0,.11)';
        ctx.lineWidth = Math.random() * 1.4 + 0.2;
        ctx.beginPath();
        ctx.moveTo(-60, y);
        for (let x = -60; x < w + 100; x += 60) ctx.lineTo(x, y + Math.sin(x * 0.012 + i) * 6);
        ctx.stroke();
      }
    });
  }

  function makeWallTexture() {
    return canvasTexture('clean-dark-wall-v7', 1024, 1024, (ctx, w, h) => {
      ctx.fillStyle = '#15110e';
      ctx.fillRect(0, 0, w, h);
      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.45, 30, w * 0.5, h * 0.45, w * 0.85);
      vignette.addColorStop(0, 'rgba(255,235,200,.03)');
      vignette.addColorStop(1, 'rgba(0,0,0,.18)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
    }, true);
  }

  function makeBoardBaseTexture() {
    return canvasTexture('board-base-clean-v7', 2048, 620, (ctx, w, h) => {
      ctx.fillStyle = '#0f251d';
      ctx.fillRect(0, 0, w, h);
      const sheen = ctx.createLinearGradient(0, 0, w, h);
      sheen.addColorStop(0, 'rgba(255,255,235,.035)');
      sheen.addColorStop(1, 'rgba(0,0,0,.22)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(232,234,223,.12)';
      ctx.lineWidth = 2;
      for (let x = w / 6; x < w; x += w / 6) {
        ctx.beginPath();
        ctx.moveTo(x, 24);
        ctx.lineTo(x, h - 24);
        ctx.stroke();
      }
    }, true);
  }

  function makeBoardSectionTexture(key, title, lines, accent = '#e8eadf') {
    return canvasTexture(`board-section-${key}-v3`, 1050, 1700, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.015)';
      roundRect(ctx, 28, 28, w - 56, h - 56, 44);
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.font = '800 132px IBM Plex Mono, Consolas, monospace';
      ctx.fillText(title, 78, 190);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(78, 240);
      ctx.lineTo(w - 92, 240);
      ctx.stroke();

      ctx.fillStyle = '#f5f1db';
      ctx.font = '700 92px IBM Plex Mono, Consolas, monospace';
      lines.forEach((line, i) => ctx.fillText(line, 88, 400 + i * 160));

      ctx.strokeStyle = 'rgba(245,241,219,.78)';
      ctx.lineWidth = 8;
      if (key === 'graphs') {
        const pts = [[180, 1100], [430, 930], [660, 1130], [430, 1325], [800, 1340]];
        pts.forEach(([x, y]) => {
          ctx.beginPath(); ctx.arc(x, y, 38, 0, Math.PI * 2); ctx.stroke();
        });
        [[0,1],[1,2],[0,3],[3,4],[2,4]].forEach(([a,b]) => {
          ctx.beginPath(); ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(pts[b][0], pts[b][1]); ctx.stroke();
        });
      } else if (key === 'ml') {
        ctx.beginPath();
        for (let i = 0; i < 260; i++) {
          const x = 110 + i * 3.1;
          const y = 1180 + Math.sin(i * 0.14) * 60 + Math.sin(i * 0.035) * 32;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillText('ŷ', 800, 1240);
      } else if (key === 'render') {
        ['MODEL', 'VERTEX', 'FRAG', 'POST'].forEach((t, i) => {
          const x = 85 + i * 235;
          roundRect(ctx, x, 1090, 190, 105, 18);
          ctx.stroke();
          ctx.font = '700 48px IBM Plex Mono, Consolas, monospace';
          ctx.fillText(t, x + 22, 1160);
          if (i < 3) {
            ctx.beginPath(); ctx.moveTo(x + 190, 1142); ctx.lineTo(x + 230, 1142); ctx.stroke();
          }
        });
      } else if (key === 'systems' || key === 'infra') {
        const boxes = [[90, 1030, 'WEB'], [390, 1030, 'API'], [690, 1030, 'DB'], [390, 1280, 'JOB']];
        boxes.forEach(([x, y, t]) => {
          roundRect(ctx, x, y, 220, 120, 20);
          ctx.stroke();
          ctx.font = '700 58px IBM Plex Mono, Consolas, monospace';
          ctx.fillText(t, x + 52, y + 78);
        });
        [[200, 1090, 390, 1090], [610, 1090, 690, 1090], [500, 1150, 500, 1280]].forEach(([x1,y1,x2,y2]) => {
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        });
      }
    }, true);
  }

  function makeScreenTexture() {
    return canvasTexture('engine-os-modern-v8', 2800, 1200, (ctx, w, h) => {
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#08111f');
      bg.addColorStop(0.55, '#0b1628');
      bg.addColorStop(1, '#050a12');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(w * 0.72, h * 0.18, 80, w * 0.72, h * 0.18, 900);
      glow.addColorStop(0, 'rgba(90,160,255,.34)');
      glow.addColorStop(1, 'rgba(90,160,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = 'rgba(255,255,255,.035)';
      roundRect(ctx, 42, 42, w - 84, h - 84, 48);
      ctx.fill();
      ctx.strokeStyle = 'rgba(143,199,255,.22)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,.055)';
      roundRect(ctx, 85, 100, 330, h - 200, 36);
      ctx.fill();
      ctx.fillStyle = '#eaf2ff';
      ctx.font = '800 58px Inter, system-ui, sans-serif';
      ctx.fillText('EngineOS', 125, 180);
      ctx.font = '500 28px IBM Plex Mono, Consolas, monospace';
      ctx.fillStyle = 'rgba(226,238,255,.68)';
      ['Projects', 'Research', 'Teaching', 'GitHub', 'Resume', 'Contact'].forEach((item, i) => {
        const y = 285 + i * 88;
        ctx.fillStyle = i === 0 ? 'rgba(143,199,255,.2)' : 'rgba(255,255,255,.035)';
        roundRect(ctx, 120, y - 42, 245, 58, 18);
        ctx.fill();
        ctx.fillStyle = '#e5edf8';
        ctx.fillText(item, 150, y);
      });

      ctx.font = '800 64px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#f8fbff';
      ctx.fillText('Engineering Workspace', 500, 170);
      ctx.font = '500 30px IBM Plex Mono, Consolas, monospace';
      ctx.fillStyle = 'rgba(226,238,255,.64)';
      ctx.fillText('Build · Simulate · Teach · Repeat', 505, 220);

      const cards = [
        ['curricula.live', 'Concept graph planner', '#8fc7ff'],
        ['MLCGE Lab', 'OpenGL + simulation', '#f5b970'],
        ['ScalpScan', 'Ordinal classifier', '#89f0b1'],
        ['DigitalChalk', 'Teaching systems', '#c9a7ff']
      ];
      cards.forEach((card, i) => {
        const x = 500 + (i % 2) * 640;
        const y = 305 + Math.floor(i / 2) * 305;
        ctx.fillStyle = 'rgba(255,255,255,.055)';
        roundRect(ctx, x, y, 575, 240, 36);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.11)';
        ctx.stroke();
        ctx.fillStyle = card[2];
        roundRect(ctx, x + 34, y + 34, 78, 78, 22);
        ctx.fill();
        ctx.fillStyle = '#f8fbff';
        ctx.font = '800 48px Inter, system-ui, sans-serif';
        ctx.fillText(card[0], x + 138, y + 82);
        ctx.fillStyle = 'rgba(226,238,255,.68)';
        ctx.font = '500 34px Inter, system-ui, sans-serif';
        ctx.fillText(card[1], x + 138, y + 132);
        ctx.fillStyle = 'rgba(255,255,255,.055)';
        roundRect(ctx, x + 34, y + 164, 210, 42, 18);
        ctx.fill();
        ctx.fillStyle = 'rgba(226,238,255,.76)';
        ctx.font = '600 24px IBM Plex Mono, Consolas, monospace';
        ctx.fillText('open route', x + 60, y + 193);
      });

      ctx.fillStyle = 'rgba(255,255,255,.045)';
      roundRect(ctx, 1820, 305, 770, 545, 36);
      ctx.fill();
      ctx.strokeStyle = 'rgba(143,199,255,.18)';
      ctx.stroke();
      ctx.fillStyle = '#f8fbff';
      ctx.font = '800 46px Inter, system-ui, sans-serif';
      ctx.fillText('System map', 1875, 375);
      ctx.strokeStyle = 'rgba(143,199,255,.48)';
      ctx.lineWidth = 6;
      const nodes = [[1940,520],[2110,455],[2280,560],[2110,685],[2420,700]];
      nodes.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 34, 0, Math.PI * 2); ctx.stroke(); });
      [[0,1],[1,2],[0,3],[3,4],[2,4]].forEach(([a,b]) => { ctx.beginPath(); ctx.moveTo(nodes[a][0], nodes[a][1]); ctx.lineTo(nodes[b][0], nodes[b][1]); ctx.stroke(); });
    }, true);
  }

  function makeNotebookTexture() {
    return canvasTexture('notebook-clean-v8', 1800, 1040, (ctx, w, h) => {
      ctx.fillStyle = '#eadfbe';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(40,60,80,.16)';
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x += 68) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 68) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(40,60,80,.28)';
      ctx.beginPath(); ctx.moveTo(w / 2, 35); ctx.lineTo(w / 2, h - 35); ctx.stroke();
      ctx.fillStyle = '#16202d';
      ctx.font = '700 66px IBM Plex Mono, Consolas, monospace';
      ctx.fillText('Dijkstra(G, w, s)', 95, 130);
      ctx.font = '500 48px IBM Plex Mono, Consolas, monospace';
      ['for v ∈ V: dist[v] = ∞', 'Q ← priority queue', 'relax(u, v)', 'projection matrix'].forEach((line, i) => ctx.fillText(line, 95, 225 + i * 84));
      ctx.fillText('lesson → example → task', 980, 225);
      ctx.fillText('scaffold → recall', 980, 310);
      ctx.fillText('exercise → feedback', 980, 395);
      ctx.strokeStyle = 'rgba(20,35,55,.82)';
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.rect(1040, 485, 520, 340); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(1105, 775); ctx.lineTo(1295, 535); ctx.lineTo(1495, 775); ctx.closePath(); ctx.stroke();
    }, true);
  }

  function makeTerminalTexture() {
    return canvasTexture('terminal-clean-v8', 1400, 820, (ctx, w, h) => {
      ctx.fillStyle = '#05070b';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(143,199,255,.2)';
      ctx.lineWidth = 3;
      ctx.strokeRect(28, 28, w - 56, h - 56);
      ctx.fillStyle = '#89f0b1';
      ctx.font = '600 54px IBM Plex Mono, Consolas, monospace';
      ctx.fillText('> github.com/dragosandreibobu', 70, 130);
      ctx.fillStyle = '#e5edf8';
      ctx.font = '800 118px Inter, sans-serif';
      ctx.fillText('GITHUB', 260, 330);
      ctx.font = '500 52px Inter, sans-serif';
      ctx.fillStyle = 'rgba(229,237,248,.78)';
      ctx.fillText('Code, contributions,', 260, 450);
      ctx.fillText('organizations, archives.', 260, 530);
    }, true);
  }

  const wallMaterial = material('academic-wall', { color: 0xffffff, map: makeWallTexture(), roughness: 0.96 });
  const woodMaterial = material('dark-walnut', { color: 0xffffff, map: makeWoodTexture('dark-walnut-v8'), roughness: 0.72, metalness: 0.03 });
  const floorMaterial = material('floor-wood', { color: 0xffffff, map: makeWoodTexture('floor-boards-v8', '#21130c'), roughness: 0.88 });
  const blackMaterial = material('soft-black', { color: 0x05070a, roughness: 0.62, metalness: 0.06 });
  const brassMaterial = material('aged-brass', { color: 0x7d5629, roughness: 0.42, metalness: 0.58 });
  const boardBaseMaterial = material('board-base', { color: 0xffffff, map: makeBoardBaseTexture(), roughness: 0.92 });
  const paperMaterial = material('paper', { color: 0xffffff, map: makeNotebookTexture(), roughness: 0.88 });
  const screenTexture = makeScreenTexture();
  const screenMaterial = material('screen', { color: 0xffffff, map: screenTexture, roughness: 0.18, metalness: 0.02, emissive: new THREE.Color(0x265f9f), emissiveIntensity: 0.5, emissiveMap: screenTexture });
  const terminalMaterial = material('terminal-screen', { color: 0xffffff, map: makeTerminalTexture(), roughness: 0.3, emissive: new THREE.Color(0x15291e), emissiveIntensity: 0.38 });
  const circuitMaterial = material('circuit', { color: 0x123222, roughness: 0.48, metalness: 0.16, emissive: 0x092214, emissiveIntensity: 0.18 });

  scene.add(new THREE.HemisphereLight(0x8fb6ff, 0x1a1008, 0.64));
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

  const monitorGlow = new THREE.PointLight(0x7bbcff, 1.55, 5.2, 1.8);
  monitorGlow.position.set(0.15, 0.45, 0.98);
  scene.add(monitorGlow);
  const lampGlow = new THREE.PointLight(0xffbd7a, 3.55, 5.8, 1.4);
  lampGlow.position.set(-3.2, 1.35, 1.15);
  scene.add(lampGlow);
  const rackGlow = new THREE.PointLight(0x2f7cff, 0.65, 3.8, 2.2);
  rackGlow.position.set(3.8, 0.4, -1.3);
  scene.add(rackGlow);

  box('floor', [10.5, 0.14, 7.2], [0, -1.35, 0.1], floorMaterial, { receiveShadow: true, castShadow: false });
  box('back-wall', [10.5, 4.7, 0.16], [0, 0.98, -3.1], wallMaterial, { receiveShadow: true, castShadow: false });
  box('left-wall', [0.16, 4.7, 7.2], [-5.25, 0.98, 0.1], wallMaterial, { receiveShadow: true, castShadow: false });
  box('right-wall', [0.16, 4.7, 7.2], [5.25, 0.98, 0.1], wallMaterial, { receiveShadow: true, castShadow: false });
  box('ceiling-shadow', [10.5, 0.12, 7.2], [0, 3.36, 0.1], material('ceiling', { color: 0x090806, roughness: 0.98 }), { castShadow: false });

  plane('blackboard-base', [8.05, 2.42], [0, 1.62, -3.0], boardBaseMaterial, { hotspot: 'board' });
  box('board-frame-top', [8.34, 0.16, 0.18], [0, 2.9, -2.92], woodMaterial, { hotspot: 'board' });
  box('board-frame-bottom', [8.34, 0.16, 0.2], [0, 0.34, -2.92], woodMaterial, { hotspot: 'board' });
  box('board-frame-left', [0.16, 2.66, 0.18], [-4.17, 1.62, -2.92], woodMaterial, { hotspot: 'board' });
  box('board-frame-right', [0.16, 2.66, 0.18], [4.17, 1.62, -2.92], woodMaterial, { hotspot: 'board' });

  const boardSections = [
    ['board-systems', 'SYSTEMS', ['WEB', 'API', 'AUTH', 'DB'], '#f4d28e', 'systems'],
    ['board-graphs', 'GRAPHS', ['BFS', 'DFS', 'DIJKSTRA', 'PATHS'], '#e8eadf', 'graphs'],
    ['board-ml', 'ML', ['FEATURES', 'MODEL', 'LOSS', 'EVAL'], '#89f0b1', 'ml'],
    ['board-rendering', 'RENDER', ['MODEL', 'VERTEX', 'FRAG', 'POSTFX'], '#8fc7ff', 'render'],
    ['board-infra', 'INFRA', ['CI', 'PAGES', 'SUPABASE', 'RENDER'], '#f4d28e', 'infra'],
    ['board-compilers', 'COMPILE', ['TOKENS', 'AST', 'IR', 'ASM'], '#e8eadf', 'compiler']
  ];
  const boardColWidth = 7.9 / 6;
  boardSections.forEach(([zone, title, lines, accent, key], i) => {
    const x = -3.95 + boardColWidth / 2 + i * boardColWidth;
    const tex = makeBoardSectionTexture(key, title, lines, accent);
    const mat = material(`board-section-${zone}`, { color: 0xffffff, map: tex, transparent: true, roughness: 0.88 });
    plane(`board-section-${i}`, [boardColWidth - 0.08, 2.25], [x, 1.62, -2.982], mat, { hotspot: zone });
    hitbox(`board-${i}`, [boardColWidth, 2.55, 0.45], [x, 1.62, -2.72], zone);
    highlight(`board-${i}`, [boardColWidth - 0.08, 2.25], [x, 1.62, -2.965], zone);
  });

  box('desktop-slab', [7.6, 0.34, 2.15], [0, -0.62, -0.02], woodMaterial, { hotspot: 'notebook-algorithm' });
  box('desk-front', [7.75, 0.9, 0.18], [0, -1.03, 1.12], woodMaterial, { hotspot: 'notebook-teaching' });
  box('desk-left-leg', [0.28, 1.3, 0.28], [-3.35, -1.1, -0.72], woodMaterial);
  box('desk-right-leg', [0.28, 1.3, 0.28], [3.35, -1.1, -0.72], woodMaterial);
  hitbox('desktop-left', [2.2, 0.5, 1.4], [-2.25, -0.42, 0.18], 'notebook-algorithm');
  hitbox('desktop-center', [2.4, 0.5, 1.35], [0.2, -0.42, 0.52], 'keyboard');
  hitbox('desktop-right', [2.2, 0.5, 1.45], [2.6, -0.42, 0.55], 'circuit');

  box('monitor-frame', [4.85, 1.54, 0.13], [0.22, 0.19, -0.76], blackMaterial, { hotspot: 'monitor' });
  plane('monitor-screen', [4.62, 1.31], [0.22, 0.19, -0.668], screenMaterial, { hotspot: 'monitor' });
  box('monitor-bottom-bar', [4.95, 0.09, 0.18], [0.22, -0.62, -0.7], blackMaterial, { hotspot: 'monitor' });
  box('monitor-stand-neck', [0.2, 0.56, 0.14], [0.22, -0.56, -0.78], blackMaterial, { hotspot: 'monitor' });
  box('monitor-stand-base', [1.18, 0.07, 0.58], [0.22, -0.88, -0.62], blackMaterial, { hotspot: 'monitor' });
  hitbox('monitor-projects', [2.42, 1.55, 0.5], [-0.86, 0.16, -0.35], 'monitor-projects');
  hitbox('monitor-map', [2.42, 1.55, 0.5], [1.3, 0.16, -0.35], 'monitor-map');
  highlight('monitor-projects', [2.18, 1.12], [-0.88, 0.19, -0.658], 'monitor-projects');
  highlight('monitor-map', [2.18, 1.12], [1.3, 0.19, -0.657], 'monitor-map');

  box('open-notebook', [1.92, 0.06, 1.1], [-1.55, -0.4, 0.42], paperMaterial, { hotspot: 'notebook-algorithm' });
  box('notebook-spine', [0.08, 0.07, 1.16], [-1.55, -0.36, 0.42], blackMaterial, { hotspot: 'notebook-teaching' });
  hitbox('notebook-algorithm', [0.96, 0.42, 1.22], [-2.05, -0.28, 0.42], 'notebook-algorithm');
  hitbox('notebook-teaching', [0.96, 0.42, 1.22], [-1.06, -0.28, 0.42], 'notebook-teaching');
  highlight('notebook-left', [0.88, 1.0], [-2.04, -0.35, 0.42], 'notebook-algorithm', { rx: -Math.PI / 2 });
  highlight('notebook-right', [0.88, 1.0], [-1.08, -0.35, 0.42], 'notebook-teaching', { rx: -Math.PI / 2 });
  for (let i = 0; i < 9; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.008, 8, 18), brassMaterial);
    ring.position.set(-1.55, -0.31, -0.08 + i * 0.12);
    ring.rotation.set(Math.PI / 2, 0, -0.08);
    ring.castShadow = true;
    root.add(ring);
  }

  box('keyboard', [1.75, 0.06, 0.34], [0.25, -0.38, 0.66], blackMaterial, { hotspot: 'keyboard' });
  const keyMat = material('key-mat', { color: 0x11151c, roughness: 0.55 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 11; c++) box(`key-${r}-${c}`, [0.105, 0.018, 0.052], [-0.39 + c * 0.13, -0.33, 0.55 + r * 0.07], keyMat, { castShadow: false, hotspot: 'keyboard' });
  hitbox('keyboard', [1.95, 0.34, 0.54], [0.25, -0.28, 0.66], 'keyboard');

  const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 16), blackMaterial.clone());
  mouse.name = 'mouse';
  mouse.position.set(1.72, -0.35, 0.62);
  mouse.scale.set(0.72, 0.22, 1.12);
  mouse.castShadow = true;
  mouse.receiveShadow = true;
  addZoneVisual('keyboard', mouse);
  root.add(mouse);

  plane('github-terminal', [1.46, 0.82], [2.63, -0.32, 0.22], terminalMaterial, { rx: -Math.PI / 2.7, hotspot: 'github' });
  hitbox('github-terminal', [1.85, 0.72, 1.05], [2.63, -0.26, 0.24], 'github', { rx: -Math.PI / 2.7 });
  box('contact-card', [0.95, 0.055, 0.62], [3.28, -0.45, 0.92], material('brown-note', { color: 0xb88958, roughness: 0.8 }), { hotspot: 'contact', rz: 0.04 });
  hitbox('contact-card', [1.22, 0.4, 0.9], [3.28, -0.32, 0.92], 'contact', { rz: 0.04 });

  const bookSpecs = [
    ['book-rendering', 0x4c2f22],
    ['book-graphs', 0x22314a],
    ['book-systems', 0x5b3b27],
    ['book-ml', 0x2f4933],
    ['notebook-teaching', 0x43273a]
  ];
  bookSpecs.forEach(([zone, color], i) => {
    box(`book-stack-${i}`, [1.3, 0.14, 0.54], [-3.23, -0.46 + i * 0.15, -0.36], material(`book-${i}-mat`, { color, roughness: 0.65 }), { hotspot: zone, rz: 0.015 * (i - 2) });
    hitbox(`book-stack-${i}`, [1.42, 0.2, 0.68], [-3.23, -0.46 + i * 0.15, -0.36], zone, { rz: 0.015 * (i - 2) });
  });

  for (let shelf = 0; shelf < 3; shelf++) {
    box(`bookshelf-plank-${shelf}`, [1.3, 0.07, 0.42], [4.34, 1.95 - shelf * 0.48, -2.15], woodMaterial, { hotspot: 'book-systems' });
    for (let i = 0; i < 8; i++) box(`shelf-book-${shelf}-${i}`, [0.095, 0.36 + Math.random() * 0.14, 0.28], [3.84 + i * 0.12, 2.13 - shelf * 0.48, -2.0], material(`shelf-book-${shelf}-${i}-mat`, { color: bookSpecs[(i + shelf) % bookSpecs.length][1], roughness: 0.68 }), { hotspot: bookSpecs[(i + shelf) % bookSpecs.length][0] });
  }
  hitbox('bookshelf-top', [1.65, 0.62, 0.72], [4.32, 1.95, -1.95], 'book-rendering');
  hitbox('bookshelf-mid', [1.65, 0.62, 0.72], [4.32, 1.47, -1.95], 'book-graphs');
  hitbox('bookshelf-low', [1.65, 0.62, 0.72], [4.32, 0.99, -1.95], 'book-systems');

  box('server-rack', [0.82, 1.42, 0.52], [4.1, 0.13, -1.52], material('rack-shell', { color: 0x070b12, roughness: 0.46, metalness: 0.38 }), { hotspot: 'github' });
  hitbox('server-rack', [1.1, 1.75, 0.85], [4.1, 0.13, -1.2], 'github');
  for (let i = 0; i < 5; i++) {
    box(`rack-slot-${i}`, [0.72, 0.16, 0.04], [4.1, -0.42 + i * 0.25, -1.23], blackMaterial, { hotspot: 'github' });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 12), material(`led-${i}`, { color: 0x8fc7ff, emissive: 0x3f8cff, emissiveIntensity: 2.2 }));
    led.position.set(4.37, -0.42 + i * 0.25, -1.18);
    root.add(led);
  }

  box('circuit-board', [1.08, 0.045, 0.56], [2.22, -0.43, 0.78], circuitMaterial, { hotspot: 'circuit' });
  hitbox('circuit-board', [1.34, 0.36, 0.82], [2.22, -0.32, 0.78], 'circuit');
  const chipMat = material('chip', { color: 0x020604, roughness: 0.5 });
  for (let i = 0; i < 18; i++) box(`chip-${i}`, [0.09, 0.025, 0.06], [1.75 + Math.random() * 0.9, -0.38, 0.55 + Math.random() * 0.42], chipMat, { castShadow: false, hotspot: 'circuit' });

  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.08, 32), brassMaterial.clone());
  lampBase.position.set(-3.75, -0.38, 0.28);
  lampBase.castShadow = true;
  addZoneVisual('notebook-teaching', lampBase);
  root.add(lampBase);
  const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.0, 18), brassMaterial.clone());
  lampStem.position.set(-3.75, 0.12, 0.28);
  lampStem.rotation.z = -0.18;
  lampStem.castShadow = true;
  addZoneVisual('notebook-teaching', lampStem);
  root.add(lampStem);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.42, 36, 1, true), material('lamp-shade', { color: 0x12100e, roughness: 0.35, metalness: 0.28 }).clone());
  shade.position.set(-3.42, 0.72, 0.45);
  shade.rotation.set(0.55, 0.05, -0.5);
  shade.castShadow = true;
  addZoneVisual('notebook-teaching', shade);
  root.add(shade);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.095, 24, 12), material('bulb', { color: 0xffe2a8, emissive: 0xffb66d, emissiveIntensity: 2.4 }));
  bulb.position.set(-3.33, 0.55, 0.62);
  root.add(bulb);
  hitbox('lamp', [1.0, 1.45, 1.0], [-3.48, 0.2, 0.5], 'notebook-teaching');

  box('chalk-stick', [0.46, 0.035, 0.035], [-0.88, -0.34, 0.98], material('chalk', { color: 0xe8eadf, roughness: 0.96 }), { hotspot: 'board', rz: 0.18 });
  box('fountain-pen', [0.62, 0.035, 0.035], [0.9, -0.34, 0.99], material('pen', { color: 0x0c0c0d, roughness: 0.38, metalness: 0.45 }), { hotspot: 'notebook-algorithm', rz: -0.22 });

  const hoverLight = new THREE.PointLight(0x8fc7ff, 0, 3.2, 1.8);
  scene.add(hoverLight);

  function setHoveredZone(zone) {
    if (hoveredZone === zone) return;
    hoveredZone = zone;
    if (hoveredZone) selectZone(hoveredZone);
    frame.style.cursor = hoveredZone && interactive ? 'pointer' : 'default';
  }

  function updatePointer(event) {
    const rect = frame.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function pickZone(event) {
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(hitboxes, false)[0]?.object?.userData?.hotspot || null;
  }

  function shouldIgnorePointer(event) {
    return Boolean(event.target.closest('.status-panel, .hero-copy, .site-nav'));
  }

  frame.addEventListener('pointermove', (event) => {
    if (!interactive || shouldIgnorePointer(event)) {
      setHoveredZone(null);
      return;
    }
    setHoveredZone(pickZone(event));
  });
  frame.addEventListener('pointerleave', () => setHoveredZone(null));
  frame.addEventListener('click', (event) => {
    if (!interactive || shouldIgnorePointer(event)) return;
    const zone = pickZone(event);
    if (zone) openZone(zone);
  });

  function resize() {
    const rect = frame.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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
      camera.position.x = baseCamera.x + Math.sin(t * 0.22) * 0.045;
      camera.position.y = baseCamera.y + Math.sin(t * 0.17) * 0.02;
      camera.position.z = baseCamera.z + Math.sin(t * 0.15) * 0.052;
      root.rotation.y = Math.sin(t * 0.1) * 0.003;
    } else {
      camera.position.lerp(baseCamera, 0.04);
      root.rotation.y *= 0.96;
    }

    zoneVisuals.forEach((meshes, zone) => {
      const active = zone === hoveredZone;
      meshes.forEach((mesh) => {
        if (mesh.userData.baseScale) {
          const target = active ? mesh.userData.baseScale.clone().multiplyScalar(1.006) : mesh.userData.baseScale;
          mesh.scale.lerp(target, 0.12);
        }
        if (mesh.material?.emissive) {
          const base = mesh.material.userData.baseEmissive || new THREE.Color(0x000000);
          const baseIntensity = mesh.material.userData.baseEmissiveIntensity || 0;
          mesh.material.emissive.lerp(active ? new THREE.Color(0x17478f) : base, 0.12);
          mesh.material.emissiveIntensity += ((active ? Math.max(0.08, baseIntensity + 0.08) : baseIntensity) - mesh.material.emissiveIntensity) * 0.12;
        }
      });
    });

    highlightPlanes.forEach((mesh, zone) => {
      const active = zone === hoveredZone;
      mesh.material.opacity += ((active ? 0.105 : 0) - mesh.material.opacity) * 0.16;
    });

    if (hoveredZone) {
      hoverLight.intensity += (0.42 - hoverLight.intensity) * 0.14;
      const targetBox = hitboxes.find((box) => box.userData.hotspot === hoveredZone);
      if (targetBox) hoverLight.position.lerp(targetBox.getWorldPosition(new THREE.Vector3()), 0.18);
    } else {
      hoverLight.intensity += (0 - hoverLight.intensity) * 0.14;
    }

    camera.lookAt(cameraTarget);
    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      document.body.classList.add('webgl-ready');
      const hotspotLayer = document.querySelector('.hotspot-layer');
      if (hotspotLayer) hotspotLayer.style.display = 'none';
    }
    requestAnimationFrame(animate);
  }

  animate(0);

  return {
    setInteractive(enabled) {
      interactive = Boolean(enabled);
      drift = Boolean(enabled);
      if (!interactive) setHoveredZone(null);
    }
  };
}
