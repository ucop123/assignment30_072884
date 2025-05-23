let cryptoChartInstance = null; // Store the chart instance globally

async function loadCrypto() {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const labels = data.map(coin => coin.name);
    const prices = data.map(coin => coin.current_price);

    // If a previous chart exists, destroy it to prevent duplicate rendering errors
    if (cryptoChartInstance) {
      cryptoChartInstance.destroy();
    }

    // Create new chart and store instance
    cryptoChartInstance = new Chart(document.getElementById("cryptoChart"), {
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
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  } catch (err) {
    alert("Failed to load crypto data.");
    console.error("API error:", err);
  }
}
