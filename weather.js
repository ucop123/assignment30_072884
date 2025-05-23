async function fetchWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'YOUR_OPENWEATHER_API_KEY';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById('weatherInfo').innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;

    new Chart(document.getElementById('weatherChart'), {
      type: 'bar',
      data: {
        labels: ['Temperature', 'Humidity'],
        datasets: [{
          label: 'Weather Stats',
          data: [data.main.temp, data.main.humidity],
          backgroundColor: ['#60a5fa', '#67e8f9'],
        }]
      }
    });
  } catch (err) {
    alert("Error fetching weather data.");
  }
}
