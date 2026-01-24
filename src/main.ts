import gsap from "gsap";
import {qs} from "./lib/dom.ts";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";

document.documentElement.classList.remove("no-js");

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const svg = document.getElementById('stars');
const SVG_NS = "http://www.w3.org/2000/svg";
const STAR_COUNT = 200;

for (let i = 0; i < STAR_COUNT; i++) {
  // 1. Create the circle using the Namespace
  const circle = document.createElementNS(SVG_NS, "circle");

  // 2. Set Attributes
  // We use percentages (%) for cx/cy so they auto-adjust on resize
  circle.setAttribute("cx", Math.random() * 100 + "%");
  circle.setAttribute("cy", Math.random() * 100 + "%");

  // Random radius between 0.5 and 2.5
  const radius = Math.random() * 2 + 0.5;
  circle.setAttribute("r", String(radius));

  // Styling
  circle.setAttribute("fill", "white");
  circle.setAttribute("opacity", String(Math.random())); // Random initial brightness

  // Apply the glow filter to larger stars only (optimization)
  if (radius > 2) {
    circle.setAttribute("filter", "url(#glow)");
  }

  // 3. Append to SVG
  svg!.appendChild(circle);

  // 4. GSAP Animation (Twinkle)
  gsap.to(circle, {
    opacity: Math.random(), // Animate to a DIFFERENT random opacity
    duration: Math.random() * 2 + 1, // 1-3 seconds
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: Math.random() * 2
  });

  gsap.to(circle, {
    attr: { cx: `+=${Math.random() * 10 - 5}%`, cy: `+=${Math.random() * 10 - 5}%` }, // Drift randomly
    duration: Math.random() * 10 + 10, // Very slow (10-20s)
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

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

/**
 * Skills Section
 */
gsap.set("#skills .head h1", { y: 50, opacity: 0 });

gsap.to("#skills .head h1", {
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

/**
 * Projects Section
 */
gsap.set("#projects .head h1", { y: 50, opacity: 0 });
gsap.set("#projects .head p", { opacity: 0, x: -20 });

gsap.to("#projects .head h1", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#projects",
    start: "top 80%",
    scrub: 1,
  }
});

gsap.to("#projects .head p", {
  x: 0,
  opacity: 1,
  duration: 2.5,
  ease: "power2.out",
  scrambleText: {
    text: 'A curated selection of my most recent projects. 4yrs+ of building & experience.',
    chars: 'My Favourite Recent projects.',
  },
  scrollTrigger: {
    trigger: "#projects .head",
    start: "top 80%",
    end: "bottom 20%",
  }
})

const project = document.querySelectorAll(".project");

gsap.set(project, { opacity: 0, scale: 0.8 });

gsap.to(project, {
  opacity: 1,
  scale: 1,
  duration: 2,
  stagger: 0.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: '.project-list',
    start: "top 90%",
    end: "top 40%",
    scrub: 1,
  },
})

/**
 * Reviews Section
 */
gsap.set("#reviews .head p", { opacity: 0, y: 30 });
gsap.set("#reviews .head h1", { y: 50, opacity: 0 });
gsap.set(".review-card", { opacity: 0, y: 40 });

gsap.to("#reviews .head h1", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#reviews",
    start: "top 80%",
    scrub: 1,
  }
});

gsap.to("#reviews .head p", {
  y: 0,
  opacity: 1,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#reviews",
    start: "top 80%",
    scrub: 1,
  }
});

gsap.to(".review-card", {
  y: 0,
  opacity: 1,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".reviews-list",
    start: "top 80%",
    scrub: 1,
  }
});

/**
 * Contact Section
 */
gsap.set("#contact .head h1", { y: 50 });
gsap.set("#contact .head p", { opacity: 0, y: 50 });
gsap.set("#contact form > div, #contact form > button", { opacity: 0, y: 30 });

gsap.to("#contact .head h1", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  }
});

gsap.to("#contact .head p", {
  y: 0,
  opacity: 1,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
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

const contactForm = document.getElementById("contact-form") as HTMLFormElement;
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    alert("Thank you for your message! (This is a demo)");
    contactForm.reset();
  });
}

