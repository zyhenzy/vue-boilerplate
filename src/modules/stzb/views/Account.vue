<template>
  <div class="account">
    <a-table :columns='ACCOUNT_COLUMNS' :data-source='tableData' :scroll='{ x: 1200 }' size='small'
             :pagination="false" bordered>
      <template #bodyCell='{ column, record }'>
        <template v-if="column.key === 'price'">
          <span>
            {{record.priceMin / 100}} - {{record.priceMax / 100}}
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-button @click='handleToDetail(record)' size='small'>查看</a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { requestSearchDetail} from '../api'
import type {Account} from "@/modules/stzb/api/data";
import { useRoute } from 'vue-router'
import {ACCOUNT_COLUMNS} from "@/modules/stzb/condition.config";

const tableData = ref<Account[]>([])

let conditionId =''

onMounted(async () => {
  const route = useRoute()
  if (route.params.id) {
    conditionId = route.params.id as string
    await fetchAccountList()
  }
})

// 获取检索列表
const fetchAccountList = async () => {
  const res = await requestSearchDetail(conditionId)
  tableData.value = res.data.data
}

// 查看详情
const handleToDetail = (account: Account) => {
  console.log(account)
}
</script>

<style lang="scss">
.account {

}
</style>
