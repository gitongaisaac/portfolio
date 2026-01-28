import gsap from "gsap";

export function animateHeadings() {
  // 1. Select all elements with class .head
  const headers = document.querySelectorAll('.head');

  // 2. Loop through each one
  headers.forEach((container) => {

    // 3. SCOPED SELECTOR
    // We only want the h1 and p INSIDE this specific container
    const title = container.querySelector('h1');
    const subtitle = container.querySelector('p');

    // 4. Create the Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container, // Trigger specifically when THIS .head enters view
        start: "top 90%",   // Start when top of element hits 85% down viewport
        end: "top 30%",
        toggleActions: "play none none reverse", // Optional: Re-play on scroll up
        scrub: 1,
      }
    });

    // 5. Add Animations
    tl.from(title, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
      .from(subtitle, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6"); // Start this 0.6s before the title finishes (overlap)
  });
}