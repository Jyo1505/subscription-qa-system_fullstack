const plan = localStorage.getItem("selectedPlan");

document.getElementById("planText").innerText =
  "Selected Plan: " + plan;
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
  const msg = document.getElementById("msg");

  msg.innerText = "";

  // ✅ Card number: exactly 12 digits
  if (!/^[0-9]{16}$/.test(cardNumber)) {
    msg.innerText = "Card number must be exactly 12 digits";
    return;
  }

  // ✅ Name: only capital letters and spaces
  if (!/^[A-Z ]+$/.test(cardName)) {
    msg.innerText = "Name must contain only CAPITAL letters (A–Z)";
    return;
  }

  // ✅ CVV: exactly 3 digits
  if (!/^[0-9]{3}$/.test(cvv)) {
    msg.innerText = "CVV must be exactly 3 digits";
    return;
  }

  // ✅ If all validations passed → call backend
  fetch("/api/payment/fake-pay", {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ plan })
  })
  .then(async res => {
    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message;
      return;
    }

    // success → redirect
    window.location = "ask.html";
  })
  .catch(() => {
    msg.innerText = "Server error. Try again.";
  });
}
