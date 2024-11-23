<template>
  <div class="app">
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
  max-width: 640px;
  padding: 16px;
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
