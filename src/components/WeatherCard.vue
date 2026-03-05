<template>
  <div class="weather-container">
    <div class="weather-wrap">
      <div class="search-box">
      <div class="city-name">
        <h2>{{ selectedCity.name }}</h2>
      </div>
      <InputComponent @events="handleInputEvent"/>
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
.weather-container {
  padding: 20px;
}
</style>