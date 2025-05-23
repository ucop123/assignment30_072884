async function loadCrypto() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana');
    const data = await res.json();

    const labels = data.map(coin => coin.name);
    const prices = data.map(coin => coin.current_price);

    new Chart(document.getElementById('cryptoChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Current Price (USD)',
          data: prices,
          borderColor: '#10b981',
          borderWidth: 2,
          fill: false
        }]
      }
    });
  } catch (err) {
    alert("Error fetching crypto prices.");
  }
}
