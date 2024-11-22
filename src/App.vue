<template>
  <div class="app">
    <h1>The Weather In Your City</h1>
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
}
</style>
