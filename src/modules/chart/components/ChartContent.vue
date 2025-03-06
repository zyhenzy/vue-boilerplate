<script setup lang="ts">
const { title } = defineProps(['title'])
</script>

<template>
    <div class="chart-content">
        <div class="title">
            {{ title }}
        </div>
        <div class="main">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.chart-content {
    box-shadow: -10px 0px 15px #034c6a inset,
        0px -10px 15px #034c6a inset,
        10px 0px 15px #034c6a inset,
        0px 10px 15px #034c6a inset;
    position: relative;

    .title {
        width: 14.15vw;
        height: 3.7vh;
        background-color: #034c6a;
        border-radius: 50px;
        text-align: center;
        color: white;
        position: absolute;
        left: 50%;
        margin-left: -7.075vw;
        top: -1.85vh;
        line-height: 3.7vh;
        z-index: 9999
    }
}
</style>
