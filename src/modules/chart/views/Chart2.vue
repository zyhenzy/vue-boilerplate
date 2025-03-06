<template>
  <div class="chart">
    <a-row>
      <a-col :span="8">
        <bar-echart title='基础柱状图' :x-data='monthRange' :y-data='data' class='bar-chart' />
      </a-col>
      <a-col :span="8">
        <pie-echart title='基础饼状图' :data='dataB' class='pie-chart' />
      </a-col>
      <a-col :span="8">
        <line-echart title='基础折线图' :x-data='monthRange' :y-data='lineData' class='line-echart' />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang='ts'>
import BarEchart from "@/modules/chart/components2/BarEchart.vue";
import PieEchart from "@/modules/chart/components2/PieEchart.vue";
import LineEchart from "@/modules/chart/components2/LineEchart.vue";

const monthRange = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // 月份范围
const data = [120, 200, 150, 80, 70, 110, 130] // 数据
const dataB = [
  { value: 1048, name: 'Search Engine' },
  { value: 735, name: 'Direct' },
  { value: 580, name: 'Email' },
  { value: 484, name: 'Union Ads' },
  { value: 300, name: 'Video Ads' }
]
const lineData = [150, 230, 224, 218, 135, 147, 260] // 数据

</script>

<style lang="scss">
.chart {
  width: 100vw;
  height: 100vh;
  background-color: #e1dcdc;
  .bar-chart {
    width: 100%;
    height: 300px;
  }
}
</style>
