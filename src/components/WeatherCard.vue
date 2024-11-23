<template>
  <div class="weather-container">
    <div class="weather-wrap">
      <div class="search-box">
        <!-- serch for the weather -->
        <SearchBox v-model="cityName" @search="fetchWeather" />
        <!-- search for the weather info and icon -->
        <WeatherInfo :weatherData="weatherData" :weather_icon="weather_icon" />
        <Echarts :options="temperatureChartOptions" />
        <Echarts :options="humidityChartOptions" />
        <Echarts :options="windChartOptions" />
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
      temperatureChartOptions: null,
      humidityChartOptions: null,
      windChartOptions: null,
    };
  },
  methods: {
    async fetchWeather() {
      if (this.cityName !== "") {
        try {
          const response = await axios.get(`${this.url_base}weather?q=${this.cityName}&units=metric&appid=${this.api_key}`);
          this.setResults(response.data);
          this.weather_icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
         this.updateChartsData(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    },
    setResults(returnedResponse) {
      this.weatherData = returnedResponse;
      console.log("WeatherDat: ", returnedResponse);
    },
    updateChartsData(data) {
      const chartData= [
            { name: "In the morning", value: data.main.temp_min, humidity: data.main.humidity, wind: data.wind.speed },
            { name: "During the day", value: data.main.temp, humidity: data.main.humidity, wind: data.wind.speed },
            { name: "In the evening", value: data.main.temp_max, humidity: data.main.humidity, wind: data.wind.speed },
          ];
      this.setTemperatureChartOptions(chartData);
      this.setHumidityChartOptions(chartData);
      this.setWindChartOptions(chartData);
    },
    setTemperatureChartOptions(data) {
      this.temperatureChartOptions = {
        title: { text: "Temperature (°C)", left: "center" },
        responsive: true,
        xAxis: { type: "category", data: data.map((item) => item.name) },
        yAxis: { type: "value", name: "°C" },
        series: [
          {
            name: "Temperature",
            type: "line",
            data: data.map((item) => item.value),
            itemStyle: { color: "#1e90ff" },
          }
        ],
      };
    },
    setHumidityChartOptions(data) {
      this.humidityChartOptions = {
        title: { text: "Humidity (%)", left: "center" },
        responsive: true,
        xAxis: { type: "category", data: data.map((item) => item.name) },
        yAxis: { type: "value", name: "%" },
        series: [
          {
            name: "Humidity",
            type: "bar",
            data: data.map((item) => item.humidity),
            itemStyle: { color: "#1e90ff" },
          },
        ],
      };
    },
    setWindChartOptions(data) {
      this.windChartOptions = {
        title: { text: "Wind (m/s)", left: "center" },
        responsive: true,
        xAxis: { type: "category", data: data.map((item) => item.name) },
        yAxis: { type: "value", name: "m/s" },
        series: [
          {
            name: "Wind Speed",
            type: "line",
            data: data.map((item) => item.wind),
            itemStyle: { color: "#ff6347"  },
          },
        ],
      };
    },
  }
};
</script>

<style scoped>
  .weather-container {
    max-width: 640px;
    padding: 16px;
    box-sizing: border-box;
    color: white;
    
  }

  .weather-wrap {
    max-width: 600px;
    border-radius: 15px;
    width: 100%;
    text-align: center;
    background-color: #1F0343;
  }

 

  
</style>