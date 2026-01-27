import gsap from "gsap";

export function animateContact() {
  gsap.set("#contact .head h1", { y: 50, opacity: 0 });
  gsap.set("#contact .head p", { opacity: 0, y: 30 });
  gsap.set("#contact form > div, #contact form > button", { opacity: 0, y: 30 });

  gsap.to("#contact .head h1, #contact .head p", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      scrub: 1,
    }
  });

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