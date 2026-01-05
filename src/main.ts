import gsap from "gsap";
import {qs} from "./lib/dom.ts";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const svg = qs("#stars");
const STAR_COUNT = 520;

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

const dots = document.querySelectorAll<HTMLElement>("#logo .dot");

const tl = gsap.timeline({
  defaults: { ease: "power3.out" },
});

dots.forEach((dot) => {
  if (dot.dataset.shape === "diamond") {
    tl.fromTo(
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

    tl.fromTo(
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

    tl.fromTo(
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

tl.to(
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
    tl.fromTo(
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
      })
    }
  });

  tl.to('.hero-title', {
    duration: 3,
    scrambleText: {
      text: "Isaac Gilbert",
      chars: "isaac gilbert",
      speed: 1,
    }
  })
})

const logo = qs<HTMLElement>("#logo");

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

ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  end: "bottom bottom",
  pin: "#stars",
  pinSpacing: false,
});

// SVG parallax
gsap.to("#stars", {
  y: "-8%",
  scrollTrigger: {
    trigger: "#hero",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.set(".compile", { y: 60, opacity: 0 });
gsap.set(".debug", { x: -80, opacity: 0 });
gsap.set(".repeat", { y: -60, opacity: 0 });
gsap.set(".full-stop", { y: -60, opacity: 0, scale: 0 });

gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-tagline",
    start: "top 50%",     // when tagline enters viewport
    end: "top 40%",
    toggleActions: "play none none reverse",
  },
})
  .to(".compile", {
    y: 0,
    x: '-60%',
    opacity: 1,
    duration: 0.7,
    ease: "power3.out",
  })
  .to(".debug", {
    x: 0,
    opacity: 1,
    rotateZ: 25,
    duration: 0.7,
    ease: "power3.out",
  }, "+=0.15")
  .to(".repeat", {
    y: 0,
    x: "60%",
    paddingTop: 30,
    opacity: 1,
    duration: 0.9,
    ease: "power4.out",
  }, "+=0.2")
  .to(".full-stop", {
    opacity: 1,
    scale: 1,
    duration: 0.5,
  });




gsap.fromTo(
  "#skills div",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 1.2,
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
    },
  }
);

// ScrollTrigger.create({
//   trigger: "#skills",
//   start: "top top",
//   end: "bottom bottom",
//   pin: ".skills .absolute",
//   pinSpacing: false,
// })