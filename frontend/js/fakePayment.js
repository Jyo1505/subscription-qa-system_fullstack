const API = "https://subscription-qa-system-fullstack.vercel.app//api";
const plan = localStorage.getItem("selectedPlan");

document.getElementById("planText").innerText =
  "Selected Plan: " + plan;

function pay() {
  fetch(`${API}/payment/fake-pay`, {
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
      alert(data.message);
      return;
    }
    window.location = "ask.html";
  })
  .catch(() => alert("Server error"));
}
