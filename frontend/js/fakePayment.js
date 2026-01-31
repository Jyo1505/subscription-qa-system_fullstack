const API = "https://subscription-qa-system-fullstack.vercel.app";
const plan = localStorage.getItem("selectedPlan");

document.getElementById("planText").innerText =
  "Selected Plan: " + plan;

// 🔒 INPUT HELPERS
function onlyNumbers(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

function onlyCaps(input) {
  input.value = input.value.replace(/[^A-Z ]/g, "");
}

function pay() {
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const cardName = document.getElementById("cardName").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // ✅ VALIDATIONS (CLIENT SIDE)
  if (!/^[0-9]{16}$/.test(cardNumber)) {
    alert("Card number must be exactly 16 digits");
    return;
  }

  if (!/^[A-Z ]+$/.test(cardName)) {
    alert("Name must contain only CAPITAL letters (A–Z)");
    return;
  }

  if (!/^[0-9]{3}$/.test(cvv)) {
    alert("CVV must be exactly 3 digits");
    return;
  }

  // ✅ CALL BACKEND
  fetch(`${API}/api/payment/fake-pay`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ plan })
  })
  .then(async res => {
    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Payment successful!");
    window.location = "ask.html";
  })
  .catch(() => alert("Server error"));
}
