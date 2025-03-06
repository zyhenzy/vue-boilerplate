// 收费数据
export const chargeData =[
  {
    hospitalName: "厦门第一医院",
    perCapita: 104,
  },
  {
    hospitalName: "厦门中山医院",
    perCapita: 98,
  },
  {
    hospitalName: "厦门中医院",
    perCapita: 46,
  },
  {
    hospitalName: "厦门第五医院",
    perCapita: 122,
  },
]

// 采集数据
export const gather = {
  allgather: 1349,
  monthegather: 221,
  hospital: [
    {
      hospitalName: "厦门第一医院",
      number: 512,
      today: [
        {
          time: '8:00',
          value: 4,
        },
        {
          time: '12:00',
          value: 12
        },
        {
          time: "16:00",
          value: 8
        },
        {
          time: "20:00",
          value: 4
        }
      ]
    },
    {
      hospitalName: "厦门中山医院",
      number: 317,
      today: [
        {
          time: '8:00',
          value: 6,
        },
        {
          time: '12:00',
          value: 10
        },
        {
          time: "16:00",
          value: 3
        },
        {
          time: "20:00",
          value: 6
        }
      ]
    },
    {
      hospitalName: "厦门中医院",
      number: 300,
      today: [
        {
          time: '8:00',
          value: 2,
        },
        {
          time: '12:00',
          value: 4
        },
        {
          time: "16:00",
          value: 7
        },
        {
          time: "20:00",
          value: 6
        }
      ]
    },
    {
      hospitalName: "厦门第五医院",
      number: 220,
      today: [
        {
          time: '8:00',
          value: 2,
        },
        {
          time: '12:00',
          value: 4
        },
        {
          time: "16:00",
          value: 6
        },
        {
          time: "20:00",
          value: 6
        }
      ]
    }
  ],
}

// 门诊数据
export const hospitalization = {
  allHospitalization: 2234,
  montHospitalization: 1023,
  hospital: [
    {
      hospitalName: "厦门第一医院",
      number: 542,
      today: [
        {
          time: '8:00',
          value: 10,
        },
        {
          time: '12:00',
          value: 24
        },
        {
          time: "16:00",
          value: 22
        },
        {
          time: "20:00",
          value: 14
        }
      ],
    },
    {
      hospitalName: "厦门中山医院",
      number: 812,
      today: [
        {
          time: '8:00',
          value: 8,
        },
        {
          time: '12:00',
          value: 12
        },
        {
          time: "16:00",
          value: 32
        },
        {
          time: "20:00",
          value: 7
        }
      ],
    },
    {
      hospitalName: "厦门中医院",
      number: 412,
      today: [
        {
          time: '8:00',
          value: 14,
        },
        {
          time: '12:00',
          value: 32
        },
        {
          time: "16:00",
          value: 18
        },
        {
          time: "20:00",
          value: 24
        }
      ],
    },
    {
      hospitalName: "厦门第五医院",
      number: 510,
      today: [
        {
          time: '8:00',
          value: 11,
        },
        {
          time: '12:00',
          value: 14
        },
        {
          time: "16:00",
          value: 33
        },
        {
          time: "20:00",
          value: 21
        }
      ],
    },
  ]
}

// 住院数据
export const outpatient = {
  allOutpatient: 748,
  monthOutpatient: 323,
  hospital: [
    {
      hospitalName: "厦门第一医院",
      number: 312,
      today: 21,
    },
    {
      hospitalName: "厦门中山医院",
      number: 212,
      today: 34,
    },
    {
      hospitalName: "厦门中医院",
      number: 134,
      today: 24,
    },
    {
      hospitalName: "厦门第五医院",
      number: 110,
      outpatient: 22,
    },
  ]
}

// 医院位置
export const hospitalPosition = [
  {
    hospitalName: "厦门第一医院",
    position: [
      118.084260, 24.455598
    ]
  },
  {
    hospitalName: "厦门中山医院",
    position: [
      118.093521, 24.437226
    ]
  },
  {
    hospitalName: "厦门中医院",

    position: [
      118.140896, 24.500654
    ]
  },
  {
    hospitalName: "厦门第五医院",

    position: [
      118.248300, 24.659610
    ]
  },
]
