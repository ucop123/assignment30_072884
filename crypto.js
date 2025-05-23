let cryptoChartInstance = null;
let refreshInterval = null;
let isAutoRefreshing = false;

async function loadCrypto() {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const labels = data.map(coin => coin.name);
    const prices = data.map(coin => coin.current_price);

    if (cryptoChartInstance) {
      cryptoChartInstance.destroy();
    }

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

function toggleAutoRefresh() {
  const button = document.getElementById("refreshBtn");

  if (!isAutoRefreshing) {
    refreshInterval = setInterval(loadCrypto, 30000); // every 30 seconds
    button.textContent = "Stop Auto Refresh";
    isAutoRefreshing = true;
  } else {
    clearInterval(refreshInterval);
    button.textContent = "Start Auto Refresh";
    isAutoRefreshing = false;
  }
}
