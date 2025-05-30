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
import type { Account, Hero, IAiSearch, ICondition, IConditionCreate, jsonSearch } from './data'
import {cloneDeep} from "lodash-es";

/**
 * 查询所有英雄
 */
export const requestHeroes = () => {
  return request.get<Hero[]>('/api/hero')
}

/**
 * 设置cookie
 * @param cookie
 */
export const requestSetCookie = (cookie: string) => {
  const params = {cookie}
  return request.post(`/api/condition/setCookie`, params)
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
 * 重新获取条件下的账号信息
 * @param id
 */
export const requestRefresh = (id: string) => {
  return request.post('/api/condition/refresh', {id})
}

/**
 * 根据条件获取账号列表
 * @param id
 */
export const requestSearchDetail = (id: string) => {
  return request.get<Account[]>(`/api/account/findByCondition/${id}`)
}

/**
 * AI解读中介信息，并检索
 * @param params
 */
export const requestAiSearch = (params:IAiSearch)=>{
  return request.post('/api/condition/intermediary', params)
}

/**
 * 以中介信息JSON格式插入账号
 * @param params
 */
export const requestInsertJson = (params:jsonSearch)=>{
  return request.post('/api/condition/insertJSON', params)
}

/**
 * 添加账号
 * @param params
 */
export const requestCreateAccount = (params: { conditionId: string, game_ordersn: string }) => {
  return request.post('/api/account', params)
}

/**
 * 修改价格
 * @param params
 */
export const requestUpdatePrice = (params: { id: string, price: number }) => {
  return request.post('/api/account/updatePrice', params)
}

/**
 * 修改试试状态
 * @param params
 */
export const requestUpdateApprentice = (params: { id: string, apprentice: boolean }) => {
  return request.post('/api/account/updateApprentice', params)
}

/**
 * 修改备注
 * @param params
 */
export const requestUpdateRemark = (params: { id: string, remark: string }) => {
  return request.post('/api/account/updateRemark', params)
}

/**
 * 删除账号
 * @param id
 */
export const requestDeleteAccount = (id: string) => {
  return request.delete(`/api/account/${id}`)
}
