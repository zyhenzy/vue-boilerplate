<template>
    <div>
        <chart-content title="各医院采集数据量">
            <div id="gather-chart-container" :style="{
                width: '22.7vw',
                height: '33.19vh'
            }">

            </div>
        </chart-content>
    </div>
</template>

<script setup lang="ts">
import ChartContent from './ChartContent.vue';
import * as echarts from "echarts"
import { watch } from 'vue';

//引入echarts -》准备一个容器-》获取这个容器的真实dom-》init方法初始化图表-》setOptions给入配置绘制具体图表
const props = defineProps(['data']);
watch(props, () => {
  if (props.data.length > 0) {
    const _dom = document.getElementById("gather-chart-container")
    //以dom的大小为图表大小
    const echartobj = echarts.init(_dom);
    const opts = {
      color: [
        '#87cefa',
        '#ff7f50',
        '#32cd32',
        '#da70d6'
      ],
      legend: {
        bottom: 25,
        textStyle: {
          color: "#fff"
        }
      },
      series: [
        {
          type: "pie",
          radius: ['40%', '70%'],
          bottom: 30,
          data: props.data,
          label: {
            show: false
          }
        }
      ]
    }
    echartobj.setOption(opts)
  }
})
</script>

<style scoped lang="scss"></style>
