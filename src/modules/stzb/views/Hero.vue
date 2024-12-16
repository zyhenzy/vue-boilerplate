<template>
  <div class="hero">
    <h1>hero page</h1>
    <table class="table-1">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>John Doe</td>
        <td>30</td>
        <td>New York</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Smith</td>
        <td>25</td>
        <td>Los Angeles</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Sam Johnson</td>
        <td>40</td>
        <td>Chicago</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang='ts'>
import {onMounted} from "vue";
import {testData} from "@/modules/stzb/const";

onMounted(()=>{
  const obj = JSON.parse(testData.equip_desc)
  console.log(obj)
  debugger
})
</script>

<style lang="scss">
.hero {
  .table-1 {
    width: 100%;
    border-collapse: collapse;
    position: relative;
    //border-collapse: separate;
    //border-spacing: 0;
    //border: 1px solid red; /* Add border to the table */

    &::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid red; /* Outer border */
      pointer-events: none;
    }

    th, td {
      //border-top: 1px solid #ddd;
      //border-bottom: 1px solid #ddd;
      //border-left: none;
      //border-right: none;
      border: 1px solid black;
      padding: 8px;
    }
  }
}
</style>
