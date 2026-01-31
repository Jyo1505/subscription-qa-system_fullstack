const API = "https://subscription-qa-system-fullstack.vercel.app/api";

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${API}/auth/login`, {
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

  // ✅ Email validation
  if (!email.endsWith("@gmail.com")) {
    error.innerText = "Only Gmail addresses are allowed";
    return;
  }

  // ✅ Password length
  if (password.length < 6) {
    error.innerText = "Password must be at least 6 characters";
    return;
  }

  // ✅ Match passwords
  if (password !== confirmPassword) {
    error.innerText = "Passwords do not match";
    return;
  }

  // ✅ Strong password check
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

  fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        error.innerText = data.message;
        return;
      }

      alert(data.message);
      window.location = "index.html";
    })
    .catch(() => {
      error.innerText = "Server not responding";
    });
}

// ✅ Password strength UI (UNCHANGED)
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
