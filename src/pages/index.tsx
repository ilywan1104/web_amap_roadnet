import React, { useEffect, useRef, useState, ReactEventHandler } from 'react'
import { render } from 'react-dom'
import { request } from 'umi'
import { Spin, message } from 'antd'
import Toolbar from '@/components/Toolbar'
import _config from '@/config'
import styles from './index.less'

let amap: any,
  districtPolygon: any,
  pathSimplifierIns: any,
  infoWindow: any,
  layers = {};


const requestUrl = 'http://47.107.27.11:5003/RoadService/road/getroadline'

/**
 * 海量线配置项
*/
const pointStyle = {
  radius: 0,
  lineWidth: 0,
  fillStyle: 'rgba(0,0,0,0)',
  strokeStyle: 'rgba(0,0,0,0)',
}

const pathOpt: AMapUI.PathSimplifierOptions = {
  zIndex: 99,
  autoSetFitView: false,
  getPath: pathData => {
    //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
    return pathData.cd;
  },
  getHoverTitle: () => null,
  renderOptions: {
    //轨迹线的样式
    pathLineStyle: {
      strokeStyle: 'red',//'#ff9900',
      lineWidth: 1,
      borderStyle: 'red',//'#ff9900',
      borderWidth: 1,
      dirArrowStyle: false
    },
    pathLineHoverStyle: {
      strokeStyle: '#3366cc',
      lineWidth: 2,
      borderStyle: '#3366cc',
      borderWidth: 1,
      dirArrowStyle: false
    },
    pathLineSelectedStyle: {
      strokeStyle: '#3366cc',
      lineWidth: 2,
      borderStyle: '#3366cc',
      borderWidth: 1,
      dirArrowStyle: false
    },
    keyPointStyle: pointStyle,
    keyPointHoverStyle: pointStyle,
    startPointStyle: pointStyle,
    endPointStyle: pointStyle,
    hoverTitleStyle: {
      classNames: 'path-hover-title'
    }
  }
}

/**
 * 异步请求
*/
const getJson = async (filePath: string) => request(`${window.location.protocol}//${window.location.host}${filePath}`)

