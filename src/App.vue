<template>
  <div class="app">
    <h1>Weather</h1>
    <p>Enter your city and press Enter to check the weather.</p>
  <WeatherCard/>
  <WeatherEcharts/>
  <!-- <MyCounter /> -->
</div>
</template>

<script>
// import MyCounter from './components/MyCounter.vue';
import WeatherCard from './components/WeatherCard.vue'
import WeatherEcharts from './components/WeatherEcharts.vue'



export default {
  name: 'App',
  components: {
    WeatherCard,
    WeatherEcharts,
    // MyCounter
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  margin-bottom: 60px;
}
</style>
