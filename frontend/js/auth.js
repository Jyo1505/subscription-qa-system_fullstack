


const API = "http://192.168.0.102:1000/api";

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      alert(data.message);
      window.location = "pricing.html";
    })
    .catch(() => {
      alert("Server not responding");
    });
}


function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const error = document.getElementById("error");

  error.innerText = "";

  if (!email.endsWith("@gmail.com")) {
    error.innerText = "Only Gmail addresses are allowed";
    return;
  }

  if (password.length < 6) {
    error.innerText = "Password must be at least 6 characters";
    return;
  }

  if (password !== confirmPassword) {
    error.innerText = "Passwords do not match";
    return;
  }

  // Password strength check (final validation)
if (
  password.length < 8 ||
  !/[A-Z]/.test(password) ||
  !/[a-z]/.test(password) ||
  !/[0-9]/.test(password) ||
  !/[@#$!%*?&]/.test(password)
) {
  error.innerText =
    "Password must be strong (8 chars, uppercase, lowercase, number & symbol)";
  return;
}

  fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        // ❌ Error from backend
        error.innerText = data.message;
        return;
      }

      // ✅ Success
      alert(data.message);
      window.location = "index.html";
    })
    .catch(() => {
      error.innerText = "Server not responding";
    });
}

function checkPasswordStrength() {
  const password = document.getElementById("password").value;
  const bar = document.getElementById("strengthBar");
  const text = document.getElementById("strengthText");

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@#$!%*?&]/.test(password)) strength++;

  if (strength <= 2) {
    bar.style.width = "30%";
    bar.style.background = "red";
    text.innerText = "Weak password";
    text.style.color = "red";
  } else if (strength <= 4) {
    bar.style.width = "60%";
    bar.style.background = "orange";
    text.innerText = "Medium strength password";
    text.style.color = "orange";
  } else {
    bar.style.width = "100%";
    bar.style.background = "green";
    text.innerText = "Strong password";
    text.style.color = "green";
  }
}

function logout() {
  localStorage.removeItem("token");
  alert("Logged out successfully");
  window.location = "index.html";
}
