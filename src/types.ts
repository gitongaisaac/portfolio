// src/types.ts
export interface ProjectChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface Project {
  id: string; // matches the URL param
  title: string;
  status: string[];
  description: string[];
  about: string[];
  bannerUrl: string; // Path to image in /public
  role: string; // e.g., "Lead Full-Stack Engineer"
  timeline: string;

  // Tech Stack organized by category for better display
  stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
  };

  // Highlighting specific architectural patterns (The "Senior" stuff)
  architecture: string[];

  // The "STAR" method (Situation, Task, Action, Result) in object form
  challenges: ProjectChallenge[];

  // Links
  repoUrl?: string;
  liveUrl?: string;
}
