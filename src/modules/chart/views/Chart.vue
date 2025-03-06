<template>
  <div class="chart">
    <chart-header/>
    <div class="chart-body">
      <chart-bar :data="barData"/>
      <div class="chart-container">
        <div class="left-or-right">
          <chart-gather :data="gatherData"/>
          <chart-charge :data="chargeData"/>
        </div>
        <div class="middle">
          <chart-map/>
        </div>
        <div class="left-or-right">
          <chart-gather-today :data="gatherTodayData"/>
          <chart-hospitalization-today :data="hospitalizationTodayData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ChartHeader from "@/modules/chart/components/ChartHeader.vue";
import ChartBar from "@/modules/chart/components/ChartBar.vue";
import ChartGather from "@/modules/chart/components/ChartGather.vue";
import {
  requestChargeData,
  requestGather,
  requestHospitalization,
  requestHospitalPosition,
  requestOutpatient
} from "@/modules/chart/api";
import {ref,computed, onMounted} from "vue";
import ChartCharge from "@/modules/chart/components/ChartCharge.vue";
import ChartMap from "@/modules/chart/components/ChartMap.vue";
import ChartGatherToday from "@/modules/chart/components/ChartGatherToday.vue";
import ChartHospitalizationToday from "@/modules/chart/components/ChartHospitalizationToday.vue";

const data = ref()

onMounted(()=>{
  fetchData().then(res=>{
    data.value = res
    console.log('数据：')
    console.log(res);
  })
})

const barData = computed(()=>{
  return data.value? [
    {
      total: data.value.gather.allgather,
      month: data.value.gather.monthegather
    },
    {
      total: data.value.hospitalization.allHospitalization,
      month: data.value.hospitalization.montHospitalization
    },
    {
      total: data.value.outpatient.allOutpatient,
      month: data.value.outpatient.monthOutpatient
    },
  ]:[]
})

const gatherData = computed(()=>{
  return data.value? data.value.gather.hospital.map((item:any)=>{
    return {
      name: item.hospitalName,
      value: item.number
    }
  }):[]
})

const chargeData = computed(()=>{
  const res =  data.value? data.value.gather.hospital.map((item:any)=>{
    const _name = item.hospitalName;
    const _dataarr = []
    data.value.chargeData.forEach((chargeItem:any) => {
      if (chargeItem.hospitalName === _name) {
        _dataarr.push(chargeItem.perCapita)
      }
    })
    data.value.outpatient.hospital.forEach((outpatientiItem:any) => {
      if (outpatientiItem.hospitalName === _name) {
        _dataarr.push(outpatientiItem.number)
      }
    })
    _dataarr.push(item.number)
    return {
      name: _name,
      data: _dataarr
    }
  }):[]
  console.log('各医院平均费用')
  console.log(res)
  return res
})

const gatherTodayData = computed(()=>{
  return data.value? data.value.gather.hospital.map((item:any)=>{
    const _todayData = item.today.map((todayItem:any) => {
      return todayItem.value
    })
    return {
      name: item.hospitalName,
      data: _todayData
    }
  }):[]
})

const hospitalizationTodayData = computed(()=>{
  return data.value? data.value.hospitalization.hospital.map((item:any)=>{
    const _todayData = item.today.map((todayItem:any) => {
      return todayItem.value
    })
    return {
      name: item.hospitalName,
      data: _todayData
    }
  }):[]
})

const fetchData = async () => {
  const chargeData = await requestChargeData();
  const gather = await requestGather();
  const hospitalization = await requestHospitalization();
  const outpatient = await requestOutpatient();
  const hospitalPosition = await requestHospitalPosition();
  return {
    chargeData,
    gather,
    hospitalization,
    outpatient,
    hospitalPosition
  }
}
</script>

<style scoped lang="scss">
.chart {
  width: 100vw;
  height: 100vh;
  background-color: #081832;
  .chart-body{
    width: 100vw;
    box-sizing: border-box;
    padding: 1.85vh 1.04vw;
    .chart-container{
      padding-top: 5.09vh;
      display: flex;
      justify-content: space-between;

      .left-or-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }

}
</style>
