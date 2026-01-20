import gsap from "gsap";
import {qs} from "./lib/dom.ts";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";

document.documentElement.classList.remove("no-js");

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const svg = qs("#stars");

svg.setAttribute("viewBox", "0 0 1000 1000");
const STAR_COUNT = 2020;

const { width, height } = svg.getBoundingClientRect();

for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
  );

  star.setAttribute("cx", String(Math.random() * width));
  star.setAttribute("cy", String(Math.random() * height));
  star.setAttribute("r", String(Math.random() * 1.2 + 0.3));
  star.setAttribute("fill", "rgb(220,230,255)");
  star.setAttribute("opacity", String(Math.random() * 0.4 + 0.1));

  svg.appendChild(star);
}

ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  end: "bottom bottom",
  pin: "#stars",
  pinSpacing: false,
});

// SVG parallax
gsap.fromTo( "#stars",
  { yPercent: -10 },
  {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  }
);

gsap.set("#hero-logo", { opacity: 0, scale: 0.9 });
gsap.set("#hero-intro", { opacity: 0, y: 20 });

const tl = gsap.timeline();

const taglineTL = gsap.timeline();

gsap.set(".compile", { y: 60, opacity: 0 });
gsap.set(".debug", { x: -80, opacity: 0 });
gsap.set(".repeat", { y: -60, opacity: 0 });
gsap.set(".full-stop", { y: -20, opacity: 0, scale: 0 });

taglineTL.to("#tagline", { duration: 0.5, opacity: 1 });

// ON — entrance
taglineTL
  .to(".compile", {
    y: 0,
    x: "-60%",
    opacity: 1,
    duration: 0.6,
    ease: "power3.out",
  })
  .to(".debug", {
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out",
  }, "+=0.1")
  .to(".repeat", {
    y: 0,
    x: "60%",
    opacity: 1,
    duration: 0.7,
    ease: "power4.out",
  }, "+=0.15")
  .to(".full-stop", {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  }, "-=0.25")

  .to({}, { duration: 0.6 })

  // HOLD — let it breathe
  .to({}, { duration: 0.6 })

  // OFF — clean exit
  .to(".compile", {
    y: -40,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in",
  })
  .to(".debug", {
    x: 40,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in",
  }, "<")
  .to(".repeat", {
    y: 40,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in",
  }, "<")
  .to(".full-stop", {
    opacity: 0,
    scale: 0,
    duration: 0.2,
  }, "<");

const dots = document.querySelectorAll<HTMLElement>("#hero-logo .dot");

const logoTl = gsap.timeline({
  defaults: { ease: "power3.out" },
});

logoTl.to("#hero-logo", { duration: 0.5, opacity: 1 });

dots.forEach((dot) => {
  if (dot.dataset.shape === "diamond") {
    logoTl.fromTo(
      dot,
      {
        rotation: 45,
        scale: 0,
        opacity: 0,
        stagger: 0.5,
      },
      {
        rotation: 315,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.5,
        borderRadius: 4,
      },
      "-=0.4"
    );
  }
});

dots.forEach((dot) => {
  if (dot.dataset.shape === "circle") {
    const fromX = dot.dataset.side === "left" ? -120 : 120;

    logoTl.fromTo(
      dot,
      {
        x: fromX,
        borderRadius: "0%",
        rotation: 0,
        scale: 0.8,
        opacity: 0,
      },
      {
        x: 0,
        borderRadius: "100%",
        rotation: 180,
        scale: 1,
        opacity: 1,
        duration: 1,
      },
      "-=0.5"
    );
  }
});

