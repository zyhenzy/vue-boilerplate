<script setup lang="ts">
import ChartContent from './ChartContent.vue';
import { requestHospitalPosition } from '../api';
import { onMounted } from 'vue';
import config from "../config"
function createInfoWindow(AMap:any, mapObj:any, info:any) {
  console.log(info);
  const infoWindow = new AMap.InfoWindow({
    isCustom: true,
    content: `<div class="window-container">
               ${info.name}
            </div>`
  })
  //第一个参数在哪个地图打开，第二参数打开的位置,info.postion
  infoWindow.open(mapObj, info.position)
}
function creatPoint(AMap:any, mapObj:any, data:any) {
  const marker = new AMap.Marker({
    position: new AMap.LngLat(data.position[0], data.position[1]),
  })
  marker.on("click", (e:any) => {
    createInfoWindow(AMap, mapObj, {
      name: data.hospitalName,
      position: e.target.getPosition()
    })
  })
  mapObj.add(marker);
}
onMounted(() => {
  requestHospitalPosition().then((res) => {
    const _data = res
    //拿到数据进行绘制，AMapLoader，是引入高德地图后自动注入到window
    // @ts-ignore
    AMapLoader.load({
      key: config.amapkey, //申请好的Web端开发者 Key，调用 load 时必填
      version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    })
      .then((AMap:any) => {
        const map = new AMap.Map("map1", {
          zoom: 13,
          center: _data[0].position
        })
        _data.forEach((item) => {
          creatPoint(AMap, map, item)
        })
      })
  });
})
</script>

<template>
    <div>
        <chart-content title="厦门市地图">
          <div id="map1" :style="{
                width: '47.83vw',
                height: '72vh'
            }">

          </div>
        </chart-content>
    </div>
</template>

<style scoped lang="scss"></style>
