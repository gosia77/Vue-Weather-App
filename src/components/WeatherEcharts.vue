<template>
  <div ref="chartRef" style="width:600px;height:400px;"></div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref(null)

onMounted(()=>{
  const myChart = echarts.init(chartRef.value);
  const option = {
    title:{ text: 'Echarts Example'},
    textStyle:{
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
    },
    tooltip:{
      trigger:'item',
    }
  }
  myChart.setOption(option);
}
)
</script>

<style scoped></style>
