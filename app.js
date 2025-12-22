const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");

let videoList = [video1, video2, video3];

videoList.forEach(function (video) {
  video.addEventListener("mouseover", function () {
    video.play();
  });
  video.addEventListener("mouseout", function () {
    video.pause();
  });
});

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
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        this
      )
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


