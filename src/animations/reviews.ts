import gsap from "gsap";

export function animateReviews() {
  gsap.set("#reviews .head h1", { y: 50, opacity: 0 });
  gsap.set("#reviews .head p", { opacity: 0, y: 30 });

  gsap.set(".review-card", { opacity: 0, y: 40 });

  gsap.to("#reviews .head h1, #reviews .head p", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#reviews",
      start: "top 80%",
      scrub: 1,
    }
  });

  gsap.to(".review-card", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".reviews-list",
      start: "top 90%",
      scrub: 1,
    }
  });
}