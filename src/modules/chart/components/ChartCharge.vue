<script setup lang="ts">
import ChartContent from './ChartContent.vue';
import * as echarts from "echarts"
import { watch } from 'vue';

//引入echarts -》准备一个容器-》获取这个容器的真实dom-》init方法初始化图表-》setOptions给入配置绘制具体图表
const props = defineProps(['data']);
watch(props, () => {
  if (props.data.length > 0) {
    const _dom = document.getElementById("chart-charge-container")
    const echartobj = echarts.init(_dom);
    const opts = {
      grid: {
        left: "20%",
        bottom: "25%"
      },
      tooltip: {

      },
      legend: {
        bottom: 35,
        textStyle: {
          color: "white"
        }
      },
      color: [
        '#87cefa',
        '#ff7f50',
        '#32cd32',
        '#da70d6'
      ],
      yAxis: {
        type: "category",
        axisLabel: {
          color: "white"
        },
        data: ['人均费用(元)', '住院人次(人)', '门诊人数(人)']
      },
      xAxis: {

        splitLine: {
          show: false
        },
        type: 'value'
      },
      series: [

      ]
    }
    props.data.forEach((item:any) => {
      // @ts-ignore
      opts.series.push({
        type: "bar",
        stack: "total",
        name: item.name,
        data: item.data
      })
    })
    echartobj.setOption(opts)
  }

})
</script>

<template>
    <div>
        <chart-content title="各医院平均费用">
            <div id="chart-charge-container" :style="{
                width: '22.7vw',
                height: '33.19vh'
            }">

            </div>
        </chart-content>
    </div>
</template>

<style scoped lang="scss"></style>
