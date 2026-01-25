import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {projects} from "./data.ts";

gsap.registerPlugin(ScrollTrigger);

document.documentElement.classList.remove("no-js");

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const curtain = document.getElementById('transition-curtain');

  // Optional: Small delay to ensure images/fonts are parsed
  gsap.to(curtain, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    delay: 0.2,
    onComplete: () => {
      // Remove it from the DOM flow so it doesn't block clicks
      if (curtain) {
        curtain.style.pointerEvents = "none";
      }
      // Start page animations after curtain is gone
      animatePage();
    }
  });

  // Select all links you want to animate
  const links = document.querySelectorAll('.transition-link');
  const transitionCurtain = document.getElementById('transition-curtain');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // 1. STOP the browser from jumping immediately
      e.preventDefault();
      const targetUrl = link.getAttribute('href');

      // 2. Animate the curtain IN
      gsap.to(transitionCurtain, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
          if (transitionCurtain) transitionCurtain.style.pointerEvents = "all";
        },
        onComplete: () => {
          // 3. NOW change the page (while screen is black)
          window.location.href = targetUrl ?? '/index.html';
        }
      });
    });
  });
});

// Get ID from URL query param ?id=events-hub
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

const project = projects.find(p => p.id === projectId);

if (!project) {
  // Handle 404 - Redirect or show error
  document.body.innerHTML = '<div class="h-screen flex items-center justify-center text-neutral-200 text-2xl font-iceberg">Project not found</div>';
  throw new Error('Project not found');
}

// 1. Populate Header
document.getElementById('project-title')!.textContent = project.title;
document.getElementById('project-role')!.textContent = `${project.role}  •  ${project.timeline}`;
(document.getElementById('project-banner') as HTMLImageElement).src = project.bannerImage;
(document.getElementById('project-banner') as HTMLImageElement).alt = `${project.title} Banner`;
document.title = `${project.title} | G`;

// 2. Populate Description (innerHTML for paragraph tags)
document.getElementById('project-description')!.innerHTML = project.fullDescription;

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
project.architectureHighlights.forEach(item => {
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

/**
 * Page Animations
 */
function animatePage() {
  gsap.set("#back-nav", {  xPercent: -20, opacity: 0 });
  gsap.set("#showcase", { scale: 0.95, opacity: 0})
  gsap.set("#project-title", { y: 30, opacity: 0 });
  gsap.set("#project-role", { y: 20, opacity: 0 });
  gsap.set("#overview", { y: 20, opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 }
  });

  // Header Animation
  tl.to("#project-title", { y: 0, opacity: 1 }, 0.2)
    .to("#project-role", { y: 0, opacity: 1 }, "-=0.7")
    .to("#showcase", { scale: 1, opacity: 1 }, "-=0.7")
    .to("#back-nav", { xPercent: 0, opacity: 1 }, "-=0.7")
    .to("#overview", { y: 0, opacity: 1 }, "-=0.7");

  // Overview & Tech Stack
  gsap.from("section:nth-of-type(1) h2", {
    scrollTrigger: {
      trigger: "section:nth-of-type(1)",
      start: "top 85%",
    },
    x: -30,
    opacity: 0,
    duration: 1
  });

  gsap.from("#project-description p", {
    scrollTrigger: {
      trigger: "#project-description",
      start: "top 85%",
    },
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  });

  gsap.from("section:nth-of-type(1) .bg-neutral-900\\/50", {
    scrollTrigger: {
      trigger: "section:nth-of-type(1) .bg-neutral-900\\/50",
      start: "top 85%",
    },
    x: 30,
    opacity: 0,
    duration: 1
  });

  // Architecture Section
  gsap.from("section:nth-of-type(2) h2", {
    scrollTrigger: {
      trigger: "section:nth-of-type(2)",
      start: "top 85%",
    },
    y: 20,
    opacity: 0,
    duration: 1
  });

  gsap.from("#architecture-list li", {
    scrollTrigger: {
      trigger: "#architecture-list",
      start: "top 85%",
    },
    x: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8
  });

  // Challenges Section
  gsap.from("section:nth-of-type(3) h2", {
    scrollTrigger: {
      trigger: "section:nth-of-type(3)",
      start: "top 85%",
    },
    y: 20,
    opacity: 0,
    duration: 1
  });

  gsap.from("#challenges-container > div", {
    scrollTrigger: {
      trigger: "#challenges-container",
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  });
}
