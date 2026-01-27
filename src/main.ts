import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {initNavbar} from "./navbar";

document.documentElement.classList.remove("no-js");

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const SCREEN_MD = window.innerWidth > 768;

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  const curtain = document.getElementById('transition-curtain');

  // Optional: Small delay to ensure images/fonts are parsed
  gsap.to(curtain, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    delay: 0.2,
    onComplete: () => {
      // Remove it from the DOM flow so it doesn't block clicks
      if (curtain) {
        curtain.style.pointerEvents = "none";
      }
      // Start page animations after curtain is gone
      animatePage();
    }
  });

  // Select all links you want to animate
  const links = document.querySelectorAll('.transition-link');
  const transitionCurtain = document.getElementById('transition-curtain');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // 1. STOP the browser from jumping immediately
      e.preventDefault();
      const targetUrl = link.getAttribute('href');

      // 2. Animate the curtain IN
      gsap.to(transitionCurtain, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
          if (transitionCurtain) transitionCurtain.style.pointerEvents = "all";
        },
        onComplete: () => {
          // 3. NOW change the page (while screen is black)
          window.location.href = targetUrl ?? '/index.html';
        }
      });
    });
  });
});

const svg = document.getElementById('stars');
const SVG_NS = "http://www.w3.org/2000/svg";
const STAR_COUNT = window.innerWidth > 1024 ? 200 : 100;

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

const animatePage = () => {
  gsap.set("#hero-logo", { opacity: 0, scale: 0.9 });
  gsap.set("#hero-intro", { opacity: 0, y: 20 });

  const tl = gsap.timeline();

  const taglineTL = gsap.timeline();

  gsap.set(".compile", { yPercent: SCREEN_MD ? 40 : 20, opacity: 0 });
  gsap.set(".debug", { xPercent: SCREEN_MD ? -70 : -35, opacity: 0 });
  gsap.set(".repeat", { yPercent: SCREEN_MD ? -40 : -20, opacity: 0 });
  gsap.set(".full-stop", { yPercent: SCREEN_MD ? -20 : -10, opacity: 0, scale: 0, transformOrigin: "50% 50%" });

  taglineTL.to("#tagline", { duration: 0.5, opacity: 1 });

  // ON — entrance (percent-based so it scales with font-size)
  taglineTL
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

  const contentTl = gsap.timeline();

  gsap.set("#hero li", { opacity: 0, x: -20 });

  contentTl.to("#hero .stats", { duration: 0.5, opacity: 1 });
  contentTl.to("#hero-intro", { duration: 0.5, opacity: 1 });

  contentTl.to(".stats li", {
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
      .to({}, { duration: 1 })
      .to('.hero-title', {
        duration: 3,
        scrambleText: {
          text: "G.",
          chars: "Isaac Gitonga",
        }
    })
  })

  tl.add(taglineTL).add(contentTl);

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

  /**
   * Projects Section
   */
  gsap.set("#projects .head h1", { y: 50, opacity: 0 });
  gsap.set("#projects .head p", { opacity: 0, y: 30 });

  gsap.to("#projects .head h1", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#projects",
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
    }
  });

  gsap.to('#projects .head p', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#projects",
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
    }
  })

  gsap.to("#projects .head p", {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    scrambleText: {
      text: 'A curated selection of my most recent projects.',
      chars: 'My Favourite Recent projects.',
    },
    scrollTrigger: {
      trigger: "#projects .head",
      start: "top 80%",
      end: "bottom 20%",
    }
  })

  const projectItems = document.querySelectorAll(".project");

  gsap.set(projectItems, { opacity: 0, y: 50 });

  gsap.to(projectItems, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: '.project-list',
      start: "top 85%",
      toggleActions: 'play none none reverse',
    },
  });

  projectItems.forEach((item) => {
    const title = item.querySelector('h2');
    const techStack = item.querySelector('.tech-stack');

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        paddingLeft: '2rem',
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(title, {
        x: 10,
        duration: 0.4,
        ease: 'power2.out'
      });
      if (techStack) {
        gsap.to(techStack.querySelectorAll('li'), {
          x: 5,
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        paddingLeft: '0',
        backgroundColor: 'transparent',
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(title, {
        x: 0,
        color: '#14b8a6', // Matches teal-500 from CSS
        duration: 0.4,
        ease: 'power2.out'
      });
      if (techStack) {
        gsap.to(techStack.querySelectorAll('li'), {
          x: 0,
          stagger: 0.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });

  /**
   * Reviews Section
   */
  gsap.set("#reviews .head h1", { y: 50, opacity: 0 });
  gsap.set("#reviews .head p", { opacity: 0, y: 30 });

  gsap.set(".review-card", { opacity: 0, y: 40 });

  gsap.to("#reviews .head h1, #reviews .head p", {
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

  /**
   * Contact Section
   */
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

const contactForm = document.getElementById("contact-form") as HTMLFormElement;
const formStatus = document.getElementById("form-status");
const submitBtn = contactForm?.querySelector('button[type="submit"]') as HTMLButtonElement;

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!submitBtn || !formStatus) return;


    // Reset status
    const formStatusMessage = formStatus.querySelector('.form-status-message');
    if (formStatusMessage) {
      formStatusMessage.classList.add('hidden');
    }
    formStatus.classList.remove('text-green-400', 'text-red-400', 'bg-green-400/10', 'bg-red-400/10');

    // Disable button
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Success
        const formStatusMessage = formStatus.querySelector('.form-status-message');
        if (formStatusMessage) {
          formStatusMessage.textContent = result.message || 'Thank you for your message! I will get back to you soon.';
          formStatusMessage.classList.remove('hidden');
        }
        formStatus.classList.add('text-green-400', 'bg-green-400/10');

        // Animation for success
        gsap.fromTo(formStatus,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        // Fun animation for the form on success
        gsap.to(contactForm, {
          x: 5,
          yoyo: true,
          repeat: 3,
          duration: 0.1,
          ease: "power2.inOut"
        });

        contactForm.reset();
      } else {
        throw new Error(result.error || 'Something went wrong. Please try again later.');
      }
    } catch (error: any) {
      const statusMessage = formStatus.querySelector('.form-status-message');

      if (!statusMessage) return;

      statusMessage.textContent = error.message;
      statusMessage.classList.remove('hidden');
      formStatus.classList.add('text-red-400', 'bg-red-400/10');

      // Animation for error
      gsap.fromTo(formStatus,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}
