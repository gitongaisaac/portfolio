import {Project} from "@/types.ts";

export const sprintKenya: Project = {
  id: "sprint-brand-connections",
  title: "Marketing Agency Website & Brand Platform",
  status: ["Live", "Actively Maintained"],

  description: [
    "A brand-driven marketing website designed to communicate credibility, clarity, and creative confidence.",
    "Built as a high-impact digital presence to support storytelling, service positioning, and long-form case studies."
  ],

  about: [
    "This project focused on translating a marketing agency’s brand philosophy into a clear, confident digital experience. The site needed to feel premium and expressive while remaining easy to navigate and content-forward.",
    "The primary challenge was presenting dense information — services, values, and case studies — without overwhelming the user or diluting the brand message.",
    "The solution emphasized structured storytelling: deliberate pacing, restrained motion, and strong visual hierarchy to guide users through the narrative while keeping attention on the content."
  ],

  bannerUrl: "/projects/sprint/banner.png",
  role: "Lead Front-End Engineer",
  timeline: "2 weeks",

  stack: {
    frontend: ["HTML5", "TypeScript", "Tailwind CSS", "GSAP"],
    backend: [],
    database: [],
    devops: ["Vite"]
  },

  architecture: [
    "Static-first architecture optimized for performance and reliability.",
    "Scroll-based storytelling using pinned sections and progressive reveals.",
    "Clear separation between content structure and animation orchestration.",
    "Reusable motion patterns to ensure consistency across pages.",
    "Responsive layout system tuned for both large-format displays and mobile devices.",
    "Future-ready structure allowing integration with a CMS without architectural rework."
  ],

  challenges: [
    {
      title: "Presenting Dense Content Without Cognitive Overload",
      problem:
        "The site needed to communicate extensive information without exhausting users or diluting key messages.",
      solution:
        "Content was structured into paced sections with pinned headers, staggered reveals, and alternating layouts, creating a natural reading rhythm and sustained engagement."
    },
    {
      title: "Pinned Storytelling with Persistent Navigation",
      problem:
        "Scroll-triggered pinned sections conflicted with a fixed navigation bar, causing layout offsets and inconsistent scroll behavior.",
      solution:
        "Implemented dynamic pin start and end calculations that account for navigation height, ensuring smooth transitions and predictable scroll behavior across breakpoints."
    },
    {
      title: "Brand-Consistent Motion Language",
      problem:
        "Excessive or inconsistent animation risked undermining the brand’s premium positioning.",
      solution:
        "Motion design was intentionally constrained to a small, consistent set of easing curves, directions, and durations, reinforcing confidence and clarity rather than visual noise."
    }
  ],

  liveUrl: "https://sprintbrandconnections.com"
};
