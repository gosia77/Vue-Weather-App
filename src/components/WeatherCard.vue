<template>
  <div class="weather-container">
    <div class="weather-wrap">
      <div class="search-box">
      <InputComponent @events="handleInputEvent"/>
      <!-- <CurrentWeather /> -->
        <EchartComponent :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>

import { defineAsyncComponent, computed, ref } from 'vue';
import { mockData } from '@/api/mockData';

const weatherData = ref(mockData)

console.log(weatherData.value)

const EchartComponent = defineAsyncComponent(() => import('./EchartComponent.vue'));
const InputComponent = defineAsyncComponent(() => import('./InputComponent.vue'));
// const CurrentWeather = defineAsyncComponent(() => import('./CurrentWeather.vue'));

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

const handleInputEvent = (payload) => {
  console.log('input event:', payload.name, payload.value)
}

</script>

<style scoped>
.weather-container {
  padding: 20px;
}
</style>