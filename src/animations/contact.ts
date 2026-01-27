import gsap from "gsap";
import {initSectionHead} from "@/animations/utils.ts";

export function animateContact() {
  initSectionHead('contact');

  gsap.set("#contact form > div, #contact form > button", { opacity: 0, y: 30 });

  gsap.to("#contact form > div, #contact form > button", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 80%",
    }
  });
}