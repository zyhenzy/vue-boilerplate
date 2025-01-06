<template>
  <div class="condition">
    <div>
      <a-button type='primary' @click='openModal'>新增</a-button>
      <a-button type='primary' @click='handleSetCookie'>设置Cookie</a-button>
    </div>
    <a-table :columns='COLUMNS' :data-source='tableData' :scroll='{ x: 1200 }' size='small'
             :pagination="false" bordered>
      <template #bodyCell='{ column, record }'>
        <template v-if="column.key === 'price'">
          <span>
            {{record.priceMin / 100}} - {{record.priceMax / 100}}
          </span>
        </template>
        <template v-else-if="column.key === 'heroNames'">
          <span>
            <a-tag v-for='(hero,heroIndex) in record.heroNames' :key='heroIndex'>
              {{ hero }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'skillId'">
          <span>
            <a-tag v-for='sId in record.skillId' :key='sId'>
              {{ sId }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'passFairShow'">
          <span>
            <a-switch v-model:checked="record.passFairShow" checked-children="公" checkedValue='0' unCheckedValue='2'/>
          </span>
        </template>
        <template v-else-if="column.key === 'apprentice'">
          <span>
            <a-switch v-model:checked="record.apprentice" checked-children="试" :checkedValue='true'
                      :unCheckedValue='false'/>
          </span>
        </template>
        <template v-else-if="column.key === 'advanceNum'">
          <span>
            <a-tag v-if="record.advanceNum" color="blue">{{record.advanceNum}}</a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'maxSeasonScore'">
          <span>
            <a-input-number v-model:value='record.maxSeasonScore'/>
          </span>
        </template>
        <template v-else-if="column.key === 'maxCoreScore'">
          <span>
            <a-input-number v-model:value='record.maxCoreScore'/>
          </span>
        </template>
        <template v-else-if="column.key === 'maxScore'">
          <span>
            <a-input-number v-model:value='record.maxScore'/>
          </span>
        </template>
        <template v-else-if="column.key === 'remark'">
          <span>
            <a-input v-model:value='record.remark'/>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-button @click='handlePerform(record)' size='small'>执行</a-button>
            <a-button @click='handleRefresh(record)' size='small'>刷新</a-button>
            <a-button @click='handleToDetail(record)' size='small'>查看</a-button>
            <a-button @click='handleDelete(record)' size='small'>删除</a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <condition-modal ref="conditionRef" @save-condition="fetchConditionList"/>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import {COLUMNS} from '../condition.config'
import {requestConditionDelete, requestConditionList, requestPreform, requestRefresh, requestSetCookie} from '../api'
import type {ICondition} from "@/modules/stzb/api/data";
import {useHeroStore} from "@/modules/stzb/stores/hero";
import ConditionModal from "@/modules/stzb/components/ConditionModal.vue";
import {useRouter} from "vue-router";

const heroStore = useHeroStore()
const conditionRef = ref<InstanceType<typeof ConditionModal>>()
const tableData = ref<ICondition[]>([])
const router = useRouter()

onMounted(async () => {
  await heroStore.fetchHero()
  await fetchConditionList()
})

// 获取检索列表
const fetchConditionList = async () => {
  const res = await requestConditionList()
  tableData.value = res.data.data
}

const openModal = () =>{
  conditionRef.value?.open()
}

// 设置cookie
const handleSetCookie = async () => {
  const cookie = window.prompt('请输入cookie')
  if(cookie){
    await requestSetCookie(cookie as string)
  }
}

// 执行任务
const handlePerform = (search: ICondition) => {
  requestPreform(search)
}

// 刷新任务
const handleRefresh = (search: ICondition) => {
  requestRefresh(search.id)
}

// 查看详情
const handleToDetail = (condition: ICondition) => {
  router.push({
    name: 'Account',
    params: {
      id: condition.id
    }
  })
}

// 删除
const handleDelete = async (condition: ICondition) => {
  await requestConditionDelete(condition.id)
  await fetchConditionList()
}

</script>
