import gsap from "gsap";
import {initSectionHead} from "@/animations/utils.ts";

export function animateReviews() {
  initSectionHead('reviews');

  gsap.set(".review-card", { opacity: 0, y: 40 });

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