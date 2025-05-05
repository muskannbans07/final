console.log("js working");

document
  .querySelector(".login100-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="pass"]').value;

    if (email === "admin@example.com" && password === "password123") {
      window.location.href = "main.html"; // ✅ Redirect
    } else {
      alert("Invalid email or password");
    }
  });
