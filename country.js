async function fetchCountry() {
  const name = document.getElementById("countryInput").value;
  const url = `https://restcountries.com/v3.1/name/${name}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const country = data[0];

    document.getElementById("countryInfo").innerHTML = `
      <h2>${country.name.common}</h2>
      <img src="${country.flags.svg}" alt="Flag" width="100"/>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name}</p>
      <p><strong>Language:</strong> ${Object.values(country.languages).join(", ")}</p>
    `;
  } catch (err) {
    document.getElementById("countryInfo").innerText = "Country not found.";
  }
}
