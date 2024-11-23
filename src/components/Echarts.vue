<template>
    <div id="chart" ref="chartContainer" style="width: 600px; height: 400px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'ECharts',
    props: {
      options: Object,
    },
    data() {
      return {
        myChart: null, 
      };
    },
    mounted() {
      const chartDom = this.$refs.chartContainer;
      this.myChart = echarts.init(chartDom); 
      if (this.options) {
        this.myChart.setOption(this.options); 
      }
    },
    watch: {
      options: {
        deep: true,
        handler(newOptions) {
          if (this.myChart) {
            this.myChart.setOption(newOptions); 
          }
        },
      },
    },
    beforeUnmount() {
      if (this.myChart) {
        this.myChart.dispose(); 
      }
    },
  };
  </script>

<style scoped>
  .echarts {
    margin-top: 30px;
    color: white;
  }


</style>
  