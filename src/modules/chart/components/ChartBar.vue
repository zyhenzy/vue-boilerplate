<script setup lang="ts">

const props = defineProps(['data'])

const baseInfo = [
  {
    totalTitle: "总采集数据量",
    monthTitle: "当月采集量",
    totalIcon: "./info_1.png",
    monthIcon: "./info_2.png",
    color: "#ffff43"
  },
  {
    totalTitle: "总门诊数量",
    monthTitle: "当月门诊数量",
    totalIcon: "./info_3.png",
    monthIcon: "./info_4.png",
    color: "#25ebca"
  },
  {
    totalTitle: "总住院人数",
    monthTitle: "当月住院人数",
    totalIcon: "./info_5.png",
    monthIcon: "./info_6.png",
    color: "#ff4e4e"
  }
]
</script>

<template>
  <div class="chart-bar">
    <div class="show-data-box" v-for="(item, index) in baseInfo">
      <div class="part">
        <div class="img-content">
          <img :src="item.totalIcon" />
        </div>
        <div class="value-content">
          <div class="value-title">{{ item.totalTitle }}</div>
          <div class="value" :style="{
                        color: item.color
                    }">
            {{ props.data[index]?.total }}
          </div>
        </div>
      </div>
      <div class="part">
        <div class="img-content">
          <img :src="item.monthIcon" />
        </div>
        <div class="value-content">
          <div class="value-title">{{ item.monthTitle }}</div>
          <div class="value" :style="{
                        color: item.color
                    }">
            {{ props.data[index]?.month }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-bar{
  display: flex;
  width: 100%;
  justify-content: space-between;
  .show-data-box {
    width: 31.66vw;
    height: 11.48vh;
    background-color: #034c6a;
    display: flex;
    align-items: center;
    padding-left: 1.3vw;
    box-sizing: border-box;

    .part {
      width: 50%;
      display: flex;

      .img-content {
        width: 2.08vw;
        margin-right: 1.3vw;

        img {
          width: 100%
        }
      }

      .value-content {
        .value-title {
          font-size: 0.75vw;
          color: white;
        }

        .value {
          margin-top: 1.38vh;
          font-size: 1vw;
          font-weight: 800;
        }
      }
    }
  }
}
</style>
