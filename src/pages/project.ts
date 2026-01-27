import {projects} from "@/assets";

// Get ID from URL query param ?id=events-hub
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

const project = projects.find(p => p.id === projectId);

if (!project) {
  // Handle 404
  document.getElementById('project')!.classList.add('hidden');
  document.getElementById('not-found')!.classList.remove('hidden');
  throw new Error('Project not found');
}

// 1. Populate Header
document.getElementById('project-title')!.textContent = project.title;
document.getElementById('project-role')!.textContent = `${project.role}  •  ${project.timeline}`;
(document.getElementById('project-banner') as HTMLImageElement).src = project.bannerUrl;
(document.getElementById('project-banner') as HTMLImageElement).alt = `${project.title} Banner`;
document.title = `${project.title} | G`;

const projectStatus = document.getElementById('project-status')!;

project.status.forEach(status => {
  const p = document.createElement('p');
  p.innerText = status;
  projectStatus.appendChild(p);
})

// 2. Populate Description (innerHTML for paragraph tags)
const projectDescription = document.getElementById('project-description')!;

project.about.forEach(item  => {
  const p = document.createElement('p');
  p.innerText = item;
  projectDescription.appendChild(p);
})

// 3. Populate Stack
const stackContainer = document.getElementById('project-stack')!;
Object.entries(project.stack).forEach(([category, items]) => {
  const group = document.createElement('div');
  group.innerHTML = `
    <h4 class="text-xs uppercase text-neutral-500 font-bold mb-2 tracking-wider font-iceberg">${category}</h4>
    <div class="flex flex-wrap gap-2">
      ${items.map(item => `
        <span class="px-2 py-1 bg-neutral-900/60 text-neutral-300 text-xs rounded border border-neutral-800 font-montserrat">
          ${item}
        </span>
      `).join('')}
    </div>
  `;
  stackContainer.appendChild(group);
});

// 4. Architecture Highlights
const archList = document.getElementById('architecture-list')!;
project.architecture.forEach(item => {
  const li = document.createElement('li');
  li.className = 'flex items-start gap-3 font-montserrat';
  li.innerHTML = `
    <svg class="w-6 h-6 text-teal-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>${item}</span>
  `;
  archList.appendChild(li);
});

// 5. Challenges
const challengesContainer = document.getElementById('challenges-container')!;
project.challenges.forEach(challenge => {
  const card = document.createElement('div');
  card.className = 'bg-neutral-900/40 p-6 rounded-lg border border-neutral-800 hover:border-teal-500/50 transition-colors duration-300';
  card.innerHTML = `
    <h3 class="text-xl font-bold text-neutral-100 mb-3 font-iceberg">${challenge.title}</h3>
    <div class="space-y-3 font-montserrat">
      <div class="flex gap-3">
        <div class="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></div>
        <p class="text-neutral-400 text-sm"><strong class="text-red-400 block mb-1 font-iceberg uppercase tracking-wider text-xs">Problem</strong> ${challenge.problem}</p>
      </div>
      <div class="flex gap-3">
        <div class="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500"></div>
        <p class="text-neutral-300 text-sm"><strong class="text-teal-400 block mb-1 font-iceberg uppercase tracking-wider text-xs">Solution</strong> ${challenge.solution}</p>
      </div>
    </div>
  `;
  challengesContainer.appendChild(card);
});

// 6. Project Links (Repo & Live)
const linksContainer = document.getElementById('project-links')!;
if (project.liveUrl) {
  const liveLink = document.createElement('a');
  liveLink.href = project.liveUrl;
  liveLink.target = '_blank';
  liveLink.className = 'project-link-btn flex items-center justify-center gap-2 w-full py-3 bg-teal-500 hover:bg-teal-600 text-neutral-950 font-bold font-iceberg rounded-lg transition-colors duration-300';
  liveLink.innerHTML = `
    <span>Live Site</span>
    <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
  `;
  linksContainer.appendChild(liveLink);
}

if (project.repoUrl) {
  const repoLink = document.createElement('a');
  repoLink.href = project.repoUrl;
  repoLink.target = '_blank';
  repoLink.className = 'project-link-btn flex items-center justify-center gap-2 w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold font-iceberg rounded-lg border border-neutral-700 transition-colors duration-300';
  repoLink.innerHTML = `
    <i class="fa-brands fa-github"></i>
    <span>View Source</span>
  `;
  linksContainer.appendChild(repoLink);
}
