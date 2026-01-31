const API = "https://subscription-qa-system-fullstack.vercel.app";

if (!localStorage.getItem("token")) {
  window.location = "index.html";
}

fetch(`${API}/api/auth/profile`, {
  headers: {
    "Authorization": localStorage.getItem("token")
  }
})
.then(res => res.json())
.then(data => {
  document.getElementById("email").innerText = data.email;
  document.getElementById("plan").innerText = data.plan;
  document.getElementById("limit").innerText = data.daily_limit;
  document.getElementById("expiry").innerText =
    data.expires_at ? new Date(data.expires_at).toDateString() : "Free Plan";
});
