const API = "https://subscription-qa-system-fullstack.vercel.app";

function ask() {
  const title = document.getElementById("title").value;

  fetch(`${API}/api/questions/ask`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  })
  .then(async res => {
    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    document.getElementById("aiAnswer").value = data.aiAnswer;
  })
  .catch(() => alert("Server error"));
}
