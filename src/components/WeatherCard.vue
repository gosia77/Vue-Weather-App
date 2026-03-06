<template>
  <div class="weather_container">
    <div class="weather-wrap">
      <div class="search-box">
        <div class="city-name">
          <h2>{{ selectedCity.name }}</h2>
        </div>
        <InputComponent @events="handleInputEvent" />
        <div class="current_weather">
          <h2 class="today_date"></h2>
          <div class="openweather_icon">

            <div class="flex_col">

            </div>
          </div>
          <div class="weather_details">
            <div class="flex_row">

              <p>Humidity</p>
            </div>
            <div class="flex_row">


            </div>
          </div>
        </div>
        <CurrentWeather @events="handleInputEvent" />
        <EchartComponent :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>

import { defineAsyncComponent, computed, ref } from 'vue';
import { getCurrentWeather } from '../api/client.js';
// import { mockData } from '@/api/mockData.js';

const weatherData = ref(null);
// const cityList = ref([]);
const selectedCity = ref('');

console.log(weatherData.value)

const EchartComponent = defineAsyncComponent(() => import('./EchartComponent.vue'));
const InputComponent = defineAsyncComponent(() => import('./InputComponent.vue'));
const CurrentWeather = defineAsyncComponent(() => import('./CurrentWeather.vue'));

const chartOptions = computed(() => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
}));

const handleInputEvent = async (selectedCity) => {
  console.log('input event:', selectedCity.name, selectedCity.value);
  const lat = 50.0647;
  const lon = 19.9450;

  const data = await getCurrentWeather(lat, lon);
  if (data) {
    weatherData.value = data;
    console.log("Nowe dane pogody:", weatherData.value);
  }
}


</script>

<style scoped>
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

.weather_details img {
  max-width: 2rem;
  filter: invert(100%);
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