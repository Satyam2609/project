document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const username = form.username?.value?.trim();
  const email = form.email?.value?.trim();
  const password = form.password?.value?.trim();
  const messageEl = document.getElementById("message");

  if (!password || (!username && !email)) {
    messageEl.style.color = "red";
    messageEl.textContent = "Email or Username and Password are required.";
    return;
  }

  const payload = {
    username: username || undefined,
    email: email || undefined,
    password
  };

  try {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      // ✅ Save token and user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.exsist));
      localStorage.setItem("token", data.token);

      messageEl.style.color = "green";
      messageEl.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        // ✅ Go to home page (index.html)
        window.location.href = "index.html";
      }, 1000);
    } else {
      messageEl.style.color = "red";
      messageEl.textContent = data.message || "Invalid login";
    }

  } catch (error) {
    console.error("Login error:", error);
    messageEl.style.color = "red";
    messageEl.textContent = "Server error. Please try again.";
  }
});
