import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'ikopurrty',
    title: 'Ticketing Platform - IkoPurrty',
    status: ['This project is complete'],
    description: ['A high-concurrency ticketing platform with secure M-Pesa payments and robust RBAC.'],
    about: [
      'Events Hub is a comprehensive SaaS solution designed to handle high-traffic event ticketing. The core challenge was ensuring data integrity during flash sales while maintaining a seamless user experience via Next.js Server Components.',
      'The system features a hybrid authentication model to solve the conflict between stateless server rendering and secure mutation handling.'
    ],
    bannerUrl: '/projects/ikopurrty.png', // Placeholder
    role: 'System Architect & Full-Stack Developer',
    timeline: '3 Months',
    stack: {
      frontend: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Zod'],
      backend: ['Node.js', 'TSyringe (DI)', 'Server Actions'],
      database: ['PostgreSQL', 'Prisma', 'Redis'],
      devops: ['Vercel', 'Neon', 'GitHub Actions']
    },
    architecture: [
      'Unit of Work (UoW) pattern for transactional integrity across repositories.',
      'Hybrid Auth Strategy using short-lived Access Tokens and long-lived Session Tokens.',
      'Pessimistic Locking to prevent ticket overselling during concurrent checkouts.',
      'Decoupled Checkout Flow using Webhooks and background processing.'
    ],
    challenges: [
      {
        title: 'Concurrency & Overselling',
        problem: 'During high-demand ticket releases, race conditions caused inventory to dip below zero.',
        solution: 'Implemented a Pessimistic Lock (SELECT ... FOR UPDATE) within a strict Unit of Work transaction boundary to serialize access to inventory rows during the reservation phase.'
      },
      {
        title: 'Server Component Authentication',
        problem: 'Next.js Server Components are stateless and cannot set cookies, making token refreshes difficult without client-side flickering.',
        solution: 'Designed a "Hybrid Session" model using a long-lived, stateless Session JWT for read operations and a short-lived Opaque Access Token for write operations, ensuring fast reads without compromising mutation security.'
      }
    ],
    repoUrl: 'https://github.com/gitongaisaac/events-hub',
    liveUrl: 'https://ikopurrty.vercel.app/'
  },
  {
    id: 'premium-gava',
    title: 'Government Service Portal',
    status: ['This project is complete.'],
    description: ['Enterprise-grade BFF architecture connecting modern UI with legacy Express services.'],
    about: [
      'A digital transformation project to modernize citizen service delivery. The system required strict data compliance and integration with existing infrastructure.',
      'The architecture utilizes a Backend-for-Frontend (BFF) pattern where Next.js acts as a secure proxy and orchestration layer for a robust Express.js backend.'
    ],
    bannerUrl: '/projects/gava.png',
    role: 'Backend Lead',
    timeline: 'Ongoing',
    stack: {
      frontend: ['Next.js', 'React Server Components', 'TanStack Query'],
      backend: ['Express.js', 'Raw SQL (MySQL)', 'TSyringe'],
      database: ['MySQL', 'Redis'],
      devops: ['Docker', 'Nginx', 'Linux VPS']
    },
    architecture: [
      'Backend-for-Frontend (BFF) pattern for secure cookie proxying.',
      'Custom API Client with automatic token propagation and Zod validation.',
      'Repository pattern with Raw SQL for optimized complex queries.',
      'Multi-scoped RBAC (Platform vs. Organization level logic).'
    ],
    challenges: [
      {
        title: 'Complex Hierarchical Data Fetching',
        problem: 'Fetching deeply nested resources (Agency -> Service -> Form) via REST resulted in N+1 query performance issues.',
        solution: 'Optimized the Repository layer to perform single, efficient JOIN queries based on composite URL slugs, reducing API latency by 60%.'
      },
      {
        title: 'Transaction Management without ORM',
        problem: 'The project required raw SQL for performance but needed safety for multi-step writes.',
        solution: 'Implemented a custom Unit of Work class using dependency injection child containers to swap the global DB pool with a transactional connection context dynamically.'
      }
    ]
  },

  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    status: ["Live", "Actively Maintained"],
    description: [
      "A high-performance, animation-driven portfolio built to showcase engineering depth, visual storytelling, and system-level thinking.",
      "Designed as a static site with rich interactions, scroll-based animations, and a carefully structured architecture using modern tooling."
    ],
    about: [
      "This project serves as both a personal brand and a technical playground, allowing me to explore advanced animation patterns, layout composition, and performance-aware front-end architecture.",
      "Rather than relying on a heavy framework, the site is intentionally built with vanilla HTML, TypeScript, and GSAP, orchestrated through Vite for fast builds and modular development.",
      "The focus was on clarity, motion discipline, and maintainability — ensuring animations enhance storytelling without overwhelming content or sacrificing performance."
    ],
    bannerUrl: "/projects/portfolio/banner.jpg",
    role: "Designer & Lead Front-End Engineer",
    timeline: "2024 – Present",

    stack: {
      frontend: [
        "HTML5",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
      ],
      backend: [],
      database: [],
      devops: [
        "Vite",
        "ESBuild",
        "Vercel"
      ]
    },

    architecture: [
      "Multi-page static architecture using Vite",
      "Scroll-driven animation timelines with GSAP + ScrollTrigger",
      "Component-like section isolation without a framework",
      "Progressive enhancement with graceful degradation",
      "Performance-aware asset loading and SVG rendering",
      'Serverless Contact Form handling via Vercel Edge/Serverless functions.',
      'Dynamic Content Injection system based on URL parameters.',
    ],

    challenges: [
      {
        title: "Balancing Motion with Performance",
        problem:
          "Heavy scroll-based animations risked jank, layout shifts, and poor performance on lower-end devices.",
        solution:
          "Animations were carefully orchestrated using pinned sections, scrubbed timelines, and GPU-friendly transforms, while avoiding layout-thrashing properties."
      },
      {
        title: "Framework-Free Maintainability",
        problem:
          "Building a complex interactive site without React or Vue required strong structure to avoid tangled logic.",
        solution:
          "The site was organized around clear section boundaries, shared utilities, and strongly-typed data models, keeping logic predictable and scalable."
      },
      {
        title: "First Paint & Flicker Issues",
        problem:
          "Initial rendering caused visible flicker before GSAP animations initialized.",
        solution:
          "Critical elements were pre-styled using CSS (opacity, transforms) and only revealed once animation timelines were ready, eliminating layout flashes."
      }
    ],

    repoUrl: "https://github.com/gitongaisaac/portfolio",
    liveUrl: "https://gitongaisaac.com"
  },
  {
    id: "sprint-kenya",
    title: "Marketing Agency Website & Brand Platform",
    status: ["Live", "Client Project"],
    description: [
      "A marketing agency website focused on storytelling, credibility, and visual impact.",
      "Built to communicate brand philosophy while supporting long-form content, case studies, and future scalability."
    ],
    about: [
      "This project involved designing and engineering a modern marketing website for a full-service brand and experiential marketing agency.",
      "The challenge was to present dense information — services, philosophy, and history — in a way that felt dynamic, confident, and easy to navigate.",
      "The solution leaned heavily on scroll-driven storytelling, pinned sections, and progressive content reveals to guide users through the narrative without overwhelming them."
    ],
    bannerUrl: "/projects/marketing-agency/banner.jpg",
    role: "Lead Front-End Engineer",
    timeline: "2023 – 2024",

    stack: {
      frontend: [
        "HTML5",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
      ],
      backend: ['Vercel functions (Node.js)'],
      database: [],
      devops: [
        "Vite",
        "Vercel",
      ]
    },

    architecture: [
      "Pinned section storytelling using ScrollTrigger",
      "Separation of scroll-logic from content structure",
      "Reusable animation patterns across sections",
      "Static-first architecture with future CMS compatibility",
      "Responsive layout system optimized for large screens and mobile"
    ],

    challenges: [
      {
        title: "Presenting Long-Form Content Without Fatigue",
        problem:
          "Large blocks of copy risked overwhelming users and reducing engagement.",
        solution:
          "Content was broken into scroll-paced sections with pinned headers, staggered reveals, and alternating layouts to maintain visual rhythm."
      },
      {
        title: "Pinned Sections with Sticky Navigation",
        problem:
          "Pinned content conflicted with a persistent navigation bar, causing offset and scroll inconsistencies.",
        solution:
          "Custom pin start/end calculations were implemented using dynamic offsets based on navigation height, ensuring smooth transitions."
      },
      {
        title: "Brand-Consistent Motion Design",
        problem:
          "Animations needed to feel intentional and premium without appearing decorative or noisy.",
        solution:
          "Motion was constrained to a small set of easing curves, directions, and timings, reinforcing brand confidence rather than distracting from content."
      }
    ],

    liveUrl: "https://sprintbrandkenya.com",
  },

  {
    id: "me-and-you",
    title: "Me & You - Sports Arena Management App",
    status: ["Production", "Paused", "Returning to Maintenance"],
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
    timeline: "2021 – 2023",

    stack: {
      frontend: [
        "React Native (Expo)",
        "Redux",
        "TypeScript (post v2.1.1)",
        "Expo SecureStore",
        "Biometric Authentication"
      ],
      backend: [
        "Node.js",
        "Express.js",
        "JWT Authentication"
      ],
      database: [
        "MySQL"
      ],
      devops: [
        "Expo",
        "APK Distribution",
        "Namecheap cPanel Hosting"
      ]
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
        problem:
          "Each user operated within a specific branch and role, requiring the app to maintain both branch context and authorization level consistently across screens.",
        solution:
          "Redux was used to centralize authentication state, branch context, and fetched data, allowing predictable state transitions and reducing cross-screen coupling."
      },
      {
        title: "Authentication & Authorization in a First Production App",
        problem:
          "Implementing secure authentication and role-based authorization without prior production experience posed a steep learning curve.",
        solution:
          "JWT-based authentication with access and refresh tokens was implemented, paired with role-based access control on both the frontend and backend to ensure users could only perform permitted actions."
      },
      {
        title: "Large-Scale Migration from JavaScript to TypeScript",
        problem:
          "After multiple releases, the growing codebase became difficult to reason about and refactor safely using JavaScript alone.",
        solution:
          "The application was incrementally migrated to TypeScript starting from version 2.1.1, improving type safety, refactor confidence, and long-term maintainability despite the learning curve as a solo developer."
      },
      {
        title: "Backend Maintainability & Technical Debt",
        problem:
          "The backend relied heavily on raw SQL queries and controller-layer logic, making maintenance and refactoring risky.",
        solution:
          "While the initial implementation prioritized correctness and security, the experience highlighted the need for service layers, repositories, and proper transaction management — lessons that now inform all future backend work."
      }
    ],

    liveUrl: undefined,
    repoUrl: undefined
  }

];