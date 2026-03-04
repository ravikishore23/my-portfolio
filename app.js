// Link button navigation
document.querySelectorAll(".linkBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = btn.dataset.url;
  });
});

// Contact navigation helper
function goToContact() {
  document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" });
}

// ============================================================
// IntersectionObserver fallback for browsers that don't support
// animation-timeline: view()
// ============================================================

(function () {
  // Check if the browser supports scroll-driven animations
  const supportsAnimationTimeline = CSS.supports("animation-timeline", "view()");

  if (supportsAnimationTimeline) {
    // Browser supports it natively — nothing to do
    return;
  }

  // If not supported, the scroll-driven animations won't fire and elements
  // will be stuck in their initial (invisible/blurred/off-screen) state.
  // We fix this by:
  // 1. Removing the non-functional animation properties
  // 2. Adding CSS transitions
  // 3. Using IntersectionObserver to trigger visibility

  const scrollAnimatedClasses = [
    "autoBlur",
    "autoDisplay",
    "autoDisplayLow",
    "fadeRight-M",
    "fadeLeft-M",
    "fadeRightCurve",
    "fadeLeftCurve",
    "fadeRightCurve-i",
    "fadeLeftCurve-i",
    "fadeBtoT",
  ];

  // Inject fallback CSS styles
  const fallbackCSS = document.createElement("style");
  fallbackCSS.textContent = `
    /* Fallback: initial hidden state for scroll-animated elements */
    .autoBlur { opacity: 0; filter: blur(10px); transition: opacity 0.8s ease-out, filter 0.8s ease-out; animation: none !important; }
    .autoDisplay { opacity: 0; filter: blur(5px); transform: translateY(-40px) scale(0.9); transition: opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out; animation: none !important; }
    .autoDisplayLow { opacity: 0; filter: blur(5px); transform: translateY(-5px) scale(0.95); transition: opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out; animation: none !important; }
    .fadeRight-M { opacity: 0; transform: translateX(-80px); filter: blur(5px); transition: opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out; animation: none !important; }
    .fadeLeft-M { opacity: 0; transform: translateX(80px); filter: blur(5px); transition: opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out; animation: none !important; }
    .fadeRightCurve { opacity: 0; transform: translateX(-80px) rotate(-15deg); filter: blur(5px); transition: opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out; animation: none !important; }
    .fadeLeftCurve { opacity: 0; transform: translateX(80px) rotate(15deg); filter: blur(5px); transition: opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out; animation: none !important; }
    .fadeRightCurve-i { opacity: 0; transform: translateX(80px) rotate(-15deg); filter: blur(5px); transition: opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out; animation: none !important; }
    .fadeLeftCurve-i { opacity: 0; transform: translateX(-80px) rotate(15deg); filter: blur(5px); transition: opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out; animation: none !important; }
    .fadeBtoT { opacity: 0; transform: translateY(80px); filter: blur(5px); transition: opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out; animation: none !important; }

    /* Visible state when in view */
    .autoBlur.in-view { opacity: 1; filter: blur(0); }
    .autoDisplay.in-view { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
    .autoDisplayLow.in-view { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
    .fadeRight-M.in-view { opacity: 1; transform: translateX(0); filter: blur(0); }
    .fadeLeft-M.in-view { opacity: 1; transform: translateX(0); filter: blur(0); }
    .fadeRightCurve.in-view { opacity: 1; transform: translateX(0) rotate(0deg); filter: blur(0); }
    .fadeLeftCurve.in-view { opacity: 1; transform: translateX(0) rotate(0deg); filter: blur(0); }
    .fadeRightCurve-i.in-view { opacity: 1; transform: translateX(0) rotate(0deg); filter: blur(0); }
    .fadeLeftCurve-i.in-view { opacity: 1; transform: translateX(0) rotate(0deg); filter: blur(0); }
    .fadeBtoT.in-view { opacity: 1; transform: translateY(0); filter: blur(0); }
  `;
  document.head.appendChild(fallbackCSS);

  // Collect all elements that use scroll-driven animation classes
  const selector = scrollAnimatedClasses.map((c) => "." + c).join(",");
  const elements = document.querySelectorAll(selector);

  // Create an IntersectionObserver that adds .in-view when element enters viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
})();
