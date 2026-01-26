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
    id: 'portfolio',
    title: 'Portfolio | Full Stack Web Developer',
    status: ['This project is complete'],
    description: ['A high-performance personal portfolio featuring advanced GSAP animations and dynamic content injection.'],
    about: [
      'This portfolio was designed to showcase my technical skills while providing a high-quality user experience. The main goal was to move away from static templates and build a custom, performant engine for project presentation.',
      'The site uses a dynamic project routing system that injects data from a centralized store, allowing for easy updates and maintenance.'
    ],
    bannerUrl: '/projects/portfolio.png',
    role: 'Lead Developer',
    timeline: '2 Weeks',
    stack: {
      frontend: ['TypeScript', 'GSAP', 'Tailwind CSS', 'Vite', 'HTML5'],
      backend: ['Vercel Functions (Node.js)'],
      database: [],
      devops: ['Vercel', 'GitHub Actions']
    },
    architecture: [
      'Dynamic Content Injection system based on URL parameters.',
      'GSAP ScrollTrigger for complex scroll-based orchestration.',
      'Atomic Design principles for reusable components.',
      'Serverless Contact Form handling via Vercel Edge/Serverless functions.'
    ],
    challenges: [
      {
        title: 'Animation Orchestration',
        problem: "I had never handled animations of this magnitude before, which led to initial performance bottlenecks and timeline conflicts.",
        solution: 'Leveraged GSAP timelines and ScrollTrigger to create a centralized animation controller, ensuring smooth transitions and efficient resource management.'
      },
      {
        title: 'Dynamic Data Injection',
        problem: 'Creating separate HTML files for every project was inefficient and hard to maintain.',
        solution: 'Implemented a single dynamic project.html file that fetches and renders project-specific data based on URL IDs, significantly reducing code duplication.'
      }
    ],
    repoUrl: 'https://github.com/gitongaisaac/portfolio',
    liveUrl: 'https://gitongaisaac.vercel.app/'
  }
];