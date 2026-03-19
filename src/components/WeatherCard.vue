<template>
    <div class="weather_container">
        <div class="weather-wrap">
            <div class="search-box">
                <!-- current date and city -->
                <div class="current_date">
                    <h2>{{ inputEntered }}</h2>
                    <p>{{ currentDate }}</p>
                </div>

                <!-- InputComponent -->
<InputComponent
  :cities="cities"
  :inputValue="inputEntered"
  @inputChange="handleInputChange"
  @search="handleCitySearch"
/>
                <!-- Current Weather -->
                <div class="current_weather">
                    <h2 class="today_date">{{ inputEntered }}</h2>
                    <div class="openweather_icon">
                        <div class="flex_col">
                            <!-- weather icon -->
                        </div>
                    </div>
                    <div class="weather_details">
                        <div v-if="weatherData" class="flex_row">
                            <p>Humidity</p>
                            <span>{{ weatherData?.main?.humidity ?? "-" }}%</span>
                            <p>Pressure</p>
                            <span>{{ weatherData?.main?.pressure ?? "-" }} hPa</span>
                            <p>Temperature</p>
                            <span>{{ weatherData?.main?.temp ? kelvinToRoundedCelcius(weatherData.main.temp) : "-" }}°C</span>
                        </div>
                    </div>
                </div>

                <EchartComponent :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from "vue";
import { getCurrentWeather, fetchCityList } from "../api/client.js";

const EchartComponent = defineAsyncComponent(() => import("./EchartComponent.vue"));
const InputComponent = defineAsyncComponent(() => import("./InputComponent.vue"));

/** @type {string} */
const inputEntered = ref("");
/**@type {import('../api/client.js').WeatherData | null} */
const weatherData = ref(null);
/**@type  {string} */
const currentDate = ref(new Date().toLocaleString());
/**@type {string[]} */
const cities = ref([]);

/**
 * @param {string} cityName
 * Function to fetch the coordinates of a city using the OpenWeatherMap Geocoding API. It takes the city name as an argument and returns
 * an object containing the latitude and longitude of the city. If the city is not found or if there is an error during the API call, it returns null.
 */
const chartOptions = computed(() => ({
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
        },
    ],
}));

/**
 *
 * @param selectedCity
 * Function to handle the input event from the InputComponent. It updates the inputEntered variable and fetches the current weather data for the selected city.
 * Currently, it uses hardcoded latitude and longitude values for Krakow, but it can be modified to use the actual coordinates of the selected city in the future.
 */
const handleInputEvent = async (selectedCity) => {
    inputEntered.value = selectedCity.value;

    try {
        const cityList = await fetchCityList(selectedCity.value);

        if (!cityList.length) {
            console.log("City not found");
            return;
        }

        const { lat, lon } = cityList[0];

        const data = await getCurrentWeather(lat, lon);

        weatherData.value = data;
    } catch (error) {
        console.error("Error:", error);
    }
};

/**
 * function to convert kelvin to celcius and round it to the nearest integer
 */
const kelvinToRoundedCelcius = (kelvin) => Math.round(kelvin - 273.15);
</script>

<style scoped>
.current_date {
    font-size: 14px;
    padding: 2px;
}
.weather_container {
    padding: 20px;
}
.today_date {
    font-size: 14px;
    padding: 2px;
}
.openweather_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    padding: 5px;
}
.weather_details {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 12px;
    padding: 1rem;
    margin-top: 5px;
    margin-bottom: 16px;
}
.flex_col {
    flex-direction: column;
}
.flex_row {
    display: flex;
    align-items: center;
    gap: 8px;
}
.temp_degree {
    font-size: 2rem;
}
</style>
