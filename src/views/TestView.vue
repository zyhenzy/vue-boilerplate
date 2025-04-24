<template>
  <div class="sound-to-text">
    <div class="sound-to-text__icons">
    </div>
    <div class="sound-to-text__button">
      <a-button @click="startRecord" v-show="!recording">录音</a-button>
      <a-button @click="stopRecord" v-show="recording">停止</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import IatRecSdk from './iat-rec-sdk'
import {generateAuthUrl} from './skynet-auth'

const emit = defineEmits(['start-record', 'stop-record', 'msg'])
const needAuth:string= '2' // 原props
const url:string= 'ws://healthai.iflyhealth.com:1028/aimed/v1/saber/iat/ws' // 原props
const apiKey = 'MIME1000'
const apiKeyKey = 'api_key'
const apiSecret = 'D9CE5309EADD4BEF91BC03C93578A541'

let sdk = null

const recording = ref(false)
const str = ref('')

const startRecord = () => {
  console.log(needAuth, 'need')
  let scUrl = url
  if (needAuth === '1') {
    scUrl = generateAuthUrl(apiKey, apiSecret, scUrl, null, null)
  } else if (needAuth === '2') {
    scUrl = generateAuthUrl(apiKey, apiSecret, scUrl, null, apiKeyKey)
  }
  recording.value = true
  sdk = new IatRecSdk({
    url: scUrl,
    apiSecret: apiSecret,
    apiKey: apiKey
  }, {
    newMessage: msg => {
      console.log('转换的文本为：')
      console.log(msg)
      newMessage(msg)
    }
  })
  console.log(sdk)
  console.log('new sdk success')
  sdk.start()
  emit('start-record')
}

const stopRecord = () => {
  const wav = sdk.getWav()
  if (sdk) {
    sdk.stop()
  }
  console.log('录音结果为：')
  console.log(wav)
  emit('stop-record', wav)
  recording.value = false
}

const newMessage = (msg) => {
  emit('msg', msg)
}

onUnmounted(() => {
  if (sdk) {
    try {
      sdk.stop()
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<style scoped lang="scss">
.sound-to-text {
  width: 100%;
  height: 100%;
}
</style>

<!--export default {-->
<!--  name: 'SoundToText',-->
<!--  props: {-->
<!--    needAuth: {-->
<!--      type: String-->
<!--    },-->
<!--    url: {-->
<!--      type: String-->
<!--    }-->
<!--  },-->
<!--  data: () => {-->
<!--    return {-->
<!--      recording: false,-->
<!--      apiKey: 'MIME1000',-->
<!--      apiKeyKey: 'api_key',-->
<!--      apiSecret: 'D9CE5309EADD4BEF91BC03C93578A541',-->
<!--      sdk: null,-->
<!--      str: ''-->
<!--    }-->
<!--  },-->
<!--  beforeDestroy () {-->
<!--    if (this.sdk) {-->
<!--      try {-->
<!--        this.sdk.stop()-->
<!--      } catch (e) {-->
<!--        console.error(e)-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    startRecord () {-->
<!--      console.log(this.needAuth, 'need')-->
<!--      let scUrl = this.url;-->
<!--      if (this.needAuth === '1') {-->
<!--        scUrl = generateAuthUrl(this.apiKey, this.apiSecret, scUrl, null, null);-->
<!--      } else if (this.needAuth === '2') {-->
<!--        scUrl = generateAuthUrl(this.apiKey, this.apiSecret, scUrl, null, 'api_key');-->
<!--      }-->
<!--      this.recording = true-->
<!--      this.sdk = new IatRecSdk({-->
<!--        url: scUrl,-->
<!--        apiSecret: this.apiSecret,-->
<!--        apiKey: this.apiKey-->
<!--      }, {-->
<!--        newMessage: msg => {-->
<!--          this.newMessage(msg)-->
<!--        }-->
<!--      });-->
<!--      this.sdk.start()-->
<!--      this.$emit('start-record')-->
<!--    },-->
<!--    stopRecord () {-->
<!--      console.log(this)-->
<!--      console.log(this.sdk)-->
<!--      const wav = this.sdk.getWav();-->
<!--      if (this.sdk) {-->
<!--        this.sdk.stop()-->
<!--      }-->
<!--      this.$nextTick(() => {-->
<!--        this.$emit('stop-record', wav)-->
<!--      })-->
<!--      this.recording = false-->
<!--    },-->
<!--    newMessage (msg) {-->
<!--      this.$emit('msg', msg)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.sound-to-text {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--</style>-->
