import type {Account} from "@/modules/stzb/api/data";

export const COLUMNS = [
  {
    name: '金额',
    dataIndex: 'price',
    key: 'price',
    width: 300
  },
  {
    title: '英雄',
    dataIndex: 'heroNames',
    key: 'heroNames',
    width: 360
  },
  {
    title: '进阶',
    key: 'advanceNum',
    dataIndex: 'advanceNum',
    width: 60
  },
  {
    title: '战法',
    dataIndex: 'skillId',
    key: 'skillId',
    width: 360
  },
  {
    title: '公示期',
    dataIndex: 'passFairShow',
    key: 'passFairShow',
    width: 60
  },
  {
    title: '是否试师',
    dataIndex: 'apprentice',
    key: 'apprentice',
    width: 40
  },
  {
    title: '赛季最高分',
    dataIndex: 'maxSeasonScore',
    key: 'maxSeasonScore',
    width: 60
  },
  {
    title: '核心最高分',
    dataIndex: 'maxCoreScore',
    key: 'maxCoreScore',
    width: 60
  },
  {
    title: '综合最高分',
    dataIndex: 'maxScore',
    key: 'maxScore',
    width: 60
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 120
  },
  {
    title: '操作',
    key: 'action',
    width: 210
  }
]

export const ACCOUNT_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '金额',
    dataIndex: 'price',
    key: 'price',
    width: 80,
    sorter: {
      compare: (a: Account, b: Account) => a.price - b.price
    }
  },
  {
    title: '中介报价',
    dataIndex: 'intermediaryPrice',
    key: 'intermediaryPrice',
    width: 80,
    sorter: {
      compare: (a: Account, b: Account) => a.intermediaryPrice - b.intermediaryPrice
    }
  },
  {
    title: '卡片金额',
    dataIndex: 'heroPrice',
    key: 'heroPrice',
    width: 80,
    sorter: {
      compare: (a: Account, b: Account) => a.heroPrice - b.heroPrice
    }
  },
  {
    title: '武器金额',
    dataIndex: 'weaponPrice',
    key: 'weaponPrice',
    width: 80,
    sorter: {
      compare: (a: Account, b: Account) => a.weaponPrice - b.weaponPrice
    }
  },
  {
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
    width: 80,
    sorter: {
      compare: (a: Account, b: Account) => a.tag.length - b.tag.length
    }
  },
  {
    title: '武将标签',
    dataIndex: 'heroTag',
    key: 'heroTag',
    width: 380,
    sorter: {
      compare: (a:Account, b:Account) => a.heroTag.length - b.heroTag.length
    }
  },
  {
    title: '战法标签',
    dataIndex: 'skillTag',
    key: 'skillTag',
    width: 180,
    sorter: {
      compare: (a:Account, b:Account) => a.skillTag.length - b.skillTag.length
    }
  },
  // {
  //   title: '四通',
  //   dataIndex: 'siTong',
  //   key: 'siTong',
  //   sorter: {
  //     compare: (a, b) => a.siTong - b.siTong
  //   }
  // },
  // {
  //   title: '公示期',
  //   dataIndex: 'passFairShow',
  //   key: 'passFairShow',
  //   width: 60,
  //   sorter: {
  //     compare: (a, b) => a.passFairShow - b.passFairShow
  //   }
  // },
  {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 60,
      sorter: {
          compare: (a:Account, b:Account) => a.status - b.status
      }
  },
  {
    title: 'S赛季',
    dataIndex: 'seasonScore',
    key: 'seasonScore',
    width: 60,
    sorter: {
      compare: (a: Account, b: Account) => a.seasonScore - b.seasonScore
    }
  },
  {
    title: 'S性价比',
    dataIndex: 'seasonScoreRate',
    key: 'seasonScoreRate',
    width: 60,
    sorter: {
      compare: (a: Account, b: Account) => a.seasonScoreRate - b.seasonScoreRate
    }
  },
  {
    title: '综合',
    dataIndex: 'score',
    key: 'score',
    width: 60,
    sorter: {
      compare: (a: Account, b: Account) => a.score - b.score
    }
  },
  {
    title: '性价比',
    dataIndex: 'scoreRate',
    key: 'scoreRate',
    width: 60,
    sorter: {
      compare: (a: Account, b: Account) => a.scoreRate - b.scoreRate
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 120
  },
  {
    title: '新号',
    dataIndex: 'isNew',
    key: 'isNew',
    width: 60,
    sorter: {
      compare: (a:Account, b:Account) => Number(a.isNew) - Number(b.isNew)
    }
  },
  {
    title: '试师',
    dataIndex: 'apprentice',
    key: 'apprentice',
    width: 60,
    sorter: {
      compare: (a:Account, b:Account) => Number(a.apprentice) - Number(b.apprentice)
    }
  },
  {
    title: '操作',
    key: 'action',
    width: 120
  }
]
