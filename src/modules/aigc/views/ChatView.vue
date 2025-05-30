<template>
  <div>
    <h1>aigc chat</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { requestChat } from '@/modules/aigc/api'

onMounted(() => {
  sendMessage('你好')
})

const sendMessage = (message: string) => {
  requestChat(message)
}
</script>

<style lang="scss"></style>
