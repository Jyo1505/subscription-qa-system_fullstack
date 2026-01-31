// const API = "https://subscription-qa-system-fullstack.onrender.com";
const plan = localStorage.getItem("selectedPlan");

document.getElementById("planText").innerText =
  "Selected Plan: " + plan;

/* 🔒 INPUT HELPERS */
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

  // clear previous message
  showMessage("", "");

  /* ❌ CLIENT VALIDATIONS */
  if (!/^[0-9]{16}$/.test(cardNumber)) {
    showMessage("Card number must be exactly 16 digits", "error");
    return;
  }

  if (!/^[A-Z ]+$/.test(cardName)) {
    showMessage("Name must contain only CAPITAL letters (A–Z)", "error");
    return;
  }

  if (!/^[0-9]{3}$/.test(cvv)) {
    showMessage("CVV must be exactly 3 digits", "error");
    return;
  }

  /* ✅ CALL BACKEND */
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
        // ⛔ Backend error (time restriction, upgrade rule, etc.)
        showMessage(data.message, "error");
        return;
      }

      // ✅ SUCCESS
      showMessage(
        "Payment successful 🎉 Invoice sent to your email",
        "success"
      );

      // optional redirect after 1.5 sec
      setTimeout(() => {
        window.location = "ask.html";
      }, 1500);
    })
    .catch(() => {
      showMessage("Server error. Please try again later.", "error");
    });
}
