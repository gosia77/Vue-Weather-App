<template>
    <div class="weather-info" v-if="weatherData && weatherData.main">
        <div class="location-box">
            <div class="location">{{ weatherData.name }}, {{ weatherData.sys.country }}</div>
            <div class="date">{{ todayDate() }}</div>
        </div>
        <div class="weather-box">
            <p class="temp">{{ Math.round(weatherData.main.temp) }}°C</p>
            <p class="weather">{{ weatherData.weather[0].main }}</p>
            <div class="weather-icon">
                <img :src="weather_icon" alt="Weather icon">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WeatherInfo",
    props: {
        weatherData: Object,
        weather_icon: String,
    },
    methods: {
        todayDate() {
        const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const currentDate = new Date();
        const day = days[currentDate.getDay()];
        const month = months[currentDate.getMonth()];
        const date = currentDate.getDate();
        const year = currentDate.getFullYear();

        return `${day}, ${date}.${month}.${year}`;
    }
    },
};
</script>

<style scoped> 
    .weather-info {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .location {
        font-size: 36px;
        margin-bottom: 10px;
    }

    .date {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .temp {
        font-size: 50px;
    }


   


</style>