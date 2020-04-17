
export default {
    area: [
        {
            name: "广东省",
            code: 440000,
            path: '/public/files/line/line_guangdong.json',
        },
        {
            name: "湖南省",
            code: 430000,
            path: '/public/files/line/line_hunan.json',
        },
        {
            name: "甘肃省",
            code: 620000,
            path: '/public/files/line/line_gansu.json',
        },
        {
            name: "陕西省",
            code: 620001,
            path: '/public/files/line/line_shanxi.json',
        }
    ],
    mapStyle: [
        
        {
            name: '深色',
            style: 'amap://styles/dark',
        },
        {
            name: '浅色',
            style: 'amap://styles/whitesmoke',
        },
        {
            name: '标准',
            style: 'amap://styles/normal',
        },
    ],
    layer: [
        {
            key: 'Satellite',
            name: '卫星图',
        },
        {
            key: 'Traffic',
            name: '实时交通',
        }
    ],
    lineTypes: [
        'highway' ,//字段，中英对照及速度（km/h）
        // 'bridleway', //马道  10
        // 'construction', //建设中 0
        // 'cycleway', //自行车道 15
        // 'footway', //步行 5
        // 'living_street', //街区 5
        'motorway', //高速公路  50
        // 'motorway_link', //高速公路连接处  50
        // 'path', //路 5
        // 'pedestrian', //人行道 5
        // 'platform', //月台 5
        'primary', //主干道 40
        // 'primary_link',  //主干道连接处 40
        // 'raceway', //赛道 30
        // 'residential',  //居住区道路 5
        // 'road', //所有不知名的道路 10
        'secondary',  //次干道 30
        // 'secondary_link',  //次干道连接处 30
        // 'service', //通往设施的道路 10
        // 'steps',  //阶梯 5
        // 'tertiary', //三级道路 10
        // 'tertiary_link', //三级道路连接处 10
        // 'track', //轨道 5
        // 'trunk', //支路 50
        // 'trunk_link', //支路链接处 50
        // 'unclassified', //未分类道路 20
        // 'railway', //字段，中英对照及速度（km/h）
        // 'subway', //地铁 50
        // 'rail', //火车  40
    ]
}

