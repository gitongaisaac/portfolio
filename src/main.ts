import gsap from "gsap";
import {animateHeadings, initNavbar, initProjectAnimations} from "@/animations";
import {initHomeAnimations} from "@/pages";

/**
 * This is the main TypeScript file. This file must be loaded before loading the specific page TS file.
 */


document.documentElement.classList.remove("no-js");

/**
 * Initializes animations for the current page based on the `data-page` attribute of the document's body.
 * Executes specific animation initializers depending on whether the page is "home" or "project".
 *
 * @return {void} Does not return a value.
 */
function initPageAnimations(): void {
  if (document.body.dataset.page === "home") {
    animateHeadings();
    initHomeAnimations();
  }

  if (document.body.dataset.page === "project") {
    initProjectAnimations();
  }
}

/**
 * Manages the curtain transition effect for the web page, including fading the curtain in and out during page load and link navigation.
 *
 * @return {void} This function does not return a value. It sets up and handles DOM event listeners and animations for the curtain transition effect.
 */
function runCurtain(): void {
  // Wait for the DOM to be ready
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar();

    const curtain = document.getElementById('transition-curtain');

    if (!curtain) return;

    // Small delay to ensure images/fonts are parsed
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
        // Start page animations after the curtain is gone
        initPageAnimations();
      }
    });

    // Select all links that should be animated
    const links = document.querySelectorAll('.transition-link');
    const transitionCurtain = document.getElementById('transition-curtain');

    if (!links || !transitionCurtain) return;

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
}

/**
 * Initializes a starry background by dynamically generating a specified number of star elements
 * (as SVG circles) and appending them to an SVG container. Each star is placed at a random position,
 * given a random size, and animated with random twinkle and drifting effects using GSAP.
 *
 * @return {void} This function does not return a value.
 */
export function initStars(): void {
  const svg = document.getElementById('stars');
  const SVG_NS = "http://www.w3.org/2000/svg";
  const STAR_COUNT = window.innerWidth > 1024 ? 200 : 100;

  if (!svg) return;

  for (let i = 0; i < STAR_COUNT; i++) {
    // 1. Create the circle using the Namespace
    const circle = document.createElementNS(SVG_NS, "circle");

    // 2. Set Attributes
    // Use percentages (%) for cx/cy so they auto-adjust on resize
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
}

/**
 * Adds click event listeners to elements with the class `copy-email`.
 * When clicked, the email address 'isaacggitonga@gmail.com' is copied to the clipboard.
 *
 * @return {void} This function does not return a value.
 */
export function copyEmail(): void {
  const copy  = document.querySelectorAll('.copy-email');

  copy.forEach(email => email.addEventListener('click', () =>
    navigator.clipboard.writeText('isaacggitonga@gmail.com')));
}

/**
 * Updates the text content of an element with the current year.
 * Searches for an element with the selector 'footer .year' and sets its text content
 * to the current year. If the element is not found, the function exits without making changes.
 *
 * @return {void} Does not return a value.
 */
export function addCopyrightYear(): void {
  const year = new Date().getFullYear();

  const currency = document.querySelector('footer .year');
  if (!currency) return;

  currency.textContent = year.toString();
}

runCurtain();
initStars();
copyEmail();
addCopyrightYear();