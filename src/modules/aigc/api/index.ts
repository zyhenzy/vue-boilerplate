/**
 * @Name:
 * @Description:
 * @Author: ying.zhang_zhang
 * @Date: 2023/4/10 16:48
 * @LastEditors: ying.zhang_zhang
 * @LastEditTime: 2023/4/10 16:48
 * @Url: src/api/stzb/index.ts
 */

import request from '@/utils/request/request'

export const requestChat = (text: string) => {
  const params = {
    model: 'qwen3:4b',
    prompt: text,
    stream: false,
  }
  // const params = {text}
  return request.post(`/aiApi/generate`, params)
}
