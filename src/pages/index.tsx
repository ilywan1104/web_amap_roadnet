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
  layers = {};

/**
 * 海量线配置
*/
const HoverTitle = props => {
  return (
    <div style={{
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,.5)'
    }}>
      {props.title}
    </div>
  )
}

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
    return pathData.coordinate;
  },
  getHoverTitle: pathData => {
    const name = _config.types.options.find(e => e.value === pathData.type).name
    const domTemp = document.createElement('div')
    render(<HoverTitle title={name} />, domTemp)
    return domTemp.innerHTML
  },
  renderOptions: {
    //轨迹线的样式
    pathLineStyle: {
      strokeStyle: '#ff9900',
      lineWidth: 1,
      borderStyle: '#ff9900',
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
            strokeWeight: 1,
            path: bounds[i],
            fillOpacity: 0.1,
            fillColor: '#80d8ff',
            strokeColor: '#0091ea'
          });
          districtPolygon.push(polygon);
        }
      }
      amap.add(districtPolygon)
      amap.setFitView(districtPolygon)
    })
    return roads
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
        })

      })
      // amap.on('click', (info: AMap.MapsEvent) => {
      //   const center = amap?.getCenter()
      //   const zoom = amap?.getZoom()
      //   window.console.log(info, center, zoom)
      // })
    }
    return () => {
      if (amap) amap.destroy()
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
      pathSimplifierIns.setData(roadData.filter(e => typeValue.includes(e.type)))
      setMapComplete(true)
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
} /// default