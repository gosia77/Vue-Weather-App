<template>
  <div class="app">
    <h1>Weather</h1>
    <TabPanel/>
  <!-- <WeatherCard/> -->
  
  <!-- <MyCounter /> -->
</div>
</template>

<script>
// import MyCounter from './components/MyCounter.vue';
import { defineAsyncComponent } from 'vue';
// const WeatherCard = defineAsyncComponent(() => import('./components/WeatherCard.vue'))
const TabPanel = defineAsyncComponent(() => import('./components/TabPanel.vue'))



export default {
  name: 'App',
  components: {
    TabPanel,
    // WeatherCard,

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
