/**
 * @Name:
 * @Description:
 * @Author: ying.zhang_zhang
 * @Date: 2023/4/10 16:48
 * @LastEditors: ying.zhang_zhang
 * @LastEditTime: 2023/4/10 16:48
 * @Url: src/api/stzb/index.ts
 */

import request from "@/utils/request/request";
import requestNoRepeat from "@/utils/request/request-no-repeat";
import type {Account, Hero, ICondition, IConditionCreate} from "./data";
import {cloneDeep} from "lodash-es";

/**
 * 查询所有英雄
 */
export const requestHeroes = ()=>{
  return request.get<Hero[]>('/api/hero')
}

/**
 * 新增条件
 */
export const requestConditionCreate = (data: IConditionCreate) => {
  const params = cloneDeep(data)
  params.priceMin = params.priceMin * 100
  params.priceMax = params.priceMax * 100
  return request.post('/api/condition', params)
}

/**
 * 删除条件
 * @param id
 */
export const requestConditionDelete = (id: string) => {
  return request.delete(`/api/condition/${id}`)
}

/**
 * 获取条件列表
 */
export const requestConditionList = () => {
  return requestNoRepeat.get<ICondition[]>('/api/condition')
}

/**
 * 执行条件
 * @param params
 */
export const requestPreform = (params: ICondition) => {
  return request.post('/api/condition/perform', params)
}


/**
 * 查看详情
 * @param id
 */
export const requestSearchDetail = (id: string) => {
  return request.get<Account[]>(`/api/account/findByCondition/${id}`)
}
