/**
 * @Name:
 * @Description:
 * @Author: ying.zhang_zhang
 * @Date: 2023/4/10 16:48
 * @LastEditors: ying.zhang_zhang
 * @LastEditTime: 2023/4/10 16:48
 * @Url: src/api/stzb/index.ts
 */

import {chargeData, gather, hospitalization, hospitalPosition, outpatient} from "@/modules/chart/api/mock";

// 获取收费数据
export const requestChargeData = () => {
  return Promise.resolve(chargeData)
}

// 获取采集数据
export const requestGather = () => {
  return Promise.resolve(gather)
}

// 获取门诊数据
export const requestHospitalization = () => {
  return Promise.resolve(hospitalization)
}

// 获取住院数据
export const requestOutpatient = () => {
  return Promise.resolve(outpatient)
}

// 获取医院位置
export const requestHospitalPosition = () => {
  return Promise.resolve(hospitalPosition)
}
