
function ask() {
  fetch("http://192.168.0.102:1000/api/questions/ask", {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: title.value })
  })
  .then(async res => {
    const data = await res.json();

    if (!res.ok) {
      alert(data.message);  // 🚫 limit message will show here
      return;
    }

    console.log("SERVER RESPONSE:", data);
    document.getElementById("aiAnswer").value = data.aiAnswer;
  })
  .catch(err => {
    console.error(err);
    alert("Server error");
  });
}

