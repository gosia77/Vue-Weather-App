<template>
  <div class="weather-container">
    <div class="weather-wrap">
      <div class="search-box">
        <SearchBox v-model="cityName" @search="fetchWeather" />
        <WeatherList v-if="weatherData && weatherData.main" :weatherData="weatherData"/>
        <Echarts :options="temperatureChartOptions" />
        <Echarts :options="humidityChartOptions" />
        <Echarts :options="windChartOptions" />
        </div>
    </div>
  </div>
</template>

<script>
import { fetchWeather } from '@/api/client';
import SearchBox from './SearchBox.vue';
import WeatherList from './WeatherList.vue';
import Echarts from './Echarts.vue';

export default {
  name: 'WeatherCard',
  components: {
    SearchBox,
    WeatherList,
    Echarts,
  },
  data() {
    return {
      weather_icon: "http://openweathermap.org/img/wn/",
      weatherData: null,
      cityName: "",
      temperatureChartOptions: {},
      humidityChartOptions: {},
      windChartOptions: {},
      errorMessage: null,
    };
  },
  methods: {
    async fetchWeather(cityName) {
      if (!cityName) {
        this.errorMessage = "Please enter a city name";
        return;
      }
      this.errorMessage = null;
        try {
          const data = await fetchWeather(cityName);
          if (data && data.weather) {
          this.setResults(data);
          this.weather_icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
         this.updateChartsData(data);
        } else {
         this.errorMessage = "No weather data found for this city.";
        }
        } catch (error) {
          this.errorMessage = error.message || "Falid to fetch weather data";
        }
    },
    setResults(returnedResponse) {
      this.weatherData = returnedResponse;
      console.log("WeatherData: ", returnedResponse);
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
        title: { text: "Temperature (°C)", left: "center", textStyle: {color: "#fff"} },
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
        title: { text: "Humidity (%)", left: "center", textStyle: {color: "#fff"} },
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
        title: { text: "Wind (m/s)", left: "center", textStyle: {color: "#fff"}  },
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
}
</script>

<style scoped>
  .weather-container {
    width: 100%;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
    color: white;
    
  }

  .weather-wrap {
    max-width: 600px;
    border-radius: 15px;
    width: 100%;
    text-align: center;
    background-color: #24487e;
  }

  @media screen and (min-width: 640px) {
    .weather-container {
     max-width: 640px;
     margin: 0 auto;
    }
  }

 

  
</style>