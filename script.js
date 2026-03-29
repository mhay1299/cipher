const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
  revealObserver.observe(item);
});

const canUseMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tiltRoot = document.querySelector("[data-tilt-root]");
const tiltLayers = document.querySelectorAll("[data-tilt-layer]");

if (canUseMotion && tiltRoot && tiltLayers.length && window.innerWidth > 820) {
  const setTilt = (event) => {
    const bounds = tiltRoot.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    tiltRoot.style.transform = `rotateX(${(-offsetY * 6).toFixed(2)}deg) rotateY(${(offsetX * 8).toFixed(2)}deg)`;

    tiltLayers.forEach((layer, index) => {
      const depth = (index + 1) * 10;
      const moveX = offsetX * depth;
      const moveY = offsetY * depth;
      layer.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0)`;
    });
  };

  const resetTilt = () => {
    tiltRoot.style.transform = "";
    tiltLayers.forEach((layer) => {
      layer.style.transform = "";
    });
  };

  tiltRoot.addEventListener("pointermove", setTilt);
  tiltRoot.addEventListener("pointerleave", resetTilt);
}
