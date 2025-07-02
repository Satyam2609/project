const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("No user found. Please login.");
  window.location.href = "login.html";
} else {
  document.getElementById("username").textContent = user.username;
  document.getElementById("email").textContent = user.email;
  document.getElementById("number").textContent = user.number;
  document.getElementById("avatar").src = user.avatar?.url || "https://defaultavatar.com/avatar.png";
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