dots.forEach((dot) => {
  if (dot.dataset.shape === "pill") {
    const isHorizontal = dot.dataset.orientation === "horizontal";

    logoTl.fromTo(
      dot,
      {
        scaleX: isHorizontal ? 0 : 2,
        scaleY: isHorizontal ? 2 : 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }
});

logoTl.to(
  "#logo .dot[data-shape='pill']",
  {
    scale: 1.05,
    duration: 0.15,
    yoyo: true,
    repeat: 1,
  },
  "-=0.2"
);

dots.forEach((dot) => {
  if (dot.dataset.shape === "square") {
    logoTl.fromTo(
      dot,
      {
        scale: 0,
        rotation: -45,
        duration: 1,
        borderRadius: "0.25rem",
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        borderRadius: "1rem",
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.8)",
      },
      "-=0.5"
    );
  }
});

const contentTl = gsap.timeline();

contentTl.to("#hero-intro", { duration: 0.5, opacity: 1 });

document.fonts.ready.then(() => {
  SplitText.create(".hero-text", {
    type: "chars words",
    onSplit: (self) => {
      contentTl.from(self.chars, {
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

  contentTl.to('.hero-title', {
    duration: 3,
    scrambleText: {
      text: "Isaac Gitonga",
      chars: "Gitonga Isaac",
      speed: 1,
    }
  }, '-=0.8')
    .to({}, { duration: 0.6 })
    .to('.hero-title', {
      duration: 3,
      scrambleText: {
        text: "G.",
        chars: "Isaac Gitonga",
      }
  })
})

tl.add(taglineTL).add(logoTl).add(contentTl);

const logo = qs<HTMLElement>("#hero-logo");

const squares = logo.querySelectorAll<HTMLElement>(
  ".dot[data-shape='square']"
);

const diamonds = logo.querySelectorAll<HTMLElement>(
  ".dot[data-shape='diamond']"
);

const tl2 = gsap.timeline({
  defaults: { ease: "power3.out" },
})

diamonds.forEach((el) => {
  tl2.to(el, {
    rotation: 225,
    duration: 1,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
    stagger: 0.5,
    repeatDelay: gsap.utils.random(4, 7),
  });
});

squares.forEach((el) => {
  tl2.to(el, {
    rotation: 360,
    duration: 1.2,
    ease: "power2.out",
    repeat: -1,
    yoyo: true,
    stagger: 0.5,
    repeatDelay: gsap.utils.random(5, 9),
  });
});

gsap.set("#me", { opacity: 0, y: 100 });
gsap.set("#build", { opacity: 0, y: 100 });
gsap.set("#why", { opacity: 0, y: 100 });

const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#about",
    start: "40px 90%",
    scrub: 1,
  },
});

aboutTl
  .to(".me-title", {
    scrambleText: {
      text: "Who I am",
      chars: "Who am I",
      speed: 1,
    }
  }, '-=0.5')
  .to("#me", {
  y: -100,
  duration: 3,
  opacity: 1,
  }, '-=1')
  .to(".build-title", {
    scrambleText: {
      text: "What I build",
      chars: "Architecture",
      speed: 1,
    }
  }, '-=0.5')
  .to("#build", {
    y: -100,
    duration: 3,
    opacity: 1,
  }, '-=1')
  .to(".why-title", {
    scrambleText: {
      text: "Why I do it",
      chars: "Importance",
    }
  }, '-=0.5')
  .to("#why", {
    y: -100,
    duration: 3,
    opacity: 1,
  }, '-=1')


/**
 * Skills Section
 */
const skillsTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#skills",
    start: "top top",
    end: "bottom bottom",
    pin: "#bg-skills",
    scrub: 1,
  },
})

gsap.utils.toArray(".tool").forEach((el) => {})

// gsap.set("#db", { y: 100 })
// gsap.set("#back-end", { y: 100 })
// gsap.set("#front-end", { y: 100 })
//
// skillsTl
//   .to(".db-title", {
//     duration: 2,
//     scrambleText: {
//       text: "Database Design",
//       chars: "Scale Architecture",
//       speed: 1,
//     }
//   })
//   .to("#db", {
//     y: -100,
//     duration: 2,
//     opacity: 1,
//   })
//   .to(".back-end-title", {
//     duration: 2,
//     scrambleText: {
//       text: "Backend Development",
//       chars: "Scale Architecture",
//       speed: 1,
//     }
//   }, '+=0.3')
//   .to("#back-end", {
//     y: -100,
//     duration: 2,
//     opacity: 1,
//   })
//   .to(".front-end-title", {
//     duration: 2,
//     scrambleText: {
//       text: "Front-End Development",
//       chars: "Design Appeal",
//       speed: 1,
//     }
//   }, '+=0.3')
//   .to("#front-end", {
//     y: -100,
//     duration: 2,
//     opacity: 1,
//   })
//
// // gsap.set(".tool", {
// //   x: () => gsap.utils.random(0, window.innerWidth),
// //   y: () => gsap.utils.random(0, window.innerHeight),
// //   rotation: () => gsap.utils.random(-8, 8),
// // });
//
// gsap.to(".tool", {
//   y: "+=15",
//   duration: 5,
//   ease: "sine.inOut",
//   repeat: -1,
//   yoyo: true,
//   stagger: {
//     each: 0.3,
//     from: "random"
//   }
// });


