# Air Quality Index (AQI) Search Engine

This is a full-stack Java/Spring Boot application that allows users to search for real-time Air Quality Index (AQI) data for any city. It was developed as part of the "Film Factor" coding challenge.

## 🚀 Features
- **Search Engine:** Fetch real-time AQI, Temperature, PM2.5, and PM10 levels.
- **Dynamic UI:** The background theme changes colors based on the air quality (Green for Good -> Purple for Hazardous).
- **Backend Caching:** Implemented `Caffeine` caching to store API responses for 10 minutes, reducing external API calls and improving performance.
- **REST API:** Clean Spring Boot architecture with separated Service and Controller layers.

## 🛠️ Tech Stack
- **Backend:** Java, Spring Boot (Web, Cache), Maven.
- **Frontend:** HTML5, CSS3 (Animations), JavaScript (Vanilla).
- **External API:** [World Air Quality Index (WAQI)](https://aqicn.org/api/).

## ⚙️ How to Run Locally

### 1. Prerequisites
- Java 17 or higher installed.
- Maven installed.

### 2. Setup
1. Clone this repository.
2. Open `backend/src/main/resources/application.properties`.
3. You will see a placeholder for the API Token. Replace it with my own free token from [aqicn.org](https://aqicn.org/data-platform/token/).
   ```properties
   aqi.api.token=a6682c1e1465ad5104128a7a474368e014b4a379