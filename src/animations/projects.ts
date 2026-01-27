import gsap from "gsap";
import {initSectionHead} from "@/animations/utils.ts";

export function animateProjects() {
  initSectionHead('projects');

  const projectItems = document.querySelectorAll(".project");

  gsap.set(projectItems, { opacity: 0, y: 50 });

  gsap.to(projectItems, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: '.project-list',
      start: "top 85%",
      toggleActions: 'play none none reverse',
    },
  });

  projectItems.forEach((item) => {
    const title = item.querySelector('h2');
    const techStack = item.querySelector('.tech-stack');

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        paddingLeft: '2rem',
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(title, {
        x: 10,
        duration: 0.4,
        ease: 'power2.out'
      });
      if (techStack) {
        gsap.to(techStack.querySelectorAll('li'), {
          x: 5,
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        paddingLeft: '0',
        backgroundColor: 'transparent',
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(title, {
        x: 0,
        color: '#14b8a6', // Matches teal-500 from CSS
        duration: 0.4,
        ease: 'power2.out'
      });
      if (techStack) {
        gsap.to(techStack.querySelectorAll('li'), {
          x: 0,
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
}