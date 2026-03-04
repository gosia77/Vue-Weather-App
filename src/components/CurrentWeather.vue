<template>
   <div>
   
   </div>
</template>
<script setup>

import { ref, defineProps } from 'vue'




/** */
const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
})

</script>

<style scoped>

.today-date {
  font-size: 14px;
  padding: 2px;
}
.openweather-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  padding: 5px;
}

.weather-details {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  padding: 1rem;
  margin-top: 5px;
  margin-bottom: 16px;
}
.weather-details img {
  max-width: 2rem;
  filter: invert(100%);
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.temp-degree {
  font-size: 2rem;
}

@media screen and (min-width: 768px) {
  .weather-details img {
    max-width: 2rem;
  }

  .weather-details {
    font-size: 1.5rem;
  }
}

</style>