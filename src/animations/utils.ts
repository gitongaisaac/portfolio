import gsap from "gsap";

export function initSectionHead(section: string) {
  gsap.set(`#${section} .head h1`, { y: 50, opacity: 0 });
  gsap.set(`#${section} .head p`, { opacity: 0, y: 30 });

  gsap.to(`#${section} .head h1, #${section} .head p`, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: `#${section}`,
      start: "top 80%",
      scrub: 1,
    }
  });
}