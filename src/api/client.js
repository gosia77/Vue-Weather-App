import axios from "axios";

const apiKey = "67df65255ba2010d7626b016f882ccf2";
const geoWeatherUrl = "https://api.openweathermap.org/geo/1.0/direct";
// const fourDayWeather = import.meta.env.VITE_OPEN_WEATHER_FOUR_DAY_URL

/**TO DO */
export async function getCurrentWeather(lat, lon) {
    if (typeof lat !== "number" || typeof lon !== "number" || !apiKey) {
        throw new Error("Invalid coordinates or API key");
    }
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching current weather:", error);
        if (error.response) {
            throw new Error(`Error: ${error.response.status}`);
        } else if (error.request) {
            throw new Error("No response received from the server");
        }
    }
}

/**Fetch city list based on user input
 * @param {string} cityName - Name of the city for search
 * @returns {Promise<Array} - A list of cities
 * @throw {Error} If the API request fails.
 */

export async function fetchCityList(cityName) {
    if (!cityName) return [];
    try {
        const response = await axios.get(`${geoWeatherUrl}`, {
            params: {
                q: cityName,
                limit: 5,
                units: "metric",
                appid: apiKey,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error("Failed fetching the city");
        }
    }
}

export async function getForecastWeather(lat, lon) {
    if (typeof lat !== "number" || typeof lon !== "number" || !apiKey) {
        throw new Error("Invalid coordinates or API key");
    }

    try {
        const { data } = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
                lat,
                lon,
                appid: apiKey,
                units: "metric",
            },
        });

        return data; // data.list ma wszystkie godziny i temperatury
    } catch (error) {
        if (error.response) {
            throw new Error(`Error: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error("No response received from the server");
        } else {
            throw new Error(error.message);
        }
    }
}
