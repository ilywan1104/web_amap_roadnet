import React, { useEffect, useRef, useState, ReactEventHandler } from 'react'
import { request } from 'umi'
import { Spin } from 'antd'
import Toolbar from '@/components/Toolbar'
import _config from '@/config'
import styles from './index.less'

let amap: any,
  pathSimplifierIns: any,
  layers = {};

const opt: AMap.MapOptions = {
  mapStyle: _config.mapStyle[0].style,
  zoom: 5,
  center: [106.23893, 38.122758],
}

const pathOpt: AMapUI.PathSimplifierOptions = {
  // zIndex: 100,
  getPath: function (pathData) {
    //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
    return pathData.coordinate;
  },
  getHoverTitle: () => null,
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
    keyPointStyle: {
      radius: 0,
      lineWidth: 0,
      fillStyle: 'rgba(0,0,0,0)',
      strokeStyle: 'rgba(0,0,0,0)',
    },
    keyPointHoverStyle: {
      radius: 0,
      lineWidth: 0,
      fillStyle: 'rgba(0,0,0,0)',
      strokeStyle: 'rgba(0,0,0,0)',
    },
    startPointStyle: {
      radius: 0,
      lineWidth: 0,
      fillStyle: 'rgba(0,0,0,0)',
      strokeStyle: 'rgba(0,0,0,0)',
    },
    endPointStyle: {
      radius: 0,
      lineWidth: 0,
      fillStyle: 'rgba(0,0,0,0)',
      strokeStyle: 'rgba(0,0,0,0)',
    }
  }
}

const getJson = async (filePath: string) => request(`${window.location.protocol}//${window.location.host}${filePath}`)

export default () => {

  const container = useRef(null)
  const [mapComplete, setMapComplete] = useState(false)

  // 路网切换
  const handleAreaChange = (e: ReactEventHandler) => {
    // console.log('handleAreaChange', e.itemData)
    setMapComplete(false)
    getJson(e.target.itemData.path).then(res => {
      pathSimplifierIns.setData(res.filter(e => _config.lineTypes.includes(e.type)))
      setMapComplete(true)
    })
  }

  // 样式切换
  const handleStyleChange = (e: ReactEventHandler) => {
    // console.log('handleStyleChange', e)
    amap.setMapStyle(e.target.value)
  }

  // 图层切换
  const handleLayerChange = (keys = []) => {
    // console.log('handleLayerChange', keys)
    for (let layer in layers) {
      if (keys.includes(layer)) {
        layers[layer].show()
      } else {
        layers[layer].hide()
      }
    }
  }

  useEffect(() => {
    if (AMap && AMapUI) {
      amap = new AMap.Map(container.current, opt)
      amap.on('complete', () => {

        // 初始化图层
        _config.layer.map(item => {
          layers[item.key] = new AMap.TileLayer[item.key]()
          layers[item.key].hide()
          amap.add(layers[item.key])
        })

        AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier: AMapUI.PathSimplifier) => {
          if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            setMapComplete(true)
            return;
          }

          getJson(_config.area[0].path).then(res => {
            pathOpt.map = amap
            pathSimplifierIns = new PathSimplifier(pathOpt)
            pathSimplifierIns.setData(res.filter(e => _config.lineTypes.includes(e.type)))
            setMapComplete(true)
          })

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

  return (
    <Spin spinning={!mapComplete}>
      <div className={styles['container']}>
        <Toolbar
          onAreaChange={handleAreaChange}
          onStyleChange={handleStyleChange}
          onLayerChange={handleLayerChange}
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
