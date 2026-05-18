const API = "http://localhost:3000";

async function loadStats() {
  const res = await fetch(`${API}/api/stats`);
  const data = await res.json();

  new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: ["Deliverable", "Risky", "Undeliverable"],
      datasets: [{
        data: [
          data.deliverable,
          data.risky,
          data.undeliverable
        ]
      }]
    }
  });
}

loadStats();