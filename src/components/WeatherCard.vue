<template>
<div class="weather-container">
  <div class="weather-wrap">
   <div class="search-box">
    <input type="text" placeholder="Search..." class="search-bar" 
     v-model="query" v-on:keypress="fetchWeather" />
   </div>
   <div class="weather-info" v-if="weather && weather.main">
    <div class="location-box">
     <div class="location">{{weather.name}},{{weather.sys.country }}</div>
     <div class="date">{{ todaysDate() }}</div>
    </div>
    <div class="weather-box">
     <p class="temp">{{ Math.round(weather.main.temp) }}°C</p>
     <p class="weather">{{ weather.weather[0].main }}</p>
     <p class=""></p>
     <div class="icon">
     </div>
    </div>
   </div>
 </div>
</div>
</template>



<script>
export default {
  name: 'WeatherCard',
  props: {
    weather: Object,
  }
}
</script>
