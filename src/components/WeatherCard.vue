<template>
  <div class="weather-container">
    <div class="weather-wrap">
      <div class="search-box">
        <!-- serch for the weather -->
        <SearchBox v-model="cityName" @search="fetchWeather" />
        <!-- search for the weather info and icon -->
        <WeatherInfo :weatherData="weatherData" :weather_icon="weather_icon" />
        <!-- Echarts -->
        <Echarts :options="chartOptions" />
    </div>
  </div>
  </div>
</template>



<script>
import axios from 'axios';
import SearchBox from './SearchBox.vue';
import WeatherInfo from './WeatherInfo.vue'
import Echarts from './Echarts.vue';

export default {
  name: 'WeatherCard',
  components: {
    SearchBox,
    WeatherInfo,
    Echarts,
  },
  data() {
    return {
      api_key: "517dc78d3ff883903d2e990d46a79c50",
      url_base: "https://api.openweathermap.org/data/2.5/",
      weather_icon: "http://openweathermap.org/img/wn/",
      // city entered by user
      cityName: "",
      // data from API
      weatherData: {},
      chartOptions: null,
    };
  },
  methods: {
    async fetchWeather() {
      if (this.cityName !== "") {
        try {
          const response = await axios.get(`${this.url_base}weather?q=${this.cityName}&units=metric&appid=${this.api_key}`);
          this.setResults(response.data);
          
          this.setChartOptions([
            { name: "Morning", value: response.data.main.temp_min },
            { name: "Day", value: response.data.main.temp },
            { name: "Evening", value: response.data.main.temp_max },
          ]);

        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    },
    setResults(returnedResponse) {
      this.weatherData = returnedResponse;
      console.log("WeatherDat: ", returnedResponse);
    },
    setChartOptions(data) {
      this.chartOptions = {
        title: {
          text: "Weather Temperatures",
          left: "center"
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.name), 
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: data.map((item) => item.value),
          },
        ],
      }
    }
  },
};
</script>
