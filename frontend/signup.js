document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const messageEl = document.getElementById("message");

  // Show loading message
  messageEl.style.color = "gray";
  messageEl.textContent = "Processing...";

  try {
    const response = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.style.color = "red";
      messageEl.textContent = data.message || "Registration failed!";
      return;
    }

    messageEl.style.color = "green";
    messageEl.textContent = "✅ User registered successfully!";
    form.reset();

  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = "🚨 Server error. Try again.";
    console.error("❌ Error:", error);
  }
});
