import gsap from "gsap";

export function initNavbar() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const sideNav = document.getElementById('side-nav');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const navDrawer = document.getElementById('nav-content');

  if (!menuToggle || !sideNav || !menuClose || !navBackdrop || !navDrawer) return;

  gsap.to(sideNav, { opacity: 1 });

  // Initialize state
  gsap.set(sideNav, { visibility: 'hidden' });
  gsap.set(navDrawer, { xPercent: 100 });
  gsap.set(navBackdrop, { opacity: 0 });

  const tl = gsap.timeline({ 
    paused: true,
    onReverseComplete: () => {
      gsap.set(sideNav, { visibility: 'hidden' });
    },
    onStart: () => {
      gsap.set(sideNav, { visibility: 'visible' });
    }
  });

  tl.to(navBackdrop, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  })
  .to(navDrawer, {
    xPercent: 0,
    duration: 0.6,
    ease: "power3.inOut"
  }, "-=0.2")
  .from(".nav-link", {
    x: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.3");

  menuToggle.addEventListener('click', () => {
    tl.play();
  });

  const closeMenu = () => {
    tl.reverse();
  };

  menuClose.addEventListener('click', closeMenu);
  navBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}
