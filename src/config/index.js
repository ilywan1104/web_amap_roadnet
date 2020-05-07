const config = {
    areas: {
        defaultValues: { // 默认值
            label: "广东省", // 名称
            value: 510000, // 邮政编码
            path: '/public/files/line/line_guangdong.json', // 路网文件路径
            db_name: 'route_gd'
        },
        // defaultValues: { // 默认值
        //     label: "河源市",
        //     value: 517000,
        //     path: '/public/files/line/line_heyuan.json',
        //     db_name: 'route_heyuan'
        // },
        options: [
            {
                label: "广东省",
                value: 510000,
                path: '/public/files/line/line_guangdong.json',
                db_name: 'route_gd'
            },
            {
                label: "湖南省",
                value: 430000,
                path: '/public/files/line/line_hunan.json',
                db_name: 'route_hn'
            },
            {
                label: "甘肃省",
                value: 620000,
                path: '/public/files/line/line_gansu.json',
                db_name: 'route_gs'
            },
            {
                label: "陕西省",
                value: 610000,
                path: '/public/files/line/line_shanxi.json',
                db_name: 'route_sx'
            },
            {
                label: "河源市",
                value: 517000,
                path: '/public/files/line/line_heyuan.json',
                db_name: 'route_heyuan'
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
            'motorway', 'motorway_link',
            'trunk', 'trunk_link',
            'primary', 'primary_link'
        ], // 默认选中值
        options: [ // 选项值
            {
                label: '高速公路',
                value: 'motorway',
            },
            {
                label: '高速公路匝道',
                value: 'motorway_link',
            },
            {
                label: '快速道路',
                value: 'trunk',
            },
            {
                label: '快速道路匝道',
                value: 'trunk_link',
            },
            {
                label: '一级道路',
                value: 'primary',
            },
            {
                label: '一级道路连接',
                value: 'primary_link',
            },
            {
                label: '二级道路',
                value: 'secondary',
            },
            {
                label: '二级道路连接',
                value: 'secondary_link',
            },
            {
                label: '三级道路',
                value: 'tertiary',
            },
            {
                label: '三级道路连接',
                value: 'tertiary_link',
            },
            {
                label: '马道',
                value: 'bridleway',
            },
            // {
            //     label: '建设中',
            //     value: 'construction',
            // },
            {
                label: '自行车道',
                value: 'cycleway',
            },
            {
                label: '人行道',
                value: 'footway',
            },
            {
                label: '生活街道',
                value: 'living_street',
            },
            {
                label: '非特定用途路',
                value: 'path',
            },
            {
                label: '步行街',
                value: 'pedestrian',
            },
            // {
            //     label: '月台',
            //     value: 'platform',
            // },
            // {
            //     label: '赛道',
            //     value: 'raceway',
            // },
            {
                label: '居住区道路',
                value: 'residential',
            },
            {
                label: '服务区道路',
                value: 'service',
            },
            {
                label: '人行阶梯',
                value: 'steps',
            },
            {
                label: '农路或产业道路',
                value: 'track',
            },
            {
                label: 'track_grade1',
                value: 'track_grade1',
            },
            {
                label: 'track_grade2',
                value: 'track_grade2',
            },
            {
                label: 'track_grade3',
                value: 'track_grade3',
            },
            {
                label: 'track_grade4',
                value: 'track_grade4',
            },
            {
                label: 'track_grade5',
                value: 'track_grade5',
            },
            {
                label: '待确定分类道路',
                value: 'road',
            },
            {
                label: '未分类道路',
                value: 'unclassified',
            },
            {
                label: '未知道路',
                value: 'unknown',
            }
        ]
    }
}

export default config
