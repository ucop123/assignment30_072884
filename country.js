async function fetchCountry() {
  const name = document.getElementById("countryInput").value.trim();
  if (!name) return;

  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Country not found");

    const data = await res.json();
    const country = data[0];

    document.getElementById("countryInfo").innerHTML = `
      <h2>${country.name.common}</h2>
      <img src="${country.flags.svg}" alt="Flag" width="100"/>
      <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${Object.values(country.currencies)[0]?.name || 'N/A'}</p>
      <p><strong>Language:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
    `;
  } catch (err) {
    document.getElementById("countryInfo").innerText = "Country not found.";
    console.error("Error fetching country:", err);
  }
}

window.addEventListener("DOMContentLoaded", loadCountryList);

async function loadCountryList() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    const sorted = data.sort((a, b) => 
      a.name.common.localeCompare(b.name.common)
    );

    const listHtml = sorted.map((c) => `
      <button onclick="document.getElementById('countryInput').value='${escapeHtml(c.name.common)}'; fetchCountry();">
        ${escapeHtml(c.name.common)}
      </button>
    `).join("");

    document.getElementById("countryList").innerHTML = listHtml;
  } catch (err) {
    document.getElementById("countryList").innerText = "Failed to load country list.";
    console.error("Error loading country list:", err);
  }
}

// Utility to prevent HTML injection
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (match) {
    const map = {
      '&': "&amp;",
      '<': "&lt;",
      '>': "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return map[match];
  });
}
