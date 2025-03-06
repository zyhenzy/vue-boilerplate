<script setup lang="ts">
import ChartContent from './ChartContent.vue';
import * as echarts from "echarts"
import { watch } from 'vue';

//引入echarts -》准备一个容器-》获取这个容器的真实dom-》init方法初始化图表-》setOptions给入配置绘制具体图表
const props = defineProps(['data']);
//data-[{name:'xxx',data:[1,2,3]}]
watch(props, () => {
  if (props.data.length > 0) {
    const _dom = document.getElementById("today-container")
    const echartobj = echarts.init(_dom);
    const opts:any = {
      grid: {
        bottom: '25%',
        left: '15%'
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
        axisLabel: {
          color: "white",
          formatter: (value:string) => {
            return value + 'k条'
          }
        },
      },
      xAxis: {
        axisLabel: {
          color: "white"
        },
        type: "category",
        data: [
          "8:00",
          "12:00",
          "16:00",
          "20:00"
        ]
      },
      series: [

      ]
    }
    props.data.forEach((item:any) => {
      opts.series.push({
        type: "line",
        smooth: true,
        name: item.name,
        data: item.data
      })
    })
    console.log(opts);
    echartobj.setOption(opts)
  }

})
</script>

<template>
    <div>
        <chart-content title="各医院今日采集量">
            <div id="today-container" :style="{
                width: '22.7vw',
                height: '33.19vh'
            }">

            </div>
        </chart-content>
    </div>
</template>

<style scoped lang="scss"></style>
