// Silver Studios — progressive enhancement: scroll reveals and off-screen
// animation pausing. All motion itself lives in CSS. No dependencies.

// Camera-motion stills keep animating even when scrolled away, which costs
// compositing work for nothing. Pause them until they are near the viewport.
const kbObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle("kb-idle", !entry.isIntersecting);
    }
  },
  { rootMargin: "150px" }
);

document.querySelectorAll(".kb").forEach((el) => kbObserver.observe(el));

// Scroll reveal animations (skipped under reduced-motion via CSS).
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
