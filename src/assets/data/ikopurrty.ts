import {Project} from "@/types.ts";

export const ikopurrty: Project = {
  id: "ticketing-platform",
  title: "Ticketing Platform",
  status: ["Ready MVP"],
  description: [
    "A high-concurrency ticketing platform focused on transactional integrity, secure M-Pesa payments, and role-based access control."
  ],
  about: [
    "IkoPurrty is a SaaS ticketing platform built to handle high-traffic event sales where data consistency and financial correctness are non-negotiable. The core engineering challenge was guaranteeing inventory integrity during flash sales while preserving a smooth user experience.",
    "The system leverages Next.js Server Components for fast reads, paired with a hybrid authentication model that balances security, performance, and UX in a serverless environment."
  ],
  bannerUrl: "/projects/ikopurrty/banner.png",
  role: "System Architect & Full-Stack Developer",
  timeline: "3 Months",

  stack: {
    frontend: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Zod"],
    backend: ["Node.js", "TSyringe (IoC)", "Server Actions"],
    database: ["PostgreSQL", "Prisma ORM", "Redis"],
    devops: ["Vercel", "Neon", "GitHub Actions"]
  },

  architecture: [
    "Strict Layered Architecture separating framework, services, and data access.",
    "Unit of Work (UoW) pattern for transactional integrity across repositories.",
    "Pessimistic Locking (SELECT … FOR UPDATE) to prevent ticket overselling.",
    "Hybrid Authentication Strategy for secure mutations and fast server-side reads.",
    "Decoupled Checkout Flow using asynchronous webhooks and compensating transactions."
  ],

  challenges: [
    {
      title: "Concurrency & Overselling",
      problem:
        "During high-demand ticket releases, simultaneous checkout requests caused race conditions that could oversell inventory.",
      solution:
        "Implemented pessimistic locking at the database level within a strict Unit of Work transaction boundary. Inventory rows are locked during reservation, mathematically guaranteeing that tickets cannot be oversold regardless of traffic spikes."
    },
    {
      title: "Authentication in Stateless Server Components",
      problem:
        "Next.js Server Components are stateless and cannot perform side effects like setting cookies, making traditional token refresh strategies unreliable.",
      solution:
        "Designed a hybrid session model using a long-lived Session JWT for read operations and a short-lived Access Token for mutations. This allowed uninterrupted server rendering while keeping write operations secure and revocable."
    },
    {
      title: "Designing for Future De-coupling",
      problem:
        "Although the system was initially delivered as a Next.js monolith for speed, future plans included splitting the admin dashboard or migrating backend logic to a dedicated service. Tight coupling to the framework would make this difficult.",
      solution:
        "Enforced a framework-agnostic service layer. All business logic lives in pure TypeScript services that depend only on repositories and DTOs. Next.js Server Actions act purely as adapters, making the entire backend core portable to Express or other runtimes with minimal refactoring."
    },
    {
      title: "Strategic Scoping vs. the 'Everything App' Trap",
      problem:
        "The original vision combined ticketing, music streaming, and merchandise e-commerce into a single initial release, risking scope creep and architectural brittleness.",
      solution:
        "Defined a phased delivery roadmap with ticketing as the core revenue driver. While only Phase 1 was implemented, the database schema and authentication model were designed to be domain-agnostic, allowing future expansion into music and merchandise without a rewrite."
    }
  ],
  liveUrl: "https://ikopurrty.com/"
};
