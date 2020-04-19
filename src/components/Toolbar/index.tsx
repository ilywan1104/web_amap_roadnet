import React, { useState, ReactEventHandler } from 'react'
import { Button, Popover, Icon, Radio, Checkbox, Divider } from 'antd'
import _config from '@/config'
import indexless from './index.less'

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginLeft: 0,
};

const RadioGroupPop = ({ options = [], ...rest }) => (
    <Radio.Group {...rest}>
        {options.length ? options.map((item, index) => <Radio
            key={index.toString()}
            value={item.value}
            record={item}
            style={radioStyle}
        >
            {item.label}
        </Radio>) : null}
    </Radio.Group>
)

const CheckboxGroupPop = ({ options = [], ...rest }) => (
    <Checkbox.Group {...rest}>
        {options.length ? options.map((item, index) => <Checkbox
            key={index.toString()}
            value={item.value}
            record={item}
            style={radioStyle}
        >
            {item.label}
        </Checkbox>) : null}
    </Checkbox.Group>
)

export default ({
    onAreaChange = () => null,
    onTypeChange = () => null,
    onTypeToggle = () => null,
    onLayerChange = () => null,
    onStyleChange = () => null,
    areaValues,
    typeValue,
    layerValue,
    styleValue,
}) => (
        <div className={indexless['toolbar']}>
            <div className={indexless['toolbar-item']}>
                <Popover
                    placement="bottomLeft"
                    content={<RadioGroupPop
                        value={areaValues.value}
                        onChange={onAreaChange}
                        options={_config.areas.options}
                    />}
                    trigger="click"
                >
                    <Button type="link"><Icon type="environment" theme="filled" /> {areaValues.label}</Button>
                </Popover>
            </div>
            <div className={indexless['toolbar-item']}>
                <Popover
                    content={<>
                        <Button
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                width: '100%'
                            }}
                            onClick={onTypeToggle}
                            type='link'
                        >
                            {typeValue.length ? '全部关闭' : '全部选中'}
                        </Button>
                        <Divider style={{ margin: '5px 0' }} dashed/>
                        <CheckboxGroupPop
                            value={typeValue}
                            onChange={onTypeChange}
                            options={_config.types.options}
                        />
                    </>}
                    trigger="click"
                >
                    <Button type="link">道路等级</Button>
                </Popover>
            </div>
            <div className={indexless['toolbar-item']}>
                <Popover
                    content={<CheckboxGroupPop
                        value={layerValue}
                        onChange={onLayerChange}
                        options={_config.layers.options}
                    />}
                    trigger="click"
                >
                    <Button type="link">图层</Button>
                </Popover>
            </div>
            <div className={indexless['toolbar-item']}>
                <Popover
                    placement="bottomRight"
                    content={<RadioGroupPop
                        value={styleValue}
                        onChange={onStyleChange}
                        options={_config.styles.options}
                    />}
                    trigger="click"
                >
                    <Button type="link">风格</Button>
                </Popover>
            </div>
        </div>
    )