export default () => {
  const container = useRef(null)
  const [mapComplete, setMapComplete] = useState(false)
  const [roadData, setRoadData] = useState([])
  const [areaValues, setAreaValues] = useState(_config.areas.defaultValues)
  const [typeValue, setTypeValue] = useState(_config.types.defaultValue)
  const [layerValue, setLayerValue] = useState(_config.layers.defaultValue)
  const [styleValue, setStyleValue] = useState(_config.styles.defaultValue)

  // 路网切换
  const handleAreaChange = (e: ReactEventHandler) => {
    setAreaValues(e.target.record)
  }

  // 样式切换
  const handleStyleChange = (e: ReactEventHandler) => {
    setStyleValue(e.target.value)
  }

  // 图层切换
  const handleLayerChange = (keys = []) => {
    setLayerValue(keys)
  }

  // 道路等级切换
  const handleTypeChange = (keys = []) => {
    setTypeValue(keys)
  }

  // 获取路网数据及渲染多边形
  const getRoadData = async () => {
    const roads = await getJson(areaValues.path)
    if (districtPolygon) amap.remove(districtPolygon)
    new AMap.DistrictSearch({
      extensions: 'all',
      subdistrict: 0
    }).search(areaValues.label, function (status, result) {
      districtPolygon = []
      const bounds = result.districtList[0].boundaries
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          //生成行政区划polygon
          let polygon = new AMap.Polygon({
            zIndex: 2,
            strokeWeight: 2,
            path: bounds[i],
            fillOpacity: 0,
            fillColor: '#80d8ff',
            strokeColor: 'red',//'#0091ea'
          });
          districtPolygon.push(polygon);
        }
      }
      amap.add(districtPolygon)
      amap.setFitView(districtPolygon)
    })
    return roads
  }

  const handlePathSimplifierInsMouseover = async (event, pointInfo) => {
    console.log(event, pointInfo)
    const { originalEvent } = event
    const { pathData } = pointInfo
    const res = await request(`${requestUrl}/${pathData.dbName}/${pathData.id}`)
    if (!res && res.status !== '1') {
      return
    }
    const { roadList } = res
    if (infoWindow) {
      let roadInfo = JSON.parse(roadList)[0]
      let dom = document.createElement('div')
      render(<dl style={{ margin: 0 }}>
        <dt style={{ marginBottom: 6, fontSize: 16 }}>道路信息</dt>
        <dt style={{ margin: 0 }}>名称：{roadInfo.name || roadInfo.ref || '--'}</dt>
        <dd style={{ margin: 0 }}>类型：{_config.types.options.find(e => e.value === roadInfo.fclass).label}</dd>
        <dd style={{ margin: 0 }}>是否桥梁：{roadInfo.bridge === 'T' ? '是' : '否'}</dd>
        <dd style={{ margin: 0 }}>是否隧道：{roadInfo.tunnel === 'T' ? '是' : '否'}</dd>
      </dl>, dom)
      infoWindow.setContent(dom)
      infoWindow.open(amap, originalEvent.lnglat)
    }
  }

  const handlePathSimplifierInsMouseout = () => {
    amap.clearInfoWindow()
  }

  // didMount
  useEffect(() => {
    if (AMap && AMapUI) {
      amap = new AMap.Map(container.current, {
        zoom: 5,
        center: [106.23893, 38.122758],
        expandZoomRange: true,
        zooms: [3, 20]
      })
      // 异步加载插件
      AMap.plugin('AMap.DistrictSearch')
      // 地图加载完成
      amap.on('complete', () => {
        // 实例化图层
        _config.layers.options.map(item => {
          const opts = item.key === 'Traffic' ? { zIndex: 100 } : {}
          layers[item.value] = new AMap.TileLayer[item.value](opts)
          layers[item.value].hide()
          amap.add(layers[item.value])
        })

        // 实例化海量线
        AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier: AMapUI.PathSimplifier) => {
          if (!PathSimplifier.supportCanvas) {
            message.error('当前环境不支持 Canvas！');
            setMapComplete(true)
            return;
          }

          pathOpt.map = amap
          pathSimplifierIns = new PathSimplifier(pathOpt)
          //  绑定事件
          pathSimplifierIns.on('pathMouseover pointMouseover', handlePathSimplifierInsMouseover)
          pathSimplifierIns.on('pathMouseout pointMouseout', handlePathSimplifierInsMouseout)
        })


        // 实例化信息窗体
        infoWindow = new AMap.InfoWindow({
          anchor: 'bottom-center',
        })
      })
      // amap.on('click', (info: AMap.MapsEvent) => {
      //   const center = amap?.getCenter()
      //   const zoom = amap?.getZoom()
      //   window.console.log(info, center, zoom)
      // })
    }
    return () => {
      // if (amap) amap.destroy()
    }
  }, [])

  // 监听区域值变化异步获取json文件
  useEffect(() => {
    if (areaValues) {
      setRoadData([])
      setMapComplete(false)
      getRoadData()
        .then(res => {
          setRoadData(res)
          setMapComplete(true)
        })
    }
  }, [areaValues])

  // 监听路网数据、道路等级、海量线实例变化，对海量线实例做数据操作
  useEffect(() => {
    if ((roadData || typeValue) && pathSimplifierIns) {
      if (!roadData.length) {
        setTypeValue(_config.types.defaultValue)
        return
      }
      pathSimplifierIns.setData(roadData.filter(e => {
        e.dbName = areaValues.db_name
        return typeValue.includes(e.tp)
      }))
    }
  }, [roadData, typeValue, pathSimplifierIns])

  // 监听图层变化，设置图层显示隐藏
  useEffect(() => {
    if (layerValue && !!Object.keys(layers).length) {
      for (let l in layers) {
        if (layerValue.includes(l)) {
          layers[l].show()
        } else {
          layers[l].hide()
        }
      }
    }
  }, [layerValue, layers])

  // 监听地图样式值变化，设置地图样式
  useEffect(() => {
    if (styleValue && amap) {
      amap.setMapStyle(styleValue)
    }
  }, [styleValue, amap])

  return (
    <Spin spinning={!mapComplete}>
      <div className={styles['container']}>
        <Toolbar
          areaValues={areaValues}
          typeValue={typeValue}
          layerValue={layerValue}
          styleValue={styleValue}
          onAreaChange={handleAreaChange}
          onStyleChange={handleStyleChange}
          onLayerChange={handleLayerChange}
          onTypeChange={handleTypeChange}
          onTypeToggle={() => typeValue.length ? setTypeValue([]) : setTypeValue(_config.types.options.map(item => item.value))}
        />
        <div
          style={{
            height: '100vh',
            width: '100vw',
          }}
          ref={container}
        />
      </div>
    </Spin>
  );
}