<template>
  <div class="app">
    <h1>Weather</h1>
  <WeatherCard/>
</div>
</template>

<script>
import WeatherCard from './components/WeatherCard.vue'


export default {
  name: 'App',
  components: {
    WeatherCard
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
