import axios from 'axios';

const apiKey = process.env.VUE_APP_API_KEY;
const weatherUrl = process.env.VUE_APP_API_URL_DATA_BASE;

 export async function fetchWeather(cityName) {
    if (!cityName) {
        throw new Error("City name is required");
    }
        try {
            const response = await axios.get(`${weatherUrl}weather?q=${cityName}&units=metric&appid=${apiKey}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`No response from the server: ${error.response.status} ${error.response.statusText}`);
            } else if (error.request) {
                throw new Error("An unexpected error: " + error.message);
            }
        }
}
