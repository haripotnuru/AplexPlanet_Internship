async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "7a33f8ed3409714afd9392c58fefce7d"; // Replace this with your actual API key
  const weatherResult = document.getElementById("weatherResult");

  if (city === "") {
    weatherResult.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    weatherResult.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>🌡️ Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>🌤️ Condition:</strong> ${data.weather[0].main}</p>
      <p><strong>📝 Description:</strong> ${data.weather[0].description}</p>
      <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>${error.message}</p>`;
  }
}
