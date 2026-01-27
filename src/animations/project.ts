import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectAnimations() {
  gsap.set("#back-nav", {  xPercent: -20, opacity: 0 });
  gsap.set("#showcase", { scale: 0.95, opacity: 0})
  gsap.set("#project-title", { y: 30, opacity: 0 });
  gsap.set("#project-status", { y: 30, opacity: 0 });
  gsap.set("#project-role", { y: 20, opacity: 0 });
  gsap.set("#overview", { y: 20, opacity: 0 });
  gsap.set(".project-link-btn", { y: 10, opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 }
  });

  // Header Animation
  tl.to("#project-title", { y: 0, opacity: 1 }, 0.2)
    .to("#project-status", { y: 0, opacity: 1 }, "-=0.7")
    .to("#project-role", { y: 0, opacity: 1 }, "-=0.7")
    .to("#showcase", { scale: 1, opacity: 1 }, "-=0.7")
    .to("#back-nav", { xPercent: 0, opacity: 1 }, "-=0.7")
    .to("#overview", { y: 0, opacity: 1 }, "-=0.7")
    .to(".project-link-btn", { y: 0, opacity: 1, stagger: 0.1 }, "-=0.7");

  // Overview & Tech Stack
  gsap.from("#overview h2", {
    x: -30,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#overview",
      start: "top 85%",
    },
  });

  gsap.from("#project-description p", {
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#project-description",
      start: "top 85%",
    }
  });

  gsap.from("#project-status p", {
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#project-status",
      start: "top 85%",
    }
  });

  gsap.from("section:nth-of-type(1) .bg-neutral-900\\/50", {
    x: 30,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "section:nth-of-type(1) .bg-neutral-900\\/50",
      start: "top 85%",
    },
  });

  // Architecture Section
  gsap.from("section:nth-of-type(2) h2", {
    scrollTrigger: {
      trigger: "section:nth-of-type(2)",
      start: "top 85%",
    },
    y: 20,
    opacity: 0,
    duration: 1
  });

  gsap.from("#architecture-list li", {
    scrollTrigger: {
      trigger: "#architecture-list",
      start: "top 85%",
    },
    x: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8
  });

  // Challenges Section
  gsap.from("section:nth-of-type(3) h2", {
    scrollTrigger: {
      trigger: "section:nth-of-type(3)",
      start: "top 85%",
    },
    y: 20,
    opacity: 0,
    duration: 1
  });

  gsap.from("#challenges-container > div", {
    scrollTrigger: {
      trigger: "#challenges-container",
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  });
}