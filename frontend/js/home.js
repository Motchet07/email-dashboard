const API = "http://localhost:3000";

//  Load history on page load
window.onload = () => {
  loadHistory();
};


async function checkEmail() {
  const email = document.getElementById("emailInput").value;

  if (!email) return;

  const res = await fetch(`${API}/api/verify-email?email=${email}`);
  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <h3>Result: ${data.result}</h3>
    <p>Disposable: ${data.disposable}</p>
    <p>Role Account: ${data.role}</p>
  `;


  await fetch(`${API}/api/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      result: data.result
    })
  });


  loadHistory();
}


async function loadHistory() {
  const res = await fetch(`${API}/api/history`);
  const data = await res.json();

  document.getElementById("history").innerHTML = data
    .slice(0, 10)
    .map(item => `
      <div style="padding:8px; border-bottom:1px solid #ddd;">
        <strong>${item.email}</strong> → ${item.result}
      </div>
    `)
    .join("");
}