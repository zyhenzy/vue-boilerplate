<template>
  <div class="account">
    <a-space>
      <a-button type='primary' @click='handleInsert'>新增账号</a-button>
      <a-button type='primary' @click='aiInsert'>AI解读中介信息</a-button>
      <a-button type='primary' @click='jsonInsert'>JSON中介信息录入</a-button>
      <a-space>
        <a-input-number v-model:value="minPrice" placeholder="最低价格" style="width: 120px" />
        <a-input-number v-model:value="maxPrice" placeholder="最高价格" style="width: 120px" />
      </a-space>
      <a-input v-model:value='keyword' placeholder="ID筛选" style="width: 240px" />
      <a-select
        ref="select"
        v-model:value="currentStatus"
        mode="multiple"
        allow-clear
        style="width: 120px"
        placeholder="选择状态"
      >
        <a-select-option
          v-for="(text, key) in statusTextMap"
          :key="key"
          :value="Number(key)"
        >
          {{ text }}
        </a-select-option>
      </a-select>
      <a-switch v-model:checked="completeCore" checked-children="全" />
    </a-space>
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
        <template v-if="column.key === 'tag'">
          <span>
            <a-tag v-for='(tag,index) in record.tag' :key='index' color='blue'>
              {{ tag }}
            </a-tag>
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
        <template v-if="column.key === 'completeCore'">
          <span>
            <a-tag v-if="record.completeCore" color="#108ee9">全</a-tag>
          </span>
        </template>
        <template v-if="column.key === 'isNew'">
          <span>
            <a-tag v-if="record.isNew" color="#f50">新</a-tag>
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a-button size='small' @click='handleGo(record)'>跳转</a-button>
            <a-button size='small' @click='handleUpdatePrice(record)'>改价</a-button>
            <a-button size='small' @click='handleUpdateRemark(record)'>备注</a-button>
            <a-button size='small' @click='handleShow(record)'>详情</a-button>
            <a-button size='small' @click='handleRefresh(record)'>刷新</a-button>
            <a-button size='small' @click='handleDelete(record)'>删除</a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <account-modal ref='accountModalRef'/>
</template>

<script setup lang="ts">
import {onMounted, ref, computed,createVNode} from 'vue'
import {
  requestCreateAccount,
  requestSearchDetail,
  requestUpdatePrice,
  requestUpdateRemark,
  requestUpdateApprentice,
  requestDeleteAccount, requestAiSearch, requestInsertJson
} from '../api'
import type {Account} from "@/modules/stzb/api/data";
import { useRoute } from 'vue-router'
import {ACCOUNT_COLUMNS} from "@/modules/stzb/condition.config";
import {message, Modal} from "ant-design-vue";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import AccountModal from "@/modules/stzb/components/AccountModal.vue";
import {statusTextMap} from "@/modules/stzb/const";

const tableData = ref<Account[]>([])
const keyword = ref('')
const completeCore = ref(false)
const currentStatus = ref()
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
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
  let res=[]
  if(keyword.value){
    res = tableData.value.filter(item=>item.id.includes(keyword.value))
  }else{
    res = tableData.value
  }
  if(completeCore.value){
    res = res.filter(item=>item.completeCore)
  }
  if(currentStatus.value !== undefined && currentStatus.value !== null&&currentStatus.value.length>0){
    res = res.filter(item=>currentStatus.value.includes(item.status))
  }
  if (minPrice.value !== null) {
    res = res.filter(item => {
      const priceToFilter = item.intermediaryPrice ?? item.price
      return priceToFilter / 100 >= minPrice.value
    })
  }
  if (maxPrice.value !== null) {
    res = res.filter(item => {
      const priceToFilter = item.intermediaryPrice ?? item.price
      return priceToFilter / 100 <= maxPrice.value
    })
  }
  return res
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

// 刷新
const handleRefresh = async (account: Account) => {
  await requestCreateAccount({conditionId, game_ordersn:account.id})
  await fetchAccountList()
  message.success('刷新成功')
}

const handleDelete = async (account: Account)=>{
  const _delAccount = async ()=>{
    await requestDeleteAccount(account.id)
    await fetchAccountList()
    message.success('删除成功')
  }
  if(account.remark){
    Modal.confirm({
      title: '删除确认',
      icon: createVNode(ExclamationCircleOutlined),
      content: '该账号性价比很高，要确定删除吗',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk:async ()=> {
        await _delAccount()
      }
    });
  }else {
    await _delAccount()
  }
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

const aiInsert = async ()=>{
  const res = await requestAiSearch({
    id: conditionId,
    info:'7000议价出，14红徐晃蜀骑 13红核弹 11红撸铁 鬼吕网红 。SS5273\n' +
      '\n' +
      'https://stzb.cbg.163.com/cgi/mweb/equip/1/202505200102116-1-PVPNPIDL9NHDXO\n' +
      '\n' +
      '\n' +
      '\n' +
      '6500议价出，乘胜百战，满红马岱张绣严颜夏侯，有程昱，马良，2红张机吕蒙，11红蜀骑，11红百战夏侯，9红核弹弓，有蓝级马弓晓锐11。SS1108\n' +
      '\n' +
      'https://stzb.cbg.163.com/cgi/mweb/equip/1/202505192302116-1-NTC7OVFASZDJFU\n' +
      '\n' +
      '\n' +
      '\n' +
      '11000议价出，主城12袁绍刀9大张张12百战螃蟹，19稀世2粉。SS32613\n' +
      '\n' +
      'https://stzb.cbg.163.com/cgi/mweb/equip/1/202505181202116-1-RKEYNEARFO7ITO'
  })
  console.log(res)
}

const jsonInsert = async ()=>{
  const jsonStr = window.prompt('请输入JSON中介信息')
  if(jsonStr){
    try {
      const jsonData = JSON.parse(jsonStr)
      await requestInsertJson({id:conditionId, idAndPriceList: jsonData})
      await fetchAccountList()
      message.success('新增成功')
    } catch (error) {
      console.error(error)
      message.error('JSON格式错误，请检查后重试')
    }
  }
}

const getStatusText = (status: number): string => {
  return statusTextMap[status] || '未知状态';
};
</script>
