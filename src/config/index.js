const config = {
    areas: {
        defaultValues: { // 默认值
            label: "广东省", // 名称
            value: 440000, // 邮政编码
            path: '/public/files/line/line_guangdong.json', // 路网文件路径
        },
        options: [
            {
                label: "广东省",
                value: 440000,
                path: '/public/files/line/line_guangdong.json',
            },
            {
                label: "湖南省",
                value: 430000,
                path: '/public/files/line/line_hunan.json',
            },
            {
                label: "甘肃省",
                value: 620000,
                path: '/public/files/line/line_gansu.json',
            },
            {
                label: "陕西省",
                value: 610000,
                path: '/public/files/line/line_shanxi.json',
            }
        ]
    },
    styles: {
        defaultValue: 'amap://styles/normal', // 默认值 参考：https://lbs.amap.com/api/javascript-api/guide/map/map-style
        options: [
            {
                label: '标准',
                value: 'amap://styles/normal',
            },
            {
                label: '深色',
                value: 'amap://styles/dark',
            },
            {
                label: '浅色',
                value: 'amap://styles/whitesmoke',
            },
        ]
    },
    layers: {
        defaultValue: [], // 图层默认值 参考：https://lbs.amap.com/api/javascript-api/reference/layer
        options: [
            {
                label: '卫星图',
                value: 'Satellite',
            },
            {
                label: '实时交通',
                value: 'Traffic',
            }
        ]
    },
    types: {
        defaultValue: [
            'motorway',
            'motorway_link',
            // 'primary',
            // 'primary_link'
        ], // 默认选中值
        options: [ // 选项值
            {
                label: '高速公路',
                value: 'motorway',
            },
            {
                label: '高速公路连接处',
                value: 'motorway_link',
            },
            {
                label: '主干道',
                value: 'primary',
            },
            {
                label: '主干道连接处',
                value: 'primary_link',
            },
            {
                label: '次干道',
                value: 'secondary',
            },
            {
                label: '次干道连接处',
                value: 'secondary_link',
            },
            {
                label: '三级道路',
                value: 'tertiary',
            },
            {
                label: '三级道路连接处',
                value: 'tertiary_link',
            },
            {
                label: '支路',
                value: 'trunk',
            },
            {
                label: '支路链接处',
                value: 'trunk_link',
            },
            // {
            //     label: '高速公路',
            //     value: 'highway',
            // },
            // {
            //     label: '马道',
            //     value: 'bridleway',
            // },
            // {
            //     label: '建设中',
            //     value: 'construction',
            // },
            // {
            //     label: '自行车道',
            //     value: 'cycleway',
            // },
            // {
            //     label: '步行',
            //     value: 'footway',
            // },
            {
                label: '街区',
                value: 'living_street',
            },
            // {
            //     label: '路',
            //     value: 'path',
            // },
            // {
            //     label: '人行道',
            //     value: 'pedestrian',
            // },
            // {
            //     label: '月台',
            //     value: 'platform',
            // },
            // {
            //     label: '赛道',
            //     value: 'raceway',
            // },
            // {
            //     label: '居住区道路',
            //     value: 'residential',
            // },
            {
                label: '所有不知名的道路',
                value: 'road',
            },
            // {
            //     label: '通往设施的道路',
            //     value: 'service',
            // },
            // {
            //     label: '阶梯',
            //     value: 'steps',
            // },
            // {
            //     label: '轨道',
            //     value: 'track',
            // },
            {
                label: '未分类道路',
                value: 'unclassified',
            },
            // {
            //     label: '字段，中英对照及速度（km）',
            //     value: 'railway',
            // },
            // {
            //     label: '地铁',
            //     value: 'subway',
            // },
            // {
            //     label: '火车',
            //     value: 'rail',
            // }
        ]
    }
}

export default config
