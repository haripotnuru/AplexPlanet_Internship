document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const fileInput = document.getElementById("file");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message || fileInput.files.length === 0) {
    alert("Please fill out all fields and upload a file.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const file = fileInput.files[0];
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG, and PDF files are allowed.");
    return;
  }

  // Save form data to localStorage
  localStorage.setItem("contactName", name);
  localStorage.setItem("contactEmail", email);
  localStorage.setItem("contactMessage", message);
  localStorage.setItem("contactFileName", file.name);

  alert("Form submitted successfully!");

  this.reset();
});
