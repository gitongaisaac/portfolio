import gsap from "gsap";

export const animateSkills = () => {
  gsap.set("#skills .head h1", { y: 50, opacity: 0 });
  gsap.set("#skills .head p", { opacity: 0, y: 30 });

  gsap.to("#skills .head h1, #skills .head p", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
      scrub: 1,
    }
  });

  gsap.utils.toArray<Element>('#skills .skill').forEach((skill, i) => {
    const title = skill.querySelector('.title');
    const desc = skill.querySelector('.desc');
    const tools = skill.querySelectorAll('.tool');

    gsap.from(title, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: skill,
        start: 'top center',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
        scrub: 1
      }
    });

    gsap.from(desc, {
      x: i % 2 === 0 ? -100 : 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skill,
        start: 'top center',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
        scrub: 1,
      }
    });

    gsap.from(tools, {
      opacity: 0,
      y: 30,
      duration: 1.5,
      stagger: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skill,
        start: 'top 20%',
        end: 'bottom 105%',
        toggleActions: 'play none none reverse',
        scrub: 1,
      }
    });
  })
};