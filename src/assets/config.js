
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
            name: '标准',
            style: 'amap://styles/normal',
        },
        {
            name: '浅色',
            style: 'amap://styles/whitesmoke',
        },
        {
            name: '深色',
            style: 'amap://styles/dark',
        }
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
    ]
}

