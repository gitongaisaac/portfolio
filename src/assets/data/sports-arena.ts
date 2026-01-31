import {Project} from "@/types.ts";

export const sportsArena: Project = {
    id: "me-and-you",
    title: "Me & You - Sports Arena Management App",
    status: ["Production", "Paused", "Resuming Maintenance"],
    description: [
      "A mobile application built to streamline daily operations for a football hall business with multiple branches.",
      "The app centralizes fixture tracking, branch-level revenue, and expense reporting to reduce operational overhead and improve visibility for management."
    ],
    about: [
      "This application was built to solve a real operational problem for a client managing multiple football viewing halls across different branches, each with its own employees and daily financial activity.",
      "The system enables staff to log daily expenses, track available fixtures, and report revenue per fixture per branch, while giving management a consolidated view of performance across locations.",
      "Developed as a solo project and my first real production React Native application, this project forced me to learn state management, authentication, backend integration, and deployment under real constraints."
    ],
    bannerUrl: "/projects/football-app/banner.jpg",
    role: "Sole Full-Stack Mobile Engineer",
    timeline: "1 year",
    stack: {
      frontend: [
        "React Native (Expo)",
        "Redux",
        "TypeScript (post v2.1.1)",
        "Expo SecureStore",
        "Biometric Authentication"
      ],
      backend: ["Node.js", "Express.js", "JWT Authentication"],
      database: ["MySQL", "phpMyAdmin"],
      devops: ["Expo", "EAS Build", "APK Distribution", "Namecheap cPanel Hosting"]
    },
    architecture: [
      "Role-based authorization (Admin, Manager, Supervisor, Employee)",
      "Token-based authentication using access and refresh tokens (JWT)",
      "Branch-context–aware state management on the client",
      "RESTful API design with protected routes",
      "Client-side secure credential storage using Expo SecureStore"
    ],
    challenges: [
      {
        title: "Managing Complex State in a Multi-Branch Context",
        problem: "Each user operated within a specific branch and role, requiring the app to maintain both branch context and authorization level consistently across screens.",
        solution: "Redux was used to centralize authentication state, branch context, and fetched data, allowing predictable state transitions and reducing cross-screen coupling."
      },
      {
        title: "Authentication & Authorization in a First Production App",
        problem: "Implementing secure authentication and role-based authorization without prior production experience posed a steep learning curve.",
        solution: "JWT-based authentication with access and refresh tokens was implemented, paired with role-based access control on both the frontend and backend to ensure users could only perform permitted actions."
      },
      {
        title: "Large-Scale Migration from JavaScript to TypeScript",
        problem: "After multiple releases, the growing codebase became difficult to reason about and refactor safely using JavaScript alone.",
        solution: "The application was incrementally migrated to TypeScript starting from version 2.1.1, improving type safety, refactor confidence, and long-term maintainability despite the learning curve as a solo developer."
      },
      {
        title: "Backend Maintainability & Technical Debt",
        problem: "The backend relied heavily on raw SQL queries and controller-layer logic, making maintenance and refactoring risky.",
        solution: "While the initial implementation prioritized correctness and security, the experience highlighted the need for service layers, repositories, and proper transaction management — lessons that now inform all future backend work."
      }
    ],
    retrospective: [
      {
        title: "Project Scoping & Feature Prioritization",
        description:
        "I would start with a much tighter scope and define a clear MVP focused solely on daily operations (fixtures, revenue, expenses). In the original build, features were explored as I learned, which extended the initial delivery timeline. Today, I would prioritize faster iteration, earlier releases, and incremental expansion based on real usage."
      },
      {
        title: "Backend Architecture & Data Access Layer",
        description:
        "The backend logic was concentrated in controllers with extensive raw SQL queries, which made long-term maintenance difficult. If rebuilding today, I would introduce a service and repository layer, adopt an ORM, Inject dependencies, and use a Unit of Work pattern for transactions to improve consistency, testability, and reasoning about data flow."
      },
      {
        title: "Error Handling & API Contracts",
        description:
        "Error handling was minimal and inconsistent. I would now design a structured error system with standardized response formats, explicit error codes, and clearer client-server contracts to improve debuggability and frontend resilience."
      },
      {
        title: "TypeScript from Day One",
        description:
        "The JavaScript-to-TypeScript migration was large and time-consuming. If starting today, the project would be written in TypeScript from the beginning, with stricter compiler settings to catch bugs earlier and reduce refactor risk."
      },
      {
        title: "State Management Boundaries",
        description:
        "While Redux ultimately worked well, early state boundaries were unclear. With more experience, I would more deliberately separate server state, UI state, and branch context, potentially leveraging more structured data-fetching patterns to reduce complexity."
      },
      {
        title: "Deployment & Infrastructure Choices",
        description:
        "Hosting on shared cPanel infrastructure worked but added friction. Today, I would use more modern deployment platforms with clearer environments, better logging, and easier scaling, reducing operational overhead and deployment risk."
      }
    ],
  };