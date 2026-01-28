import gsap from "gsap";

export function animateReviews() {
  gsap.set(".review-card", { opacity: 0, y: 40 });

  gsap.to(".review-card", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".reviews-list",
      start: "top 95%",
      end: "top top",
      scrub: 1,
    }
  });
}