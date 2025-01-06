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
    skillId: string[] // 战法ID
    advanceNum: number // 进阶
    apprentice: boolean // 试师
    remark: string // 备注
}

export interface Hero{
  id: number;
  name: string;
  country: string; // '国家 1:汉 2：魏 3：蜀 4：吴 5：群'
  score: number;
}

/**
 * 新增条件
 */
export type IConditionCreate = Omit<ICondition, 'id'|'heroNames'>

/**
 * 修改条件
 */
export interface IConditionUpdate extends Partial<ICondition> {
  /** ID */
  id: string;
}

// 账号
export interface Account{
  id: string;
  price: number;
  heroPrice: number;
  intermediaryPrice: number;
  weaponPrice: number;
  heroList: AccountHero[];
  skillList: AccountSkill[];
  weaponList: AccountWeapon[];
  heroTag:string[];
  skillTag:string[];
  score: number;
  heroScore: number;
  seasonScore: number;
  scoreRate: number;
  seasonScoreRate: number;
  apprentice:boolean;
  status:number;
  remark:string;
}

export interface AccountHero extends Omit<Hero, 'score'> {
  advanceNum: number;
}

export interface AccountSkill{
  id: string;
  name: string;
}

export interface Weapon{
  id: string;
  name: string;
  featureId: string;
  price: number;
}

export interface AccountWeapon extends Weapon{
  featureName: string;
}

