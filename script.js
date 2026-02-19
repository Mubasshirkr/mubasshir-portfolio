const text = ["Data Engineer", "Problem Solver", "Software Engineer"];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function typeEffect() {
  if (index >= text.length) index = 0;
  currentText = text[index];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      index++;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 120);
}

typeEffect();

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s `;
      }
    });
    burger.classList.toggle("toggle");
  });
  //
};

navSlide();

// ===== CONTACT FORM FUNCTIONALITY =====

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
     await fetch("https://script.google.com/macros/s/AKfycbzh7X6rxi0PTa7DUqsKeTEcEWOEk93qaPfOW9wWSKMSUgQpONdZBirVuMAmQ4UpqMRp/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    formStatus.style.color = "#00ff99";
  formStatus.textContent = "✅ Message Sent Successfully!";
  contactForm.reset();

} catch (error) {
  formStatus.style.color = "red";
  formStatus.textContent = "❌ Error sending message.";
}

  sendBtn.disabled = false;
  sendBtn.textContent = "Send Message";
});
