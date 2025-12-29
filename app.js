document.querySelectorAll(".linkBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = btn.dataset.url;
  });
});
