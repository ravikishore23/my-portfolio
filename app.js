

document.querySelectorAll(".linkBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = btn.dataset.url;
  });
});

// Initialize EmailJS
(function () {
  emailjs.init("YOUR_PUBLIC_KEY");
})();

// Form submit handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
      .then(() => {
        alert("Message sent successfully!");
        form.reset(); // optional: clear form
      })
      .catch((error) => {
        alert("Failed to send message");
        console.error("EmailJS Error:", error);
      });
  });
});

function goToContact() {
  document.getElementById("contact-section").scrollIntoView({
    behavior: "smooth",
  });
}
