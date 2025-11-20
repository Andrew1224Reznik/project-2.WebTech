document
  .querySelector('.footer-link-contact-us')
  .addEventListener('click', e => {
    e.preventDefault();
    smoothScrollTo('#footer-contact-us', 1500);
  });

function smoothScrollTo(target, duration = 600) {
  const element = document.querySelector(target);
  if (!element) return;

  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + start;
  const distance = end - start;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // ease-in-out
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, start + distance * ease);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
