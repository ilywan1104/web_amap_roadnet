import React, { useState, ReactEventHandler } from 'react'
import { Button, Popover, Icon, Radio, Checkbox } from 'antd'
import filesConfig from '@/assets/config'
import styles from './index.less'

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginLeft: 0,
};

const AreaPop = ({ onChange, defaultActive }) => (
    <Radio.Group onChange={onChange} defaultValue={defaultActive}>
        {filesConfig.area.map((item, index) => <Radio
            key={index.toString()}
            value={item.code}
            itemData={item}
            style={radioStyle}
        >
            {item.name}
        </Radio>)}
    </Radio.Group>
)

const LayerPop = ({ onChange, defaultActive = null }) => (
    <Checkbox.Group
        onChange={onChange}
    // defaultValue={defaultActive}
    >
        {filesConfig.layer.map((item, index) => <Checkbox
            key={index.toString()}
            value={item.key}
            style={radioStyle}
        >
            {item.name}
        </Checkbox>)}
    </Checkbox.Group>
)

const StylePop = ({ onChange, defaultActive }) => (
    <Radio.Group onChange={onChange} defaultValue={defaultActive}>
        {filesConfig.mapStyle.map((item, index) => <Radio
            key={index.toString()}
            value={item.style}
            style={radioStyle}
        >
            {item.name}
        </Radio>)}
    </Radio.Group>
)

export default ({
    onAreaChange = () => null,
    onLayerChange = () => null,
    onStyleChange = () => null,
}) => {
    console.log(filesConfig)
    const [currAreaName, setCurrAreaName] = useState(filesConfig.area[0].name)

    return (
        <div className={styles['toolbar']}>
            <div className={styles['toolbar-item']}>
                <Popover
                    placement="bottomLeft"
                    content={<AreaPop
                        onChange={(e: ReactEventHandler) => {
                            setCurrAreaName(e.target.itemData.name)
                            onAreaChange(e)
                        }}
                        defaultActive={filesConfig.area[0].code}
                    />}
                    trigger="click"
                >
                    <Button type="link"><Icon type="environment" theme="filled" /> {currAreaName}</Button>
                </Popover>
            </div>
            <div className={styles['toolbar-item']}>
                <Popover
                    content={<LayerPop
                        onChange={onLayerChange}
                    // defaultActive={[filesConfig.layer[0].key]} 
                    />}
                    trigger="click"
                >
                    <Button type="link">图层</Button>
                </Popover>
            </div>
            <div className={styles['toolbar-item']}>
                <Popover
                    placement="bottomRight"
                    content={<StylePop onChange={onStyleChange} defaultActive={filesConfig.mapStyle[0].style} />}
                    trigger="click"
                >
                    <Button type="link">风格</Button>
                </Popover>
            </div>
        </div>
    )
}