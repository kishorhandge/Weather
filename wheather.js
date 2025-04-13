const apikey = "f0c2ab834efac05d899073a09bda6431";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// Selecting important elements
const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loadingElement = document.querySelector(".loading"); // Loading spinner

// ✅ Load last searched city from localStorage when the page loads
window.onload = () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        searchBox.value = lastCity; // Prefill the input field with last searched city
        checkweather(lastCity); // Automatically fetch weather
    }
};

// ✅ Function to fetch and display weather data
async function checkweather(city) {
    const weatherElement = document.querySelector(".weather");
    const errorElement = document.querySelector(".error");

    // Show loading animation and hide other elements while fetching data
    loadingElement.style.display = "block";
    weatherElement.style.display = "none";
    errorElement.style.display = "none";

    try {
        // Fetch weather data from API
        const response = await fetch(`${apiurl}${city}&appid=${apikey}`);

        if (response.status == 404) {
            // If city is not found, show error message
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
        } else {
            var data = await response.json();

            // ✅ Update weather details in the UI
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";

            // ✅ Change background and icon based on weather condition
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
                document.body.className = "clouds";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
                document.body.className = "clear";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
                document.body.className = "rain";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
                document.body.className = "drizzle";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
                document.body.className = "mist";
            }

            // ✅ Weather Alerts & Notifications ⚠️
            if (data.weather[0].main === "Storm" || data.weather[0].main === "Extreme") {
                alert("⚠️ Extreme weather alert! Stay safe.");
            } else if (data.main.temp > 40) {
                alert("🔥 Heatwave alert! Stay hydrated.");
            }

            // ✅ Save Last Searched City 💾
            localStorage.setItem("lastCity", city); // Save city name to local storage

            // Show weather details and hide error message
            weatherElement.style.display = "block";
            errorElement.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    // Hide loading spinner after fetching data
    loadingElement.style.display = "none";
}

// ✅ Event listener for search button click
searchbtn.addEventListener("click", () => {
    checkweather(searchBox.value); // Fetch weather for entered city
});
