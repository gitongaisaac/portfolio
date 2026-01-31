import {Project} from "@/types.ts";

export const govtPortal: Project = {
  id: "government-service-portal",
  title: "Government Service Portal",
  status: ["In Active Development"],
  bannerUrl: "/projects/gov-portal/banner.png",
  role: "Backend Lead & System Architect",
  timeline: "Ongoing",

  description: [
    "A centralized digital platform designed to eliminate long queues, paperwork, and fragmented government services.",
    "Citizens can apply for, track, and complete government services online, while agencies gain real-time visibility and auditable workflows."
  ],

  about: [
    "This platform modernizes how citizens interact with government services by replacing manual, paper-based processes with a structured digital workflow. Applications move predictably across agencies, approvals are traceable, and service delivery becomes measurable rather than opaque.",
    "A major focus of the project has been architectural evolution rather than surface-level rewrites. I led the transition from a traditional React SPA into a Next.js Backend-for-Frontend (BFF) architecture to improve performance, security, and long-term maintainability.",
    "The data layer was migrated from MySQL to PostgreSQL to better support dynamic, form-driven services using JSONB, while introducing Prisma ORM for type-safe data access without sacrificing query performance."
  ],

  stack: {
    frontend: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "TanStack Query"],
    backend: ["Node.js", "Express.js", "TSyringe (IoC)"],
    database: ["PostgreSQL", "Prisma ORM"],
    devops: []
  },

  architecture: [
    "Backend-for-Frontend (BFF) architecture using Next.js as a secure orchestration layer over the core Express service.",
    "Clear separation between public citizen workflows and internal administrative operations using route groups and middleware.",
    "Unit of Work pattern to guarantee ACID compliance for complex, multi-step service applications.",
    "Repository-based data access layer to isolate business logic from database implementation details."
  ],

  challenges: [
    {
      title: "Dynamic, Multi-Agency Form Management",
      problem:
        "Each government agency requires different application structures, making hardcoded schemas impractical. A traditional EAV model in MySQL was difficult to query and maintain.",
      solution:
        "Migrated to PostgreSQL and designed a JSONB-backed form system where agencies define structured form metadata. Indexed fields preserve query performance while allowing flexible, agency-specific workflows."
    },
    {
      title: "Zero-Downtime Data Layer Migration",
      problem:
        "Replacing the database engine and ORM on an active system carried high risk. A full rewrite would have stalled development and introduced regressions.",
      solution:
        "Used dependency injection and repository abstractions to introduce Prisma-based repositories alongside legacy implementations. This enabled a gradual, low-risk migration without modifying core business services."
    },
    {
      title: "Public vs. Administrative Security Boundaries",
      problem:
        "The initial SPA architecture mixed public and administrative logic in the same client bundle, increasing the risk of accidental exposure.",
      solution:
        "Re-architected the frontend using Next.js App Router with explicit `(public)` and `(admin)` route groups. Administrative layouts, middleware, and data loaders are fully isolated and never shipped to unauthorized clients."
    }
  ],

  retrospective: [
    {
      title: "Architecture Enables Change",
      description:
        "Early investment in repository abstractions and dependency injection transformed a risky database migration into a controlled, incremental upgrade rather than a rewrite."
    },
    {
      title: "Why BFF Matters for Government Systems",
      description:
        "The BFF approach allowed authentication and authorization to remain fully server-controlled. Sensitive sessions stay HttpOnly and secure, while the UI benefits from faster, server-rendered data access."
    }
  ]
};
