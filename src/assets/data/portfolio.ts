import {Project} from "@/types.ts";

export const portfolio: Project = {
  id: "portfolio",
  title: "Personal Portfolio Website",
  status: ["Live", "Actively Maintained"],

  description: [
    "A performance-focused, animation-driven portfolio designed to communicate engineering depth, architectural thinking, and attention to detail.",
    "Built as a static multi-page site with deliberate motion, clean information hierarchy, and minimal runtime overhead."
  ],

  about: [
    "This portfolio functions as both a professional surface and a controlled engineering environment. The goal was not to impress with excessive motion, but to use animation as a narrative tool — guiding attention, establishing rhythm, and reinforcing structure.",
    "Rather than adopting a heavyweight framework, the site is intentionally built with HTML, TypeScript, and GSAP. This keeps the runtime simple, the mental model clear, and performance predictable.",
    "Every interaction is designed with discipline: animations are scoped, state is explicit, and layout decisions prioritize readability and long-term maintainability over visual novelty."
  ],

  bannerUrl: "/projects/portfolio/banner-2.png",
  role: "Designer & Lead Front-End Engineer",
  timeline: "2 weeks",

  stack: {
    frontend: ["HTML5", "TypeScript", "Tailwind CSS", "GSAP"],
    backend: [],
    database: [],
    devops: ["Vite", "ESBuild", "Vercel"]
  },

  architecture: [
    "Multi-page static architecture for fast navigation and predictable rendering.",
    "Explicit animation orchestration using GSAP timelines and ScrollTrigger.",
    "Section-level isolation to achieve component-like structure without a framework.",
    "Progressive enhancement: content remains accessible even if animations fail.",
    "Strict separation between global orchestration logic and page-specific behavior.",
    "Performance-conscious asset loading and SVG rendering strategies.",
    "Serverless contact form handling via Vercel functions."
  ],

  challenges: [
    {
      title: "Motion Discipline Without Performance Regression",
      problem:
        "Scroll-driven animations can easily introduce jank, layout shifts, and excessive main-thread work, especially on lower-end devices.",
      solution:
        "Animations were designed around transform and opacity-only properties, scrubbed timelines, and pinned sections where necessary, avoiding layout-thrashing and ensuring smooth rendering across devices."
    },
    {
      title: "Maintaining Structure Without a Framework",
      problem:
        "Without React or Vue, complex interactions risk becoming tightly coupled and difficult to reason about.",
      solution:
        "Logic was organized around clear section boundaries, shared utilities, and typed data models, keeping animation orchestration, page initialization, and utilities decoupled and maintainable."
    },
    {
      title: "Preventing First-Paint Flicker",
      problem:
        "Initial DOM rendering occurred before animation timelines were ready, causing visible flashes and layout instability.",
      solution:
        "Critical elements were pre-styled using CSS and only revealed once GSAP timelines were fully initialized, ensuring a stable first paint."
    }
  ],

  repoUrl: "https://github.com/gitongaisaac/portfolio",
  liveUrl: "https://gitongaisaac.netlify.app"
};