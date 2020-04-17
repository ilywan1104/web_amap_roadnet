import React, { useEffect, useRef, useState, ReactEventHandler } from 'react'
import { request } from 'umi'
import { Spin } from 'antd'
import Toolbar from '@/components/Toolbar'
import filesConfig from '@/assets/config'


import styles from './index.less'


let amap: any,
  layers = {};

const opt: AMap.MapOptions = {
  mapStyle: filesConfig.mapStyle[0].style,
  zoom: 5,
  center: [106.23893, 38.122758],
}

export default props => {

  const container = useRef(null)
  const [mapComplete, setMapComplete] = useState(false)

  // 路网切换
  const handleAreaChange = (e: ReactEventHandler) => {
    console.log('handleAreaChange', e)
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
        filesConfig.layer.map(item => {
          layers[item.key] = new AMap.TileLayer[item.key]()
          layers[item.key].hide()
          amap.add(layers[item.key])
        })


        AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier: AMapUI.PathSimplifier) => {
          if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
          }
          // console.log(window.location)
          const { protocol, host } = window.location
          // const path = import(`${protocol}//${host}/public/files/line/line_gansu.json`)
          // console.log(path)
          request(`${protocol}//${host}/public/files/line/line_gansu.json`).then(res => {
            console.log(res)
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
        {mapComplete && <Toolbar
          onAreaChange={handleAreaChange}
          onStyleChange={handleStyleChange}
          onLayerChange={handleLayerChange}
        />}
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
