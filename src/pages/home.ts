import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {animateContact, animateHero, animateProjects, animateReviews, animateSkills} from "@/animations";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export function handleContactFormSubmit() {
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
}

handleContactFormSubmit();

export function initHomeAnimations() {
  animateHero();

  /**
   * Skills Section
   */
  animateSkills();

  /**
   * Projects Section
   */
  animateProjects();

  /**
   * Reviews Section
   */
  animateReviews();

  /**
   * Contact Section
   */
  animateContact();
}