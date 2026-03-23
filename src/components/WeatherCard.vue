<template>
    <div class="weather_container">
        <div class="weather-wrap">
            <div class="search-box">
                <!-- InputComponent -->
                <InputComponent :cities="cities" :inputValue="inputEntered" @inputChange="handleInputEvent" @search="handleInputEvent" />
                <h2 v-if="inputEntered">{{ inputEntered }}</h2>
                <!-- Current Weather -->
                <div class="current_weather" v-if="weatherData">
                    <div class="current_date">
                        <p>{{ currentDate }}</p>
                    </div>
                    <!-- openweather icon -->
                    <div class="openweather_icon">
                        <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" :alt="weatherData.weather[0].description" />
                        <p>{{ weatherData.weather[0].description }}</p>
                    </div>
                    <div class="weather_details flex_row">
                        <div>
                            <p>Temperature:</p>
                            <span>{{ kelvinToRoundedCelcius(weatherData.main.temp) }}°C</span>
                        </div>
                        <div>
                            <p>Feels like:</p>
                            <span>{{ kelvinToRoundedCelcius(weatherData.main.feels_like) }}°C</span>
                        </div>
                        <div>
                            <p>Humidity:</p>
                            <span>{{ weatherData.main.humidity }}%</span>
                        </div>
                        <div>
                            <p>Pressure:</p>
                            <span>{{ weatherData.main.pressure }} hPa</span>
                        </div>
                        <div>
                            <p>Wind:</p>
                            <span>{{ weatherData.wind.speed }} m/s</span>
                        </div>
                    </div>
                </div>

                <EchartComponent v-if="chartData.labels.length && chartData.temps.length" :options="chartOptions" />
                <WeatherTable v-if="weatherTableData.length" :tabulatorData="weatherTableData" :columns="tableColumns" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from "vue";
import { getCurrentWeather, fetchCityList, getForecastWeather } from "../api/client.js";

const EchartComponent = defineAsyncComponent(() => import("./EchartComponent.vue"));
const InputComponent = defineAsyncComponent(() => import("./InputComponent.vue"));
const WeatherTable = defineAsyncComponent(() => import("./TableComponent.vue"));

/** @type {import('vue').Ref<string>} */
const inputEntered = ref("");
/**@type {import('vue').Ref<object>} */
const weatherData = ref(null);
/**@type {import('vue').Ref<string>} */
const currentDate = ref(new Date().toLocaleString());
/**@type {import('vue').Ref<string[]>} */
const cities = ref([]);
/** @type {import('vue').Ref<object>} */
const chartData = ref({
    labels: [],
    temps: [],
});
/** @type {import('vue').Ref<object[]>} */
const weatherTableData = ref([]);
/** @type {import('vue').Ref<object[]>} */
const tableColumns = ref([
    { title: "Temp °C", field: "temp" },
    { title: "Humidity %", field: "humidity" },
    { title: "Wind m/s", field: "wind" },
]);

/**
 * @param {string} cityName
 * Function to fetch the coordinates of a city using the OpenWeatherMap Geocoding API. It takes the city name as an argument and returns
 * an object containing the latitude and longitude of the city. If the city is not found or if there is an error during the API call, it returns null.
 */
const chartOptions = computed(() => ({
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: chartData.value.labels,
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            data: chartData.value.temps,
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
    if (!selectedCity) return;

    const cityName = typeof selectedCity === "string" ? selectedCity : selectedCity.name;

    try {
        const cityList = await fetchCityList(cityName);

        if (!cityList.length) {
            console.error("City not found");
            weatherData.value = null;
            inputEntered.value = "";
            return;
        }

        const city = cityList[0];
        inputEntered.value = `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`;
        const data = await getCurrentWeather(city.lat, city.lon);
        weatherData.value = data;

        //chart data weaather
        const forecast = await getForecastWeather(city.lat, city.lon);
        chartData.value.labels = forecast.list.map((item) => item.dt_txt.slice(11, 16));
        chartData.value.temps = forecast.list.map((item) => Math.round(item.main.temp));

        //table data weather
        weatherTableData.value = forecast.list.map((i) => ({
            day: i.dt_txt,
            temp: Math.round(i.main.temp),
            humidity: i.main.humidity,
            wind: i.wind.speed,
        }));
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        weatherData.value = null;
        inputEntered.value = "";
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
