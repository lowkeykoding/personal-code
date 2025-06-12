var formId = 'cs-form-1392';
var submittedMessage = 'Form submitted. Now the magic happens.';

const form = document.getElementById(formId);

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // prevent the page reload

  const formData = new FormData(form);

  try {
    await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });

    form.reset(); // clear the form
    showToast(submittedMessage);
  } catch (error) {
    console.error("Form submission error:", error);
    showToast("Oops! Something went wrong.");
  }
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #4caf50;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      opacity: 1;
      transition: opacity 0.5s ease;
    `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 3000);
}
