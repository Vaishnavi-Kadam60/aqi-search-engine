async function searchAQI() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('result');
    const errorP = document.getElementById('error');
    const loader = document.getElementById('loader');
    
    // Reset UI
    resultDiv.classList.add('hidden');
    errorP.classList.add('hidden');
    loader.classList.remove('hidden'); // Show loader
    document.body.style.background = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"; // Reset BG

    if (!city) {
        loader.classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/aqi?city=${city}`);
        const data = await response.json();

        loader.classList.add('hidden'); // Hide loader

        if (data.status === "ok") {
            const aqi = data.data.aqi;
            const station = data.data.city.name;
            const iaqi = data.data.iaqi;

            document.getElementById('cityName').innerText = station;
            document.getElementById('aqiValue').innerText = aqi;
            
            // Safe check for data existence
            document.getElementById('pm25').innerText = iaqi.pm25 ? iaqi.pm25.v : '-';
            document.getElementById('pm10').innerText = iaqi.pm10 ? iaqi.pm10.v : '-';
            document.getElementById('temp').innerText = iaqi.t ? iaqi.t.v + "°C" : '-';

            applyTheme(aqi); // Change colors
            resultDiv.classList.remove('hidden');
        } else {
            throw new Error("City not found");
        }
    } catch (err) {
        loader.classList.add('hidden');
        errorP.innerText = "City not found. Try a specific location (e.g. 'Ponda' instead of 'Goa').";
        errorP.classList.remove('hidden');
    }
}

function applyTheme(aqi) {
    const badge = document.getElementById('aqiBadge');
    const status = document.getElementById('statusText');
    let bgGradient = "";
    let badgeColor = "";
    let statusLabel = "";

    if (aqi <= 50) { 
        bgGradient = "linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)"; // Fresh Green
        badgeColor = "#009966";
        statusLabel = "Good"; 
    }
    else if (aqi <= 100) { 
        bgGradient = "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"; // Warm Yellow
        badgeColor = "#ffde33";
        statusLabel = "Moderate"; 
    }
    else if (aqi <= 150) { 
        bgGradient = "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)"; // Orange Haze
        badgeColor = "#ff9933";
        statusLabel = "Unhealthy for Sensitive"; 
    }
    else if (aqi <= 200) { 
        bgGradient = "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)"; // Red Haze
        badgeColor = "#cc0033";
        statusLabel = "Unhealthy"; 
    }
    else { 
        bgGradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; // Dark Purple
        badgeColor = "#660099";
        statusLabel = "Very Unhealthy"; 
    }

    // Apply Styles
    document.body.style.background = bgGradient;
    badge.style.background = badgeColor;
    status.innerText = statusLabel;
    
    // Text color adjustment for yellow badge
    if(aqi > 50 && aqi <= 100) {
        badge.style.color = "#333"; 
    } else {
        badge.style.color = "white";
    }
}