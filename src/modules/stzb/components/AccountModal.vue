<template>
  <a-modal
    v-model:visible='visible'
    title='详细信息'
    @ok='handleOk'
    @cancel='handleCancel'
    width='700'
  >
    <a-descriptions title="详细信息" bordered>
      <a-descriptions-item label="ID">{{accountDetail?.id}}</a-descriptions-item>
      <a-descriptions-item label="价格">{{(accountDetail?.price?accountDetail?.price/100:'')}}</a-descriptions-item>
      <a-descriptions-item label="卡片价格">{{(accountDetail?.heroPrice?accountDetail?.heroPrice/100:'')}}</a-descriptions-item>
      <a-descriptions-item label="综合">{{accountDetail?.score}}</a-descriptions-item>
      <a-descriptions-item label="武将分">{{accountDetail?.heroScore}}</a-descriptions-item>
      <a-descriptions-item label="S赛季分">{{accountDetail?.seasonScore}}</a-descriptions-item>
      <a-descriptions-item label="高红核心" :span="3">
        <div v-for='(tag,index) in accountDetail?.heroTag' :key='index'>
          <a-tag>
            {{tag}}
          </a-tag>
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="粉武" :span="3">
        <div v-for='(weapon,index) in showWeapon' :key='index'>
          <a-tag>
            {{weapon.name}}{{weapon.featureName}}({{weapon.price}})
          </a-tag>
        </div>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<script setup lang='ts'>
import {computed, ref} from 'vue'
import type { Account } from '../api/data'

const visible = ref<boolean>(false)
const accountDetail = ref<Account>()

const showWeapon = computed(()=>{
  return accountDetail.value?.weaponList.filter(weapon=>weapon.price>0)||[]
})

// 打开Modal
const open = async (account: Account) => {
  accountDetail.value = account
  visible.value = true
  console.log(accountDetail.value)
}

// 关闭Modal
const close = () => {
  visible.value = false
}

const handleOk = () => {
  visible.value = false
}

// 取消按钮或右上角叉
const handleCancel = () => {
  close()
}

defineExpose({
  open
})
</script>
