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
let interactiveEnabled = localStorage.getItem('room-mode') !== 'static';

function setMode(enabled) {
  interactiveEnabled = Boolean(enabled);
  document.body.classList.toggle('interactive', interactiveEnabled);
  document.body.classList.toggle('static', !interactiveEnabled);

  if (toggle) {
    toggle.textContent = interactiveEnabled ? 'Interactive Mode: ON' : 'Interactive Mode: OFF';
    toggle.setAttribute('aria-pressed', String(interactiveEnabled));
  }

  localStorage.setItem('room-mode', interactiveEnabled ? 'interactive' : 'static');
}

if (toggle) {
  toggle.addEventListener('click', () => setMode(!interactiveEnabled));
}

setMode(interactiveEnabled);

function detectRenderAsset(url, className) {
  const image = new Image();
  image.onload = () => document.body.classList.add(className);
  image.src = url;
}

detectRenderAsset('assets/renders/engineering-room-desktop.webp', 'has-desktop-render');
detectRenderAsset('assets/renders/engineering-desk-mobile.webp', 'has-mobile-render');
