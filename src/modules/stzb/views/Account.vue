<template>
  <div class="account">
    <div>
      <a-button type='primary' @click='handleInsert'>新增账号</a-button>
    </div>
    <a-table :columns='ACCOUNT_COLUMNS' :data-source='tableData' :scroll='{ x: 1200 }' size='small' bordered>
      <template #bodyCell='{ column, record }'>
        <template v-if="column.key === 'price'">
          <span>
            {{record.price/100}}
          </span>
        </template>
        <template v-if="column.key === 'intermediaryPrice'">
          <span>
            {{record.intermediaryPrice/100}}
          </span>
        </template>
        <template v-if="column.key === 'heroPrice'">
          <span>
            {{record.heroPrice/100}}
          </span>
        </template>
        <template v-if="column.key === 'weaponPrice'">
          <span>
            {{record.weaponPrice/100}}
          </span>
        </template>
        <template v-if="column.key === 'status'">
          <span>
            {{ getStatusText(record.status) }}
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a-button size='small' @click='handleGo(record)'>跳转</a-button>
            <a-button size='small' @click='handleUpdatePrice(record)'>改价</a-button>
<!--            <a-button @click='handleToDetail(record)' size='small'>查看</a-button>-->
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {requestSearchDetail, requestUpdatePrice} from '../api'
import type {Account} from "@/modules/stzb/api/data";
import { useRoute } from 'vue-router'
import {ACCOUNT_COLUMNS} from "@/modules/stzb/condition.config";
import {message} from "ant-design-vue";

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
// const handleToDetail = (account: Account) => {
//   console.log(account)
// }

// 跳转到链接
const handleGo = (account: Account) => {
  window.open(`https://stzb.cbg.163.com/cgi/mweb/equip/1/${account.id}`)
}

/**
 * 改价
 * @param account
 */
const handleUpdatePrice = async (account: Account) => {
  const priceStr = window.prompt('请输入中介价格')
  if(priceStr){
    await requestUpdatePrice({id:account.id,price:Number(priceStr)})
    await fetchAccountList()
    message.success('改价成功')
  }
}

const handleInsert = () =>{
  const priceStr = window.prompt('请输入账号')
  if(priceStr){
    // todo：
  }
}

const getStatusText = (status: number): string => {
  switch (status) {
    case 2:
      return '在售';
    case 6:
      return '已售出';
    default:
      return '未知状态';
  }
};
</script>

<style lang="scss">
.account {

}
</style>
