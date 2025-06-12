document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('in-view');
      obs.unobserve(target);
    });
  }, { threshold: 0.1 });

  const els = document.querySelectorAll(
    '[class^="an-"], [class*=" an-"]'
  );

  els.forEach(el => {
    const dur = el.dataset.anDuration; // e.g. "1s" or "800ms"
    if (dur) el.style.setProperty('--an-duration', dur);
    io.observe(el);
  });
});
