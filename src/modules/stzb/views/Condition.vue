<template>
  <div class="condition">
    <a-table :columns='COLUMNS' :data-source='tableData' :scroll='{ x: 1200 }' size='small'
             :pagination="false" bordered>
      <template #bodyCell='{ column, record }'>
        <template v-if="column.key === 'price'">
          <span>
            {{record.priceMin / 100}} - {{record.priceMax / 100}}
          </span>
        </template>
        <template v-else-if="column.key === 'cardHeroId'">
          <span>
            <a-tag v-for='heroId in record.cardHeroId' :key='heroId'>
              {{ heroId }}
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
            666
<!--            <a-button @click='handlePerform(record)' size='small'>执行</a-button>-->
<!--            <a-button @click='handleToDetail(record)' size='small'>查看</a-button>-->
<!--            <a-button @click='handleDelete(record)' size='small'>删除</a-button>-->
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {COLUMNS} from '../condition.config'
import {requestConditionList} from '../api'
import type {ICondition} from "@/modules/stzb/api/data";

const tableData = ref<ICondition[]>([])

onMounted(async () => {
  await fetchConditionList()
})


// 获取检索列表
const fetchConditionList = async () => {
  const res = await requestConditionList()
  tableData.value = res.data.data
}

</script>

<style lang="scss">
.condition {

}
</style>
