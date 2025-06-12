// ***** Setup *****
// I need to add a div element underneath the input field with a naming convention of inputId-error.
// I need to add novalidate to the form element.
// I might need to add patterns to the input fields.

var formId = "cs-form"; // Update me
var submittedMessage = "Thanks! We'll be in touch soon."; // Update me if needed
//--------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById(formId);
  if (!form) return;

  form.setAttribute("novalidate", true); // Disable native validation

  const fields = form.querySelectorAll("input, textarea");

  function validateField(field) {
    const errorId = field.id + "-error";
    const errorEl = document.getElementById(errorId);
    const isRequired = field.hasAttribute("required");
    const hasValue = field.value.trim() !== "";

    let isValid = true;

    if (isRequired || hasValue) {
      isValid = field.checkValidity();
    }

    if (!isValid) {
      field.classList.add("invalid");
      if (errorEl) errorEl.style.display = "block";
      return false;
    } else {
      field.classList.remove("invalid");
      if (errorEl) errorEl.style.display = "none";
      return true;
    }
  }

  function validateAllFields() {
    let allValid = true;
    fields.forEach(field => {
      if (!validateField(field)) {
        allValid = false;
      }
    });
    return allValid;
  }

  fields.forEach(field => {
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const isValid = validateAllFields();
    if (!isValid) return;

    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      form.reset();

      // Clear validation styles after submit
      fields.forEach(field => {
        field.classList.remove("invalid");
        const errorEl = document.getElementById(field.id + "-error");
        if (errorEl) errorEl.style.display = "none";
      });

      showToast(submittedMessage);
    } catch (error) {
      console.error("Form submission error:", error);
      showToast("Oops! Something went wrong.");
    }
  });
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
    text-align: center;
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