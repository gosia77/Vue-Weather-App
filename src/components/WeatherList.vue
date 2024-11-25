<template>
    <div v-if="weatherData" class="list-weather">
        <h2>Weather Details</h2>
        <ul>
            <li>City: {{ weatherData.name }}, {{ weatherData.sys.country }} </li>
            <li>Temperature: {{ weatherData.main.temp }} °C</li>
            <li>Humidity: {{ weatherData.main.humidity }} %</li>
            <li>Wind Speed: {{ weatherData.wind.speed }} m/s</li>
            <li>Pressure: {{ weatherData.main.pressure }} hPa</li>
            <li>Weather: {{ weatherData.weather[0].description }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "WeatherList",
    props: {
        weatherData: Object,
    }
}
</script>

<style scoped>
.weather-list ul, li {
    list-style: none;
    text-decoration: none;
}

</style>