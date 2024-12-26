<template>
  <div class="account">
    <div style="display: flex">
      <a-button type='primary' @click='handleInsert'>新增账号</a-button>
      <a-input v-model:value='keyword' />
    </div>
    <a-table :columns='ACCOUNT_COLUMNS' :data-source='showList' :scroll='{ x: 1800 }' size='small' bordered>
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
        <template v-if="column.key === 'heroTag'">
          <span>
            <a-tag v-for='(tag,index) in record.heroTag' :key='index' color='green'>
              {{ tag }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'skillTag'">
          <span>
            <a-tag v-for='(tag,index) in record.skillTag' :key='index' color='red'>
              {{ tag }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'status'">
          <span>
            {{ getStatusText(record.status) }}
          </span>
        </template>
        <template v-if="column.key === 'apprentice'">
          <span>
            <a-switch v-model:checked="record.apprentice" @change="handleApprenticeChange(record,$event)" />
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a-button size='small' @click='handleGo(record)'>跳转</a-button>
            <a-button size='small' @click='handleUpdatePrice(record)'>改价</a-button>
            <a-button size='small' @click='handleUpdateRemark(record)'>备注</a-button>
            <a-button size='small' @click='handleShow(record)'>详情</a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <account-modal ref='accountModalRef'/>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import {requestCreateAccount, requestSearchDetail, requestUpdatePrice, requestUpdateRemark,requestUpdateApprentice} from '../api'
import type {Account} from "@/modules/stzb/api/data";
import { useRoute } from 'vue-router'
import {ACCOUNT_COLUMNS} from "@/modules/stzb/condition.config";
import {message} from "ant-design-vue";
import AccountModal from "@/modules/stzb/components/AccountModal.vue";

const tableData = ref<Account[]>([])
const keyword = ref('')
const accountModalRef = ref()
let conditionId =''

onMounted(async () => {
  const route = useRoute()
  if (route.params.id) {
    conditionId = route.params.id as string
    await fetchAccountList()
  }
})

const showList = computed(()=>{
  if(keyword.value){
    return tableData.value.filter(item=>item.id.includes(keyword.value))
  }
  return tableData.value
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


// 查看详情
const handleShow = (account: Account) => {
  accountModalRef.value.open(account)
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

const handleApprenticeChange = async (account: Account,apprentice:boolean) => {
  await requestUpdateApprentice({id:account.id,apprentice})
  await fetchAccountList()
}
/**
 * 添加备注
 * @param account
 */
const handleUpdateRemark = async (account: Account) => {
  const remark = window.prompt('请输入备注')
  if(remark){
    await requestUpdateRemark({id:account.id,remark})
    await fetchAccountList()
    message.success('添加备注成功')
  }
}

const handleInsert = async () =>{
  const game_ordersn = window.prompt('请输入账号')
  if(game_ordersn){
    await requestCreateAccount({conditionId, game_ordersn})
    await fetchAccountList()
    message.success('新增成功')
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
