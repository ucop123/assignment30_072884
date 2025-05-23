let cryptoChartInstance = null; // Store the chart instance globally

async function loadCrypto() {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();

    const labels = data.map(coin => coin.name);
    const prices = data.map(coin => coin.current_price);

    // Destroy previous chart instance if it exists
    if (cryptoChartInstance) {
      cryptoChartInstance.destroy();
    }

    // Create new chart and save instance
    const ctx = document.getElementById("cryptoChart").getContext("2d");
    cryptoChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Price (USD)",
          data: prices,
          backgroundColor: ["#f59e0b", "#10b981", "#3b82f6"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } catch (err) {
    alert("Failed to load crypto data.");
    console.error("API error:", err);
  }
}
