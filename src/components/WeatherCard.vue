<template>
  <div class="weather_container">
    <div class="weather-wrap">
      <div class="search-box">

        <!-- current date and city -->
        <div class="current_date">
          <h2>{{ inputEntered }}</h2>
          <p>{{ currentDate }}</p>
        </div>

        <!-- InputComponent -->
        <InputComponent 
        :cities="cities"
          :inputValue="inputEntered"
          :placeholder="'Enter city...'"
          @events="handleInputEvent"  
        />

        <!-- Current Weather -->
        <div class="current_weather">
          <h2 class="today_date">{{ inputEntered }}</h2> 
          <div class="openweather_icon">
            <div class="flex_col">
              <!-- weather icon -->
            </div>
          </div>
          <div class="weather_details">
            <div v-if="weatherData" class="flex_row">
              <p>Humidity</p>
              <span>{{ weatherData?.main?.humidity ?? '-' }}%</span> 
              <p>Pressure</p>
              <span>{{ weatherData?.main?.pressure ?? '-' }} hPa</span> 
              <p>Temperature</p>
              <span>{{ weatherData?.main?.temp ? kelvinToRoundedCelcius(weatherData.main.temp) : '-' }}°C</span> 
            </div>
          </div>
        </div>

        <!-- Current Weather Componentys -->
        
        <EchartComponent :options="chartOptions" />

      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from 'vue';
import { getCurrentWeather } from '../api/client.js';

const inputEntered = ref('');


const weatherData = ref(null);


const currentDate = ref(new Date().toLocaleString());

const cities = ref([]);


const EchartComponent = defineAsyncComponent(() => import('./EchartComponent.vue'));
const InputComponent = defineAsyncComponent(() => import('./InputComponent.vue'));


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

 
  inputEntered.value = selectedCity.value;

  
  const lat = 50.0647;
  const lon = 19.9450;

  const data = await getCurrentWeather(lat, lon);
  if (data) {
    weatherData.value = data;
    console.log("Nowe dane pogody:", weatherData.value);
  }
};

/**
 * 
 */
const kelvinToRoundedCelcius = (kelvin) => Math.round(kelvin - 273.15)

</script>

<style scoped>
.current_date {
  font-size: 14px;
  padding: 2px;

}
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