function showMessage(text, type = "success") {
  const msg = document.getElementById("msg");
  msg.className = `msg ${type}`;
  msg.innerText = text;
}

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
    console.log(data);

    if (!res.ok) {
      showMessage(data.message, "error");
            return;
    }

    document.getElementById("aiAnswer").value = data.aiAnswer;
     showMessage("Question posted successfully", "success");
  })
  .catch(() => {
    showMessage("Server error", "error"); // ✅ HERE
  });
}
