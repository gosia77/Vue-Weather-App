<template>
  <div ref="chartRef" style="width:600px;height:400px;"></div>
</template>

<script setup>

import { ref, onMounted, watch, defineProps } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let myChart = null


const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  myChart = echarts.init(chartRef.value)

  myChart.setOption(
    props.options)
})


watch(() => props.options, (newOption) => {
  if (myChart) myChart.setOption(newOption)
})
</script>

<style scoped></style>