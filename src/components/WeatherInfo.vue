<template>
    <div class="weather-info" v-if="weatherData && weatherData.main">
        <div class="location-box">
            <div class="location">{{ weatherData.name }},{{ weatherData.sys.country }}</div>
            <div class="date">{{ todayDate() }}</div>
        </div>
        <div class="weather-box">
            <p class="temp">{{ Math.round(weatherData.main.temp) }}°C</p>
            <p class="weather">{{ weatherData.weather[0].main }}</p>
            <p class=""></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "WeatherInfo",
    props: {
        weatherData: Object,
        wheater_icon: String,
    },
    methods: {
        todayDate() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const currentDate = new Date();
        const day = days[currentDate.getDay()];
        const month = months[currentDate.getMonth()];
        const date = currentDate.getDate();
        const year = currentDate.getFullYear();

        return `${day}, ${month}, ${date}, ${year}`;
    }
    },
};
</script>

<style scoped> 
    .weather-info {
        margin-top: 30px;
        margin-bottom: 30px;
    }
   


</style>