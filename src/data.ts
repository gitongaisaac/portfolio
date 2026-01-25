import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'ikopurrty',
    title: 'Ticketing Platform - IkoPurrty',
    shortDescription: 'A high-concurrency ticketing platform with secure M-Pesa payments and robust RBAC.',
    fullDescription: `
      <p class="mb-4">Events Hub is a comprehensive SaaS solution designed to handle high-traffic event ticketing. The core challenge was ensuring data integrity during flash sales while maintaining a seamless user experience via Next.js Server Components.</p>
      <p>The system features a hybrid authentication model to solve the conflict between stateless server rendering and secure mutation handling.</p>
    `,
    bannerImage: '/images/events-hub-banner.webp', // Placeholder
    role: 'System Architect & Full-Stack Developer',
    timeline: '3 Months',
    stack: {
      frontend: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Zod'],
      backend: ['Node.js', 'TSyringe (DI)', 'Server Actions'],
      database: ['PostgreSQL', 'Prisma', 'Redis'],
      devops: ['Vercel', 'Neon', 'GitHub Actions']
    },
    architectureHighlights: [
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
    ]
  },
  {
    id: 'premium-gava',
    title: 'Government Service Portal',
    shortDescription: 'Enterprise-grade BFF architecture connecting modern UI with legacy Express services.',
    fullDescription: `
      <p class="mb-4">A digital transformation project to modernize citizen service delivery. The system required strict data compliance and integration with existing infrastructure.</p>
      <p>The architecture utilizes a Backend-for-Frontend (BFF) pattern where Next.js acts as a secure proxy and orchestration layer for a robust Express.js backend.</p>
    `,
    bannerImage: '/images/gov-portal-banner.webp',
    role: 'Backend Lead',
    timeline: 'Ongoing',
    stack: {
      frontend: ['Next.js', 'React Server Components', 'TanStack Query'],
      backend: ['Express.js', 'Raw SQL (MySQL)', 'TSyringe'],
      database: ['MySQL', 'Redis'],
      devops: ['Docker', 'Nginx', 'Linux VPS']
    },
    architectureHighlights: [
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
  }
];