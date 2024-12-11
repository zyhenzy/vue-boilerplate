/**
 * 条件
 */
export interface ICondition {
    id: string; // ID
    priceMin: number; // 最小金额
    priceMax: number; // 最大金额
    passFairShow: string; // 公示期 0：公示期 1：非公示期 2 所有
    cardHeroId: string[]
    heroNames: string[]
    skillId: string[]
    advanceNum: number // 进阶
    apprentice: boolean // 试师
    remark: string // 备注
}

/**
 * 新增条件
 */
export type IConditionCreate = Omit<ICondition, 'id'>

/**
 * 修改条件
 */
export interface IConditionUpdate extends Partial<ICondition> {
  /** ID */
  id: string;
}

// 账号
export interface Account{
    id:string // 主键
    [key: string]: any;
}
