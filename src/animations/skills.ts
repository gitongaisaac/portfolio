import gsap from "gsap";

export const animateSkills = () => {
  gsap.utils.toArray<Element>('#skills .skill').forEach((skill) => {
    const title = skill.querySelector('.title');
    const desc = skill.querySelector('.desc');
    const tools = skill.querySelectorAll('.tool');

    gsap.from(title, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: skill,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
        scrub: 1
      }
    });

    gsap.from(desc, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skill,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
        scrub: 1,
      }
    });

    gsap.from(tools, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skill,
        start: 'bottom bottom',
        end: 'bottom 80%',
        toggleActions: 'play none none reverse',
        scrub: 1,
      }
    });
  })
};

gsap.from("#skills .global .tool", {
  opacity: 0,
  y: 30,
  duration: 1.5,
  stagger: 0.5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.global',
    start: 'top 80%',
    end: 'bottom 60%',
    toggleActions: 'play none none reverse',
    scrub: 1,
  }
})

gsap.from("#skills .global h3", {
  opacity: 0,
  xPercent: 10,
  duration: 1.5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.global',
    start: 'top 80%',
    end: 'bottom center',
    toggleActions: 'play none none reverse',
  }
})