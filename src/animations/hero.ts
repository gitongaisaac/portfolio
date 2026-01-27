import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

const SCREEN_MD = window.innerWidth > 768;

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);

function animateTagline(tl: GSAPTimeline) {
  gsap.set(".compile", { yPercent: SCREEN_MD ? 40 : 20, opacity: 0 });
  gsap.set(".debug", { xPercent: SCREEN_MD ? -70 : -35, opacity: 0 });
  gsap.set(".repeat", { yPercent: SCREEN_MD ? -40 : -20, opacity: 0 });
  gsap.set(".full-stop", { yPercent: SCREEN_MD ? -20 : -10, opacity: 0, scale: 0, transformOrigin: "50% 50%" });

  tl.to("#tagline", { duration: 0.5, opacity: 1 });

  // ON — entrance (percent-based so it scales with font-size)
  tl
    .to(".compile", {
      yPercent: 0,
      xPercent: SCREEN_MD ? -30 : -15,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    })
    .to(".debug", {
      xPercent: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    }, "+=0.1")
    .to(".repeat", {
      yPercent: 0,
      xPercent: SCREEN_MD ? 30 : 15,
      opacity: 1,
      duration: 0.7,
      ease: "power4.out",
    }, "+=0.15")
    .to(".full-stop", {
      yPercent: 0,
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    }, "-=0.25")

    .to({}, { duration: 0.6 })

    // HOLD — let it breathe
    .to({}, { duration: 0.6 })

    // OFF — clean exit (also percent-based)
    .to(".compile", {
      yPercent: -60,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    })
    .to(".debug", {
      xPercent: 30,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "<")
    .to(".repeat", {
      yPercent: 60,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "<")
    .to(".full-stop", {
      opacity: 0,
      scale: 0,
      duration: 0.2,
    }, "<");
}

function animateContent(tl: GSAPTimeline) {
  gsap.set("#hero li", { opacity: 0, x: -20 });

  tl.to("#hero .stats", { duration: 0.5, opacity: 1 });
  tl.to("#hero-intro", { duration: 0.5, opacity: 1 });

  tl.to(".stats li", {
    x: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
  }, "-=0.3");

  document.fonts.ready.then(() => {
    SplitText.create(".hero-text", {
      type: "chars words",
      onSplit: (self) => {
        tl.from(self.chars, {
          yPercent: "random([-100, 100])",
          rotation: "random([-30, 30])",
          autoAlpha: 0,
          smartWrap: true,
          stagger: {
            amount: 2,
            from: "random",
          },
        }, '-=0.8')
      }
    });

    tl.to('.hero-title', {
      duration: 3,
      scrambleText: {
        text: "Isaac Gitonga",
        chars: "Gitonga Isaac",
        speed: 1,
      }
    }, '-=0.8')
      .to({}, { duration: 1 })
      .to('.hero-title', {
        duration: 3,
        scrambleText: {
          text: "G.",
          chars: "Isaac Gitonga",
        }
      })
  })
}

export function animateAbout() {
  gsap.utils.toArray<Element>("#about li").forEach((item) => {
    gsap.fromTo(item, {
      opacity: 0,
      y: 100,
      xPercent: item.matches(":nth-child(odd)") ? 10 : -10,
    }, {
      y: -100,
      opacity: 1,
      xPercent: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 95%",
        end: "center center",
        scrub: 1,
      }
    });
  })
}

export function animateHero() {
  gsap.set("#hero-intro", { opacity: 0, y: 20 });

  const tl = gsap.timeline();

  const taglineTL = gsap.timeline();
  animateTagline(taglineTL);

  const contentTl = gsap.timeline();
  animateContent(contentTl);

  tl.add(taglineTL).add(contentTl);

  animateAbout();
}
